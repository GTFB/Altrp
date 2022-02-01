<?php

namespace App\Observers;

use App\Altrp\Generators\Controller\ControllerFile;
use App\Altrp\Generators\Controller\ControllerFileWriter;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Generators\Route\RouteFileWriter;
use App\Altrp\Source;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\Controller\ControllerFileException;
use App\Permission;
use App\Role;
use Carbon\Carbon;
use App\PageDatasource;

class AltrpSourceObserver
{
  /**
   * Handle the source "creating" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   * @throws ControllerFileException
   */
  public function creating( Source $source )
  {
    $model = $source->model;
    $source->controller_id = $model->altrp_controller->id;

    $oldSource = Source::where( [
      [ 'model_id', $model->id ],
      [ 'controller_id', $source->controller_id ],
      [ 'name', $source->name ]
    ] )->first();
    if ( $oldSource ) {
      throw new ControllerFileException( 'Data source already exists', 403 );
    }
  }

  /**
   * Handle the source "created" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   * @throws \App\Exceptions\Route\RouteFileException
   */
  public function created( Source $source )
  {
    $model = $source->model;
    $controllerFile = new ControllerFile( $model );
    if ( $source->type == 'remote' ) {
      $repo = new RepositoryFile( $model );
      $repoInterface = new RepositoryInterfaceFile( $model );
      $controllerWriter = new ControllerFileWriter(
        $controllerFile,
        $repo,
        $repoInterface
      );
      if ( $controllerWriter->methodSourceExists( $source->name ) ) {
        throw new ControllerFileException( 'Method already exists', 403 );
      }
      $result = $controllerWriter->writeDataSourceMethod( $source );
      if ( ! $result )
        throw new ControllerFileException( 'Failed to write method to the controller file', 500 );
    }

    $this->writeSourceAccess( $source, request()->get( 'access' ) );

    if ( $source->type == 'remote' ) {
      $routeFile = new RouteFile( $model );
      $routeWriter = new RouteFileWriter( $routeFile, $controllerFile );
      $apiRouteFile = new RouteFile( $model, 'routes/AltrpApiRoutes.php', true );
      $apiRouteWriter = new RouteFileWriter( $apiRouteFile, $controllerFile );
      $routeWriter->addSourceRoute( $source );
      $apiRouteWriter->addSourceRoute( $source );
    }
  }

  /**
   * Handle the source "updating" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   * @throws ControllerFileException
   */
  public function updating( Source $source )
  {
    $model = $source->model;
    $source->controller_id = $model->altrp_controller->id;

    if ( ! in_array( $source->type, [ 'get', 'options', 'show', 'add', 'update', 'delete', 'update_column', 'filters' ] )
      && $source->type != $source->getOriginal( 'type' ) ) {
      $source->type = $source->getOriginal( 'type' );
    }

    $oldSource = Source::where( [
      [ 'model_id', $model->id ],
      [ 'controller_id', $source->controller_id ],
      [ 'name', $source->name ]
    ] )->first();
    if ( $oldSource && $source->name != $source->getOriginal( 'name' ) ) {
      throw new ControllerFileException( 'Data source already exists', 403 );
    }
  }

  /**
   * Handle the source "updated" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   * @throws ControllerFileException
   * @throws \App\Exceptions\Route\RouteFileException
   */
  public function updated( Source $source )
  {
    $model = $source->model;
    $controllerFile = new ControllerFile( $model );
    if ( $source->type == 'remote' ) {
      $repo = new RepositoryFile( $model );
      $repoInterface = new RepositoryInterfaceFile( $model );
      $controllerWriter = new ControllerFileWriter(
        $controllerFile,
        $repo,
        $repoInterface
      );
      if ( $controllerWriter->methodSourceExists( $source->getOriginal( 'name' ) ) ) {
        $result = $controllerWriter->updateSourceMethod(
          $source->getOriginal( 'name' ),
          $source
        );
        if ( ! $result )
          throw new ControllerFileException( 'Failed to update method to the controller file', 500 );

      }
    }

    $this->writeSourceAccess( $source, request()->get( 'access' ) );

    $routeFile = new RouteFile( $model );
    $routeWriter = new RouteFileWriter( $routeFile, $controllerFile );
    $apiRouteFile = new RouteFile( $model, 'routes/AltrpApiRoutes.php', true );
    $apiRouteWriter = new RouteFileWriter( $apiRouteFile, $controllerFile );
    if ( $source->type == 'remote' ) {
      if ( $routeWriter->routeSourceExist( $source ) ) {
        $routeWriter->updateSourceRoute( $source );
      }
      if ( $apiRouteWriter->routeSourceExist( $source ) ) {
        $apiRouteWriter->updateSourceRoute( $source );
      }
    } else {
      if ( $routeWriter->routeExists( file( $routeFile->getFile(), 2 ), ltrim( $source->url, '/' ), 'Route::', $source->getOriginal( 'request_type' ) ) ) {
        $routeWriter->updateSourceRoute( $source, ltrim( $source->url, '/' ) );
      }
      if ( $apiRouteWriter->routeExists( file( $apiRouteFile->getFile(), 2 ), ltrim( $source->url, '/' ), 'Route::', $source->getOriginal( 'request_type' ) ) ) {
        $apiRouteWriter->updateSourceRoute( $source, ltrim( $source->url, '/' ) );
      }
    }
  }

  /**
   * Handle the source "deleting" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   */
  public function deleting( Source $source )
  {
    PageDatasource::where( 'source_id', $source->id )->delete();
    SourcePermission::where( 'source_id', $source->id )->delete();
    SourceRole::where( 'source_id', $source->id )->delete();
  }

  /**
   * Handle the source "deleted" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   * @throws \App\Exceptions\Route\RouteFileException
   */
  public function deleted( Source $source )
  {
    $model = $source->model;
    $controllerFile = new ControllerFile( $model );
    if ( $source->type == 'remote' ) {
      $repo = new RepositoryFile( $model );
      $repoInterface = new RepositoryInterfaceFile( $model );
      $controllerWriter = new ControllerFileWriter(
        $controllerFile,
        $repo,
        $repoInterface
      );
      if ( $controllerWriter->methodSourceExists( $source->getOriginal( 'name' ) ) ) {
        $result = $controllerWriter->removeMethod(
          $source->getOriginal( 'name' )
        );
        if ( ! $result )
          throw new ControllerFileException( 'Failed to delete method to the controller file', 500 );
      }
    }
    if ( $source->type == 'customizer' || $source->type == 'robot' ) {
      $repo = new RepositoryFile( $model );
      $repoInterface = new RepositoryInterfaceFile( $model );
      $controllerWriter = new ControllerFileWriter(
        $controllerFile,
        $repo,
        $repoInterface
      );
      if ( $controllerWriter->methodSourceExists( $source->getOriginal( 'name' ) ) ) {
        $result = $controllerWriter->removeMethod(
          $source->getOriginal( 'name' ),
          'CUSTOMIZERS_METHODS_BEGIN'
        );
        if ( ! $result )
          throw new ControllerFileException( 'Failed to delete method to the controller file', 500 );
      }
    }

    $this->writeSourceAccess( $source, request()->get( 'access' ) );

    $routeFile = new RouteFile( $model );
    $routeWriter = new RouteFileWriter( $routeFile, $controllerFile );
    $apiRouteFile = new RouteFile( $model, 'routes/AltrpApiRoutes.php', true );
    $apiRouteWriter = new RouteFileWriter( $apiRouteFile, $controllerFile );

    if ( $source->type == 'remote' ) {
      if ( $routeWriter->routeSourceExist( $source ) ) {
        $routeWriter->removeRoute( $source->name, 'data_sources', $source->request_type );
      }
      if ( $apiRouteWriter->routeSourceExist( $source ) ) {
        $apiRouteWriter->removeRoute( $source->name, 'data_sources', $source->request_type );
      }
    } else {
      if ( $routeWriter->routeExists( file( $routeFile->getFile(), 2 ), ltrim( $source->url, '/' ), 'Route::', $source->getOriginal( 'request_type' ) ) ) {
        $routeWriter->removeRoute( $source->url, 'Route::', $source->request_type );
      }
      if ( $apiRouteWriter->routeExists( file( $apiRouteFile->getFile(), 2 ), ltrim( $source->url, '/' ), 'Route::', $source->getOriginal( 'request_type' ) ) ) {
        $apiRouteWriter->removeRoute( $source->url, 'Route::', $source->request_type );
      }
    }
  }

  /**
   * Handle the source "restored" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   */
  public function restored( Source $source )
  {
    //
  }

  /**
   * Handle the source "force deleted" event.
   *
   * @param \App\Altrp\Source $source
   * @return void
   */
  public function forceDeleted( Source $source )
  {
    //
  }

  /**
   * @param Source $source
   * @param [] $access
   * @return bool
   */
  protected function writeSourceAccess( $source, $access )
  {

    if( ! $source->auth ){
      $oldSourcePermission = SourcePermission::where( [
        [ 'source_id', $source->id ],
      ] )->get('id')->toArray();
      SourcePermission::destroy( $oldSourcePermission );

      $oldSourceRole = SourceRole::where( [
        [ 'source_id', $source->id ],
      ] )->get('id')->toArray();
      SourceRole::destroy( $oldSourceRole );
    } else {
      if ( ! isset( $access ) ) return true;
      foreach ( $access as $type => $permissions ) {
        if ( $type == 'permissions' ) {
          $permissions = array_map( function ( $permission ) {
            if ( isset( $permission['value'] ) ) {
              $permission = $permission['value'];
            }
            return $permission;
          }, $permissions );
          foreach ( $permissions as $permission ) {
            $permObj = Permission::find( $permission );
            if ( ! $permObj ) continue;
            $action = explode( '-', $permObj->name )[0] ?? null;
            $permissionData = [
              'source_id' => $source->id,
              'permission_id' => $permission,
              'type' => $action . '-' . $source->name
            ];
            $oldSourcePermission = SourcePermission::where( [
              [ 'source_id', $source->id ],
              [ 'permission_id', $permission ]
            ] );
            if ( $oldSourcePermission->first() ) {
              $sourcePermission = $oldSourcePermission;
              $permissionData['updated_at'] = Carbon::now();
              $sourcePermission->update( $permissionData );
            } else {
              $sourcePermission = new SourcePermission( $permissionData );
              $sourcePermission->save();
            }
          }
          $oldSourcePermissions = SourcePermission::where( [
            [ 'source_id', $source->id ]
          ] )->get();
          $deletePermissions = [];
          foreach ( $oldSourcePermissions as $oldSourcePermission ) {
            if ( ! in_array( $oldSourcePermission->permission_id, $permissions ) ) {
              $deletePermissions[] = $oldSourcePermission->id;
            }
          }
          SourcePermission::destroy( $deletePermissions );
        }
      }

      foreach ( $access as $type => $roles ) {
        if ( $type == 'roles' ) {
          $roles = array_map( function ( $role ) {
            if ( isset( $role['value'] ) ) {
              $role = $role['value'];
            }
            return $role;
          }, $roles );
          foreach ( $roles as $role ) {
            $roleObj = Role::find( $role );
            if ( ! $roleObj ) continue;
            $roleData = [
              'source_id' => $source->id,
              'role_id' => $role,
            ];

            $oldSourceRole = SourceRole::where( [
              [ 'source_id', $source->id ],
              [ 'role_id', $role ]
            ] );
            if ( $oldSourceRole->first() ) {
              $sourceRole = $oldSourceRole;
              $roleData['updated_at'] = Carbon::now();
              $sourceRole->update( $roleData );
            } else {
              $sourceRole = new SourceRole( $roleData );
              $sourceRole->save();
            }
          }
          $oldSourceRoles = SourceRole::where( [
            [ 'source_id', $source->id ]
          ] )->get();
          $deleteRoles = [];
          foreach ( $oldSourceRoles as $oldSourceRole ) {
            if ( ! in_array( $oldSourceRole->role_id, $roles ) ) {
              $deleteRoles[] = $oldSourceRole->id;
            }
          }
          SourceRole::destroy( $deleteRoles );
        }
      }
    }
    return true;
  }
}
