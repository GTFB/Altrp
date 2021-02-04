<?php


namespace App\Altrp\Generators\Notification;


class NotificationFileWriter
{
    protected $notification;

    /**
     * NotificationFileWriter constructor.
     * @param NotificationFile $notification
     */
    public function __construct(NotificationFile $notification) {
        $this->notification = $notification;
    }

    /**
     * Записать в файл
     * @return bool|int
     */
    public function write()
    {
        $stub = file($this->getObserverStub(), 2);
        $this->replaceModelNamespace($stub, $this->notification->getModel()->namespace)
            ->replaceModelName($stub, $this->notification->getModel()->name)
            ->replaceModelSingle($stub, strtolower($this->notification->getModel()->name));
        return $this->writeToFile($this->notification->getFile(), implode(PHP_EOL, $stub));
    }

    /**
     * Удалить файл
     * @return bool
     */
    public function remove()
    {
        if (file_exists($this->notification->getFile())) {
            unlink($this->notification->getFile());
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
     * Получить шаблон наблюдателя
     *
     * @return string
     */
    protected function getObserverStub()
    {
        return app_path('Altrp/Commands/stubs/notifications/create_notification.stub');
    }
}
