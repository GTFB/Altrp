import  { Component } from "react";

class BaseElement extends Component{

  getId(){
    if(! this.id){
      this.id = BaseElement.generateId();
    }
    return this.id;
  }
  getName(){
    this.constructor.getName();
  }

  static generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

export default BaseElement