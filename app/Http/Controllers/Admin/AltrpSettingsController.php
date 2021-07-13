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
}
