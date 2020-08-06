<?php

namespace App\Providers;

use App\Altrp\Controller;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Observers\AltrpControllerObserver;
use App\Observers\AltrpModelObserver;
use App\Observers\AltrpQueryObserver;
use App\Services\AltrpSettingsService;
use App\Services\AltrpUpdateService;
use Illuminate\Database\Eloquent\Builder;
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

        $this->app->bind('App\Services\AltrpUpdateService', function ($app) {
            return new AltrpUpdateService();
        });
        $this->app->bind('App\Services\AltrpSettingsService', function ($app) {
            return new AltrpSettingsService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        Table::observe(AltrpTableObserver::class);
        Migration::observe(AltrpMigrationObserver::class);
        Column::observe(AltrpColumnObserver::class);
        Relationship::observe(AltrpRelationshipObserver::class);
        Model::observe(AltrpModelObserver::class);
        Controller::observe(AltrpControllerObserver::class);
        Query::observe(AltrpQueryObserver::class);

        Builder::macro('whereLike', function ($attributes, string $searchTerm) {
            $this->where(function (Builder $query) use ($attributes, $searchTerm) {
                foreach (\Arr::wrap($attributes) as $attribute) {
                    $query->when(
                        str_contains($attribute, '.'),
                        function (Builder $query) use ($attribute, $searchTerm) {
                            [$relationName, $relationAttribute] = explode('.', $attribute);

                            $query->orWhereHas($relationName, function (Builder $query) use ($relationAttribute, $searchTerm) {
                                $query->where($relationAttribute, 'LIKE', "%{$searchTerm}%");
                            });
                        },
                        function (Builder $query) use ($attribute, $searchTerm) {
                            $query->orWhere($attribute, 'LIKE', "%{$searchTerm}%");
                        }
                    );
                }
            });

            return $this;
        });
    }
}
