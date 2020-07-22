<?php


namespace App\Providers;


use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(\App\Repositories\AltrpRepositories\Interfaces\PointRepositoryInterface::class, \App\Repositories\AltrpRepositories\Eloquent\PointRepository::class);

        $this->app->bind(\App\Repositories\AltrpRepositories\Interfaces\PointRepositoryInterface::class, 
                \App\Repositories\AltrpRepositories\Eloquent\PointRepository::class);


    }
}