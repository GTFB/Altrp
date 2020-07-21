import {getElementState} from "./store/store";

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

/**
 *
 * @return {ElementsFactory}
 */
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

/**
 * @param {object} asset
 * @param {object} props
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}> | string}
 * @throws Исключение если иконка не найдена
 * */
export function renderAsset(asset, props = null) {
  switch (asset.assetType) {
    case 'icon': {
      return iconsManager().renderIcon(asset.name)
    }
    case 'image': {
      return React.createElement('img', {...props, src: asset.url})
    }
    case 'media': {
      return React.createElement('img', {...props, src: asset.url})
    }
    case undefined: {
      return React.createElement('img', {...props, src: '/img/nullImage.png'})
    }
  }
  return '';
}

export function renderAssetIcon(asset, props = null) {
  if(asset) {
    switch (asset.assetType) {
      case 'icon': {
        return iconsManager().renderIcon(asset.name)
      }
      case 'image': {
        return React.createElement('img', {...props, src: asset.url})
      }
      case 'media': {
        return React.createElement('img', {...props, src: asset.url})
      }
    }
  }
  return '';
}

export function getWindowWidth() {
  let window;
  if(isEditor()) {
    window = document.getElementById("editorWindow").offsetWidth;
  } else {
    window = document.getElementById("front-app").offsetWidth
  }
  return window
}

/**
 * Генерирует суфикс для всех настроек
 * на основе elementState и разврешения
 * @return {string}
 */
export function getElementSettingsSuffix() {
  if(! getElementState().value){
    return '';
  }
  return `_${getElementState().value}`
}