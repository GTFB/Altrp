<?php

namespace App\Altrp;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use App\Altrp\Model as AltrpModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

/**
 * Class Customizer
 * @package App\Altrp
 * @property $name string
 * @property $title string
 * @property $type string
 * @property $data array
 * @property $model_id int
 */
class Customizer extends Model
{
  use Timestamp, SoftDeletes;
  protected $table = 'altrp_customizers';

  public $fillable = [
    "name",
    "title",
    "type",
    "model_id",
    "data",
  ];

  protected $casts = [
    'data' => 'array',
  ];

  public function altrp_model()
  {
    return $this->hasOne( 'App\Altrp\Model', 'id', 'model_id' );
  }

  /**
   * @return string
   */
  public function getMethodContent()
  {
    $content = '';

    $content .= 'public function ' . $this->getMethodName() . '( ' . $this->getMethodArguments() . ' ){' .
      $this->convertCustomizerDataToString()
      . '}';
    return $content;
  }

  /**
   * @return string
   */
  private function convertCustomizerDataToString()
  {
    $string = '';
    return $string;
  }

  /**
   * @return string
   */
  private function getMethodName(): string
  {
    return $this->getName();
  }

  /**
   * @return string
   */
  private function getName(): string
  {
    return $this->name;
  }
  /**
   * @return string
   */
  private function getMethodArguments(): string
  {

    $string_arguments = '';

    switch ($this->type){
      case'api': $string_arguments = 'ApiRequest $request'; break;
    }

    return $string_arguments;

  }


}
