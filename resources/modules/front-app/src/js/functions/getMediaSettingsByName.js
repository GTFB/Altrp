import CONSTANTS from "../../../../editor/src/js/consts";

/**
 * Получает медиа запрос для css по имени настройки
 * @param {string} screenSettingName
 * @return {string}
 */
export default function getMediaSettingsByName(screenSettingName) {
  let screen = CONSTANTS.SCREENS[0];
  CONSTANTS.SCREENS.forEach(_screen => {
    if (_screen.name === screenSettingName) {
      screen = _screen;
    }
  });
  return screen;
}
