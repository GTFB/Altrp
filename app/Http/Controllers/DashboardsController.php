<?php

namespace App\Http\Controllers;

use App\Dashboards;
use App\DashboardsSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DashboardsController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @param string $id
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
        $panel->guid = data_get( $panel, 'guid' ) ? data_get( $panel, 'guid' ) : (string)Str::uuid();
        $panel->save();
        return response()->json($panel, 200, [], JSON_UNESCAPED_UNICODE);
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

    public function settings(Request $request, $id) {
        $user_id = auth()->user()->id;
        $settings = DashboardsSettings::firstOrNew(['dashboard_id' => $id, 'user_id' => $user_id]);
        $settings->settings = $request->input('settings') ? json_encode($request->input('settings')) : data_get( $settings, 'settings' );
        $settings->guid = data_get( $settings, 'guid' ) ? data_get( $settings, 'guid' ) : (string)Str::uuid();
        $settings->save();
        return response()->json($settings, 200, [], JSON_UNESCAPED_UNICODE);
    }

}