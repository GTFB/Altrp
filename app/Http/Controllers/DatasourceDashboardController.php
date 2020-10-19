<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\DatasourceDashboard;
use Illuminate\Http\Request;

class DatasourceDashboardController extends Controller
{ 
    
    public function index(Request $request, $id) 
    {
        $panel = DatasourceDashboard::where('dashboard_id', '=', $id)->first();
        return response()->json($panel, 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function settings(Request $request, $id) {
        $user_id = auth()->user()->id;
        $settings = DatasourceDashboard::firstOrNew(['dashboard_id' => $id, 'user_id' => $user_id]);
        $settings->settings = json_encode($request->input('settings')) ?? data_get( $settings, 'settings' );
        $settings->guid = data_get( $settings, 'guid' ) ? data_get( $settings, 'guid' ) : (string)Str::uuid();
        $settings->save();
        return response()->json($settings, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
