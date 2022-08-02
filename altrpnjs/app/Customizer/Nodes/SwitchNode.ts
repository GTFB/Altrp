import BaseNode from 'App/Customizer/Nodes/BaseNode';
import NodeInterface from 'App/Customizer/Nodes/NodeInterface';
import data_get from '../../../helpers/data_get';

export default class SwitchNode extends BaseNode implements NodeInterface {
  public getChildren(): [] {
    // TODO: Implement getChildren() method.
    return [];
  }

  public getContent(): string {
    // TODO: Implement getContent() method.
    return '';
  }

  parseCustomizerData(data): boolean {
    // TODO: Implement parseData() method.
    if (!data) {
      data = [];
    }
    this.data = data.find((item) => {
      return data_get(item, 'type') === 'start';
    });
    return true;
  }

  /**
   * @return string
   */
  public getRequestType(): string {
    return data_get(this.data, 'data.request_type', 'get');
  }

  public getItems(): [] {
    return data_get(this.data, 'data.props.items', []);
  }
  public getProperty(): [] {
    return data_get(this.data, 'data.property', []);
  }

  public getJSContent(): string {
    let JSContent = '';
    let items = this.getItems();
    let property = this.getProperty();
    let leftJSProperty = this.customizer.propertyToJS(property);
    for (let key in items) {
      if (!items.hasOwnProperty(key)) {
        continue;
      }
      let item = items[key];
      if (!data_get(item, 'operator')) {
        continue;
      }
      let rightJSProperty = this.customizer.propertyToJS(item);
      let compare = this.customizer.customizerBuildCompare(
        data_get(item, 'operator'),
        leftJSProperty,
        rightJSProperty
      );
      JSContent += `if( ${compare} ){`;
      if (data_get(this.children, key)) {
        JSContent += data_get(this.children, key).getJSContent();
      }
      JSContent += '}';
    }
    return JSContent;
  }
}
