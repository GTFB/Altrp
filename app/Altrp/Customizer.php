<?php

namespace App\Altrp;

use App\Altrp\Customizer\Nodes\BaseNode;
use App\Altrp\Customizer\Nodes\StartNode;
use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;
use App\Altrp\Source;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use App\CategoryObject;

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
  private $parsed_data;
  public $fillable = [
    "name",
    "title",
    "type",
    "model_id",
    "data",
    "model_guid",
    "settings",
  ];

  protected $casts = [
    'data' => 'array',
    'settings' => 'json',
  ];

  protected $appends = [
    'source',
  ];

  public function altrp_model()
  {
    return $this->hasOne( 'App\Altrp\Model', 'id', 'model_id' );
  }

  public function getSourceAttribute(){
    if( ! $this->id ){
      return null;
    }
    $source = Source::where([
      'sourceable_id' => $this->id,
      'sourceable_type' => 'App\Altrp\Customizer',
    ])->first();
    if( ! $source ){
      return null;
    }
    return $source->toArray();
  }

  /**
   * @return string
   */
  public function getMethodContent()
  {
    $content = '';

    $content .= "\tpublic function " . $this->getMethodName() . '( ' . $this->getMethodArguments() . " ){\n
    try{
    set_customizer_data( 'this', \$this );
    set_customizer_data( 'context.request', \$request );
    " .
      $this->convertCustomizerDataToString()
      . "
      } catch (\Throwable \$th){
        return response()->json(
        [
          'success' => false,
          'message' => 'Customizer failed!',
          'throw message' => \$th->getMessage(),
          'file' => \$th->getFile(),
          'line' => \$th->getLine(),
          'trace' => \$th->getTrace(),
        ], 500, [], JSON_UNESCAPED_UNICODE
        );
      }
      \n\t}";
    return $content;
  }

  /**
   * @return string
   */
  private function convertCustomizerDataToString()
  {
    $string = '';
    $start_node = $this->getStartNode();
    if( ! $start_node ){
      return $string;
    }
    $string .= $start_node->getPHPContent();
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

  /**
   * @return StartNode | null
   */
  private function getStartNode():?StartNode{
    if( ! $this->parsed_data ){
      $this->parsed_data = BaseNode::parseData( $this->data );
    }

    return BaseNode::getStartNode( $this->parsed_data );
  }
  /**
   * @return Collection
   */
  public function getStartNodes(): Collection
  {
    if( ! $this->parsed_data ){
      $this->parsed_data = BaseNode::parseData( $this->data );
    }

    return BaseNode::getStartNodes( $this->parsed_data );
  }

  /**
   * @return string
   */
  public function getRequestType():string
  {
    return $this->getStartNode() ? $this->getStartNode()->getRequestType() : 'get';
  }

  /**
   * @return array
   */
  public function getMiddlewares(): array
  {
    $middlewares = data_get( $this, 'settings.middlewares', []);
    $middlewares =array_map( function($middleware){
      if(is_string($middleware)){
        return $middleware;
      }
      return data_get( $middleware, 'value');
    }, $middlewares );
    $middlewares = array_filter( $middlewares, function($middleware){
      return ! ! $middleware;
    });
    return $middlewares;
  }


  public function categories()
  {
      return $this->hasMany(CategoryObject::class, 'object_guid', 'guid');
  }

  public function categoryOptions()
  {
      return CategoryObject::select('altrp_categories.guid as value', 'altrp_categories.title as label')->leftJoin('altrp_categories', 'altrp_categories.guid', '=', 'altrp_category_objects.category_guid')
          ->where('altrp_category_objects.object_guid', $this->guid)->get();
  }

}
