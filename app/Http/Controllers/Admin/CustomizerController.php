<?php

namespace App\Http\Controllers\Admin;

use App\Altrp\Customizer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CustomizerController extends Controller{

  public function store( Request $request )
  {

    $customizer = new Customizer($request->all());
    $customizer->guid = Str::uuid();
    try {
      $customizer->save();
    } catch ( \Throwable $th ) {
      return response()->json( [
        'success' => false,
        'message' => "Customizer don't saved",
        'throw message' => $th->getMessage(),
        'trace' => $th->getTrace(),
      ], 503, [], JSON_UNESCAPED_UNICODE);

    }
    return response()->json( [
      'success' => true,
      'data' => $customizer->toArray(),
    ],200, [], JSON_UNESCAPED_UNICODE  );
  }
  public function index(){
    $customizers = Customizer::all()->toArray();

    return response()->json([
      'success' => true,
      'data' => $customizers,
    ]);
  }
}
