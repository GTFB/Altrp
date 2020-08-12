<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Reports;

class ReportsController extends Controller
{
    /**
     * Получение списка отчетов
     * @return Reports
     */
    public function index()
    {
        // Получаем все отчеты
        $reports = Reports::all();
        $result = $reports->map(function($item) {
            $item->url = "/admin/editor-reports?id=" . $item->id;
            $item->author = $item->user->name;
            return $item;
        });

        return response()->json($result, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $report = new Reports( $request->toArray() );
        $report->user_id  = auth()->user()->id;

        if( $report->save() ){
          $report->url  = '/admin/editor-reports?id=' . $report->id;
          return response()->json($report, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return \response()->json( ['report' => $report], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Reports  $reports
     * @return \Illuminate\Http\Response
     */
    public function show(ApiRequest $request, Reports $reports, $id)
    {
        //$request->expectsJson();
        //$report = Reports.find($id);
        return response()->json(['id' => $id], 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Reports  $reports
     * @return \Illuminate\Http\Response
     */
    public function update(ApiRequest $request, Reports $reports)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reports  $reports
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reports $reports)
    {
        //
    }
}