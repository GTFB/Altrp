import BaseNode from 'App/Customizer/Nodes/BaseNode';
import NodeInterface from 'App/Customizer/Nodes/NodeInterface';
import data_get from '../../../helpers/data_get';
import _ from 'lodash';

export default class CrudNode extends BaseNode implements NodeInterface {
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

  public getJSContent(): string {
    let JSContent = '';
    const item = this.data.data.props.nodeData;

    const body = item.data.body;
    const method = item.data.method;
    const record = item.data.record;
    const model_id = _.parseInt(item.data.model_id);
    const custom = item.data.custom;
    const custom_data = item.data.custom_data;

    if (!method || !model_id) return '';

    JSContent += this.customizer.changeToJS('crud.body', JSON.stringify(body));
    JSContent += this.customizer.changeToJS('crud.method', method);
    JSContent += this.customizer.changeToJS('crud.record', record);
    JSContent += this.customizer.changeToJS('crud.model_id', model_id);

    if (custom && custom_data) {
      const params = custom_data.split(/\r\n|\r|\n/g);

      const paramsSplitted: [string, string][] = [];

      for (const param of params) {
        const paramParts = param.split('|');

        if (paramParts.length === 2) {
          paramsSplitted.push(paramParts);
        }
      }

      if (paramsSplitted.length > 0) {
        JSContent += this.customizer.changeToJS('crud.custom_data', JSON.stringify(paramsSplitted));
      }
    }

    JSContent += `await this.execCrud()
    `;

    for (const child of this.children) {
      JSContent += child.getJSContent();
    }
    return JSContent;
  }
}
