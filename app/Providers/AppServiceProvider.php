<?php

namespace App\Providers;

use App\Altrp\Accessor;
use App\Altrp\Controller;
use App\Altrp\Customizer;
use App\Altrp\Robot;
use App\Altrp\Model;
use App\Altrp\Query;
use App\Altrp\Source;
use App\Altrp\ValidationField;
use App\Altrp\ValidationRule;
use App\Observers\AltrpAccessorObserver;
use App\Observers\AltrpControllerObserver;
use App\Observers\AltrpModelObserver;
use App\Observers\AltrpQueryObserver;
use App\Observers\AltrpSourceObserver;
use App\Observers\AltrpSQLEditorObserver;
use App\Observers\AltrpValidationFieldObserver;
use App\Observers\AltrpValidationRuleObserver;
use App\Observers\CustomizerObserver;
use App\Observers\RobotObserver;
use App\Observers\PageObserver;
use App\Observers\UserObserver;
use App\Page;
use App\Services\AltrpImportExportService;
use App\Services\AltrpPluginsService;
use App\Services\AltrpSettingsService;
use App\Services\AltrpUpdateService;
use App\SQLEditor;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Builder as QueryBuilder;

use App\Altrp\Table;
use App\Observers\AltrpTableObserver;
use App\Altrp\Migration;
use App\Observers\AltrpMigrationObserver;
use App\Altrp\Column;
use App\Observers\AltrpColumnObserver;
use App\Altrp\Relationship;
use App\Observers\AltrpRelationshipObserver;

use GuzzleHttp\Client;
use App\Services\TelegramService;


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
        $this->app->bind('App\Services\AltrpPluginsService', function ($app) {
            return new AltrpPluginsService();
        });
        $this->app->bind('App\Services\AltrpSettingsService', function ($app) {
            return new AltrpSettingsService();
        });
        $this->app->bind('App\Services\AltrpImportExportService', function ($app) {
            return new AltrpImportExportService();
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
        Customizer::observe(CustomizerObserver::class);
        Robot::observe(RobotObserver::class);
        Controller::observe(AltrpControllerObserver::class);
        Query::observe(AltrpQueryObserver::class);
        SQLEditor::observe(AltrpSQLEditorObserver::class);
        Accessor::observe(AltrpAccessorObserver::class);
        Source::observe(AltrpSourceObserver::class);
        ValidationRule::observe(AltrpValidationRuleObserver::class);
        ValidationField::observe(AltrpValidationFieldObserver::class);
        User::observe(UserObserver::class);
        Page::observe(PageObserver::class);

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
        QueryBuilder::macro('whereLikeAnd', function ($attributes, string $searchTerm) {
            $this->where(function (QueryBuilder $query) use ($attributes, $searchTerm) {
                foreach (\Arr::wrap($attributes) as $attribute) {
                    $query->when(
                        str_contains($attribute, '.'),
                        function (QueryBuilder $query) use ($attribute, $searchTerm) {
                            [$relationName, $relationAttribute] = explode('.', $attribute);

                            $query->whereHas($relationName, function (QueryBuilder $query) use ($relationAttribute, $searchTerm) {
                                $query->where($relationAttribute, 'LIKE', "%{$searchTerm}%");
                            });
                        },
                        function (QueryBuilder $query) use ($attribute, $searchTerm) {

                            $query->where($attribute, 'LIKE', "%{$searchTerm}%");
                        }
                    );
                }
            });

            return $this;
        });
        QueryBuilder::macro('whereLikeMany', function ( $params ) {

          foreach ( $params as $column => $search){
            $searches = explode( ' ', $search );
            foreach ( $searches as $_search ) {
              $this->whereLikeAnd( $column, trim( $_search ) );
            }
          }
          return $this;
        });
    }
}
