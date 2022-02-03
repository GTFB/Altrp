<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\MediaSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MediaSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if( $request->get( 's' ) ){
          $mediaSettings = MediaSetting::where( 'name', 'like', '%' . $request->get( 's' ) . '%' )->get()->sortByDesc( 'name' )->values()->toArray();
          return response()->json( $mediaSettings, 200, [], JSON_UNESCAPED_UNICODE);
        }
        return response()->json( MediaSetting::all()->sortByDesc( 'id' )->values()->toArray(), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'width' => 'required|integer',
            'height' => 'required|integer'
          ]
        );

        if ($validator->fails()) {
          return response()->json( ['success' => false, 'message' => $validator->messages(), 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
        }

        $mediaSetting = new MediaSetting( $request->all() );

        try {
            $mediaSetting->save();
            return response()->json( ['success' => true, 'message' => 'success', 'data' => $mediaSetting->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $t) {
            if(isset($t->errorInfo)) {
                return response()->json(['success' => false, 'message' => $t->errorInfo, 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
            } else {
                return response()->json(['success' => false, 'message' => 'Internal Error', 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
            }        
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MediaSetting  $mediaSetting
     * @return \Illuminate\Http\Response
     */
    public function show(MediaSetting $mediaSetting)
    {
        return response()->json( ['success' => true, 'message' => 'success', 'data' => $mediaSetting->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MediaSetting  $mediaSetting
     * @return \Illuminate\Http\Response
     */
    public function edit(MediaSetting $mediaSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MediaSetting  $mediaSetting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MediaSetting $mediaSetting)
    {
        $mediaSetting->fill( $request->all() );
        try {
            $mediaSetting->save();
            return response()->json( ['success' => true, 'message' => 'success', 'data' => $mediaSetting->toArray()], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $t) {
            if(isset($t->errorInfo)) {
                return response()->json(['success' => false, 'message' => $t->errorInfo, 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
            } else {
                return response()->json(['success' => false, 'message' => 'Internal Error', 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
            }        
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MediaSetting  $mediaSetting
     * @return \Illuminate\Http\Response
     */
    public function destroy(MediaSetting $mediaSetting)
    {
        try {
            $mediaSetting->delete();
            return response()->json( ['success' => true, 'message' => 'success', 'data' => []], 200, [], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $t) {
            if(isset($t->errorInfo)) {
                return response()->json(['success' => false, 'message' => $t->errorInfo, 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
            } else {
                return response()->json(['success' => false, 'message' => 'Internal Error', 'data' => []], 500, [], JSON_UNESCAPED_UNICODE);
            }        
        }
    }
}
