import mbParseJSON from "../functions/mb-parse-JSON";
import conditionsChecker from "../functions/conditionsChecker";
import replaceContentWithData from "../functions/replaceContentWithData";

export default function prepareHtml(htmlString, modelData = {}) {

  let newHtml = document.createElement('html')
  newHtml.innerHTML = htmlString
  const sectionWrapper = newHtml.querySelector('body > .sections-wrapper')

  if(! _.isEmpty(modelData)){
    sectionWrapper.setAttribute('data-altrp-model', JSON.stringify(modelData))
  }
  if (htmlString.indexOf('conditional_other_display') > -1) {
    _hideElements(newHtml, modelData)
  }

  _replaceAttributesIfExists(newHtml, modelData)
  htmlString = newHtml.innerHTML
  return htmlString

}

function _replaceAttributesIfExists(element, modelData = {}){
  const elements = element.querySelectorAll('[data-replace-attributes-if-exists]')
  _.forEach(elements, e => {
    let data = e.dataset.replaceAttributesIfExists || ''
    data = data.split(',')
    data.forEach(d=>{
      let [key, value] = d.split('|')
      key = key.trim()
      value = value.trim()
      value = replaceContentWithData(value, modelData)
      if(value){
        e.setAttribute(key, value)
      }
    })
  })
}

function _hideElements(element, modelData = {}) {

  const elements = element.querySelectorAll('[data-altrp-settings*="conditional_other_display"]')
  _.forEach(elements, e => {
    let altrpSettings = e.dataset.altrpSettings
    altrpSettings = mbParseJSON(altrpSettings, {})
    if(altrpSettings.conditional_other){
      let conditions = altrpSettings.conditions || []
      conditions = conditions.map(c => {
        const {
          conditional_model_field: modelField,
          conditional_other_operator: operator,
          conditional_other_condition_value: value
        } = c;
        return {
          modelField,
          operator,
          value
        };
      });
      const elementDisplay = conditionsChecker(
        conditions,
        altrpSettings.conditional_other_display === "AND",
        modelData,
        true
      );
      if(! elementDisplay){
        e.style.setProperty("display",'none')
      } else {
        e.style.removeProperty('display')
      }
    }
  })
}
