import BaseNode from 'App/Customizer/Nodes/BaseNode'
import NodeInterface from 'App/Customizer/Nodes/NodeInterface'
import data_get from "../../../helpers/data_get"

export default class ReturnNode extends BaseNode implements NodeInterface {

  public getChildren(): [] {
    return []
  }

  public getContent(): string {
    // TODO: Implement getContent() method.
    return ''
  }

  parseCustomizerData(data: any[]): boolean {
    if (!data) {
      data = []
    }
    this.data = data.find((item) => {
      return data_get(item, 'type') === 'start'
    })
    return true
  }

  /**
   * @return string
   */
  public getRequestType(): string {
    return data_get(this.data, 'data.request_type', 'get')
  }

  getStatus() {
    return data_get(this.data, 'data.status')
  }

  public getJSContent(): string {
    let property: object | null | string = this.getProperty()

    const status = this.getStatus()

    let content = "";

    if (status) {
      content += `httpContext.response.status(${status});
      `
    }

    property = this.customizer.propertyToJS(property)
    if (this.customizer?.type === 'helper') {
      content += property
    } else {
      content += `return ${property};`

    }

    return content
  }
}
