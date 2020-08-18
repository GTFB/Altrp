<?php


namespace App\Altrp\Generators\Controller;


use App\Altrp\Generators\Repository\RepositoryFile;
use App\Altrp\Generators\Repository\RepositoryInterfaceFile;
use App\Exceptions\Controller\ControllerFileException;
use Illuminate\Support\Str;

class ControllerFileWriter
{
    /**
     * @var ControllerFile
     */
    protected $controller;

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
        $methods = array_merge($this->getFileMethods($controllerContent), [''],$methodContent);
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
     * @return bool|int
     * @throws ControllerFileException
     */
    public function removeMethod($methodName)
    {
        $controllerFile = $this->controller->getFile();
        if (! file_exists($controllerFile)) {
            throw new ControllerFileException('Controller file not found', 500);
        }
        $controllerContent = file($controllerFile, 2);
        if ($line = $this->methodExists($controllerContent, $methodName)) {
            for ($i = $line; true; $i++) {
                if (Str::contains($controllerContent[$i], '}')) {
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
     * Добавить Sql метод
     *
     * @param $name
     * @param $sql
     * @return bool
     */
    public function writeSqlMethod($name, $sql)
    {
        $methodContent = file($this->getSqlControllerMethodStub(), 2);
        $this->replaceSqlEditorName($methodContent, $name)
            ->replaceModelName($methodContent, $this->controller->getModelName())
            ->replaceSqlEditorSql($methodContent, $sql);
        $controllerContent = file($this->controller->getFile(), 2);
        $result = $this->writeMethods($controllerContent, $methodContent);
        return $result;
    }

    /**
     * Обновить SQl метод
     *
     * @param $oldName
     * @param $name
     * @param $sql
     * @return bool
     */
    public function updateSqlMethod($oldName, $name, $sql)
    {
        $controllerContent = file($this->controller->getFile(), 2);
        $this->removeMethod($controllerContent, $oldName);
        $this->writeSqlMethod($name, $sql);
        return true;
    }

    public function deleteSqlMethod($name)
    {
        $controllerContent = file($this->controller->getFile(), 2);
        return $this->removeMethod($controllerContent, $name);
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
     * @return bool
     */
    protected function writeMethods($controllerContent, $methodContent)
    {
        foreach ($controllerContent as $line => $content) {
            if (Str::contains($content, 'CUSTOM_METHODS_END')) {
                if (! $methodContent) break;
                array_splice($controllerContent, $line, 0, "");
                foreach ($methodContent as $l => $c) {
                    array_splice($controllerContent, $line + 1 + $l, 0, $c);
                }
            }
        }
        return file_put_contents(
            $this->controller->getFile(),
            implode(PHP_EOL,$controllerContent)
        ) !== false;
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

    protected function replaceSqlEditorName(&$methodContent, $sqlEditorName)
    {
        $methodContent = str_replace('{{sqlEditorName}}', $sqlEditorName, $methodContent);
        return $this;
    }

    protected function replaceSqlEditorSql(&$methodContent, $sqlEditorSql)
    {
        $methodContent = str_replace('{{sqlEditorSql}}', $sqlEditorSql, $methodContent);
        return $this;
    }

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
}
