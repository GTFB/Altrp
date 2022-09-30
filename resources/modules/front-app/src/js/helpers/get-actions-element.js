import elementSearchForAction from "./element-search-for-action";
import {v4} from "uuid";
import mbParseJSON from "../functions/mb-parse-JSON";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";

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

  const nodeWithAltrpModel = element.closest('[data-altrp-model]')
  let model = {}
  if(nodeWithAltrpModel){
    model = mbParseJSON(nodeWithAltrpModel.dataset.altrpModel, model)
  }

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

        _element = window.frontElementsFabric.cloneElement(_element)
        if(!_.isEmpty(model)){
          _element.setCardModel(new AltrpModel(model))
        }
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
