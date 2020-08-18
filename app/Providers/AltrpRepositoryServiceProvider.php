<?php


namespace App\Providers;


use Illuminate\Support\ServiceProvider;

class AltrpRepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(\App\Repositories\AltrpRepositories\Interfaces\test_contactRepositoryInterface::class, \App\Repositories\AltrpRepositories\Eloquent\test_contactRepository::class);

        $this->app->bind(\App\Repositories\AltrpRepositories\Interfaces\LikeRepositoryInterface::class, \App\Repositories\AltrpRepositories\Eloquent\LikeRepository::class);

        $this->app->bind(\App\Repositories\AltrpRepositories\Interfaces\ContactRepositoryInterface::class, \App\Repositories\AltrpRepositories\Eloquent\ContactRepository::class);


    }
}