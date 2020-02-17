import BaseModule from './BaseModule';

class ElementsFabric extends BaseModule{
  parseData(object){
    let children = [];
    const elementClasses = this.modules.elementClasses;
    /**
     * @member {BaseElement} element
     * */
    let element = new (elementClasses.getElementClass(object.name));
    if( object.children && object.children.length ){
      for( let child of object.children){
        children.push( this.parseData( child ) );
      }
    }
    element.id = object.id;
    element.children = children;
    console.log(element.getId());
    return element;
  }
}

export default ElementsFabric;