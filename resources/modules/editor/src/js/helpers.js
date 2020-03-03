import ElementSettings from "./classes/ElementSettings";

export function getTemplateId(){
  return (new URL(window.location)).searchParams.get('template_id');
}
/**
 * @param {array} names
 * */
export function getClassNames(names) {
  if(! names.length){
    return '';
  }
  let result = '';
  for(let cssClass of names){
    result += cssClass + ' ';
  }
  return result;
}

export function settingToState(setting) {
  if(! setting){
    return{};
  }
  if(! setting instanceof ElementSettings){
    throw 'Only Instance of ElementSettings can Transform to Component State'
  }
    return {
    value: setting.getValue(),
    label: setting.getLabel(),
  };
}