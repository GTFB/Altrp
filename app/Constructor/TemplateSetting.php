<?php
namespace App\Constructor;



use Illuminate\Database\Eloquent\Model;

class TemplateSetting extends Model
{
  protected $fillable = [
    'data',
    'template_id',
    'setting_name',
  ];

  protected $casts = [
    'data'=>'array',
  ];

  /**
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
        $old_setting->save();
        continue;
      }
      $new_setting = new self( $imported_setting );
      $new_setting->template_id = $template->id;
      $new_setting->save();
    }
  }

  /**
   * Связь с  шаблоном
   */
  public function template(){
    return $this->hasOne( Template::class, 'id', 'template_id' );
  }
}