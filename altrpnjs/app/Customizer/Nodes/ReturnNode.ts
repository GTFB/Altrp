import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from 'App/Customizer/Nodes/NodeInterface'
import data_get from "../../../helpers/data_get"

export default class ReturnNode extends BaseNode implements NodeInterface
{

  public getChildren(): []
  {
    return []
  }
  public getContent(): string
  {
    // TODO: Implement getContent() method.
    return ''
  }
  parseCustomizerData( data:any[]  ): boolean
  {
    if( ! data ) {
      data = []
    }
    this.data = data.find( ( item ) =>{
      return data_get( item, 'type' ) === 'start'
    })
    return true
  }

  /**
   * @return string
   */
  public getRequestType():string{
    return data_get( this.data, 'data.request_type', 'get' )
  }

  public getJSContent(): string
  {
    let property:object |null|string = this.getProperty()
    property = this.customizer.propertyToJS( property )
    return 'return ' + property
  }
}
