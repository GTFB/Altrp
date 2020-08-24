<?php


namespace App\Altrp\Generators;


use Illuminate\Database\Eloquent\Model;

class RepositoryGenerator extends AppGenerator
{
    protected $repoName;

    protected $repoStub;

    protected $repoInterfaceStub;

    protected $model;

    protected $data;

    public function __construct(Model $model, $data)
    {
        parent::__construct($data);
        $this->model = $model;
    }

    public function generate()
    {
        return true;
    }

    protected function getRepoInterfaceFile()
    {
        return app_path('/Repositories/AltrpRepositories/Interfaces/' . $this->model->name . '.php');
    }

    protected function getRepoFile()
    {
        return app_path('/Repositories/AltrpRepositories/Eloquent/'
            . "{$this->model->path}/{$this->model->name}" . '.php');
    }

    protected function getModelFile()
    {
        $modelFullName = $this->getModelFullName(
            $this->model->path,
            $this->model->name
        );

        return app_path("/{$modelFullName}.php");
    }

    protected function getModelFullName($modelPath, $modelName)
    {
        $fullModelFilename = isset($modelPath)
            ? trim(config('crudgenerator.user_models_folder') . "/{$modelPath}/{$modelName}", '/')
            : trim(config('crudgenerator.user_models_folder') . "/{$modelName}", '/');
        return $fullModelFilename;
    }

    protected function getModelNamespace()
    {
        return str_replace('/', '\\', $this->getModelFullName());
    }
}
