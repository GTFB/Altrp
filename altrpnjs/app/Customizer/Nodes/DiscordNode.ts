import BaseNode from 'App/Customizer/Nodes/BaseNode';
import NodeInterface from 'App/Customizer/Nodes/NodeInterface';
import data_get from '../../../helpers/data_get';

export default class DiscordNode extends BaseNode implements NodeInterface {
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

    const data = JSON.stringify(this.data.data?.props?.nodeData?.data || []);

    JSContent += this.customizer.changeToJS('discord', data);

    JSContent += `await this.discord()
    `;

    return JSContent;
  }
}
