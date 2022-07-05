import FrontElement from "../classes/FrontElement";

/**
 *
 * @param {FrontElement|{}}element
 * @param {{}}params
 * @return {boolean}
 */
export default function checkElement(element, params = {}){
  let result = false;

  if(_.isEmpty(params.settings) || ! _.isArray(params.settings)){
    return ! result;
  }
  if(! element instanceof FrontElement){
    element = new FrontElement(element, true)
  }
  result = params.settings.find(settingParam => {
    let settingValue = element.getSettings(settingParam?.settingName);
    return settingParam?.checks.length === settingParam?.checks.filter(check=>{
      return _.isFunction(check) && check(settingValue)
    })
  })
  return result
}
