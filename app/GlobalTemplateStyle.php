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
