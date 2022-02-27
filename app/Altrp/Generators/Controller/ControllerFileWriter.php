<?php


namespace App\Altrp\Generators\Controller;


use App\Altrp\Builders\Traits\DynamicVariables;
use App\Altrp\Customizer;
use App\Altrp\Robot;
use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Exceptions\Controller\ControllerFileException;
use Illuminate\Support\Str;

class ControllerFileWriter
{
    use DynamicVariables;
    /**
     * @var ControllerFile
     */
    protected $controller;

    /**
     * @var string
     */
    protected $controllerFile;

    /**
     * @var array
     */
    protected $controllerContent;

    /**
     * @var RepositoryFile
     */
    protected $repository;

    /**
     * @var RepositoryInterfaceFile
     */
    protected $repoInterface;

    /**
     * ControllerFileWriter constructor.
     * @param ControllerFile $controller
     * @param RepositoryFile $repositoryFile
     * @param RepositoryInterfaceFile $repositoryInterfaceFile
     */
    public function __construct(ControllerFile $controller,
        RepositoryFile $repositoryFile,
        RepositoryInterfaceFile $repositoryInterfaceFile
    ) {
        $this->controller = $controller;
        $this->repository = $repositoryFile;
        $this->repoInterface = $repositoryInterfaceFile;
        $this->controllerFile = $this->controller->getFile();
        $this->controllerContent = file($this->controllerFile, 2);
    }

    /**
     * Добавить метод в файл контроллера
     *
     * @param $methodName
     * @return bool
     * @throws ControllerFileException
     */
    public function addMethod($methodName)
    {
        $methodContent = file($this->getControllerMethodStub(), 2);

        $this->replaceMethodName($methodContent, $methodName)
            ->replaceModelName($methodContent, $this->repository->getModelName())
            ->replaceRepoInterface(
                $methodContent,
                $this->repository->getModelName() . 'RepositoryInterface'
            )
            ->replaceRepo(
                $methodContent,
                Str::camel(Str::singular($this->repository->getModelName())) . 'Repo'
            )
            ->replaceResource(
                $methodContent,
                Str::camel(Str::plural($this->repository->getModelName()))
            );

        $controllerContent = file($this->controller->getFile(), 2);
//        $methods = array_merge($this->getFileMethods($controllerContent), [''],$methodContent);
        if ($this->methodExists($controllerContent, $methodName)) {
            throw new ControllerFileException('Method already exists!', 500);
        }
        $repoNamespace = 'use ' . trim($this->repoInterface->getNamespace(), '\\') . '\\'
            . $this->repoInterface->getModelName() . 'RepositoryInterface;';

        if ($this->namespaceExists($controllerContent, $repoNamespace)) {
            $repoNamespace = null;
        }

        $result = $this->writeNamespaces($controllerContent, [$repoNamespace])
                    ->writeMethods($controllerContent, $methodContent);
        if (! $result) throw new ControllerFileException('Failed to write method to the controller', 500);
        return true;
    }

    /**
     * Удалить метод из контроллера
     *
     * @param $methodName
     * @param string $startBlockName
     * @return bool|int
     * @throws ControllerFileException
     */
    public function removeMethod($methodName, $startBlockName = 'CUSTOM_METHODS_BEGIN')
    {
        $controllerFile = $this->controller->getFile();
        if (! file_exists($controllerFile)) {
            throw new ControllerFileException('Controller file not found', 500);
        }
        $controllerContent = file($controllerFile, 2);
        if ($line = $this->methodExists($controllerContent, $methodName)) {
            if (!Str::contains($controllerContent[$line-1], $startBlockName)) {
                $line = $line - 1;
            }
            for ($i = $line; true; $i++) {
                if (preg_match('/^ {4}}( *)$|^ {2}}( *)$|^\t}( *)$/', $controllerContent[$i])) {
                    unset($controllerContent[$i]);
                    break;
                }
                unset($controllerContent[$i]);
            }
        }
        return \File::put(
            $controllerFile,
            implode(PHP_EOL,$controllerContent)
        );
    }

    /**
     * Обновить метод
     *
     * @param $oldMethodName
     * @param $newMethodName
     * @return bool
     * @throws ControllerFileException
     */
    public function updateMethod($oldMethodName, $newMethodName)
    {
        $this->removeMethod($oldMethodName);
        $this->addMethod($newMethodName);
        return true;
    }

    /**
     * Обновить метод удаленного источника данных
     *
     * @param $oldMethodName
     * @param $source
     * @return bool
     * @throws ControllerFileException
     */
    public function updateSourceMethod($oldMethodName, $source)
    {
        $this->removeMethod($oldMethodName);
        $this->writeDataSourceMethod($source);
        return true;
    }

    /**
     * Записать метод удаленного источника данных
     *
     * @param $source
     * @return bool
     */
    public function writeDataSourceMethod($source)
    {
        $headers = $this->getSourceHeaders($source);
        $methodContent = $this->getDataSourceMethodContent($source->request_type);
        $this->replaceMethodName($methodContent, $source->name)
            ->replaceUrl($methodContent, $source->url)
            ->replaceHeaders($methodContent, $headers);
        $controllerContent = file($this->controller->getFile(), 2);
        $result = $this->writeMethods($controllerContent, $methodContent);
        return $result;
    }

    /**
     * Получить и сформировать заголовки
     * @param $source
     * @return string
     */
    protected function getSourceHeaders($source)
    {
        $headers = $source->headers;
        $headersStr = '[';
        if ($headers) {
            foreach ($headers as $headerKey => $headerValue) {
                $headerValue = is_numeric($headerValue) ? $headerValue : "\"{$headerValue}\"";
                $headersStr .= "\"{$headerKey}\" => " . $this->replaceDynamicVars($headerValue, 1) . ",";
            }
        }
        $headersStr = trim($headersStr, ',');
        $headersStr .= ']';
        return $headersStr;
    }

    /**
     * Добавить Sql метод
     *
     * @param $name
     * @param $sql
     * @param $is_object
     * @return bool
     */
    public function writeSqlMethod($name, $sql, $is_object)
    {
        $methodContent = file($this->getSqlControllerMethodStub(), 2);
        $this->replaceSqlEditorName($methodContent, $name)
            ->replaceModelName($methodContent, $this->controller->getModelName())
            ->replaceSqlEditorSql($methodContent, $sql)
            ->replaceTableName( $methodContent, $this->controller->getTableName() )
            ->replaceSqlEditorIsObject($methodContent, $is_object);

        $controllerContent = file($this->controller->getFile(), 2);
        return $this->writeMethods($controllerContent, $methodContent, 'SQL_EDITORS_END');
    }

    /**
     * Обновить SQl метод
     *
     * @param $oldName
     * @param $name
     * @param $sql
     * @param $is_object
     * @return bool
     * @throws ControllerFileException
     */
    public function updateSqlMethod($oldName, $name, $sql, $is_object)
    {
        $this->removeMethod($oldName, 'SQL_EDITORS_BEGIN');
        $this->writeSqlMethod($name, $sql, $is_object);
        return true;
    }

    /**
     * Удалить sql метод
     *
     * @param $name
     * @return bool|int
     * @throws ControllerFileException
     */
    public function deleteSqlMethod($name)
    {
        return $this->removeMethod($name, 'SQL_EDITORS_BEGIN');
    }

    /**
     * Проверить, существует ли sql-метод для редактора
     *
     * @param $methodName
     * @return bool
     */
    public function methodSqlExists($methodName)
    {
        $controllerContent = file($this->controller->getFile(), 2);
        return $this->methodExists($controllerContent, $methodName);
    }

    /**
     * Проверить, существует ли метод удаленного источника данных
     *
     * @param $methodName
     * @return bool
     */
    public function methodSourceExists($methodName)
    {
        return $this->methodExists($this->controllerContent, $methodName);
    }

    /**
     * Проверить, существует ли следующее пространство имён в файле контроллера
     *
     * @param $controllerContent
     * @param $namespace
     * @return bool
     */
    protected function namespaceExists($controllerContent, $namespace)
    {
        foreach ($controllerContent as $line => $content) {
            if (Str::contains($content, $namespace)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Проверить, существует ли следующий метод в файле контроллера
     *
     * @param $controllerContent
     * @param $methodName
     * @return bool
     */
    public function methodExists($controllerContent, $methodName)
    {
        foreach ($controllerContent as $line => $content) {
            if (Str::contains($content, 'public function ' . $methodName . '(')
                || Str::contains($content, 'protected function ' . $methodName . '(')) {
                return $line;
            }
        }
        return false;
    }

    /**
     * Проверить, существует ли метод в контроллере
     *
     * @param $methodName
     * @return bool
     */
    public function checkMethodExists($methodName)
    {
        $controllerContent = file($this->controller->getFile(), 2);
        if ($this->methodExists($controllerContent, $methodName)) {
            return true;
        }
        return false;
    }

    /**
     * Записать пространсво имён в файл контроллера
     *
     * @param $controllerContent
     * @param $namespaces
     * @return $this
     */
    protected function writeNamespaces(&$controllerContent, $namespaces)
    {
        foreach ($controllerContent as $line => $content) {
            if (Str::contains($content, 'CUSTOM_NAMESPACES_END')) {
                if (! $namespaces || $namespaces[0] == null) break;
                foreach ($namespaces as $l => $c) {
                    array_splice($controllerContent, $line + $l, 0, $c);
                }
            }
        }
        return $this;
    }

    /**
     * Записать метод в файл контроллера
     *
     * @param $controllerContent
     * @param $methodContent
     * @param string $blockName
     * @return bool
     */
    protected function writeMethods($controllerContent, $methodContent, $blockName = 'CUSTOM_METHODS_END')
    {
        foreach ($controllerContent as $line => $content) {
            if (Str::contains($content, $blockName)) {


                if (! $methodContent) break;
                array_splice($controllerContent, $line, 0, "");

                //dd($controllerContent);

                foreach ($methodContent as $l => $c) {
                    array_splice($controllerContent, $line + 1 + $l, 0, $c);
                }
            }
        }
        //dd($controllerContent);
        return file_put_contents(
            $this->controller->getFile(),
            implode(PHP_EOL,$controllerContent)
        ) !== false;
    }

  /**
   * @param Customizer $customizer
   */
  public function writeCustomizerMethod( Customizer $customizer )
  {
    $methodContent = $customizer->getMethodContent();
    $methodContent = explode( PHP_EOL, $methodContent );
    $controllerContent = file($this->controller->getFile(), 2);
    return $this->writeMethods($controllerContent, $methodContent, 'CUSTOMIZERS_METHODS_END');
  }

  /**
   * @param Robot $robot
   */
  public function writeRobotMethod( Robot $robot )
  {
    $methodContent = $robot->getWebhookContent();
    $methodContent = explode( PHP_EOL, $methodContent );
    $controllerContent = file($this->controller->getFile(), 2);
    $namespaces = [
      "use App\\Helpers\\Classes\\CurrentEnvironment;",
      "use App\\Jobs\\RunRobotsJob;",
      "use App\\Services\Robots\\RobotsService;",
      "use Illuminate\\Foundation\\Bus\\DispatchesJobs;",
      "use App\\Services\\Robots\\Repositories\\RobotsRepository;",
    ];
    foreach ($namespaces as $key => $value) {
      if (!$this->namespaceExists($controllerContent, $value)) {
        $this->writeNamespaces($controllerContent, [$value]);
      }
    }  
    return $this->writeMethods($controllerContent, $methodContent, 'CUSTOMIZERS_METHODS_END');
  }

  /**
     * Получить уже существующие в файле методы
     *
     * @param $file
     * @return array
     */
    protected function getFileMethods($file)
    {
        $methods = [];
        foreach ($file as $line => $content) {
            if (Str::contains($content, 'CUSTOM_METHODS')) {
                for ($i = $line + 1; true; $i++) {
                    if (Str::contains($file[$i], 'CUSTOM_METHODS')) break;
                    $methods[] = $file[$i];
                }
                break;
            }
        }
        if($methods[0] == "") return [];
        return $methods;
    }

    /**
     * Получить все существующие пространства имён в файле
     *
     * @param $file
     * @return array
     */
    protected function getFileNamespaces($file)
    {
        $namespaces = [];
        foreach ($file as $line => $content) {
            if (Str::contains($content, 'CUSTOM_NAMESPACES')) {
                for ($i = $line + 1; true; $i++) {
                    if (Str::contains($file[$i], 'CUSTOM_NAMESPACES')) break;
                    $namespaces[] = $file[$i];
                }
                break;
            }
        }
        if($namespaces[0] == "") return [];
        return $namespaces;
    }

    /**
     * Заменить имя метода в стаб файле
     *
     * @param $methodContent
     * @param $methodName
     * @return $this
     */
    protected function replaceMethodName(&$methodContent, $methodName)
    {
        $methodContent = str_replace('{{methodName}}', $methodName, $methodContent);
        return $this;
    }

    /**
     * Заменить интерфейс репозитория в стаб файле
     *
     * @param $methodContent
     * @param $repoInterface
     * @return $this
     */
    protected function replaceRepoInterface(&$methodContent, $repoInterface)
    {
        $methodContent = str_replace('{{repoInterface}}', $repoInterface, $methodContent);
        return $this;
    }

    /**
     * Заменить переменную итерфейса репозитория в стаб файле
     *
     * @param $methodContent
     * @param $repo
     * @return $this
     */
    protected function replaceRepo(&$methodContent, $repo)
    {
        $methodContent = str_replace('{{repo}}', $repo, $methodContent);
        return $this;
    }

    /**
     * Заменить имя ресурса в стаб файле
     *
     * @param $methodContent
     * @param $resource
     * @return $this
     */
    protected function replaceResource(&$methodContent, $resource)
    {
        $methodContent = str_replace('{{resource}}', $resource, $methodContent);
        return $this;
    }

    /**
     * Заменить имя метода для sql editor
     *
     * @param $methodContent
     * @param $sqlEditorName
     * @return $this
     */
    protected function replaceSqlEditorName(&$methodContent, $sqlEditorName)
    {
        $methodContent = str_replace('{{sqlEditorName}}', $sqlEditorName, $methodContent);
        return $this;
    }

    /**
     * Заменить sql в sql editor
     *
     * @param $methodContent
     * @param $sqlEditorSql
     * @return $this
     */
    protected function replaceSqlEditorSql(&$methodContent, $sqlEditorSql)
    {
        $methodContent = str_replace('{{sqlEditorSql}}', $sqlEditorSql, $methodContent);
        return $this;
    }

    /**
     * Заменить данные, которые пришли запросом
     *
     * @param $methodContent
     * @param $data
     * @return $this
     */
    protected function replaceData(&$methodContent, $data)
    {
        $methodContent = str_replace('{{data}}', $data, $methodContent);
        return $this;
    }

    /**
     * Заменить ссылку
     *
     * @param $methodContent
     * @param $url
     * @return $this
     */
    protected function replaceUrl(&$methodContent, $url)
    {
        $methodContent = str_replace('{{url}}', $url, $methodContent);
        return $this;
    }

    /**
     * Заменить заголовки
     *
     * @param $methodContent
     * @param $headers
     * @return $this
     */
    protected function replaceHeaders(&$methodContent, $headers)
    {
        $methodContent = str_replace('{{headers}}', $headers, $methodContent);
        return $this;
    }

    /**
     * Заменить представление sql editor как объекта
     *
     * @param $methodContent
     * @param $sqlEditorIsObject
     * @return $this
     */
    protected function replaceSqlEditorIsObject(&$methodContent, $sqlEditorIsObject)
    {
        $code = "";
        if($sqlEditorIsObject) {
            $code =  implode(PHP_EOL,file($this->getIsObjectConditionStub(), 2));
        }
        $methodContent = str_replace('{{sqlEditorIsObject}}', $code, $methodContent);
        return $this;
    }

    /**
     * Заменить на имя таблицы
     *
     * @param $methodContent
     * @param $tableName
     * @return $this
     */
    protected function replaceTableName(&$methodContent, $tableName)
    {
        $methodContent = str_replace('{{tableName}}', $tableName, $methodContent);
        return $this;
    }

    /**
     * Заменить на имя модели
     *
     * @param $methodContent
     * @param $modelName
     * @return $this
     */
    protected function replaceModelName(&$methodContent, $modelName)
    {
        $methodContent = str_replace('{{modelName}}', $modelName, $methodContent);
        return $this;
    }

    /**
     * Получить стаб файл для создания метода в контроллере
     *
     * @return string
     */
    protected function getControllerMethodStub()
    {
        return app_path('Altrp/Commands/stubs/controllers/create_controller_method.stub');
    }

    /**
     * Получить стаб файл для создания sql метода в контроллере
     *
     * @return string
     */
    protected function getSqlControllerMethodStub()
    {
        return app_path('Altrp/Commands/stubs/controllers/create_sql_controller_method.stub');
    }

    /**
     * Получить стаб файл для создания проверки и возвраении объекта
     *
     * @return string
     */
    protected function getIsObjectConditionStub()
    {
        return app_path('Altrp/Commands/stubs/controllers/create_is_object_condition.stub');
    }

    /**
     * Получить шаблон содержащий тело метода источника данных для получения
     *
     * @return string
     */
    protected function getSourceGetMethodStub()
    {
        return app_path('Altrp/Commands/stubs/sources/get_data_source_method.stub');
    }

    /**
     * Получить шаблон содержащий тело метода источника данных для создания
     *
     * @return string
     */
    protected function getSourcePostMethodStub()
    {
        return app_path('Altrp/Commands/stubs/sources/post_data_source_method.stub');
    }

    /**
     * Получить шаблон содержащий тело метода источника данных для обновления
     *
     * @return string
     */
    protected function getSourcePutMethodStub()
    {
        return app_path('Altrp/Commands/stubs/sources/put_data_source_method.stub');
    }

    /**
     * Получить шаблон содержащий тело метода источника данных для удаления
     *
     * @return string
     */
    protected function getSourceDeleteMethodStub()
    {
        return app_path('Altrp/Commands/stubs/sources/delete_data_source_method.stub');
    }

    /**
     * Получить содержимое метода источника данных в зависимости от типа запроса
     *
     * @param $type
     * @return array|false
     */
    protected function getDataSourceMethodContent($type)
    {
        $file = null;
        switch ($type) {
            case 'get':
                $file = $this->getSourceGetMethodStub();
                break;
            case 'post':
                $file = $this->getSourcePostMethodStub();
                break;
            case 'put':
                $file = $this->getSourcePutMethodStub();
                break;
            case 'delete':
                $file = $this->getSourceDeleteMethodStub();
                break;
            default:
                $file = $this->getSourceGetMethodStub();
        }
        return file($file,2);
    }

    protected function getRequestParamsAssoc($url)
    {
        $parts = explode('?', $url);
        $uri = $parts[1] ?? '';
        if (!$uri) return [];
        $requestParamsAssoc = [];
        $params = explode('&', $uri);
        foreach ($params as $param) {
            $param = explode('=', $param);
            $requestParamsAssoc[$param[0]] = $param[1];
        }
        return $requestParamsAssoc;
    }

}
