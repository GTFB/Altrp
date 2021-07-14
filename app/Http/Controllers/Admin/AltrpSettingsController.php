<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Controller;

class AltrpSettingsController extends Controller
{
    public function clearCache(Request $request)
    {
        try {
            Artisan::call('cache:clear');
            Artisan::call('view:clear');
            Artisan::call('route:clear');
            return response()->json(['message' => 'Cache cleared']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'fail'], 422);
        }
    }

    /**
     * WORK ONLY ON UNIX BASED SYSTEMS AND ALTRP ECOSYSTEM
     */
    public function makeSSRConfig(Request $request)
    {
        try {
            $confName = env('ALTRP_SETTING_SSR_SETTINGS_ALIAS');
            $path = base_path();
            $stubPath = app_path() . "/Altrp/Commands/stubs/ssr/ssr.conf.stub";
            $owner = posix_getpwuid(fileowner($path . "/" . '.env'));
            $ownerName = $owner['name'];
            $fileStub = file_get_contents($stubPath);
            $fileStub = str_replace('{{alias}}', $confName, $fileStub);
            $fileStub = str_replace('{{projectDir}}', $path, $fileStub);
            $fileStub = str_replace('{{projectOwner}}', $ownerName, $fileStub);
            file_put_contents("$path/$confName.conf", $fileStub);
            $exec = exec("restartssr $confName");
            return response()->json(['message' => $exec]);
        } catch (\Throwable $th) {
            dd($th);
        }
    }

    public function checkConfig()
    {
        $confName = env('ALTRP_SETTING_SSR_SETTINGS_ALIAS');
        $path = base_path();
        $hasFile = is_file("$path/$confName.conf");
        return response()->json(['file' => $hasFile]);
    }

    public function restartSSR(Request $request)
    {
        try {
            $confName = env('ALTRP_SETTING_SSR_SETTINGS_ALIAS');
            $exec = exec("restartssr $confName");
            return response()->json(['message' => $exec]);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th]);
        }
    }
}
