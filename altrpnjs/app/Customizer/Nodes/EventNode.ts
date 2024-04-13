import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"

export default class EventNode extends BaseNode implements NodeInterface
{

  public getChildren(): []
  {
    // TODO: Implement getChildren() method.
    return []
  }
  public getContent(): string
  {
    // TODO: Implement getContent() method.
    return ''
  }
  parseCustomizerData( data  ): boolean
  {
    // TODO: Implement parseData() method.
    if( ! data ) {
      data = []
    }
    this.data = data.find( ( item )=> {
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

  public getItems(): []
  {
    return data_get( this.data, 'data.props.items', [] )
  }
  public getJSContent(): string
  {

    let JSContent = ''
    let name = data_get( this.data, 'data.name', [] );
    let data = data_get( this.data, 'data.data', [] );

    if(data.indexOf('context.') !== 0){
      data =`context.${data}`
    }
    //data = `${data}')`

    JSContent +=`
    this.setCustomizerData('${data}', await (require("../Models/Customizer").default).callCustomEvents("${name}", this.getCustomizerData('${data}')));
  `;
    for(const child of this.children){
      JSContent += child.getJSContent()
    }

    return JSContent
  }
}
