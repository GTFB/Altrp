<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Services\AltrpSettingsService;
use App\Services\AltrpUpdateService;
use Illuminate\Support\Facades\Artisan;
use \Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SettingsController extends Controller

{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //

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
    return response()->json( [], 500 );
  }

  /**
   * Display the specified resource.
   *
   * @param string $setting_name
   * @param AltrpSettingsService $settings_service
   * @param Request $request
   * @return \Illuminate\Http\Response
   * @throws \Jackiedo\DotenvEditor\Exceptions\KeyNotFoundException
   */
  public function show( $setting_name, AltrpSettingsService $settings_service, Request $request)
  {
    $res[$setting_name] = $settings_service->get_setting_value( $setting_name, '', $request->get( 'decrypt', false ) );
    return response()->json( $res );
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  string $setting_name
   */
  public function edit( $setting_name )
  {
  }

  /**
   * Update the specified resource in storage.
   *
   * @param $setting_name
   * @param Request $request
   * @param AltrpSettingsService $settings_service
   * @return \Illuminate\Http\Response
   */
  public function update( $setting_name, Request $request, AltrpSettingsService $settings_service )
  {
    if( ! $settings_service->set_setting_value( $setting_name, $request->value, $request->get( 'encrypt', false ) ) ){
      return response()->json( ['result' => false, 'message' => 'Не удалось записать настройку ' . $setting_name], 500 );
    }
    return response()->json( ['result' => true] );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param string $id
   * @return \Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( $id )
  {
    //
  }
}