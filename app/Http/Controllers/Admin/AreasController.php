<?php

namespace App\Http\Controllers\Admin;

use App\Area;
use App\Http\Controllers\Controller;
use App\Media;
use App\Page;
use App\PagesTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AreasController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //

    $_areas = Area::all();


    return response()->json( $_areas->toArray() );
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
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store( Request $request )
  {
  }

  /**
   * Display the specified resource.
   *
   * @param string $id
   * @return \Illuminate\Http\Response
   */
  public function show(  $id )
  {
    //

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @param Request $request
   * @return \Illuminate\Http\Response
   */
  public function edit( $id, $request )
  {

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function update( Request $request, $id )
  {

  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Media $media
   * @param string $id
   * @return \Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( Media $media, $id )
  {
  }
}
