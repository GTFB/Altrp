<?php

namespace App\Providers;

use App\Services\AltrpUpdateService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {

    $this->app->bind( 'App\Services\AltrpUpdateService', function ( $app ) {
      return new AltrpUpdateService();
    } );
  }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {
    Schema::defaultStringLength( 191 );
  }
}
