import BaseElement from "./BaseElement";
import {CONTROLLER_TEXTAREA, TAB_CONTENT, TAB_STYLE} from "../modules/ControllersManager";

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
  static getType(){
    return 'root-element';
  }
  _registerControllers(){
    if(this.controllersRegistered){
      return
    }
    this.controllers[TAB_CONTENT] = [{
      sectionName: 'content',
      sectionLabel: 'Text Section',
      controllers: [
        {
          controllerName: CONTROLLER_TEXTAREA,
          settingName: 'text',
        }
      ]
    }];
    this.controllersRegistered = true;
  }
}

export default RootElement;