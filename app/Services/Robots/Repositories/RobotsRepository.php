<?php


namespace App\Services\Robots\Repositories;


use App\Altrp\Model;
use App\Altrp\Robot;

class RobotsRepository implements RobotsRepositoryInterface
{
    /**
     * Получить всех роботов
     * @return Robot[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAll()
    {
        return Robot::all();
    }

    /**
     * Получить робота указанной модели
     * @param Model $model
     * @return Robot[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getByModelRobots(Model $model)
    {
        return Robot::where('model_id', $model->id)->get();
    }

    /**
     * Получить роботов по типу условия запуска
     * @param string $type
     * @return Robot[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getRobotsByStartConditionType(string $type)
    {
        return Robot::where('start_condition', $type)->get();
    }
}
