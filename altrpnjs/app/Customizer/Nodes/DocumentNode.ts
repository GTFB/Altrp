import BaseNode from 'App/Customizer/Nodes/BaseNode';
import NodeInterface from 'App/Customizer/Nodes/NodeInterface';
import data_get from '../../../helpers/data_get';

export default class DocumentNode extends BaseNode implements NodeInterface {
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

    // let docData = data_get(item, "data.docData");
    const type = data_get(item, 'data.type');
    const fileName = data_get(item, 'data.fileName');
    // const template = data_get(item, "data.template");

    // JSContent += this.customizer.changeToJS("document.data", docData)
    JSContent += this.customizer.changeToJS('document.type', type);
    JSContent += this.customizer.changeToJS('document.fileName', fileName);
    // JSContent += this.customizer.changeToJS("document.template", template)
    JSContent += `await this.toDocument()
    `;

    // for(let item of items){
    //   let action = data_get( item, 'action', 'set')
    //   let left = data_get( item, 'left')
    //   let right = data_get( item, 'right')
    //   let rightJSProperty = this.customizer.propertyToJS( right )
    //   let leftJSProperty
    //
    //   switch (action) {
    //     case 'set':{
    //       leftJSProperty = this.customizer.changePropertyToJS( left, rightJSProperty  )
    //
    //     }break
    //     case 'delete':{
    //       leftJSProperty = this.customizer.changePropertyToJS( left, rightJSProperty, 'unset' )
    //     } break
    //   }
    //   if( leftJSProperty == 'null'){
    //     continue
    //   }
    //   JSContent += leftJSProperty
    // }
    for (const child of this.children) {
      JSContent += child.getJSContent();
    }
    return JSContent;
  }
}
