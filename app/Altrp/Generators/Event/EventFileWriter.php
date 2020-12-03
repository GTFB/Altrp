<?php


namespace App\Altrp\Generators\Event;


class EventFileWriter
{
    protected $event;

    /**
     * EventFileWriter constructor.
     * @param EventFile $eventFile
     */
    public function __construct(EventFile $eventFile) {
        $this->event = $eventFile;
    }

    /**
     * Записать в файл
     * @return bool|int
     */
    public function write()
    {
        $stub = file($this->getEventStub(), 2);
        $this->replaceModelNamespace($stub, $this->event->getModel()->namespace)
            ->replaceModelName($stub, $this->event->getModel()->name)
            ->replaceModelSingle($stub, strtolower($this->event->getModel()->name));
        return $this->writeToFile($this->event->getFile(), implode(PHP_EOL, $stub));
    }

    /**
     * Удалить файл
     * @return bool
     */
    public function remove()
    {
        if (file_exists($this->event->getFile())) {
            unlink($this->event->getFile());
        }
        return true;
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
     * Заменить на имя модели
     *
     * @param $stub
     * @param $modelName
     * @return $this
     */
    protected function replaceModelName(&$stub, $modelName)
    {
        $stub = str_replace('{{modelName}}', $modelName, $stub);
        return $this;
    }

    /**
     * Заменить на имя модели в нижнем регистре
     *
     * @param $stub
     * @param $modelSingle
     * @return $this
     */
    protected function replaceModelSingle(&$stub, $modelSingle)
    {
        $stub = str_replace('{{modelSingle}}', $modelSingle, $stub);
        return $this;
    }

    /**
     * Заменить на пространство имён модели
     *
     * @param $stub
     * @param $modelNamespace
     * @return $this
     */
    protected function replaceModelNamespace(&$stub, $modelNamespace)
    {
        $stub = str_replace('{{modelNamespace}}', $modelNamespace, $stub);
        return $this;
    }

    /**
     * Получить шаблон события
     *
     * @return string
     */
    protected function getEventStub()
    {
        return app_path('Altrp/Commands/stubs/events/create_event.stub');
    }
}
