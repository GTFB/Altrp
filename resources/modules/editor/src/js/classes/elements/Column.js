import BaseElement from "./BaseElement";

class Column  extends BaseElement {

  static getName(){
    return 'section';
  }
  static getTitle(){
    return 'Section';
  }
  static getType(){
    return 'section';
  }
  _registerControls(){

  }
}

export default Column