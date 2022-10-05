import FrontElement from "../classes/FrontElement";
import checkElement from "./check-element";
/**
 *
 * @param {string} elementId
 * @param {{}} params
 * @return {FrontElement | null}
 */
export default function elementSearch(elementId, params = {}){
  let element = null;
  for(let area of page_areas){
    element = recursiveSearch(area?.template?.data, elementId, params)
    if (element){
      if(! (element instanceof FrontElement)){
        element = new FrontElement(element, true)
      }
      return element;
    }
  }
  let elements = appStore.getState().elements
  element = elements.find(el=> (el.props.element.getId() === elementId && checkElement(el.props.element, params))) || element;
  if (element?.props?.element){
    return element.props.element;
  }
  if(! (element instanceof FrontElement)){
    element = new FrontElement(element)
  }
  return element;
}

/**
 *
 * @param {FrontElement | {}} element
 * @param {string} elementId
 * @param {{}} params
 * @return {FrontElement | {} | null}
 */
export function recursiveSearch(element, elementId, params = {}){

  if(!element?.id){
    return null
  }
  if(element.id === elementId && checkElement(element, params)){
    return element
  }
  if(element?.children){
    for(let child of element.children){
      if(child.id === elementId && checkElement(child, params)){
        return child
      }
      let _el = recursiveSearch(child, elementId, params)
      if(_el){
        return _el;
      }
    }
  }
  return null
}

