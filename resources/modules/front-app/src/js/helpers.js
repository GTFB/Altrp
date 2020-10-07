import CONSTANTS from "../../../editor/src/js/consts";
import appStore from "./store/store";
import AltrpModel from "../../../editor/src/js/classes/AltrpModel";

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
  let path = extractPathFromString(string);
  let _optionsFromData = getDataByPath(path);
  if(_.isArray(_optionsFromData)){
    return _optionsFromData;
  }
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
export function parseURLTemplate(URLTemplate = '', object = {}){
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
    case 'mediaBackground': {
      return React.createElement('div', {...props, style:{backgroundImage: `url(${asset.url})`}})
    }
    case undefined: {
      return React.createElement('img', {...props, src: '/img/nullImage.png'})
    }
  }
  return '';
}

/**
 * Парсим данный из строки в объект, если значение - путь, то берем значение из context
 * (если в context нет свойства, то не записываем)
 * @param {string} string
 * @param {AltrpModel} context
 */
export function parseParamsFromString(string, context = {}){
  const params = {};
  const urlParams = window.currentRouterMatch instanceof AltrpModel ? window.currentRouterMatch.getProperty('params') : {};

  if(! string){
    return params;
  }
  const lines = string.split('\n');
  lines.forEach((line)=>{
    let [left, right] = line.split('|');
    if(! left || ! right){
      return;
    }
    left = left.trim();
    right = right.trim();
    if(right.match(/{{([\s\S]+?)(?=}})/g)){
      if(context.getProperty(right.match(/{{([\s\S]+?)(?=}})/g)[0].replace('{{', ''))){//todo ошибка в сафари
        params[left] = context.getProperty(right.match(/{{([\s\S]+?)(?=}})/g)[0].replace('{{', '')) || '';
      } else {
        params[left] = urlParams[right] ? urlParams[right] : '';
      }
    } else {
      params[left] = right;
    }
    if(_.isObject(params[left])){
      delete params[left];
    }
  });
  return params;
}

/**
 * Функция для проверки условий
 * @param {[]} conditions
 * @param {boolean} AND - логичекое И или ИЛИ
 * @param {AltrpModel} model
 * @return {boolean}
 */
export function conditionsChecker(conditions = [], AND = true, model){
  if(! conditions.length){
    return true;
  }
  let result = AND;
  _.each(conditions, c =>{
    if(AND){
      result *= _conditionChecker(c, model);
    } else {
      result += _conditionChecker(c, model);
    }
  });
  return result;
}

/**
 * Функция для проверки одного условия
 * @param c
 * @param {AltrpModel} model
 * @return {boolean}
 */
function _conditionChecker(c, model){
  let result = 0;
  const {
     modelField,
     operator,
     value,
  } = c;
  return altrpCompare(model.getProperty(modelField), value, operator);
  switch(operator){
    case 'empty':{
      return ! model.getProperty(modelField, '');
    }
    case 'not_empty':{
      return ! ! model.getProperty(modelField, '');
    }
    case '==':{
      return _.isEqual(model.getProperty(modelField, ''), value );
    }
    case '<>':{
      return ! _.isEqual(model.getProperty(modelField, ''), value );
    }
    case '>':{
      return Number(model.getProperty(modelField, '')) > Number(value);
    }
    case '>=':{
      return Number(model.getProperty(modelField, '')) >= Number(value);
    }
    case '<':{
      return Number(model.getProperty(modelField, '')) < Number(value);
    }
    case '<=':{
      return Number(model.getProperty(modelField, '')) <= Number(value);
    }
  }
  return result;
}

/**
 * Получить данные
 * @param {string} path
 * @param {*} _default
 * @param {AltrpModel} context
 * @return {string}
 */
export function getDataByPath(path, _default = null, context = null){
  let {currentModel, currentDataStorage} = appStore.getState();
  if(context){
    currentModel = context;
  }
  const urlParams = window.currentRouterMatch instanceof AltrpModel ? window.currentRouterMatch.getProperty('params') : {};
  let value = _default;
  if(! _.isString(path)){
    return value;
  }
  if(path.indexOf('altrpdata.') === 0){
    path = path.replace('altrpdata.', '');
    value = currentDataStorage.getProperty(path, _default)
  } else {
    value = urlParams[path] ? urlParams[path] : currentModel.getProperty(path, _default);
  }
  return value ;
}

/**
 * Извелкает путь из строки
 * @param {string} string
 * @return {string}
 */
export function extractPathFromString(string = ''){
  let path = '';
  if(_.isString(string)){
    // path = string.match(/(?<={{)([\s\S]+?)(?=}})/g)[0]
    path = _.get(string.match(/{{([\s\S]+?)(?=}})/g), '0', '').replace('{{', '');
  }
  return path;
}

/**
 * Возвращает новый объект из свояств объекта, в именах которых присутствует префикс prefix
 * @param {string} prefix - строка для поиска (например 'test')
 * @param {{}} object - если в объекте есть свойство test__test то вернет {test: test__test_value}
 * @return {{}}
 */
export function getObjectByPrefix(prefix = '', object = {}){
  let result = {};
  if(! prefix){
    return result;
  }
  _.forEach(object, (value, key) =>{
    if(key.indexOf(`${prefix}__`, '') === 0){
      result[key.replace(`${prefix}__`, '')] = value;
    }
  });
  return result;
}

/**
 * Возвращает объект из json-строки если возможно
 * @param {string} string
 * @param {*} _default
 * @return {*}
 */
export function mbParseJSON(string, _default = null){
  try{
    return JSON.parse(string);
  } catch(e){
    return _default;
  }
}

/**
 * Функция для сравнения значений
 * @param leftValue
 * @param rightValue
 * @param operator
 * @return {boolean}
 */
export function altrpCompare( leftValue = '', rightValue = '', operator = 'not_empty' ) {
  switch(operator){
    case 'empty':{
      return  _.isEmpty(leftValue,);
    }
    case 'not_empty':{
      return !  _.isEmpty(leftValue,);
    }
    case '==':{
      return _.isEqual(leftValue, rightValue);
    }
    case '===':{
      return _.isEqual(leftValue, rightValue);
    }
    case '<>':{
      return ! _.isEqual(leftValue, rightValue );
    }
    case '>':{
      return Number(leftValue) > Number(rightValue);
    }
    case '>=':{
      return Number(leftValue) >= Number(rightValue);
    }
    case '<':{
      return Number(leftValue) < Number(rightValue);
    }
    case '<=':{
      return Number(leftValue) <= Number(rightValue);
    }
  }
}

export const CONDITIONS_OPTIONS = [
  {
    value: 'empty',
    label: 'Empty',
  },
  {
    value: 'not_empty',
    label: 'Not Empty',
  },
  {
    value: '==',
    label: 'Equals',
  },
  {
    value: '<>',
    label: 'Not Equals',
  },
  {
    value: 'between',
    label: 'Between',
  },
  {
    value: '>',
    label: '>',
  },
  {
    value: '>=',
    label: '>=',
  },
  {
    value: '<',
    label: '<',
  },
  {
    value: '<=',
    label: '<=',
  },
];