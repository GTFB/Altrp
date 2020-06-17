<?php

namespace App\Providers;

use App\Services\AltrpSettingsService;
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
    $this->app->bind( 'App\Services\AltrpSettingsService', function ( $app ) {
      return new AltrpSettingsService();
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
