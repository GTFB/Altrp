import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"

export default class ChangeNode extends BaseNode implements NodeInterface
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
    let items = this.getItems()

    for(let item of items){
      let action = data_get( item, 'action', 'set')
      let left = data_get( item, 'left')
      let right = data_get( item, 'right')
      let rightJSProperty = this.customizer.propertyToJS( right )
      let leftJSProperty
      switch (action) {
        case 'set':{
          leftJSProperty = this.customizer.changePropertyToJS( left, rightJSProperty  )

        }break
        case 'delete':{
          leftJSProperty = this.customizer.changePropertyToJS( left, rightJSProperty, 'unset' )
        } break
      }
      if( leftJSProperty == 'null'){
        continue
      }
      JSContent += leftJSProperty
    }

    for(const child of this.children){
      JSContent += child.getJSContent()
    }

    return JSContent
  }
}
