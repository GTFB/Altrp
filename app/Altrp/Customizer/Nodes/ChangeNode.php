<?php


namespace App\Altrp\Customizer\Nodes;


use Illuminate\Support\Collection;

class ChangeNode extends BaseNode implements NodeInterface
{
  public $data = null;

  public function getChildren(): array
  {
    // TODO: Implement getChildren() method.
    return [];
  }
  public function getContent(): string
  {
    // TODO: Implement getContent() method.
    return '';
  }
  function parseCustomizerData( Collection $data  ): bool
  {
    // TODO: Implement parseData() method.
    if( ! $data ) {
      $data = [];
    }
    $data = collect( $data );
    $this->data = $data->filter( function ( $item ) {
      return data_get( $item, 'type' ) === 'start';
    })->first();
    return true;
  }

  /**
   * @return string
   */
  public function getRequestType():string{
    return data_get( $this->data, 'data.request_type', 'get' );
  }

  public function getItems(): array
  {
    return data_get( $this->data, 'data.props.items', [] );
  }
  public function getPHPContent(): string
  {

    $PHPContent = '';
    $items = $this->getItems();
    foreach ( $items as $key => $item ) {
      $action = data_get( $item, 'action', 'set');
      $left = data_get( $item, 'left');
      $right = data_get( $item, 'right');
      $right_php_property = property_to_php( $right );


      switch ($action) {
        case 'set':{
          $left_php_property = change_property_to_php( $left, $right_php_property  );

        }break;
        case 'delete':{
          $left_php_property = change_property_to_php( $left, $right_php_property, 'unset' );
        } break;
      }
      if( $left_php_property == 'null'){
        continue;
      }
      $PHPContent .= "$left_php_property;";
    }
    foreach($this->children as $child){
      $PHPContent .= $child->getPHPContent();
    }
    return $PHPContent;
  }
}
