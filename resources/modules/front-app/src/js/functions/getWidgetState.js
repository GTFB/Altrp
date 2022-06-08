import getDataFromLocalStorage from "./getDataFromLocalStorage";

/**
 * Забирает состояние из localStorage
 * Для виджетов ,которые могут сохранять состояния при смене страниц
 * @param {string} widgetId
 * @param {*} _default
 * @return {boolean}
 */
export default function getWidgetState(widgetId, _default = null) {
  if (!widgetId) {
    return _default;
  }
  const path = `widget_state${widgetId}`;
  return getDataFromLocalStorage(path, _default);
}
