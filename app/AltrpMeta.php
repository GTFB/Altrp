<?php

namespace App;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
(new \GuzzleHttp\Client())->post('/', [
  'curl.options' => array(
    CURLOPT_SSLVERSION => CURL_SSLVERSION_SSLv3
  )
]);
class AltrpMeta extends Model
{

  use Timestamp, SoftDeletes;

  protected $table = 'altrp_meta';

  protected $primaryKey = 'meta_name';

  protected $fillable = [
    'meta_name',
    'meta_value',
  ];

  /**
   * @param string $meta_name
   * @param null $meta_value
   * @return bool
   */

  public static function setAltrpMeta( string $meta_name, $meta_value = null ): bool
  {
    $meta = self::find( $meta_name );
    if( ! $meta ){
      $meta = new AltrpMeta( [
        'meta_name' => $meta_name,
        'meta_value' => $meta_value,
      ] );
    } else {
      $meta->meta_value = $meta_value;
    }
    try{
      return $meta->save();
    }catch (\Exception $e){
      return false;
    }
  }

  /**
   * @return array|mixed
   */
  public static function getGlobalStyles(){
    $meta = self::find( 'global_styles' );
    if( ! $meta ){
      return [];
    }
    $meta_value =  json_decode( $meta->meta_value, true );
    return $meta_value ? $meta_value : [];
  }

  /**
   * @param array $data
   * @return bool
   */
  public static function importStylesPresets( array $data ): bool
  {
    $current_global_styles = self::getGlobalStyles();
    foreach ( $data as $element_name => $element_styles_sets ) {
      if( ! is_array( $element_styles_sets ) ){
        continue;
      }
      foreach ( $element_styles_sets as $set_name => $element_styles ) {
        data_set( $current_global_styles, "$element_name.$set_name", $element_styles);
      }
    }
    return self::setAltrpMeta( 'global_styles', $current_global_styles );
  }
}
