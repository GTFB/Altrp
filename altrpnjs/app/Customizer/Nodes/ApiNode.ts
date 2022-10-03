import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"
import axios from "axios";
import altrpRandomId from "../../../helpers/altrpRandomId";

export default class ApiNode extends BaseNode implements NodeInterface
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

  public getJSContent(): string
  {

    let JSContent = ''
    const item = this.data.data.props.nodeData?.data;

    const source = parseInt(item.source);
    const method = item.method;
    let headers = item.headers;
    let data = item.data;
    const url = item.url;

    if(data) {
      data = data.split("\n").map((param) => {
        const paramValues = param.split("|");

        if(paramValues.length === 2) {
          return paramValues
        }
      })

      data = JSON.stringify(data)
    }

    if(headers) {
      headers = headers.split("\n").map((param) => {
        const paramValues = param.split("|");

        if(paramValues.length === 2) {
          return paramValues
        }
      })

      headers = JSON.stringify(headers)
    }
    // axios()

    JSContent += this.customizer.changeToJS("api.source", source);
    JSContent += this.customizer.changeToJS("api.method", method);
    JSContent += this.customizer.changeToJS("api.headers", headers);
    JSContent += this.customizer.changeToJS("api.data", data);
    JSContent += this.customizer.changeToJS("api.url", url);

    JSContent += `

     const ${this.getsourceVarName()} = await Source.query().where("id", ${source}).first();
     let url
     if(${this.getsourceVarName()}){
        url =
     }
    `

    for(const child of this.children){
      JSContent += child.getJSContent()
    }
    return JSContent
  }

  private getsourceVarName(){
    let id = this.getId()
    if(! id){
      id = altrpRandomId()
    }
    return `source${id}`

  }
}
