<?php


namespace App\Altrp\Customizer\Nodes;


use Illuminate\Support\Collection;

class SwitchNode extends BaseNode implements NodeInterface
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

  function parseCustomizerData( Collection $data ): bool
  {
    // TODO: Implement parseData() method.
    if ( ! $data ) {
      $data = [];
    }
    $data = collect( $data );
    $this->data = $data->filter( function ( $item ) {
      return data_get( $item, 'type' ) === 'start';
    } )->first();
    return true;
  }

  /**
   * @return string
   */
  public function getRequestType(): string
  {
    return data_get( $this->data, 'data.request_type', 'get' );
  }

  public function getItems(): array
  {
    return data_get( $this->data, 'data.props.items', [] );
  }
  public function getProperty(): array
  {
    return data_get( $this->data, 'data.property', [] );
  }

  public function getPHPContent(): string
  {

    $PHPContent = '';
    $items = $this->getItems();
    $property = $this->getProperty();
    $left_php_property = property_to_php( $property );
    foreach ( $items as $key => $item ) {
      if( ! data_get( $item,'operator')){
        continue;
      }
      $right_php_property = property_to_php( $item );
      $compare = customizer_build_compare(data_get( $item,'operator'),$left_php_property,  $right_php_property);
      $PHPContent .= "if( $compare ){";
      if(data_get( $this->children, $key)){
        $PHPContent.= data_get( $this->children, $key)->getPHPContent();
      }
      $PHPContent .= "}";
    }
    return $PHPContent;
  }
}
