<?php


namespace App\Repositories;


interface EloquentRepositoryInterface
{
    public function getAll();

    public function find($id);
}
