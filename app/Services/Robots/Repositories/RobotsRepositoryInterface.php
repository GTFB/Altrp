<?php


namespace App\Services\Robots\Repositories;


use App\Altrp\Model;

interface RobotsRepositoryInterface
{
    public function getAll();

    public function getByModelRobots(Model $model);

    public function getRobotsByStartConditionType(string $type);
}
