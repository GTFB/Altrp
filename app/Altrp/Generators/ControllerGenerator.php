<?php

namespace App\Altrp\Generators;

use App\Altrp\Column;
use App\Altrp\Controller;
use App\Altrp\Customizer;
use App\Altrp\Generators\Request\RequestFile;
use App\Altrp\Generators\Request\RequestFileWriter;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\CommandFailedException;
use App\Exceptions\ControllerNotWrittenException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\RouteGenerateFailedException;
use App\Permission;
use App\Role;
use App\SQLEditor;
use Artisan;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ControllerGenerator extends AppGenerator
{
  /**
   * @var Controller
   */
  protected $controllerModel;

  /**
   * Данные, необходимые для генерации контроллера
   *
   * @var object
   */
  protected $data;

  /**
   * Пространство имен контроллера
   *
   * @var string
   */
  private $namespace = '';

  /**
   * Префикс для группы маршрутов
   *
   * @var string|null
   */
  private $prefix = null;

  /**
   * Имя файла контроллера
   *
   * @var string
   */
  private $controllerFilename;

  /**
   * Файл контроллера
   *
   * @var string
   */
  private $controllerFile;

  /**
   * ControllerGenerator constructor.
   * @param Controller $controller
   * @param array $data
   */
  public function __construct( Controller $controller, $data = [] )
  {
    $this->controllerModel = $controller;
    $this->controllerFilename = $this->getFormedFileName( $this->controllerModel );
    $this->controllerFile = app_path( $this->controllerFilename );
    parent::__construct( $data );
  }

  /**
   * Изменить текущий контроллер
   *
   * @param Controller $controller
   */
  public function setController( Controller $controller )
  {
    $this->controllerModel = $controller;
  }

  /**
   * Сгенерировать новый контроллер
   *
   * @return bool
   *
   * @throws CommandFailedException
   * @throws ControllerNotWrittenException
   * @throws RouteGenerateFailedException
   * @throws ModelNotWrittenException
   */
  public function generate()
  {
    // Получить контроллер из базы
    $controllerModel = $this->getControllerFromDb( $this->data->model_id );

    if ( $controllerModel ) {
      $this->setController( $controllerModel );
      $this->controllerFilename = $this->getFormedFileName( $controllerModel );
      $this->controllerFile = app_path( $this->controllerFilename );

      // Обновить контроллер в базе
      if ( ! $this->writeControllerToDb() ) {
        throw new ControllerNotWrittenException( 'Failed to write controller to the database', 500 );
      }
      if ( ! $this->generateRequests() ) {
        throw new ControllerNotWrittenException( 'Failed to generate requests', 500 );
      }
      // Обновить файл контроллера
      if ( ! $this->updateControllerFile() ) {
        throw new CommandFailedException( 'Failed to update controller file', 500 );
      }
    } else {
      // Записать конроллер в базу
      if ( ! $this->writeControllerToDb() ) {
        throw new ControllerNotWrittenException( 'Failed to write controller to the database', 500 );
      }
      if ( ! $this->generateRequests() ) {
        throw new ControllerNotWrittenException( 'Failed to generate requests', 500 );
      }
      // Создать новый файл контроллера
      if ( ! $this->createControllerFile() ) {
        throw new CommandFailedException( 'Failed to create controller file', 500 );
      }
    }

    if ( $this->getSourceActions()->isEmpty() ) {
      // Записать основные действия над ресурсом в базу
      if ( ! $this->writeSourceActions() ) {
        throw new ModelNotWrittenException( 'Failed to write source action to the database (Controller Generator)', 500 );
      }
    }

    // Записать роли для действий над ресурсами в базу
    if ( ! $this->writeSourceRoles() ) {
      throw new ModelNotWrittenException( 'Failed to write source roles to the database', 500 );
    }

    // Записать права доступа к ресурсам в базу
    if ( ! $this->writeSourcePermissions() ) {
      throw new ModelNotWrittenException( 'Failed to write source permissions to the database', 500 );
    }

    // Сгенерировать маршруты для ресурса
    if ( ! $this->generateRoutes( $this->controllerModel->model, new RouteGenerator( $this->controllerModel ) ) ) {
      throw new RouteGenerateFailedException( 'Failed to generate routes', 500 );
    }

    // Сгенерировать API маршруты для ресурса
    if ( ! $this->generateRoutes( $this->controllerModel->model, new RouteGenerator( $this->controllerModel, 'AltrpApiRoutes' ), true ) ) {
      throw new RouteGenerateFailedException( 'Failed to generate api routes', 500 );
    }

    return true;
  }

  /**
   * Сохранить контроллер в базе данных
   *
   * @return bool
   */
  protected function writeControllerToDb()
  {
    $attributes = json_decode( json_encode( $this->data ), true );

    $this->controllerModel->fill( $attributes );

    try {
      $this->controllerModel->save();
    } catch ( \Exception $e ) {
      return false;
    }
    return true;
  }

  /**
   * Получить контроллер из БД по id таблицы
   *
   * @param $tableId
   * @return mixed
   */
  protected function getControllerFromDb( $modelId )
  {
    $controller = Controller::where( 'model_id', $modelId )->first();
    return $controller;
  }

  protected function deleteAction( $actions, $actionName )
  {
    foreach ( $actions as $key => $name ) {
      if ( $actionName == $name ) {
        unset( $actions[$key] );
        break;
      }
    }
  }

  /**
   * Записать в таблицу действий над ресурсами основные действия
   *
   * @return bool
   */
  public function writeSourceActions()
  {
    $actions = [ 'get', 'options', 'show', 'add', 'update', 'delete', 'update_column', 'filters' ];
    $oldSources = $this->getSourceActions();
    $sources = [];
    $modelName = strtolower( Str::plural( Str::snake( $this->getModelName() ) ) );
    $singleResource = Str::singular( $modelName );
    $nowTime = Carbon::now();
    foreach ( $actions as $action ) {
      if ( $action == 'get' || $action == 'add' ) {
        $url = $modelName;
        $name = ucfirst( $action ) . ' ' . Str::studly( $modelName );
      } elseif ( $action == 'options' ) {
        $url = $singleResource . '_options';
        $name = 'Get ' . ucfirst( $modelName ) . ' for options';
      } elseif ( $action == 'update_column' ) {
        $url = $modelName . "/{{$singleResource}}/{column}";
        $name = ucfirst( str_replace( '_', ' ', $action ) )
          . ' ' . Str::studly( $singleResource );
      } elseif ( $action == 'filters' ) {
        $url = 'filters/' . $modelName . "/{column}";
        $name = ucfirst( $action ) . ' ' . Str::studly( $singleResource );
      } else {
        $url = $modelName . "/{{$singleResource}}";
        $name = ucfirst( $action ) . ' ' . Str::studly( $singleResource );
      }

      $requestType = $this->createRequestType( $action );

      $sourceData = [
        "model_id" => $this->getModelId(),
        "controller_id" => $this->controllerModel->id,
        "url" => '/' . $url,
        "api_url" => '/' . $url,
        "type" => $action,
        "name" => $name,
        "title" => $name,
        'request_type' => $requestType,
        "created_at" => $nowTime,
      ];

      $sources[] = $sourceData;
    }
    try {
      if ( $oldSources && $oldSources->isNotEmpty() ) {
        foreach ( $oldSources as $oldSource ) {
          $sourceObj = Source::find( $oldSource->id );
          foreach ( $sources as $source ) {
            if ( $sourceObj->type == $source['type'] ) {
              $sourceObj->update( $source );
            }
          }
        }
      }
      foreach ( $sources as $source ) {
        if ( ! $oldSources->contains( 'type', $source['type'] ) ) {
          $sourceObj = new Source( $source );
          $sourceObj->auth = true;
          $sourceObj->save();
          $sourceRole = new SourceRole( [
            'source_id' => $sourceObj->id,
            'role_id' => Role::getAdminId()
          ] );
          $sourceRole->save();
        }
      }
    } catch ( \Exception $e ) {
      Log::info( $e->getMessage() );
      return false;
    }

    return true;
  }

  /**
   * Сгенерировать тип запроса источника данных
   * @param $action
   * @return string
   */
  protected function createRequestType( $action )
  {
    switch ( $action ) {
      case 'get':
      case 'show':
      case 'options':
      case 'filters':
        $requestType = 'get';
        break;
      case 'add':
        $requestType = 'post';
        break;
      case 'update':
      case 'update_column':
        $requestType = 'put';
        break;
      case 'delete':
        $requestType = 'delete';
        break;
      default:
        $requestType = 'get';
    }
    return $requestType;
  }

//    protected function getSources($actions, $tableName, $nowTime)
//    {
//        $sources = [];
//        $singleResource = Str::singular($tableName);
//        foreach ($actions as $action) {
//            if ($action == 'get') {
//                $url = $tableName;
//                $name = ucfirst($action) . ' ' . Str::studly($tableName);
//            } elseif ($action == 'options') {
//                $url = $singleResource . '_options';
//                $name = 'Get ' . ucfirst($tableName) . ' for options';
//            } elseif ($action == 'get_column') {
//                $url = $tableName . "/{{$singleResource}}/{column}";
//                $name = ucfirst($action) . ' ' . Str::studly($singleResource);
//            } else {
//                $url = $tableName . "/{{$singleResource}}";
//                $name = ucfirst($action) . ' ' . Str::studly($singleResource);
//            }
//            $sources[] = [
//                "model_id" => $this->getModelId(),
//                "controller_id" => $this->controllerModel->id,
//                "url" => '/' . $url,
//                "api_url" => '/' . $url,
//                "type" => $action,
//                "name" => $name,
//                "created_at" => $nowTime,
//            ];
//        }
//        return $sources;
//    }

  public function deleteSourceActions()
  {
    $sources = Source::where( [
      [ 'model_id', $this->controllerModel->model->id ],
      [ 'controller_id', $this->controllerModel->id ]
    ] )->get( [ 'id' ] )->implode( 'id', ',' );
    $ids = explode( ',', $sources );
    Source::destroy( $ids );
    return true;
  }

  /**
   * Записать в БД роли пользователей принадлежащих ресурсу
   *
   * @return bool
   */
  public function writeSourceRoles()
  {
//        $sourceRoles = $this->getAccessRoles();
//
//        $roleIds = Arr::pluck($sourceRoles, 'role_id');
//        $sourceIds = Arr::pluck($sourceRoles, 'source_id');
//        if ($sourceRoles) {
//            try {
//                SourceRole::whereIn('role_id', $roleIds)->whereIn('source_id', $sourceIds)->delete();
//                SourceRole::insert($sourceRoles);
//            } catch (\Exception $e) {
//                return false;
//            }
//        }
    return true;
  }

  /**
   * Записать в БД права доступа принадлежащие ресурсу
   *
   * @param $model
   * @return bool
   */
  public function writeSourcePermissions( $model )
  {
//        $sourcePermissions = $this->prepareSourcePermissions();
//        $oldSourcePermissions = SourcePermission::where('type','like','%-'.strtolower(Str::snake($model->getOriginal('name'))))->get();
//        try {
//            foreach ($sourcePermissions as $sourcePermission) {
//                if (! $oldSourcePermissions->contains(
//                    'type',
//                    explode('-',$sourcePermission['type'])[0] . '-' . strtolower(Str::snake($model->getOriginal('name')))
//                )) {
//                    $sourcePermObj = new SourcePermission($sourcePermission);
//                    $sourcePermObj->save();
//                }
//            }
//            if ($oldSourcePermissions && $oldSourcePermissions->isNotEmpty()) {
//                foreach ($oldSourcePermissions as $oldSourcePermission) {
//                    $sourcePermObj = SourcePermission::find($oldSourcePermission->id);
//                    foreach ($sourcePermissions as $sourcePermission) {
//                        if ($sourcePermObj->type == explode('-',$sourcePermission['type'])[0] . '-' . strtolower(Str::snake($model->getOriginal('name')))) {
//                            $sourcePermObj->update($sourcePermission);
//                        }
//                    }
//                }
//            }
//        } catch (\Exception $e) {
//            echo $e;
//            return false;
//        }
    return true;
  }

  protected function prepareSourcePermissions()
  {
    $nowTime = Carbon::now();
    $sources = $this->controllerModel->sources;
    $modelName = $this->controllerModel->model->name;
    $resource = strtolower( Str::snake( $modelName ) );
//        $oldSourcePermissions = SourcePermission::whereIn('source_id',explode(',',$sources->implode('id',',')))->get();
    $sourcePermissions = [];
    $permissions = Permission::where(
      'name',
      'like',
      '%' . strtolower( Str::snake( $modelName ) )
    )->get();
    foreach ( $sources as $source ) {
      if ( ( $source->type == 'get' || $source->type == 'options' || $source->type == 'filters' ) ) {
        $sourcePermission = [
          'permission_id' => $permissions->firstWhere( 'name', 'all-' . $resource )->id,
        ];
      }
      if ( $source->type == 'add' ) {
        $sourcePermission = [
          'permission_id' => $permissions->firstWhere( 'name', 'create-' . $resource )->id,
        ];
      }
      if ( $source->type == 'show' ) {
        $sourcePermission = [
          'permission_id' => $permissions->firstWhere( 'name', 'read-' . $resource )->id,
        ];
      }
      if ( $source->type == 'update' || $source->type == 'update_column' ) {
        $sourcePermission = [
          'permission_id' => $permissions->firstWhere( 'name', 'update-' . $resource )->id,
        ];
      }
      if ( $source->type == 'delete' ) {
        $sourcePermission = [
          'permission_id' => $permissions->firstWhere( 'name', 'delete-' . $resource )->id,
        ];
      }
      if ( $source->type == 'get' || $source->type == 'options' || $source->type == 'add'
        || $source->type == 'show' || $source->type == 'update' || $source->type == 'update_column'
        || $source->type == 'delete' || $source->type == 'filters' ) {
        $sourcePermission['source_id'] = $source->id;
        $sourcePermission['type'] = $source->type . '-' . $resource;
        $sourcePermission['created_at'] = $nowTime;
        $sourcePermission['updated_at'] = $nowTime;
        $sourcePermissions[] = $sourcePermission;
      }
    }
    return $sourcePermissions;
  }

  /**
   * Получить коллекцию действий ресурса
   *
   * @return \Illuminate\Database\Eloquent\Collection
   */
  public function getSourceActions()
  {
    return $this->controllerModel->sources()->get();
  }

  /**
   * Запустить artisan команду для генерации контроллера
   *
   * @return boolean
   */
  public function createControllerFile()
  {
    $modelName = $this->getModelName();
    $modelPath = $this->getModelPath();
    $prefix = $this->getRoutePrefix();
    $modelNamespace = 'AltrpModels\\' . $modelPath;
    $validations = $this->getValidationRules();
    $crudName = $this->toSnakeCase( $this->getTableName() );
    $namespace = $this->getNamespace( $this->controllerModel );
    $relations = $this->getRelations();
    $oldControllerFile = $this->getOldControllerFile();
    $customCode = $this->getCustomCode( $oldControllerFile );
    $options = $this->getOptions();
    $sources = $this->controllerModel->model->altrp_sources;

    if ( file_exists( $oldControllerFile ) ) unlink( $oldControllerFile );
    try {
      Artisan::call( 'crud:controller', [
        'name' => $modelName . 'Controller',
        '--crud-name' => $crudName,
        '--model-name' => $modelName,
        '--model-namespace' => $modelNamespace,
        '--controller-namespace' => $namespace,
        '--route-group' => $prefix,
        '--relations' => $relations,
        '--custom-namespaces' => $this->getCustomCodeBlock( $customCode, 'custom_namespaces' ),
        '--custom-traits' => $this->getCustomCodeBlock( $customCode, 'custom_traits' ),
        '--custom-properties' => $this->getCustomCodeBlock( $customCode, 'custom_properties' ),
        '--custom-methods' => $this->getCustomCodeBlock( $customCode, 'custom_methods' ),
//                '--sql-editors' => $this->getCustomCodeBlock($customCode, 'sql_editors'),
        '--options' => $options
      ] );
    } catch ( \Exception $e ) {
      logger()->error( $e->getMessage() . "\n" . $e->getTraceAsString() );
      if ( file_exists( $this->controllerFile . '.bak' ) )
        rename( $this->controllerFile . '.bak', $this->controllerFile );
      return false;
    }

    if ( $sources ) {
      $sql_editors = SQLEditor::where( 'model_id', $this->controllerModel->model->id )->get();
      $sql_builders = Query::where( 'model_id', $this->controllerModel->model->id )->get();
      $customizers = Customizer::where( 'model_id', $this->controllerModel->model->id )->get();
      foreach ( $sql_editors as $sql_editor ) {
        $sqlEditorObj = SQLEditor::find( $sql_editor->id );
        $data = $sql_editor->toArray();
        $data['updated_at'] = Carbon::now();
        $sqlEditorObj->update( $data );

      }
      foreach ( $sql_builders as $sql_builder ) {
        $query = Query::find( $sql_builder->id );
        $data = $sql_builder->toArray();
        $data['updated_at'] = Carbon::now();
        $query->update( $data );
      }
      foreach ( $customizers as $customizer ) {
        $old_customizer = Customizer::find( $customizer->id );
        $data = $old_customizer->toArray();
        $data['updated_at'] = Carbon::now();
        $old_customizer->update( $data );
      }
    }

    if ( file_exists( $this->controllerFile . '.bak' ) )
      unlink( $this->controllerFile . '.bak' );
    if ( file_exists( $oldControllerFile . '.bak' ) )
      unlink( $oldControllerFile . '.bak' );
    return true;
  }

  /**
   * Сформировать список ролей доступа
   *
   * @return array
   */
  protected function getAccessRoles()
  {
    $roles = [];
    $nowTime = Carbon::now();

    //        if (isset($this->controllerModel->access) && !empty($this->controllerModel->access)) {
    //            $sourceActions = $this->getSourceActions();
    //            foreach ($this->controllerModel->access as $access) {
    //                if ($access->type == 'role') {
    //                    $sourceId = null;
    //                    foreach ($sourceActions as $action) {
    //                        if ($action->type == $access->action) {
    //                            $sourceId = $action->id;
    //                        }
    //                    }
    //                    $roles[] = [
    //                        'source_id' => $sourceId,
    //                        'role_id' => $access->id,
    //                        'type' => null,
    //                        'created_at' => $nowTime,
    //                        'updated_at' => $nowTime
    //                    ];
    //                }
    //            }
    //        }
    return $roles;
  }

  /**
   * Сформировать список прав доступа
   *
   * @return array
   */
  protected function getAccessPermissions()
  {
    $sourcePermissions = [];

    //        if (isset($this->data->access) && !empty($this->data->access)) {
    //            $sourceActions = $this->getSourceActions();
    //            foreach ($this->data->access as $access) {
    //                if ($access->type == 'permission') {
    //                    $sourceId = null;
    //                    foreach ($sourceActions as $action) {
    //                        if ($action->type == $access->action) {
    //                            $sourceId = $action->id;
    //                        }
    //                    }
    //                    $permissions[] = [
    //                        'source_id' => $sourceId,
    //                        'permission_id' => $access->id,
    //                        'type' => null,
    //                        'created_at' => $nowTime,
    //                        'updated_at' => $nowTime
    //                    ];
    //                }
    //            }
    //        }
    return $sourcePermissions;
  }

  /**
   * Обновить файл контроллера
   *
   * @return bool
   */
  public function updateControllerFile()
  {
    return $this->createControllerFile();
  }

  /**
   * Удалить файл контроллера
   *
   * @return bool
   */
  public function deleteControllerFile()
  {
    if ( file_exists( $this->controllerFile ) ) {
      return unlink( $this->controllerFile );
    }
    return true;
  }

  /**
   * Получить столбцы для опций
   *
   * @return string
   */
  protected function getOptions()
  {
    $label = Column::where( [ [ 'table_id', $this->controllerModel->model->table->id ], [ 'is_label', 1 ] ] )->first();
    $label = $label ? $label->name : 'id';
    return 'select([\'id as value\',\'' . $label . ' as label\'])';
  }

  /**
   * Получить валидационные правила
   *
   * @return
   */
  protected function getValidationRules()
  {
    return $this->controllerModel->model->validations ?? null;
  }

  /**
   * Получить имя модели, которую использует контроллер
   *
   * @return mixed
   */
  protected function getModelName()
  {
    return $this->controllerModel->model->name;
  }

  /**
   * Получить ID модели, которую использует контроллер
   *
   * @return mixed
   */
  protected function getModelId()
  {
    return $this->controllerModel->model->id;
  }

  /**
   * Получить имя таблицы, которая принадлежит контроллеру
   *
   * @return mixed
   */
  protected function getTableName()
  {
    return $this->controllerModel->table()->name;
  }

  /**
   * Получить путь к файлу модели
   *
   * @return string
   */
  protected function getModelPath()
  {
    return $this->controllerModel->model->path
      ? $this->controllerModel->model->path . '\\'
      : '';
  }

  /**
   * Получить связи для контроллера
   *
   * @return mixed
   */
  protected function getRelations()
  {
    return $this->controllerModel->relations ?? '';
  }

  /**
   * Получить префикс
   *
   * @return string|null
   */
  protected function getRoutePrefix()
  {
    return $this->controllerModel->prefix ?? null;
  }

  /**
   * Сгенерировать маршруты
   *
   * @param Model $model
   * @param RouteGenerator $generator
   * @param bool $api
   * @return bool
   */
  public function generateRoutes( Model $model, RouteGenerator $generator, $api = false )
  {
    $routeGenerator = $generator;
//        $tableName = $this->getTableName();
    $modelName = strtolower( Str::plural( Str::snake( $this->getModelName() ) ) );
    $oldModelName = strtolower( Str::plural( Str::snake( $model->getOriginal( 'name' ) ) ) );
    $resourceId = Str::singular( $modelName );
//        $userColumns = trim($this->controllerModel->model->user_cols, ' ');
    $sources = $model->altrp_sources;
    if ( $sources->isEmpty() ) {
      $sources = Source::where( 'model_id', $model->id )->get();
    }
    $controllerName = $this->getFormedControllerName( $this->controllerModel );
    $controller = trim( $controllerName, "\\" );
    $prefix = $this->getRoutePrefix() ? '/' . trim( $this->getRoutePrefix(), '/' ) : null;
    $actions = [ 'get', 'options', 'show', 'add', 'update', 'delete', 'update_column', 'filters' ];

    foreach ( $sources as $source ) {
      if ( in_array( $source->type, $actions ) ) {
        $routeMiddleware = $routeGenerator->getMiddleware( $source, $api );
        $routeMiddleware = $routeMiddleware
          ? "'middleware' => ['" . implode( "','", $routeMiddleware ) . "'], " : '';
        $routeGenerator->addDynamicVariable(
          $source->type . 'Middleware',
          $routeMiddleware
        );
      }
    }

    $routeGenerator->addDynamicVariable( 'routePrefix', $prefix );
    $routeGenerator->addDynamicVariable( 'tableName', $modelName );
    $routeGenerator->addDynamicVariable( 'resourceId', $resourceId );
    $routeGenerator->addDynamicVariable( 'id', \Str::singular( $modelName ) );
    $routeGenerator->addDynamicVariable( 'column', 'column' );
    $routeGenerator->addDynamicVariable( 'controllerName', $controller );
    return $routeGenerator->generate( $oldModelName, $modelName, $controller, $api );
  }

  /**
   * Удалить маршруты из файла маршрутов
   *
   * @return false|int
   */
  public function removeRoutes()
  {
    $routeGenerator = new RouteGenerator( $this->controllerModel );
    return $routeGenerator->deleteRoutes( $this->controllerModel );
  }

  /**
   * Сформировать и получить миддлвары доступа
   *
   * @return array
   */
  protected function getAccessMiddleware( $userColumns )
  {
    $sources = $this->controllerModel->sources()->get();
    $ability = [];
    foreach ( $sources as $source ) {
      $ability[$source->type] = [];
      foreach ( $source->source_roles->all() as $sourceRole ) {
        $ability[$source->type]['roles'][] = $sourceRole->role()->first()->name;
      }

      if ( isset( $ability[$source->type]['roles'] ) ) {
        $ability[$source->type]['roles'] = implode( '|', $ability[$source->type]['roles'] );;
      }

      foreach ( $source->source_permissions->all() as $sourcePermission ) {
        $ability[$source->type]['permissions'][] = $sourcePermission->permission()->first()->name;
      }

      if ( isset( $ability[$source->type]['permissions'] ) ) {
        $ability[$source->type]['permissions'] = implode( '|', $ability[$source->type]['permissions'] );;
      }
    }

    $middleware = [];
    $authMiddleware = $userColumns ? $this->getAuthMiddleware() . ',' : null;
    foreach ( $ability as $action => $access ) {
      $middleware[$action] = implode( ',', $access );

      if ( $middleware[$action] ) $middleware[$action] = "'middleware' => ["
        . $authMiddleware . "'ability:" . $middleware[$action] . "'], ";
      else {
        if ( $userColumns ) {
          $middleware[$action] = "'middleware' => [" . $authMiddleware . '], ';
        } else {
          $middleware[$action] = null;
        }
      }
    }
    return $middleware;
  }

  /**
   * Получить middleware
   *
   * @return string|null
   */
  protected function getAuthMiddleware()
  {
    $middlewares = [ 'auth:api', 'auth' ];
    if ( ! $middlewares ) return null;
    return '\'' . implode( "','", $middlewares ) . '\'';
  }

  /**
   * Получить сформированное имя файла
   *
   * @param Controller $controller контроллер
   * @return string
   */
  protected function getFormedFileName( Controller $controller )
  {
    $namespace = $this->getNamespace( $controller );

    $controllerFilename = trim( str_replace( '\\', '/', $namespace )
        . '/' . $controller->model->name, '/' )
      . 'Controller.php';

    return $controllerFilename;
  }

  /**
   * Получить старый файл контроллера
   *
   * @return string
   */
  protected function getOldControllerFile()
  {
    $namespace = $this->getNamespace( $this->controllerModel );
    $controllerFilename = trim( str_replace( '\\', '/', $namespace )
        . '/' . $this->getOldModelName(), '/' )
      . 'Controller.php';
    return app_path( $controllerFilename );
  }

  /**
   * Получить старое имя модели
   *
   * @return mixed
   */
  protected function getOldModelName()
  {
    return $this->data->old_model_name ?? $this->controllerModel->model->name;
  }

  /**
   * Получить сформированный путь к файлу контроллера
   *
   * @param Controller $controller контроллер
   * @return string
   */
  protected function getFormedControllerName( Controller $controller )
  {
    $namespace = $controller->namespace ? $controller->namespace . '\\' : '';

    $controllerName = trim( 'AltrpControllers\\' . $namespace
        . $controller->model->name, '\\' )
      . 'Controller';

    return $controllerName;
  }

  /**
   * Получить пространство имен контроллера
   *
   * @param Controller $controller контроллер
   * @return string
   */
  protected function getNamespace( Controller $controller )
  {
    return $controller->namespace
      ? 'Http\Controllers\AltrpControllers\\' . $controller->namespace
      : 'Http\Controllers\AltrpControllers';
  }

  /**
   * Сформировать строку с валидационными правилами для artisan команды
   *
   * @param $validationRules
   * @return string
   */
  protected function validationsToString( $validationRules )
  {
    if ( (array)$validationRules ) {
      $validationArr = [];
      foreach ( $validationRules as $name => $rules ) {
        $rules = (array)$rules;
        if ( ! empty( $rules ) ) {
          $validationArr[] = $name . '#' . implode( '|', $rules );
        }
      }
      return implode( ';', $validationArr );
    }
    return '';
  }

  /**
   * Сформировать валидационные правила для файла запроса
   *
   * @return string
   */
  protected function getValidations( $model, $type )
  {
    $validations = [];
    $validationFields = $this->getValidationRules();
    if ( ! $validationFields ) return null;
    foreach ( $validationFields as $field ) {
      if ( ! $field->$type || ! $field->rules->toArray() ) continue;
      $rules = $field->rules->implode( 'rule', '|' );
      $fieldName = $field->column->name;
      if ( $field->column_name ) $fieldName = $field->column_name;
      $validations[] = "'{$fieldName}' => '" . $rules . "',";
    }
    return implode( PHP_EOL . "\t\t\t", $validations );
  }

  /**
   * Сгенерировать файлы запросов для валидации
   *
   * @return bool
   */
  public function generateRequests()
  {
    $requestFileCreated = new RequestFile(
      $this->controllerModel->model,
      'Store',
      $this->getValidations( $this->controllerModel->model, 'is_created' )
    );
    $requestFileUpdated = new RequestFile(
      $this->controllerModel->model,
      'Update',
      $this->getValidations( $this->controllerModel->model, 'is_updated' )
    );
    $requestFileWriter = new RequestFileWriter();
    $resCreated = $requestFileWriter->write( $requestFileCreated );
    $resUpdated = $requestFileWriter->write( $requestFileUpdated );
    return $resCreated && $resUpdated;
  }

  /**
   * Удалить файлы запросов
   *
   * @return bool
   */
  public function removeRequests()
  {
    $requests = [ 'Store', 'Update' ];
    foreach ( $requests as $name ) {
      $request = new RequestFile(
        $this->controllerModel->model,
        $name,
        []
      );
      $requestWriter = new RequestFileWriter();
      $requestWriter->remove( $request );
    }
    return true;
  }
}
