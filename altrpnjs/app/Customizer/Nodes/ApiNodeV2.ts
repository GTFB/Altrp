import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"
import stringToObject from "../../../helpers/string/stringToObject";

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
    const url = item.url;

    if(data) {
      data = stringToObject(data);
      data = JSON.stringify(data);
    } else {
      data = '{}'
    }

    if(headers) {
      headers = stringToObject(headers);
      headers = JSON.stringify(headers);
    } else {
      headers = '{}'
    }



    JSContent += `

    const source${this.getId()} = ${source ? `await Source.query().where("id", ${source}).first();` : 'null;'}
    let url${this.getId()};
    let method${this.getId()};
    let headers${this.getId()} = ${headers};
    let data${this.getId()} = ${data};
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
      data: data${this.getId()},
      params: data${this.getId()},
    }));
    ` : `
    return await axios.request( {
      method: method${this.getId()},
      url: url${this.getId()},
      headers: headers${this.getId()},
      data: data${this.getId()},
      params: data${this.getId()},
    });`}`
    for(const child of this.children){
      JSContent += child.getJSContent()
    }
    return JSContent
  }

}
