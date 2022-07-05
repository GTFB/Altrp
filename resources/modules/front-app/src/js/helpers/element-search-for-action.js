import checkElement from "./check-element";
import elementSearch from "./element-search";
/**
 *
 * @param {string} elementActionId
 * @param {{}} params
 * @return {FrontElement | null}
 */
export default function elementSearchForAction(elementActionId, params = {}){
  let element = null;
  let elements = appStore.getState().elements

  element = elements.find(el=> (el.props.element.getIdForAction() === elementActionId && checkElement(el.props.element, params))) || element;
  if (element?.props?.element){
    return element.props.element;
  }
  if(! element){
    element = elementSearch(elementActionId, params)
  }
  return element;
}
