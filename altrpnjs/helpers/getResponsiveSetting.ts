import DEFAULT_BREAKPOINT from './const/DEFAULT_BREAKPOINT';
import SCREENS from './const/SCREENS';
import * as _ from 'lodash'

export default function getResponsiveSetting(
  settings: object,
  settingName:string,
  screenName: string,
  _default:any = null,
  exactMatch: boolean = false
  ) {
  let elementState = ''
  const currentScreen = SCREENS.find(s=>s.name === screenName) || SCREENS.find(s=>s.name === DEFAULT_BREAKPOINT)
  let _settingName = `${settingName}_${elementState}_`;
  if(! currentScreen){
    console.error(`currentScreen not found`);
    return _default
  }
  if (currentScreen.name === DEFAULT_BREAKPOINT) {
    let setting = settings[_settingName];

    if (setting === undefined) {
      setting = _.get(settings, settingName, _default);
    }
    return setting;
  }
  let suffix = currentScreen.name;
  _settingName = `${settingName}_${elementState}_${suffix}`;
  let setting = settings[_settingName];
  if(exactMatch){
    // if(settingName === 'posts_per_page'){
    //   console.log(setting);
    //   console.log(_settingName);
    //   console.log(screenName);
    // }
    return setting === undefined ? _default : setting
  }
  if (setting === undefined) {
    for (let screen of [...SCREENS].reverse()) {
      if (
        currentScreen.id < screen.id ||
        screen.name === DEFAULT_BREAKPOINT
      ) {
        continue;
      }

      _settingName = `${settingName}_${elementState}_${screen.name}`;

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
export function setResponsiveSetting(settings: object, settingName:string, screenName: string, value:any = null) {
  let elementState = ''
  const currentScreen = SCREENS.find(s=>s.name === screenName) || SCREENS.find(s=>s.name === DEFAULT_BREAKPOINT)
  let _settingName = `${settingName}_${elementState}_`;
  if(! currentScreen){
    console.error(`currentScreen not found`);
    return
  }
  if (currentScreen.name === DEFAULT_BREAKPOINT) {

    _.set(settings, settingName, value);
    return
  }
  let suffix = currentScreen.name;
  _settingName = `${settingName}_${elementState}_${suffix}`;
  if(settingName === 'posts_per_page'){
    console.log(_settingName);
    console.log(value);
  }
  _.set(settings, _settingName, value);

}
