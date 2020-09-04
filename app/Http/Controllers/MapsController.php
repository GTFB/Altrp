<?php

namespace App\Http\Controllers;

use App\Maps;
use Illuminate\Http\Request;

class MapsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        $map = Maps::findOrFail($id);
        $result = json_decode($map->data);
        return response()->json($result, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $map = Maps::firstOrNew(['id' => $id]);
        $map->data = $request->input('data');
        $map->save();
        return response()->json($map, 200, [], JSON_UNESCAPED_UNICODE);
    }
}