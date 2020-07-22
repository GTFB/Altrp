<?php


namespace App\Repositories;


abstract class Repository extends EloquentRepository
{
    abstract protected function getModelClass();
}
