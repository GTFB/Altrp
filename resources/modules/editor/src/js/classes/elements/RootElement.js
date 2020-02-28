import BaseElement from "./BaseElement";

class RootElement extends BaseElement{
  constructor(){
    super();
  }
  static getName(){
    return 'root-element';
  }
  static getTitle(){
    return 'Page';
  }
}

export default RootElement;