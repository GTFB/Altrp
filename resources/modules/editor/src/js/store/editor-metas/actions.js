export const SET_EDITOR_META = 'SET_EDITOR_META';

/**
 *
 * @param {AltrpMeta} meta
 * @return {{type: string, metaName: string, meta: AltrpMeta}}
 */
export function setEditorMeta(meta) {
  const metaName = meta.getMetaName();
  return {
    type: SET_EDITOR_META,
    metaName,
    meta,
  };
}
