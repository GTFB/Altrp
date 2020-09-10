<?php

namespace App\Http\Controllers;

use App\Dashboards;
use Illuminate\Http\Request;

class DashboardsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        $panel = Dashboards::findOrFail($id);
        return response()->json($panel, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $panel = Dashboards::firstOrNew(['id' => $id]);
        //$panel->data = $request->input('data');
        $panel->save();
        return response()->json($panel, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Dashboards  $dashboards
     * @return \Illuminate\Http\Response
     */
    public function show(Dashboards $dashboards)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Dashboards  $dashboards
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dashboards $dashboards)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dashboards  $dashboards
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dashboards $dashboards)
    {
        //
    }
}