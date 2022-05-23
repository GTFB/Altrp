import CONSTANTS from "../../../../editor/src/js/consts";

/**
 * значение настройки в зависимости от разрешения можно использовать вне виджетов с объектом настроек
 * @param {{}} settings - объект настроек
 * @param {string} settingName
 * @param {string} elementState
 * @param {*} _default
 * @return {*}
 */
export default function getResponsiveSetting(
  settings,
  settingName,
  elementState = "",
  _default = null
) {
  let  currentScreen
  try{
    currentScreen = window.parent.appStore.getState().currentScreen
  } catch(e){
    // console.trace(e);
    currentScreen = window.appStore.getState().currentScreen
  }
  let _settingName = `${settingName}_${elementState}_`;
  // if (currentScreen.name === CONSTANTS.DEFAULT_BREAKPOINT) {
  //   let setting = settings[_settingName];
  //   if (setting === undefined) {
  //     if(elementState){
  //       return undefined
  //     }
  //     setting = _.get(settings, settingName, _default);
  //   }
  //   return setting;
  // }
  let suffix = currentScreen.name;

  _settingName = `${settingName}_${elementState}_${suffix}`;
  let setting = settings[_settingName];
  if (setting === undefined) {
    for (let screen of [...CONSTANTS.SCREENS].reverse()) {
      if (
        currentScreen.id < screen.id
        // ||
        // screen.name === CONSTANTS.DEFAULT_BREAKPOINT
      ) {
        continue;
      }

      if (screen.name === CONSTANTS.DEFAULT_BREAKPOINT) {
        _settingName = `${settingName}_${elementState}_`;
      } else {
        _settingName = `${settingName}_${elementState}_${screen.name}`;
      }


      if (settings[_settingName] !== undefined) {
        setting = settings[_settingName];
        break;
      }
    }
  }



  if (setting === undefined) {
    if(elementState){
      return undefined
    }
    setting = _.get(settings, settingName, _default);
  }
  return setting;
}
