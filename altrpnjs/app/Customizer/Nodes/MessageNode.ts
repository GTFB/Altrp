import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from "App/Customizer/Nodes/NodeInterface"
import data_get from "../../../helpers/data_get"

export default class MessageNode extends BaseNode implements NodeInterface
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

  public getJSContent(): string {
    let JSContent = "";

    const item = this.data.data.props.nodeData;

    const type = item.type;
    const entitiesData = JSON.stringify(item.data.entitiesData);
    const entities = item.data.entities;
    const content = JSON.stringify(item.data.content);
    const channel = item.data.channel;
    const start_text = item.data.start_text || "";

    JSContent += this.customizer.changeToJS("message.type", type)
    JSContent += this.customizer.changeToJS("message.entitiesData", entitiesData)
    JSContent += this.customizer.changeToJS("message.entities", entities)
    JSContent += this.customizer.changeToJS("message.content", content)
    JSContent += this.customizer.changeToJS("message.channel", channel)
    JSContent += this.customizer.changeToJS("message.start_text", start_text)

    JSContent += `await this.sendNotification()
    `

    return JSContent
  }
}
