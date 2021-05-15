<?php
namespace App\Constructor;



use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class TemplateSetting extends Model
{
  protected $fillable = [
    'data',
    'template_id',
    'template_guid',
    'setting_name',
  ];

  protected $casts = [
    'data'=>'array',
  ];

  /**
   * @deprecated
   * Импортируем настройки шаблонов
   * @param array $imported_settings
   */
  public static function import( $imported_settings = [] )
  {
    foreach ( $imported_settings as $imported_setting ) {
      $template = Template::where( 'guid', $imported_setting['template_guid'] )->first();
      if( ! $template ){
        continue;
      }
      $old_setting = self::where( 'template_id', $template->id )->where( 'setting_name', $imported_setting['setting_name'] )->first();
      if( $old_setting ){
        $old_setting->data = $imported_setting['data'];
        try {
          $old_setting->save();
        } catch (\Exception $e){
          Log::error( $e->getMessage(), $imported_setting ); //
          continue;
        }
        continue;
      }
      $new_setting = new self( $imported_setting );
      $new_setting->template_id = $template->id;
      try {
        $new_setting->save();
      } catch (\Exception $e){
        Log::error( $e->getMessage(), $imported_setting ); //
        continue;
      }
    }
  }

  /**
   * Связь с  шаблоном
   */
  public function template(){
    return $this->hasOne( Template::class, 'id', 'template_id' );
  }
}
