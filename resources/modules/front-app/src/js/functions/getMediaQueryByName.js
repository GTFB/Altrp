import CONSTANTS from "../../../../editor/src/js/consts";

/**
 * Получает медиа запрос для css по имени настройки
 * @param {string} screenSettingName
 * @return {string}
 */
export default function getMediaQueryByName(screenSettingName) {
  let mediaQuery = "";
  CONSTANTS.SCREENS.forEach(screen => {
    if (screen.name === screenSettingName) {
      mediaQuery = screen.mediaQuery;
    }
  });
  return mediaQuery;
}
