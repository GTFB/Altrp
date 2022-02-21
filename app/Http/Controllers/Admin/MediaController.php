<?php

namespace App\Http\Controllers\Admin;

use App\CategoryObject;
use App\Http\Controllers\Controller;
use App\Media;
use App\MediaSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic;
use Illuminate\Support\Facades\Validator;

class MediaController extends Controller
{
  private static $file_types;

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index( Request $request )
  {
    //
    $categories = $request->get('categories');
    if( $request->get( 'type' ) ){
      if( $request->get( 'type' ) === 'other' ) {
        $media = Media::select('altrp_media.*')->with('categories.category')
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_media.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->where(function ($query) {
              $query->where( 'type', 'other' )
                    ->orWhere( 'type', null );
          })
          ->get();
      } else {
        $media = Media::select('altrp_media.*')->with('categories.category')
          ->where( 'type', $request->get( 'type' ) )
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_media.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->get();
      }
      $media = $media->sortByDesc( 'created_at' )->values()->toArray();
      return response()->json( $media, 200, [], JSON_UNESCAPED_UNICODE);
    }

    $media = Media::select('altrp_media.*')->with('categories.category')
          ->when($categories, function ($query, $categories) {
              if (is_string($categories)) {
                  $categories = explode(",", $categories);
                  $query->leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_media.guid')
                        ->whereIn('altrp_category_objects.category_guid', $categories);
              }
          })
          ->get()->sortByDesc( 'altrp_media.created_at' )->values()->toArray();

    return response()->json( $media, 200, [], JSON_UNESCAPED_UNICODE);
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
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
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
      $files[] = $file;

    }

    $mediaSettings = MediaSetting::all();

    foreach ( $files as $file ) {

      $media = new Media();
      $media->title = $file->getClientOriginalName();
      $media->media_type = $file->getClientMimeType();
      $media->author = Auth::user()->id;
      $media->type = self::getTypeForFile( $file );
      File::ensureDirectoryExists( 'app/media/' .  date("Y") . '/' .  date("m" ), 0775 );
      $media->filename =  $file->storeAs( 'media/' .  date("Y") . '/' .  date("m" ) ,
        Str::random(40) . '.' . $file->getClientOriginalExtension(),
        ['disk' => 'public'] );

      if ($file->getClientOriginalExtension() == "heic") {
        $media->title = explode('.', $file->getClientOriginalName())[0] . '.jpg';
        $media->media_type = "image/jpeg";
        $media->author = Auth::user()->id;
        $media->type = "image";
        $media->filename = self::storeHeicToJpeg( $file );
      }

      $path = Storage::path( 'public/' . $media->filename );
      $ext = pathinfo( $path, PATHINFO_EXTENSION );
      if( $ext === 'svg' ){
        $svg = file_get_contents( $path );
        $svg = simplexml_load_string( $svg );
        $media->width = ( string ) data_get( $svg->attributes(), 'width', 150 );
        $media->height = ( string ) data_get( $svg->attributes(), 'height', 150 );
      } else {
        $size = getimagesize( $path );
        $media->width = data_get( $size, '0', 0 );
        $media->height = data_get( $size, '1', 0 );
      }
      
      $media_variation = [];
      if (count($mediaSettings) > 0 && $ext != 'svg') {
        foreach ($mediaSettings as $setting) {
          $media_filename = $this->storeResizedImage( $path, $setting->width, $setting->height);
          //$media_variation[][str_replace(" ", "_", $setting->name)] = '/storage/'.$media_filename;
          $media_variation[][$setting->id] = '/storage/'.$media_filename;
        }
      }
      $media->media_variation = json_encode($media_variation);

      $media->main_color = getMainColor( $path );
      $media->url =  Storage::url( $media->filename );
      $media->guid = (string)Str::uuid();
      $media->save();

      $categories = $request->get( '_categories' );
      if( is_array($categories) && count($categories) > 0 && $media->guid){
        $insert = [];
        foreach($categories as $key => $category){
          $insert[$key] = [
            "category_guid" => $category['value'],
            "object_guid" => $media->guid,
            "object_type" => "Media"
          ];
        }
        CategoryObject::insert($insert);
      }

      $res[] = $media;
    }
    $res = array_reverse( $res );
    return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE);

  }

  /**
   * Resizing and store image file
   * @param \Illuminate\Http\UploadedFile $file
   * @return string
   */
  public static function storeResizedImage( $path, $width, $height, $quality=100 ){

    $media_filename = "";
    $source_properties = getimagesize($path);

    $origin_width = $source_properties[0];
    $origin_height = $source_properties[1];
    if ($origin_width > $origin_height) {
      $height = round($origin_height/$origin_width*$width);
    }
    if ($origin_width < $origin_height) {
      $width = round($origin_width/$origin_height*$height);
    }

    $mime = $source_properties['mime'];
    if ($mime == 'image/jpeg' || $mime == 'image/png' || $mime == 'image/gif') {
        $type = explode('/', $mime);
        $createFunction = 'imagecreatefrom' . $type[1];
        $image_resource_id = $createFunction($path);
        $target_layer=imagecreatetruecolor($width, $height);
        imagecopyresampled($target_layer, $image_resource_id, 0, 0, 0, 0, $width, $height, $source_properties[0], $source_properties[1]);
        $storeFunction = 'image'.$type[1];
        $store_directory = storage_path('app/public/media') . '/' .  date("Y") . '/' .  date("m") . '/';
        $filename = Str::random(40) . "." . $type[1];
        $storeFunction($target_layer, $store_directory . $filename, $quality);
        $media_filename = 'media/' .  date("Y") . '/' .  date("m") . '/' . $filename;
        imagedestroy($image_resource_id);
        return $media_filename;
    }
    return $media_filename;

  }

  /**
   * Resizing image
   * @param \Illuminate\Http\UploadedFile $file
   * @return string
   */
  public function resizeImage( Request $request ){

    $validator = Validator::make($request->all(),[
        'guid' => 'required'
    ]);

    if ($validator->fails()) {
      return response()->json(['status' => false, 'message' => $validator->messages()], 500, [], JSON_UNESCAPED_UNICODE);
    }

    $mediaSettings = MediaSetting::all();

    if (count($mediaSettings) == 0) {
      return response()->json( [ 'success' => false, 'message' => 'Media settings not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }

    $media = Media::where('guid', $request->guid)->first();

    if (!$media) {
      return response()->json( [ 'success' => false, 'message' => 'Media not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }

    $path = Storage::path( 'public/' . $media->filename );
    
    $media_variation = [];      
    foreach ($mediaSettings as $setting) {
      $media_filename = $this->storeResizedImage( $path, $setting->width, $setting->height);
      //$media_variation[][str_replace(" ", "_", $setting->name)] = '/storage/'.$media_filename;
      $media_variation[][$setting->id] = '/storage/'.$media_filename;
    }

    if ($media->media_variation) {
      $media_variations = json_decode( $media->media_variation, true);
      $this->deleteMediaVariations($media_variations);
    }
    
    $media->media_variation = json_encode($media_variation);
    $media->save();

    return response()->json( $media->toArray(), 200, [], JSON_UNESCAPED_UNICODE);
    
  }

  /**
   * Resizing All images
   * @param \Illuminate\Http\UploadedFile $file
   * @return string
   */
  public function resizeAllImages(){

    $mediaSettings = MediaSetting::all();

    if (count($mediaSettings) == 0) {
      return response()->json( [ 'success' => false, 'message' => 'Media settings not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }

    $media_records = Media::all();

    if (count($media_records) == 0) {
      return response()->json( [ 'success' => false, 'message' => 'Media not found' ], 404, [], JSON_UNESCAPED_UNICODE );
    }

    foreach ($media_records as $media) {

      $path = Storage::path( 'public/' . $media->filename );
      $ext = pathinfo( $path, PATHINFO_EXTENSION );

      $media_variation = [];
      if (count($mediaSettings) > 0 && $ext != 'svg') {
        foreach ($mediaSettings as $setting) {
          $media_filename = $this->storeResizedImage( $path, $setting->width, $setting->height);
          //$media_variation[][str_replace(" ", "_", $setting->name)] = '/storage/'.$media_filename;
          $media_variation[][$setting->id] = '/storage/'.$media_filename;
        }
      }

      if ($media->media_variation) {
        $media_variations = json_decode( $media->media_variation, true);
        $this->deleteMediaVariations($media_variations);
      }

      $media->media_variation = json_encode($media_variation);
      $media->save();

      $res[] = $media;
    }

    $res = array_reverse( $res );
    return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE);
    
  }

  /**
   * Store a newly created resource in storage. From front-app
   *
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store_from_frontend( Request $request )
  {

    /**
     * @var \Illuminate\Http\UploadedFile[] $files
     */
    $_files = $request->file( 'files' );
    $res = [];
    $files = [];

    foreach ( $_files as $file ) {
      $files[] = $file;
    }

    $mediaSettings = MediaSetting::all();

    foreach ( $files as $file ) {
      $media = new Media();
      $media->title = $file->getClientOriginalName();
      $media->media_type = $file->getClientMimeType();
      if(Auth::user()){
        $media->author = Auth::user()->id;
      } else {
        $media->guest_token = $request->session()->token();
      }
      $media->type = self::getTypeForFile( $file );
      File::ensureDirectoryExists( 'app/media/' .  date("Y") . '/' .  date("m" ), 0775 );
      $media->filename =  $file->storeAs( 'media/' .  date("Y") . '/' .  date("m" ) ,
        Str::random(40) . '.' . $file->getClientOriginalExtension(),
        ['disk' => 'public'] );

      if ($file->getClientOriginalExtension() == "heic") {
        $media->title = explode('.', $file->getClientOriginalName())[0] . '.jpg';
        $media->media_type = "image/jpeg";
        $media->author = Auth::user()->id;
        $media->type = "image";
        $media->filename = self::storeHeicToJpeg( $file );
      }

      $path = Storage::path( 'public/' . $media->filename );
      $ext = pathinfo( $path, PATHINFO_EXTENSION );
      if( $ext === 'svg' ){
        $svg = file_get_contents( $path );
        $svg = simplexml_load_string( $svg );
        $media->width = ( string ) data_get( $svg->attributes(), 'width', 150 );
        $media->height = ( string ) data_get( $svg->attributes(), 'height', 150 );
      } else {
        $size = getimagesize( $path );
        $media->width = data_get( $size, '0', 0 );
        $media->height = data_get( $size, '1', 0 );
      }

      $media_variation = [];
      if (count($mediaSettings) > 0 && $ext != 'svg') {
        foreach ($mediaSettings as $setting) {
          $media_filename = $this->storeResizedImage( $path, $setting->width, $setting->height);
          //$media_variation[][str_replace(" ", "_", $setting->name)] = '/storage/'.$media_filename;
          $media_variation[][$setting->id] = '/storage/'.$media_filename;
        }
      }
      $media->media_variation = json_encode($media_variation);

      $media->main_color = getMainColor( $path );
      $media->url =  Storage::url( $media->filename );
      $media->save();
      $res[] = $media;
    }
    $res = array_reverse( $res );
    return response()->json( $res, 200, [], JSON_UNESCAPED_UNICODE);

  }

  /**
   * Display the specified resource.
   *
   * @param Media $media
   * @return \Illuminate\Http\Response
   */
  public function show( $id, Media $media )
  {
    //
    $media = $media->find( $id );
    $filesize = filesize(Storage::path( 'public/' . $media->filename ));
    $media->filesize = $filesize > 1048576 ? round($filesize/1024/1024, 2)." MB" : round($filesize/1024, 2)." KB";
    $media->categories = $media->categoryOptions();
    $variations = json_decode($media->media_variation, true);
    $settings = MediaSetting::all();
    $mediaVariation = [];
    foreach ($variations as $file) {
      foreach ($file as $id => $url) {
        $setting = $settings->find($id);
        if ($setting) {
          $mediaVariation[] = [
            'name' => $setting->name,
            'file' => $url
          ];
        }
      }
    }
    $media->mediaVariation = $mediaVariation;
    return response()->json( $media->toArray() );

  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function edit( $id, Request $request )
  {
    //
    $media = Media::find( $id );

    if( ! $media ){
      return response()->json( ['success' => false,], 404, [], JSON_UNESCAPED_UNICODE);
    }
    $media->fill( $request->all() );
    $media->save();
    return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE);
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
    $media = Media::find( $id );
    if( ! $media ){
      return response()->json( ['success' => false,], 404, [], JSON_UNESCAPED_UNICODE);
    }
    $media->fill( $request->all() );
    $media->save();

    CategoryObject::where("object_guid", $media->guid)->delete();
    $categories = $request->get( '_categories' );
    if( is_array($categories) && count($categories) > 0 && $media->guid){
      $insert = [];
      foreach($categories as $key => $category){
        $insert[$key] = [
          "category_guid" => $category['value'],
          "object_guid" => $media->guid,
          "object_type" => "Media"
        ];
      }
      CategoryObject::insert($insert);
    }

    return response()->json( ['success' => true,], 200, [], JSON_UNESCAPED_UNICODE);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param Media $media
   * @param string $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy( Media $media, $id )
  {
    //
    $media = $media->find($id);
    if( ! $media ){
      return response()->json( ['success' => false, 'message'=> 'Media not found' ], 404 );
    }
    if( $media->forceDelete() ) {
      if ($media->media_variation) {
        $media_variations = json_decode( $media->media_variation, true);
        $this->deleteMediaVariations($media_variations);
      }
      CategoryObject::where("object_guid", $media->guid)->forceDelete();
      return response()->json( [ 'success' => true ] );
    }

    return response()->json( ['success' => false, 'message'=> 'Error deleting file' ], 500 );
  }

  /**
   * Remove the specified resource from storage. From front-app
   *
   * @param Media $media
   * @param string $id
   * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
   * @throws \Exception
   */
  public function destroy_from_frontend( Media $media, $id )
  {
    /**
     * @var Media $media
     */
    $media = $media->find($id);
    if( ! $media ){
      return response()->json( ['success' => false, 'message'=> 'Media not found' ], 404 );
    }
    $user = Auth::user();
    if( ! $user && session()->token() !== $media->guest_token ){
      return response()->json( ['success' => false, 'message'=> 'Not Access to deleting media' ], 403 );
    }
    if( $user && ! $user->hasRole( 'admin' ) && $user->id !== $media->author ){
      return response()->json( ['success' => false, 'message'=> 'Not Access to deleting media' ], 403 );
    }
    if( Storage::delete( 'public/' . $media->filename ) ){
      if( $media->forceDelete() ){
        if ($media->media_variation) {
          $media_variations = json_decode( $media->media_variation, true);
          $this->deleteMediaVariations($media_variations);
        }
        return response()->json( ['success' => true] );
      }
      return response()->json( ['success' => false, 'message'=> 'Error deleting media' ], 500 );
    }
    return response()->json( ['success' => false, 'message'=> 'Error deleting file' ], 500 );
  }

  private function deleteMediaVariations( $media_variations )
  {
    if (is_array($media_variations) && count($media_variations) > 0) {
      $variation_files = [];
      foreach ($media_variations as $variation) {
        $variation_files[] = Storage::path( 'public/' . str_replace_once('/storage/', '', array_shift($variation)) );
      }
      File::delete($variation_files);
    }
    return true;
  }

  /**
   * Получить тип файла для сохранения в БД
   * @param \Illuminate\Http\UploadedFile $file
   * @return string
   */
  public static function getTypeForFile( $file ){
    $extension_loaded = $file->getClientOriginalExtension();

    $type = '';
    $file_types = self::getFileTypes();
    foreach ( $file_types as $file_type ){
      if( ( ! $type ) &&  array_search($extension_loaded, $file_type['extensions'] ) !== false ){
        $type = $file_type['name'];
      }
    }
    if( ! $type ){
      $type = 'other';
    }
    return $type;
  }

  /**
   * @return []
   */
  public static function getFileTypes(){
    if( ! self::$file_types ){
      $file_types = file_get_contents( base_path( 'config/file-types.json' ) );
      $file_types = json_decode( $file_types, true);
      self::$file_types = $file_types;
    }
    return  self::$file_types;
  }

  /**
   * Converting and store HEIC file to JPG
   * @param \Illuminate\Http\UploadedFile $file
   * @return string
   */
  public static function storeHeicToJpeg( $file ){

    ImageManagerStatic::configure(["driver" => "imagick"]);

    $source = $file->getRealPath();

    $image = new \Imagick($source);
    $image->setImageFormat("jpeg");
    $image->setImageCompressionQuality(100);

    $store_directory = storage_path('app/public/media') . '/' .  date("Y") . '/' .  date("m") . '/';
    $filename = Str::random(40) . ".jpg";

    $image->writeImage($store_directory . $filename);

    $media_filename = '/media/' .  date("Y") . '/' .  date("m") . '/' . $filename;

    return $media_filename;
  }
}
