<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class MediaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
    return response()->json( Media::all()->sortByDesc( 'id' )->values()->toArray() );
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
   * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
   */
  public function store( Request $request )
  {
    //
//      return  response()->json( $request->get('files') );
    /**
     * @var \Illuminate\Http\UploadedFile[] $files
     */
    $_files = $request->file( 'files' );
    $res = [];
    $files = [];

    foreach ( $_files as $file ) {
      if( strpos(  $file->getClientMimeType(), 'image' ) === 0 &&
        $file->getSize() < config( 'filesystems.max_file_size' )
      ){
        $files[] = $file;
      }
    }

    foreach ( $files as $file ) {
      $media = new Media();
      $media->media_type = $file->getClientMimeType();
      $media->author = Auth::user()->id;
      File::ensureDirectoryExists( 'app/media/' .  date("Y") . '/' .  date("m" ), 0775 );
      $media->filename =  $file->store( 'media/' .  date("Y") . '/' .  date("m" ) ,
        ['disk' => 'public'] );
      $media->url =  Storage::url( $media->filename );
      $media->type = $request->get( 'type' );
      $media->save();
      $res[] = $media;
    }
    $res = array_reverse( $res );
    return response()->json( $res );

  }

  /**
   * Display the specified resource.
   *
   * @param Media $media
   * @return \Illuminate\Http\Response
   */
  public function show( Media $media )
  {
    //
    return response()->json( $media->toArray() );

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function edit( $id )
  {
    //
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
    //
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
    //
    $media = $media->find($id);

    if( Storage::delete( 'public/' . $media->filename ) ){
      if( $media->delete() ){
        return response()->json( ['success' => true] );
      }
      return response()->json( ['success' => false, 'message'=> 'Error deleting media' ], 500 );
    }
    return response()->json( ['success' => false, 'message'=> 'Error deleting file' ], 500 );
  }
}
