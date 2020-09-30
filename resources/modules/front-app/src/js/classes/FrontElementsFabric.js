import FrontElement from "./FrontElement";

class FrontElementsFabric {
  /**
   * парсим данные шаблона
   * @param {object} object
   * @param {FrontElement | null} parent
   * @param {int | null} pageId
   * @param {array | null} models
   * @return {FrontElement}
   */
  parseData(object, parent, pageId, models){
    let children = [];
    /**
     * @member {FrontElement} element
     * */
    let element = new FrontElement(object);
    if(pageId){
      element.addModelInfo({
        modelName: 'page',
        modelId: pageId,
      });
    }
    if(_.isArray(models)){
      for(let model of models){
        element.addModelInfo({
            ...model,
        });
      }
    }
    if( object.children && object.children.length ){
      for( let child of object.children){
        frontElementsManager.checkElementExists(child.name) ?
            children.push( this.parseData(child, element) ) : '';
      }
    }
    element.id = object.id;
    element.children = children;
    element.settings = object.settings;
    element.name = object.name;
    element.type = object.type;
    element.dynamicContentSettings = object.dynamicContentSettings;
    if(parent){
      element.setParent(parent);
    }
    element.update();
    return element;
  }
}
window.frontElementsFabric = new FrontElementsFabric();
export default window.frontElementsFabric;