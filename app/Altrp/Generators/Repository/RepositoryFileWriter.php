<?php


namespace App\Altrp\Generators\Repository;


use App\Exceptions\Repository\RepositoryFileException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use SebastianBergmann\CodeCoverage\Report\Xml\Source;

class RepositoryFileWriter
{
    /**
     * @var RepositoryFile
     */
    private $repository;

    /**
     * @var RepositoryInterfaceFile
     */
    private $repoInterface;

    /**
     * @var string
     */
    private $stub;

    /**
     * @var string
     */
    private $interfaceStub;

    /**
     * RepositoryFileWriter constructor.
     * @param RepositoryFile $repositoryFile
     * @param RepositoryInterfaceFile $repositoryInterfaceFile
     */
    public function __construct(RepositoryFile $repositoryFile, RepositoryInterfaceFile $repositoryInterfaceFile)
    {
        $this->repository = $repositoryFile;
        $this->repoInterface = $repositoryInterfaceFile;
        $this->stub = $this->getRepoStub();
        $this->interfaceStub = $this->getRepoInterfaceStub();
    }

    /**
     * Записать в файл репозитория
     */
    public function write()
    {
        $contentRepo = $this->getRepoContent();
        $contentRepoInterface = $this->getRepoInterfaceContent();
        $this->writeRepository($contentRepo);
        $this->writeRepoInterface($contentRepoInterface);
    }

    /**
     * Добавить метод в файл репозитория
     *
     * @param $name
     * @param $body
     * @return bool
     * @throws RepositoryFileException
     */
    public function addMethod($name, $body)
    {
        $contentRepo = $this->getRepoContent();
        if (Str::contains($this->repository->getMethods(), 'public function ' . $name . '()')) {
            throw new RepositoryFileException('Method already exists in repository', 500);
        }
        $contentRepoInterface = $this->getRepoInterfaceContent();
        if (Str::contains($this->repoInterface->getMethods(), 'public function ' . $name . '()')) {
            throw new RepositoryFileException('Method already exists in repository interface', 500);
        }
        $this->repository->addMethods($body);
        $this->repoInterface->addMethods("public function $name();\n");
        $this->replaceCustomMethods($contentRepo,$this->repository->getMethods());
        $this->replaceCustomMethods($contentRepoInterface,$this->repoInterface->getMethods());
        $this->writeRepository($contentRepo);
        $this->writeRepoInterface($contentRepoInterface);
        $this->writeToServiceProvider();
        return true;
    }

    /**
     * Удалить метод из репозитория
     *
     * @param $name
     * @return bool|int
     * @throws RepositoryFileException
     */
    public function removeMethodFromRepository($name)
    {
        $repoFile = $this->repository->getFile();
        if (! file_exists($repoFile)) {
            return true;
        }
        $contentRepo = file($repoFile, 2);
        if ($line = $this->repoMethodExists($contentRepo, $name)) {
            try {
                if (!Str::contains($contentRepo[$line-1],'CUSTOM_METHODS_BEGIN')) {
                    $line = $line - 1;
                }
                for ($i = $line; true; $i++) {
                    if (preg_match('/^ {4}}( *)$|^ {2}}( *)$|^\t}( *)$/', $contentRepo[$i])) {
                        unset($contentRepo[$i]);
                        break;
                    }
                    unset($contentRepo[$i]);
                }
            } catch (\Exception $e) {
                dd($e);
            }

        }
        return \File::put(
            $repoFile,
            implode(PHP_EOL,$contentRepo)
        );
    }

    /**
     * Удалить метод из файла интерфейса репоситория
     *
     * @param $name
     * @return bool|int
     * @throws RepositoryFileException
     */
    public function removeMethodFromRepoInterface($name)
    {
        $repoInterfaceFile = $this->repoInterface->getFile();
        if (! file_exists($repoInterfaceFile)) {
            return true;
        }
        $contentRepoInterface = file($repoInterfaceFile, 2);
        if ($line = $this->repoMethodExists($contentRepoInterface, $name)) {
            unset($contentRepoInterface[$line]);
        }
        return \File::put(
            $repoInterfaceFile,
            implode(PHP_EOL,$contentRepoInterface)
        );
    }

    /**
     * Проверить, существует ли метод в репозитории
     * вернуть номер строки, на которой он найден
     *
     * @param $contents
     * @param $methodName
     * @return bool|int|string
     */
    protected function repoMethodExists($contents, $methodName)
    {
        foreach ($contents as $line => $content) {
            if (Str::contains($content, 'public function ' . $methodName . '(')
                || Str::contains($content, 'protected function ' . $methodName . '(')) {
                return $line;
            }
        }
        return false;
    }

    /**
     * Получить содержимое файла репозитория
     *
     * @return array|false
     */
    protected function getRepoContent()
    {
        $stubContent = file($this->stub, 2);
        $this->replaceModelName($stubContent, $this->repository->getModelName())
            ->replaceModelNamespace($stubContent, $this->repository->getModelNamespace())
            ->replaceRepoNamespace($stubContent, $this->repository->getNamespace());
        if (file_exists($this->repository->getFile())) {
            $repoFile = file($this->repository->getFile());
            $this->repository->addMethods(trim($this->getFileMethods($repoFile), "    \n\r"));
        }
        return $stubContent;
    }

    /**
     * Получить содержимое файла интерфейса репозитория
     *
     * @return array|false
     */
    protected function getRepoInterfaceContent()
    {
        $stubContent = file($this->interfaceStub, 2);
        $this->replaceModelName($stubContent, $this->repoInterface->getModelName())
            ->replaceRepoInterfaceNamespace(
                $stubContent,
                $this->repoInterface->getNamespace()
            );
        if (file_exists($this->repoInterface->getFile())) {
            $repoFile = file($this->repoInterface->getFile());
            $this->repoInterface->addMethods(trim($this->getFileMethods($repoFile),"    \n\r"));
        }
        return $stubContent;
    }

    /**
     * Записать в файл репозитория контент
     *
     * @param $content
     * @return false|int
     */
    public function writeRepository($content)
    {
        return $this->writeToFile(
            $this->repository->getFile(),
            implode(PHP_EOL,$content)
        );
    }

    /**
     * Записать в файл интерфейса репозитория контент
     *
     * @param $content
     * @return false|int
     */
    public function writeRepoInterface($content)
    {
        return $this->writeToFile(
            $this->repoInterface->getFile(),
            implode(PHP_EOL,$content)
        );
    }

    /**
     * Записать контент в файл
     *
     * @param $file
     * @param $content
     * @return bool|int
     */
    protected function writeToFile($file, $content)
    {
        $path = explode('/', $file);
        array_pop($path);
        $dir = implode('/', $path);

        if(! \File::exists($dir)) {
            \File::makeDirectory($dir, 493, true);
        }
        return \File::put($file, $content);
    }



    /**
     * Записать в сервис провайдер интерфейс репозитория и репозиторий
     */
    protected function writeToServiceProvider()
    {
        $serviceProviderFile = $this->getRepoServiceProvider();

        $serviceProviderContent = file($serviceProviderFile, 2);
        if(! $this->existsInServiceProvider($serviceProviderContent)) {
            foreach ($serviceProviderContent as $line => $content) {
                if (Str::contains($content, 'public function register()')) {
                    array_splice(
                        $serviceProviderContent,
                        $line + 2,
                        0,
                        $this->getBindRepo()
                    );
                    break;
                }
            }
            file_put_contents(
                $this->getRepoServiceProvider(),
                implode(PHP_EOL, $serviceProviderContent)
            );
        }
    }

    /**
     * Формаирует связывающий метод репозитория для сервис провайдера
     *
     * @return string
     */
    protected function getBindRepo()
    {
        return '        $this->app->bind(\\' .
        str_replace('\\\\', '\\', $this->repoInterface->getNamespace()
         . '\\' . $this->repoInterface->getModelName()) . 'RepositoryInterface::class, '
         . '\\' . str_replace('\\\\', '\\', $this->repository->getNamespace()
         . '\\' . $this->repoInterface->getModelName()) . 'Repository::class);' . "\n";
    }

    /**
     * Проверить, прописаны ли в сервис провайдере классы репозитория
     *
     * @param $serviceProviderContent
     * @return bool
     */
    protected function existsInServiceProvider($serviceProviderContent)
    {
        foreach ($serviceProviderContent as $line => $content) {
            if (Str::contains($content, $this->repository->getModelName() . 'Repository')
                && Str::contains($content, $this->repository->getModelName() . 'RepositoryInterface')
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Получить уже существующие в файле методы
     *
     * @param $file
     * @return string
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
        return implode('', $methods);
    }

    /**
     * Заменить имя модели в стаб контенте
     *
     * @param $stubContent
     * @param $modelName
     * @return $this
     */
    protected function replaceModelName(&$stubContent, $modelName)
    {
        $stubContent = str_replace('{{modelName}}', $modelName, $stubContent);
        return $this;
    }

    /**
     * Заменить пространство имен модели в стаб контенте
     *
     * @param $stubContent
     * @param $modelNamespace
     * @return $this
     */
    protected function replaceModelNamespace(&$stubContent, $modelNamespace)
    {
        $stubContent = str_replace('{{modelNamespace}}', $modelNamespace, $stubContent);
        return $this;
    }

    /**
     * Заменить пространство имён репозитория в стаб контенте
     *
     * @param $stubContent
     * @param $repoNamespace
     * @return $this
     */
    protected function replaceRepoNamespace(&$stubContent, $repoNamespace)
    {
        $stubContent = str_replace('{{repoNamespace}}', $repoNamespace, $stubContent);
        return $this;
    }

    /**
     * Заменить пространство имён интерфейса репозитория в стаб контенте
     *
     * @param $stubContent
     * @param $repoInterfaceNamespace
     * @return $this
     */
    protected function replaceRepoInterfaceNamespace(&$stubContent, $repoInterfaceNamespace)
    {
        $stubContent = str_replace(
            '{{repoInterfaceNamespace}}',
            $repoInterfaceNamespace,
            $stubContent
        );
        return $this;
    }

    /**
     * Заменить пользовательские методы в стаб контенте
     *
     * @param $stubContent
     * @param $methods
     * @return $this
     */
    protected function replaceCustomMethods(&$stubContent, $methods)
    {
        $stubContent = str_replace('{{customMethods}}', $methods, $stubContent);
        return $this;
    }

    /**
     * Получить стаб файл репозитория
     *
     * @return string
     */
    protected function getRepoStub()
    {
        return app_path('Altrp/Commands/stubs/repositories/create_repository.stub');
    }

    /**
     * Получить стаб файл интерфейса репозитория
     *
     * @return string
     */
    protected function getRepoInterfaceStub()
    {
        return app_path('Altrp/Commands/stubs/repositories/create_repository_interface.stub');
    }

    /**
     * Получить файл сервис провайдера репозиториев
     *
     * @return string
     */
    protected function getRepoServiceProvider()
    {
        return app_path('Providers/AltrpRepositoryServiceProvider.php');
    }

    protected function getRepoServiceProviderStub()
    {
        return app_path('Altrp/Commands/stubs/altrp_repository_service_provider.stub');
    }
}
