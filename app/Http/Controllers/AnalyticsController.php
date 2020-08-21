<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $reports = DB::table('reports')->count();
        $templates = DB::table('templates')->count();
        $areas = DB::table('areas')->count();

        return response()->json([
          array('key' => 'Отчетов', 'data' => $reports),
          array('key' => 'Шаблонов', 'data' => $templates),
          array('key' => 'Областей', 'data' => $areas)
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function none()
    {
        return response()->json([], 200, [], JSON_UNESCAPED_UNICODE);
    }

    
}