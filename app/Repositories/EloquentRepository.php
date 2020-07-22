<?php


namespace App\Repositories;


use Illuminate\Database\Eloquent\Model;

abstract class EloquentRepository implements EloquentRepositoryInterface
{
    /**
     * @var \Illuminate\Contracts\Foundation\Application|mixed
     */
    protected $model;

    /**
     * Repository constructor.
     */
    public function __construct()
    {
        $this->model = app($this->getModelClass());
    }

    /**
     * @return Model
     */
    protected function model()
    {
        return clone $this->model;
    }

    /**
     * Get all records
     *
     * @return mixed
     */
    public function getAll()
    {
        return $this->model()->all();
    }

    /**
     * Find record by ID
     *
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->model()->find($id);
    }
}
