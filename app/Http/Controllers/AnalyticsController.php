<?php

namespace App\Http\Controllers;

use App\Constructor\Template;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $reports = DB::table('reports')->count();
        $templates = Template::where('type', 'template')->count();
        $templates_history = Template::where('type', 'review')->count();
        $areas = DB::table('areas')->count();

        return response()->json(['data' => [
          array('key' => 'Отчетов', 'data' => $reports),
          array('key' => 'Шаблонов', 'data' => $templates),
          array('key' => 'История Шаблонов', 'data' => $templates_history),
          array('key' => 'Областей', 'data' => $areas),
        ]], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function none()
    {
        return response()->json(['data' => []], 200, [], JSON_UNESCAPED_UNICODE);
    }

    
}