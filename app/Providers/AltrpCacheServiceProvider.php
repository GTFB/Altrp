<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AltrpCacheServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('altrpCache', 'App\Services\AltrpCacheService');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
