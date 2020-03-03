import ElementSettings from "../ElementSettings";

class BaseElement {

  constructor(){
    this.settings = {};
    this.children = [];
    this.componentClass = window.elementsManager.getComponentClass(this.getName())
  }

  getId(){
    if(! this.id){
      this.id = BaseElement.generateId();
    }
    return this.id;
  }

  getName(){
    return this.constructor.getName();
  }

  getTitle(){
    return this.constructor.getTitle();
  }

  static generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  toObject(){
    if(!this.component){
      throw 'Element Must Composites with Some Component';
    }
    let data = {data:{}};
    data.id = this.getId();
    data.name = this.getName();
    data.data.settings = this.settings;
    let children = this.getChildren();
    if(children){
      data.data.children = children;
    }
    return data;
  }

  getChildren() {
    if(! this.children.length){
      return;
    }
    let children = [];
    for( let _c of this.children ){
      children.push(_c.toObject())
    }
    return children;
  }

  appendChild(child){
    this.children.push(child);
  }

  insertAfter(childId, child){

  }

  getSettings(settingName){
    if(! settingName){
      return this.settings;
    }
    if(! this.settings[settingName]){
      return '';
    }
    return this.settings[settingName];
  }

  setSettings(settingName, value){
    if(! this.settings[settingName]){
      this.settings[settingName] = new ElementSettings(settingName);
    }
    this.settings[settingName].setValue(value);
  }
}

export default BaseElement