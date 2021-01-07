<?php

namespace App\Helpers\Classes;

class Manifest
{

    public function __construct()
    {
        $this->manifestFile = public_path('manifest.webmanifest');
    }

    public function update(string $setting, string $value)
    {
        $manifestContent = json_decode(file_get_contents($this->manifestFile), true);
        if ($setting == 'site_name') {
            $manifestContent['name'] = $value;
            $manifestContent['short_name'] = $value;
        }
        $manifestContent = json_encode($manifestContent, 128);
        return file_put_contents($this->manifestFile, $manifestContent);
    }
}
