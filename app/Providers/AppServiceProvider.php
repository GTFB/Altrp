<?php

namespace App\Providers;

use App\Services\AltrpSettingsService;
use App\Services\AltrpUpdateService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

use App\Altrp\Table;
use App\Observers\AltrpTableObserver;
use App\Altrp\Migration;
use App\Observers\AltrpMigrationObserver;
use App\Altrp\Column;
use App\Observers\AltrpColumnObserver;
use App\Altrp\Relationship;
use App\Observers\AltrpRelationshipObserver;


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
    
    Table::observe(AltrpTableObserver::class);
    Migration::observe(AltrpMigrationObserver::class);
    Column::observe(AltrpColumnObserver::class);
    Relationship::observe(AltrpRelationshipObserver::class);
  }
}
