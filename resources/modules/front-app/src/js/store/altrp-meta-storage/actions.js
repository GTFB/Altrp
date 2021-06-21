export const CHANGE_ALTRP_META = 'CHANGE_ALTRP_META';
export const REPLACE_ALTRP_META = 'REPLACE_ALTRP_META';
export const REPLACE_ALTRP_META_FROM_LOCAL_STORAGE = 'REPLACE_ALTRP_META_FROM_LOCAL_STORAGE';

/**
 *
 * @param {string}metaName
 * @param {*} metaValue
 * @return {{}} -
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function changeAltrpMeta(metaName, metaValue) {
  return {
    type: CHANGE_ALTRP_META,
    metaValue,
    metaName
  };
}

/**
 *
 * @param {{}} metaValue
 * @param {boolean} fromLocalStorage
 * @return {{}} -
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function replaceAltrpMeta(metaValue, fromLocalStorage = false) {
  return {
    type: fromLocalStorage ? REPLACE_ALTRP_META_FROM_LOCAL_STORAGE : REPLACE_ALTRP_META,
    metaValue,
  };
}
