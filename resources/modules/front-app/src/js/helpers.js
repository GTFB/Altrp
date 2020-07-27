
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