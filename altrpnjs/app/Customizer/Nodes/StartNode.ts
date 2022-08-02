import BaseNode from 'App/Customizer/Nodes/BaseNode';
import NodeInterface from 'App/Customizer/Nodes/NodeInterface';
import data_get from '../../../helpers/data_get';

export default class StartNode extends BaseNode implements NodeInterface {
  public getChildren(): [] {
    return [];
  }
  public getContent(): string {
    return '';
  }
  parseCustomizerData(data): boolean {
    if (!data) {
      data = [];
    }
    this.data = data
      .filter((item) => {
        return data_get(item, 'type') === 'start';
      })
      .first();
    return true;
  }

  /**
   * @return string
   */
  public getRequestType(): string {
    return data_get(this.data, 'data.request_type', 'get');
  }
}
