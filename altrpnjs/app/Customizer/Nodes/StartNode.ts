import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from 'App/Customizer/Nodes/NodeInterface'
import data_get from '../../../helpers/data_get'

export default class StartNode extends BaseNode implements NodeInterface
{
  public getChildren(): []
  {
    return []
  }
  public getContent(): string
  {
    return ''
  }
  parseCustomizerData(  data ): boolean
  {
    if( ! data ) {
      data = []
    }
    this.data = data.filter( ( item ) =>{
      return data_get( item, 'type' ) === 'start'
    }).first()
    return true
  }

  /**
   * @return string
   */
  public getRequestType():string{
    return data_get( this.data, 'data.request_type', 'get' )
  }
  /**
   * @return boolean
   */
  public isAsyncMethod():boolean{
    if(this.customizer.type !== 'method'){
      return false
    }

    return data_get( this.data, 'data.async_method', false )
  }
  /**
   * @return boolean
   */
  public isStaticMethod():boolean{
    if(this.customizer.type !== 'method'){
      return false
    }
    return data_get( this.data, 'data.static_method', false )
  }
  /**
   * @return boolean
   */
  public getMethodParams():string[]{

    return data_get( this.data, 'data.methodParams', [] )
  }
}
