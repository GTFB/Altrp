import data_get from '../../../helpers/data_get';
import Customizer from 'App/Models/Customizer';

export default class BaseNode {
  /**
   * @var BaseNode[]
   */
  protected children: BaseNode[] = [];

  public addChild(node: BaseNode) {
    this.children.push(node);
  }

  public getChildren(): BaseNode[] {
    return this.children;
  }

  public getProperty(): object | null {
    return data_get(this.data, 'data.property', {});
  }

  public getDataByPath(path) {
    return data_get(this.data, 'data.' + path);
  }

  public getJSContent(): string {
    let JSContent = '';
    for (const child of this.children) {
      JSContent += child.getJSContent();
    }

    return JSContent;
  }

  /**
   * @return string
   */
  public getId() {
    return data_get(this.data, 'id');
  }
  constructor(public data, protected customizer: Customizer) {}

  public static findNodeById(id, data: BaseNode[]): BaseNode | undefined {
    return data.find(function (node: BaseNode) {
      return node.getId() == id;
    });
  }

  /**
   * @param type
   * @param data
   * @return Collection
   */
  public static getNodesByType(type, data): any[] {
    const nodes: BaseNode[] = [];
    if (!type) {
      return nodes;
    }
    data.forEach((item) => {
      if (data_get(item, 'data.type') == type) {
        nodes.push(item);
      }
    });
    return nodes;
  }

  public static getStartNode(data): any {
    return BaseNode.getNodesByType('start', data)[0];
  }

  public static getStartNodes(data): any[] {
    return BaseNode.getNodesByType('start', data);
  }
}
