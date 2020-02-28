import RootElement from "../elements/RootElement";
import {getTemplateId} from "../../helpers";
import BaseModule from "./BaseModule";

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

}

export default TemplateDataStorage;