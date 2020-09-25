<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\AltrpDiagram;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AltrpDiagramController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if ($request->s) {
            $diagrams = AltrpDiagram::where('title', 'like', "%{$request->s}%");
            $diagrams = $request->pageSize ? $diagrams->paginate($request->pageSize) : $diagrams->get();
        } else {
            $diagrams = $request->pageSize ? AltrpDiagram::paginate($request->pageSize) : AltrpDiagram::all();
        }

        return response()->json($diagrams, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            "settings" => ["required"],
            "title" => ["required"]
        ]);

        $diagram = new AltrpDiagram(array_merge(
            $request->input(),
            [
              'author' => auth()->user()->id,
              'guid' => Str::uuid(),
            ]
        ));

        if($diagram->save()){
            return response()->json($diagram, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Failed to store diagram', 400, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $diagram = AltrpDiagram::find($request->diagram);

        if(! $diagram) {
            return response()->json('Diagram not found', 404, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($diagram, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            "settings" => ["required"],
            "title" => ["required"]
        ]);

        $diagram = AltrpDiagram::find($request->diagram);

        if(! $diagram) {
            return response()->json('Diagram not found', 404, [],JSON_UNESCAPED_UNICODE);
        }

        $diagram->update(array_merge(
            $request->input(),
            ['author' => auth()->user()->id]
        ));

        if(! $diagram) {
            return response()->json('Failed to update diagram', 500, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json($diagram, 200, [],JSON_UNESCAPED_UNICODE);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request)
    {
        $diagram = AltrpDiagram::find($request->diagram);

        if(! $diagram) {
            return response()->json('Diagram not found', 404, [],JSON_UNESCAPED_UNICODE);
        }

        if($diagram->delete()) {
            return response()->json($diagram, 200, [],JSON_UNESCAPED_UNICODE);
        }

        return response()->json('Failed to delete diagram', 400, [],JSON_UNESCAPED_UNICODE);
    }
}
