<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GlobalTemplateStyle extends Model
{
  protected $table = "altrp_global_template_styles";

  protected $guarded = [];

  public static function findByGuid($guid)
  {
    return (new static)::where('guid', $guid)->first();
  }

  public static function colors()
  {
    return (new static)::where('type', 'color')->get();
  }

  /**
   * @param array $data
   * @return bool
   */
  public static function importGlobalStyles( array $data = [] ): bool
  {
    foreach ( $data as $altrp_global_template_styles ) {
      if( ! $altrp_global_template_styles['guid'] ){
        continue;
      }

      $new_element = self::findByGuid( $altrp_global_template_styles['guid'] );
      if( ! $new_element ) {
        $new_element = new self;
        $new_element->guid = $altrp_global_template_styles['guid'];
        $new_element->type = $altrp_global_template_styles['type'];
      }
      $new_element->settings = json_encode( $altrp_global_template_styles['settings'] );
      try{
        $new_element->save();
      } catch (\Exception $e){
        logger()->error($e->getMessage());
        return false;
      }
    }
    return true;
  }

  /**
   * Accessors
   */
  public function getSettingsAttribute($value)
  {
    return json_decode($value, true);
  }

  public function getGuidAttribute($value){
    return $value;
  }
}
