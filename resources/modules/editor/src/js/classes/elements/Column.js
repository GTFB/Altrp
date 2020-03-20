import BaseElement from "./BaseElement";

class Column  extends BaseElement {

  static getName(){
    return 'column';
  }
  static getTitle(){
    return 'Column';
  }
  static getType(){
    return 'column';
  }
  _registerControls(){
    this.startControlSection('content',{
      label: 'Column'
    });
    this.addControl('text',{
      label: 'Column'
    });
    this.endControlSection();

  }

  appendWidget(newWidget) {
    if(newWidget.getType() !== 'widget'){
      throw 'Only Widget can be a Child of Column';
    }
    this.appendChild(newWidget);
  }
}

export default Column