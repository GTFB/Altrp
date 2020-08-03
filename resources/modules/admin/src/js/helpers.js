import IconsManager from "../../../editor/src/js/classes/modules/IconsManager";
import Resource from "../../../editor/src/js/classes/Resource";

export function redirect(url) {
  url = url || '/';
  window.location.assign(url);
}
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
/**
 * @return {IconsManager}
* */
export function iconsManager() {
  if (!window.iconsManager) {
    window.iconsManager = new IconsManager();
  }
  return window.iconsManager;
}

export async function logout() {
  let res = await (new Resource({ route: '/logout' })).post();
  redirect(res.location)
}

export function pageReload() {
  document.location.reload(true);
}

/** @function deleteIdsDeep
  * Удаляет все свойства id из коллекции
  * @param {object} collection
  * @return {object} Объект после удаления всех свойств id
 */
export function deleteIdsDeep(collection) {
  if (typeof collection !== "object" || collection === null) return collection;
  if (collection.id) delete collection.id;

  if (Array.isArray(collection)) {
    for (let index = 0; index < collection.length; index++) {
      const element = collection[index];
      deleteIdsDeep(element);
    }
  } else {
    for (const key in collection) {
      if (collection.hasOwnProperty(key)) {
        const element = collection[key];
        deleteIdsDeep(element);
      }
    }
  }
  return collection;
}
