<?php


namespace App\Providers;


use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $serviceFile = app_path('Providers/AltrpRepositoryServiceProvider.php');
        if (!file_exists($serviceFile)) {
            $stubFile = app_path('Altrp/Commands/stubs/providers/altrp_repository_service_provider.stub');
            $stub = file($stubFile, 2);
            File::put($serviceFile, implode(PHP_EOL, $stub));
        }
    }
}
