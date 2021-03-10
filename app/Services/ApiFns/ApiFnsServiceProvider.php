<?php

namespace App\Services\ApiFns;

use Carbon\Laravel\ServiceProvider;

/**
 * Class ApiFnsServiceProvider
 */
class ApiFnsServiceProvider extends ServiceProvider
{

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('api_fns', function () {
            return new ApiFns();
        });

        $this->app->alias('da_data_address', ApiFns::class);
    }
}
