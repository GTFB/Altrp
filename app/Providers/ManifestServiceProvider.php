<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ManifestServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->createManifest();
    }

    private function createManifest()
    {
        $manifest = public_path('manifest.webmanifest');
        $manifestStub = public_path('manifest.webmanifest.example');
        if (!is_file($manifest)) {
            file_put_contents($manifest, file_get_contents($manifestStub));
        }
    }
}
