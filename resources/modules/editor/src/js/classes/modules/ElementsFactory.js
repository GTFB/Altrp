import BaseModule from './BaseModule';

class ElementsFactory extends BaseModule{
  parseData(object, parent){
    let children = [];
    const elementsManager = window.elementsManager;
    /**
     * @member {BaseElement} element
     * */
    let element = new (elementsManager.getElementClass(object.name));
    if( object.children && object.children.length ){
      for( let child of object.children){
        children.push( this.parseData(child, element) );
      }
    }
    element.id = object.id;
    element.children = children;
    element.settings = object.settings;
    if(parent){
      element.parent = parent;
    }
    return element;
  }
}

export default ElementsFactory;