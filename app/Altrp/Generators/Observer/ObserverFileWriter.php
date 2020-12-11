<?php


namespace App\Altrp\Generators\Observer;


use App\Altrp\Model;
use Illuminate\Support\Str;

class ObserverFileWriter
{
    protected $observer;

    /**
     * ObserverFileWriter constructor.
     * @param ObserverFile $observerFile
     */
    public function __construct(ObserverFile $observerFile) {
        $this->observer = $observerFile;
    }

    /**
     * Записать в файл
     * @return bool|int
     */
    public function write()
    {
        $stub = file($this->getObserverStub(), 2);
        $this->replaceModelNamespace($stub, $this->observer->getModel()->namespace)
            ->replaceModelName($stub, $this->observer->getModel()->name)
            ->replaceModelSingle($stub, strtolower($this->observer->getModel()->name));
        return $this->writeToFile($this->observer->getFile(), implode(PHP_EOL, $stub));
    }

    /**
     * Удалить файл
     * @return bool
     */
    public function remove()
    {
        if (file_exists($this->observer->getFile())) {
            unlink($this->observer->getFile());
        }
        return true;
    }

    /**
     * Записать наблюдателей в сервис провайдер
     * @return bool|int
     */
    public function writeToServiceProvider()
    {
        $stubsArr = [];
        $sProviderPath = base_path(config('altrp.admin.service_providers_path') . '/AppServiceProvider.php');
        $sProviderFile = file($this->getProviderStub(), 2);
        $models = Model::select('name')->where('preset', 0)->get();
        foreach ($models as $model) {
            $stub = file_get_contents($this->getProviderMethodStub());
            $this->replaceModelName($stub, $model->name);
            $stubsArr[] = $stub;
        }

        foreach ($sProviderFile as $line => $content) {
            if (Str::contains($content, 'public function boot()')) {
                $startPos = $line + 2;
                foreach ($stubsArr as $index => $item) {
                    $item = '        ' . $item;
                    array_splice($sProviderFile, $startPos + $index, 0, $item);
                }
                break;
            }
        }

        return $this->writeToFile($sProviderPath, implode(PHP_EOL, $sProviderFile));
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
        return app_path('Altrp/Commands/stubs/observers/create_observer.stub');
    }

    /**
     * Получить шаблон метода в сервис провайдере
     *
     * @return string
     */
    protected function getProviderMethodStub()
    {
        return app_path('Altrp/Commands/stubs/providers/create_provider_method.stub');
    }

    /**
     * Получить шаблон сервис провайдера
     *
     * @return string
     */
    protected function getProviderStub()
    {
        return app_path('Altrp/Commands/stubs/providers/create_altrp_app_service_provider.stub');
    }
}
