import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"
import stringToObject from "../../../helpers/string/stringToObject";
import Customizer from "App/Models/Customizer";

export default class ApiNodeV2 extends BaseNode implements NodeInterface
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
    let name = item.name;
    let data = item.data;
    let params: string | object = '';
    const url = item.url;

    if(data) {
      data = data.trim();
      if(data.indexOf('{{') === 0){
        data = Customizer.replaceMustache(data)
      } else {
        data = stringToObject(data);
        data = JSON.stringify(data);
      }
    } else {
      data = '{}'
    }

    if(method.toLowerCase() === 'get'){
      params = stringToObject(item.data);
      params = JSON.stringify(params);
      params = Customizer.replaceMustache(params, '" + ', ' + "')
      params = `params: ${params},`
    }
    if(method.toLowerCase() === 'get' || method.toLowerCase() === 'delete'){
      data = ''
    } else {
      data = Customizer.replaceMustache(data, '" + ', ' + "')
      data = `data: ${data},`
    }
    if(headers) {
      headers = stringToObject(headers);
      headers = JSON.stringify(headers);
      headers = Customizer.replaceMustache(headers, '" + ', ' + "')
    } else {
      headers = '{}'
    }



    JSContent += `

    const source${this.getId()} = ${source ? `await Source.query().where("id", ${source}).first();` : 'null;'}
    let url${this.getId()};
    let method${this.getId()};
    let headers${this.getId()} = ${headers};

    if(source${this.getId()}){
      url${this.getId()} = source${this.getId()}?.url;
      method${this.getId()} = source${this.getId()}?.request_type || 'get';
    } else {
      url${this.getId()} = '${url}';
      method${this.getId()} = '${method ? method : 'get'}';
    }
    if(! url${this.getId()}){
      throw new Error("API URL is null");
    }

    ${name? `
    this.setCustomizerData('context.${name}', await axios.request( {
      method: method${this.getId()},
      url: url${this.getId()},
      headers: headers${this.getId()},
      ${data}
      ${params}
    }));
    ` : `
    return await axios.request( {
      method: method${this.getId()},
      url: url${this.getId()},
      headers: headers${this.getId()},
      ${data}
      ${params}
    });`}`
    for(const child of this.children){
      JSContent += child.getJSContent()
    }
    return JSContent
  }

}
