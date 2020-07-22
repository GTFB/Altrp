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
        if (! $result) throw new ControllerFileException('Failed to write method to tje controller', 500);
        return true;
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
    protected function methodExists($controllerContent, $methodName)
    {
        foreach ($controllerContent as $line => $content) {
            if (Str::contains($content, 'public function ' . $methodName . '(')
                || Str::contains($content, 'protected function ' . $methodName . '(')) {
                return true;
            }
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

    /**
     * Получить стаб файл для создания метода в контроллере
     *
     * @return string
     */
    protected function getControllerMethodStub()
    {
        return app_path('Altrp/Commands/stubs/controllers/create_controller_method.stub');
    }
}
