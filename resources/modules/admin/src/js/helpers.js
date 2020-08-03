import IconsManager from "../../../editor/src/js/classes/modules/IconsManager";
import Resource from "../../../editor/src/js/classes/Resource";
import { isEmpty } from "lodash";

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

/** @function objectDeepCleaning
  * Удаляет все свойства id, и чистит settings
  * @param {object} collection
  * @return {object} Объект после удаления всех свойств id, и чистки settings
 */
export function objectDeepCleaning(collection) {
  if (typeof collection !== "object" || collection === null) return collection;
  if (collection.id) delete collection.id;

  if (Array.isArray(collection)) {
    for (let index = 0; index < collection.length; index++) {
      const element = collection[index];
      objectDeepCleaning(element);
    }
  } else {
    if (collection.hasOwnProperty("settings")) deleteEmptyPropsDeep(collection.settings);
    if (isEmpty(collection.settings)) delete collection.settings; // удаляем settings, если оно - пустой объект
    for (const key in collection) {
      if (collection.hasOwnProperty(key)) {
        const element = collection[key];
        objectDeepCleaning(element);
      }
    }
  }
  return collection;
}
/** @function deleteEmptyPropsDeep
  * Удаляет в объекте все свойства, значения которых - null, или "", или {}
  * @param {object} collection
 */
export function deleteEmptyPropsDeep(collection) {
  const deleteProps = [];
  for (const key in collection) {
    if (collection[key] === null || collection[key] === "") {
      deleteProps.push(key);
    }
    deleteProps.forEach(key => delete collection[key]);

    if (typeof collection[key] === "object") {
      deleteEmptyPropsDeep(collection[key]);
      if (isEmpty(collection[key])) delete collection[key];
    }
  }
}

// export function deleteEmptyPropsDeep(collection) {
//   for (const key in collection) {
//     if (collection.hasOwnProperty(key)) {
//       if (collection[key] === null) return delete collection[key];
//       if (collection[key] === "") return delete collection[key];
//       if (typeof collection[key] === "object") {
//         deleteEmptyPropsDeep(collection[key]);
//         if (isEmpty(collection[key])) delete collection[key];
//       }
//     }
//   }
// }
