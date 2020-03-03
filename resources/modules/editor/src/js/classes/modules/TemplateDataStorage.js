import RootElement from "../elements/RootElement";
import {getTemplateId} from "../../helpers";
import BaseModule from "./BaseModule";
import store from '../../store/store';
import {setCurrentElement, SET_CURRENT_ELEMENT} from '../../store/current-element/actions'
import BaseElement from "../elements/BaseElement";

class TemplateDataStorage extends BaseModule{

  constructor(modules){
    super(modules);
  }

  load(){
    let templateId = getTemplateId();
    if(! templateId){
      this.rootElement = new RootElement();
      this.modules.renderer.renderRootElement(this.rootElement);
    }
  }

  replaceAll(element) {
    if(! element instanceof RootElement ){
      throw 'Expect RootElement as root element;)';
    }
    this.rootElement = element;
  }

  getTemplateData() {
    return this.rootElement.toObject();
  }

  setCurrentRootElement(){
    this.currentElement = this.rootElement;
    store.dispatch(setCurrentElement(this.currentElement));
    return this.currentElement;
  }

  setCurrentElement(element){
    if(! element instanceof BaseElement){
      throw 'Only Base Element Can Be Set as Default'
    }
    store.dispatch(setCurrentElement(element));
    return this.currentElement = element;
  }

  getCurrentElement(){
    if(!this.currentElement){
      return this.setCurrentRootElement();
    }
    return this.currentElement;
  }

}

export default TemplateDataStorage;