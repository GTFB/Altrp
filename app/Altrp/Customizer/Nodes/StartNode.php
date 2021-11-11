<?php


namespace App\Altrp\Customizer\Nodes;


use Illuminate\Support\Collection;

class StartNode extends BaseNode implements NodeInterface
{
  public $data = null;


  public function getChildren(): array
  {
    return [];
  }
  public function getContent(): string
  {
    return '';
  }
  function parseCustomizerData( Collection $data ): bool
  {
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
}
