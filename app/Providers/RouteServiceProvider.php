<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

use App\Altrp\Generators\Route\RouteFile;
use App\Altrp\Model;
class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';
    public const ADMIN = '/admin';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $route_file = new RouteFile(new Model());
        $route_file->createFile();
        $route_file->createApiFile();
        $route_file->createCustomRouteFile();
        $route_file->createRouteFile(base_path(config('altrp.admin.page_routes')), 'Routes for pages');
        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
        $this->mapPageRoutes();
        $this->mapApiAltrpRoutes();
        $this->mapAltrpRoutes();
        $this->mapCustomAltrpRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    /**
     * Routes for Altrp Routes
     */
    protected function mapAltrpRoutes()
    {
        Route::prefix('ajax/models')
            ->middleware(['web', 'inputStream'])
            ->namespace($this->namespace)
            ->group(base_path('routes/AltrpRoutes.php'));
    }

    /**
     * API routes for Altrp Routes
     */
    protected function mapApiAltrpRoutes()
    {
        Route::prefix('api/altrp_models')
            ->middleware(['api', 'inputStream'])
            ->namespace($this->namespace)
            ->group(base_path('routes/AltrpApiRoutes.php'));
    }

    /**
     * Custom routes for Altrp Routes
     */
    protected function mapCustomAltrpRoutes()
    {
        Route::namespace($this->namespace)
            ->group(base_path('routes/AltrpCustomRoutes.php'));
    }

    protected function mapPageRoutes()
    {
        Route::namespace($this->namespace)
            ->group(base_path(config('altrp.admin.page_routes')));
    }
}
