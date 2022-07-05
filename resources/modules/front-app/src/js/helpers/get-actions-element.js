import elementSearchForAction from "./element-search-for-action";
import {v4} from "uuid";
const ACTIONS_CACHE = (window.altrp.ACTIONS_CACHE = window.altrp.ACTIONS_CACHE || {})
/**
 *
 * @param  {HTMLElement} element
 * @param {string} attribute
 * @param {string} settingName
 * @param {string} actionPrefix
 * @returns {{actions: [] | null, element: (FrontElement|null|*)}}
 */
export default function getActionsElement(element,
                                          attribute,
                                          settingName,
                                          actionPrefix){
  let _element = element;
  let actions = null;
  if(element.dataset.elementUuid && _.get(ACTIONS_CACHE, `clickActions.${element.dataset.elementUuid}`)){
    actions = _.get(ACTIONS_CACHE, `${actionPrefix}.${element.dataset.elementUuid}.actions`);
    _element = _.get(ACTIONS_CACHE, `${actionPrefix}.${element.dataset.elementUuid}.element`);
  } else {
    while ((_element = _element?.closest(`[${attribute}]`))){
      const _el = elementSearchForAction(_element?.getAttribute(attribute))

      if(_el && ! _.isEmpty(_el.getSettings(settingName))){
        actions = _el.getSettings(settingName)
        _element = _el
        element.dataset.elementUuid = v4();
        _.set(ACTIONS_CACHE, `${actionPrefix}.${element.dataset.elementUuid}`, {actions, element:_element})
        break;
      }
      _element = _element.parentElement
    }
  }
  return {
    actions,
    element: _element
  }
}
