<?php


namespace App\Altrp\Generators;


abstract class BaseFileWriter
{
    public function __construct()
    {

    }

    public function getStubFile($filename)
    {
        return app_path($filename);
    }

    /**
     * Записать контент в файл
     *
     * @param $file
     * @param $content
     * @return bool|int
     */
    public function writeToFile($file, $content)
    {
        $path = explode('/', $file);
        array_pop($path);
        $dir = implode('/', $path);

        if(! \File::exists($dir)) {
            \File::makeDirectory($dir, 0775, true);
        }
        return \File::put($file, $content);
    }

    protected function getStubFileContent($filename)
    {
        return file($filename, 2);
    }
}
