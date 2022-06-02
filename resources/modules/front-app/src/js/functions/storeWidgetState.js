import saveDataToLocalStorage from "./saveDataToLocalStorage";

/**
 * Сохраняет состояние виджет в localStorage
 * Для виджетов ,которые могут сохранять состояния при смене страниц
 * @param {string} widgetId
 * @param {*} state
 * @return {boolean}
 */
export default function storeWidgetState(widgetId, state = null) {
  if (!widgetId) {
    return false;
  }
  const path = `widget_state${widgetId}`;
  return saveDataToLocalStorage(path, state);
}
