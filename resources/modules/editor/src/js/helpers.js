
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
    return {
    value: setting.getValue(),
    label: setting.getLabel(),
  };
}

export function getEditorContent(){
  return window.frames[0].window.altrpEditorContent;
}
/**
 * @return {Editor}
 * */
export function getEditor() {
  return window.altrpEditor || window.parent.altrpEditor;
}

/**
 * @return {boolean}
 * */
export function isEditor() {
  return !!(window.altrpEditor || window.parent.altrpEditor);
}

export function editorSetCurrentElement(element){
  getEditor().modules.templateDataStorage.setCurrentElement(element);
}
/**
 * @return {TemplateDataStorage}
 * */
export function getTemplateDataStorage() {
  return window.altrpEditor.modules.templateDataStorage
}

export const CONSTANTS = {
  TEMPLATE_UPDATED: 'TEMPLATE_UPDATED',
  TEMPLATE_NEED_UPDATE: 'TEMPLATE_NEED_UPDATE',
  TEMPLATE_SAVING: 'TEMPLATE_SAVING',
  DEFAULT_BREAKPOINT: 'DEFAULT_BREAKPOINT',
};

export function getFactory() {
  return getEditor().modules.elementsFactory;
}
/**
 * @param {Event} e
 * @param {HTMLElement} element
 * */
export function topOrBottomHover(e, element) {
  let rect = element.getBoundingClientRect();
  let y = e.clientY - rect.top;
  return (y < (rect.height / 2)) ? 'top' : 'bottom';
}
/**
 * @return {IconsManager}
 * */
export function iconsManager() {
  return window.iconsManager;
}