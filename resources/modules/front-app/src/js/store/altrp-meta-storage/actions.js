export const CHANGE_ALTRP_META = 'CHANGE_ALTRP_META';

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
