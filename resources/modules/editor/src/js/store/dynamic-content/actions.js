export const SHOW_DYNAMIC_CONTENT = 'SHOW_DYNAMIC_CONTENT';
export const HIDE_DYNAMIC_CONTENT = 'HIDE_DYNAMIC_CONTENT';

/**
 *
 * @param params
 * @param element - Элемент, на которые кликнули
 * @return {{type: string, params: *, element: *}}
 */
export function showDynamicContent(params, element) {
  return {
    type: SHOW_DYNAMIC_CONTENT,
    params,
    element
  };
}

export function closeDynamicContent() {
  return {
    type:  HIDE_DYNAMIC_CONTENT,
  };
}

