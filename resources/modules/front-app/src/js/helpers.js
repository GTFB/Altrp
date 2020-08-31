import CONSTANTS from "../../../editor/src/js/consts";

export function getRoutes() {
  return import('./classes/Routes.js');
}
/**
 * @return {IconsManager}
 * */
export function iconsManager() {
    return window.iconsManager;
}

/**
 * Устанавливаент заголовок страницы на фронтенде
 * @param {string} title
 */
export function setTitle(title){
  let titleElement = document.title;
  if(!defaultTitle){
    defaultTitle = titleElement.innerHTML;
  }
  if(! title){
    title = defaultTitle;
  }
  if(document.title !== title){
    document.title = title;
  }
}

/**
 * @return {boolean}
 * */
export function isEditor() {
  return !!(window.altrpEditor || window.parent.altrpEditor);
}

/**
 * Переменная, в которой храниться измначальный заголовок
 * @var {string}
 */
let defaultTitle;

/**
 * Парсит стрку вводимую пользователем для опций селекта
 * @param string
 */
export function parseOptionsFromSettings(string) {
  if(! string){
    return[];
  }
  let options = string.split('\n');
  options = options.map(option=>{
    let value = option.split('|')[0];
    value = value.trim();
    let label = option.split('|')[1] || value;
    label = label.trim();
    return{
      value,
      label,
    }
  });
  return options;
}

/**
 * Получает медиа запрос для css по имени настройки
 * @param {string} screenSettingName
 * @return {string}
 */
export function getMediaQueryByName(screenSettingName) {
  let mediaQuery = '';
  CONSTANTS.SCREENS.forEach(screen=>{
    if(screen.name === screenSettingName){
      mediaQuery = screen.mediaQuery;
    }
  });
  return mediaQuery;
}
/**
 * Получает медиа запрос для css по имени настройки
 * @param {string} screenSettingName
 * @return {string}
 */
export function getMediaSettingsByName(screenSettingName) {
  let screen = CONSTANTS.SCREENS[0];
  CONSTANTS.SCREENS.forEach(_screen=>{
    if(_screen.name === screenSettingName){
      screen = _screen;
    }
  });
  return screen;
}

/**
 *@param {string} URLTemplate
 *@param {{}} object
 */
export function parseURLTemplate(URLTemplate, object = {}){
  let url = URLTemplate;
  // columnEditUrl = columnEditUrl.replace(':id', row.original.id);
  let idTemplates = url.match(/:([\s\S]+?)(\/|$)/g);
  if(! idTemplates){
    return url;
  }
  idTemplates.forEach(idTemplate=>{
    let replace = object[idTemplate.replace(/:|\//g, '')] || '';
    idTemplate = idTemplate.replace('/', '');
    url = url.replace(new RegExp(idTemplate,'g'), replace);
  });
  return url;
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