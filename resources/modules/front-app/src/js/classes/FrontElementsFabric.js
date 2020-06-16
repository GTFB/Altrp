import FrontElement from "./FrontElement";

class FrontElementsFabric {
  parseData(object){
    let children = [];
    /**
     * @member {FrontElement} element
     * */
    let element = new FrontElement(object);
    if( object.children && object.children.length ){
      for( let child of object.children){
        frontElementsManager.checkElementExists(child.name) ?
            children.push( this.parseData(child, element) ) : '';      }
    }
    element.id = object.id;
    element.children = children;
    element.settings = object.settings;
    element.name = object.name;
    element.type = object.type;
    element.updateStyles();
    return element;
  }
}
window.frontElementsFabric = new FrontElementsFabric();
export default FrontElementsFabric;