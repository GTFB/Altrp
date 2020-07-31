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
   * Связь с  шаблоном
   */
  public function template(){
    return $this->hasOne( Template::class, 'id', 'template_id' );
  }
}