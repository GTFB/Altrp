import RootElement from "../elements/RootElement";

class TemplateDataStorage {

  constructor(){
    this.rootElement = new RootElement();
  }

  replaceAll(element) {
    if(! element instanceof RootElement ){
      throw 'Корнефой эллемент должен быть RootElement';
    }
    this.rootElement = element;
  }
}

export default TemplateDataStorage;