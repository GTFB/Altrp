<?php


namespace App\Altrp\Generators\Request;


class RequestFileWriter
{
    /**
     * Создать / Записать в файл запроса
     *
     * @param RequestFile $request
     */
    public function write(RequestFile $request)
    {
        $stubContent = file($this->getRequestStub(), 2);
        $requestNamespace = rtrim(str_replace('/', '\\','\\'.$request->getModelPath()), '\\');
        $this->replaceRequestNamespace($stubContent, $requestNamespace)
            ->replaceRequestName($stubContent, $request->getName())
            ->replaceValidations($stubContent, $request->getValidations());
        return $this->writeToFile($request->getFile(), implode(PHP_EOL, $stubContent));
    }

    public function remove(RequestFile $request)
    {
        if (file_exists($request->getFile())) {
            unlink($request->getFile());
        }
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
            \File::makeDirectory($dir, 0775, true);
        }
        return \File::put($file, $content);
    }

    /**
     * Заменить пространство имён запроса
     *
     * @param $stubContent
     * @param $requestNamespace
     * @return $this
     */
    protected function replaceRequestNamespace(&$stubContent, $requestNamespace)
    {
        $stubContent = str_replace('{{requestNamespace}}', $requestNamespace, $stubContent);
        return $this;
    }

    /**
     * Заменить имя запроса
     *
     * @param $stubContent
     * @param $requestName
     * @return $this
     */
    protected function replaceRequestName(&$stubContent, $requestName)
    {
        $stubContent = str_replace('{{requestName}}', $requestName, $stubContent);
        return $this;
    }

    /**
     * Заменить список валидационных правил
     *
     * @param $stubContent
     * @param $validations
     * @return $this
     */
    protected function replaceValidations(&$stubContent, $validations)
    {
        $stubContent = str_replace('{{validations}}', $validations, $stubContent);
        return $this;
    }

    /**
     * Получить стаб файл репозитория
     *
     * @return string
     */
    protected function getRequestStub()
    {
        return app_path('Altrp/Commands/stubs/requests/create_request.stub');
    }
}
