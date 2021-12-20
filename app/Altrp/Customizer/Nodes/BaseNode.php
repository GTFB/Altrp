<?php

namespace App\Altrp\Customizer\Nodes;


use Illuminate\Support\Collection;
use phpDocumentor\Reflection\Types\Mixed_;

class BaseNode
{
  public $data = null;
  /**
   * @var BaseNode[]
   */
  protected $children = [];

  /**
   * @param BaseNode $node
   * @return void
   */
  public function addChild( BaseNode $node ){
    $this->children[] = $node;
  }

  public function getChildren(): array{
    return $this->children;
  }


  public function getProperty(): array
  {
    return data_get( $this->data, 'data.property', [] );
  }

  /**
   * Получить данный по пути
   * @param $path
   * @return mixed
   */
  public function getDataByPath( $path )
  {
    return data_get( $this->data, 'data.' . $path );
  }

  public function getPHPContent(): string{
    $PHPContent = '';

    foreach($this->children as $child){
      $PHPContent .= $child->getPHPContent();
    }

    return $PHPContent;
  }

  /**
   * @return string
   */
  public function getId(){
    return data_get( $this->data, 'id' );
  }
  public function __construct( $data ){
    $this->data = $data;
  }

  public static function findNodeById( $id, Collection $data ):?BaseNode{
    return $data->first( function( BaseNode $node ) use ($id){
      return $node->getId() == $id;
    });
  }

  /**
   * @param $type
   * @param $data
   * @return Collection
   */
  static public function getNodesByType( $type , Collection $data ): Collection
  {
    $nodes = collect([]);
    if( ! $type ){
      return $nodes;
    }
    $data->each(function ( $item ) use ( $type, &$nodes ){
      if( data_get( $item, 'data.type' ) == $type ){
        $nodes->add( $item );
      }
    });
    return $nodes;
  }

  /**
   * @param Collection $data
   * @return StartNode|null
   */
  static public function getStartNode( Collection $data ): ?StartNode
  {
    return self::getNodesByType( 'start', $data )->get( 0 );
  }
  /**
   * @param Collection $data
   * @return Collection
   */
  static public function getStartNodes( Collection $data ): Collection
  {
    return self::getNodesByType( 'start', $data );
  }

  public function findNextNodes( Collection $data ):Collection
  {

  }

  static public function parseData( $data ){
    $data = collect( $data );
    $data = $data->map(function( $item ) {
      $type = data_get( $item, 'type' );

      switch( $type ){
        case 'default': return new Edge( $item );
        case 'switch': return new SwitchNode( $item );
        case 'start': return new StartNode( $item );
        case 'return': return new ReturnNode( $item );
        case 'change': return new ChangeNode( $item );
        default: return new BaseNode( $item );
      }
    });
    $data->each( function ( BaseNode $node_item ) use ( $data ) {
      if( $node_item instanceof Edge ){
      }
      $node_id = $node_item->getId();
      $edges = BaseNode::getNodesByType('default', $data);
      $edges = $edges->filter( function ( Edge $node ) use( $node_id ){
        return $node->data['source'] == $node_id;
      });
      if( $node_item instanceof SwitchNode ){
        $edges = $edges->sortBy(function ( Edge $node, $key ) {
          if( data_get($node,'data.sourceHandle') ){
            $key = str_replace('yes-', '',data_get($node,'data.sourceHandle'));
          }
          return(int) $key;
        });
      }
      $edges->each(function ( Edge $edge ) use( &$data , &$node_item ){
        $child = BaseNode::findNodeById( $edge->data['target'], $data );
        if( $child ){
          $node_item->addChild( $child );
        }
      });
    });
    return  $data;
  }

}
