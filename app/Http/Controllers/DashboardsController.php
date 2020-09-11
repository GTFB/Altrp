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
        $panel = Dashboards::where('widget_id', '=', $id)->orderBy('id', 'desc')->get();
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
        $panel->title = $request->input('title');
        $panel->type = $request->input('type');
        $panel->source = $request->input('source');
        $panel->filter = $request->input('filter');
        $panel->options = $request->input('options');
        $panel->user_id = auth()->user()->id;
        $panel->widget_id = $id;
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
    public function update(Request $request, $id)
    {
        $panel = Dashboards::findOrFail($id);
        $panel->update($request->all());
        return response()->json($panel, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dashboards  $dashboards
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dashboards $dashboards, $id)
    {
        $panel = Dashboards::findOrFail($id);
        $panel->delete();

        return response()->json(null, 204);
    }
}