import IconsManager from "../../../editor/src/js/classes/modules/IconsManager";

export function redirect(url) {
  url = url || '/';
  window.location.assign(url);
}
export function generateId(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
/**
 * @return {IconsManager}
* */
export function iconsManager(){
  if(! window.iconsManager){
    window.iconsManager = new IconsManager();
  }
  return window.iconsManager;
}