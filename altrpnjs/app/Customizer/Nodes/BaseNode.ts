import data_get from '../../../helpers/data_get'
import StartNode from './StartNode'
import Edge from 'App/Customizer/Nodes/Edge';
import SwitchNode from 'App/Customizer/Nodes/SwitchNode';
import ReturnNode from 'App/Customizer/Nodes/ReturnNode';
import ChangeNode from 'App/Customizer/Nodes/ChangeNode';
import str_replace from '../../../helpers/str_replace';
import * as _ from 'lodash'

export  default class BaseNode
{
  public data:object|null = null
  /**
   * @var BaseNode[]
   */
  protected children:BaseNode[] = []

  public addChild( node:BaseNode ){
    this.children.push( node )
  }

  public getChildren(): BaseNode[]{
    return this.children
  }


  public getProperty(): object |null
  {
    return data_get( this.data, 'data.property', {} )
  }

  public getDataByPath( path )
  {
    return data_get( this.data, 'data.' + path )
  }

  public getJSContent(): string{
    let JSContent = ''
    for(const child of this.children){
      JSContent += child.getJSContent()
    }

    return JSContent
  }

  /**
   * @return string
   */
  public getId(){
    return data_get( this.data, 'id' )
  }
  constructor( data ){
    this.data = data
  }

  public static findNodeById( id,  data: BaseNode[] ):BaseNode|undefined{
    return data.find( function(  node:BaseNode ) {
      return node.getId() == id
    })
  }

  /**
   * @param type
   * @param data
   * @return Collection
   */
  public static  getNodesByType( type , data ): any[]
  {
    const nodes:BaseNode[] = []
    if( ! type ){
      return nodes
    }
    data.forEach(( item )=> {
      if( data_get( item, 'data.type' ) == type ){
        nodes.push( item )
      }
    })
    return nodes
  }

  public static  getStartNode( data ): StartNode
  {
    return BaseNode.getNodesByType( 'start', data )[0]
  }

  public static  getStartNodes( data ): any[]
  {
    return BaseNode.getNodesByType( 'start', data )
  }

  public static  parseData( data ){

    data = data.map(function( item ) {
      const type = data_get( item, 'type' )

      switch( type ){
        case 'default': return new Edge( item )
        case 'switch': return new SwitchNode( item )
        case 'start': return new StartNode( item )
        case 'return': return new ReturnNode( item )
        case 'change': return new ChangeNode( item )
        default: return new BaseNode( item )
      }
    })
    data.forEach( ( node_item ) => {
      if( node_item instanceof Edge ){
      }
      const node_id = node_item.getId()
      let edges = BaseNode.getNodesByType('default', data)
      edges = edges.filter( ( node )=> {
        return node.data['source'] == node_id
      })
      if( node_item instanceof SwitchNode ){
        edges = _.sortBy(edges,( node, key )=> {
          if( data_get(node,'data.sourceHandle') ){
            key = str_replace('yes-', '',data_get(node,'data.sourceHandle'))
          }
          return key
        })
      }
      edges.forEach(( edge ) =>{
        const child = BaseNode.findNodeById( edge.data['target'], data )
        if( child ){
          node_item.addChild( child )
        }
      })
    })
    return  data
  }

}
