<?php

namespace App\Repositories\AltrpRepositories\Eloquent;

use App\AltrpModels\Point as Model;
use App\Repositories\AltrpRepositories\Interfaces\PointRepositoryInterface;
use App\Repositories\Repository;

class PointRepository extends Repository implements PointRepositoryInterface
{
    protected function getModelClass()
    {
        return Model::class;
    }

    // CUSTOM_METHODS_BEGIN
    public function getFalsePoints()
    {
        return $this->model()
            ->select(['id','name','long_name','user_id'])
            ->where([['is_point','=','1']])
            ->with(['user'])
            ->orderBy('name', 'desc')
            ->get();
    }

    public function getUserPoints()
    {
        return $this->model()
            ->select(['id','name','long_name','user_id'])
            ->where([['user_id','=','REQUEST:USER']])
            ->with(['user'])
            ->orderBy('name', 'desc')
            ->get();
    }
    // CUSTOM_METHODS_END
}