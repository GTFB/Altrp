import * as altrpHelpers from '../helpers';
import * as styles from '../helpers/styles';
import  Cookies from 'js-cookie';
import Resource from "../../../../editor/src/js/classes/Resource";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import Styles from '../../../../editor/src/js/components/Styles';
import {baseEmailRender} from '../../../../editor/src/js/decorators/base-email-render';
import Area from "../classes/Area";
import IconsManager from "../../../../editor/src/js/classes/modules/IconsManager";

window.iconsManager = new IconsManager;

window.altrpHelpers = window.altrpHelpers || {};
window.baseEmailRender = baseEmailRender;
window.Cookies = Cookies
window.StylesComponent = Styles;
window.altrpHelpers = {
  ...window.altrpHelpers,
  ...altrpHelpers,
  styles,
  Resource,
  AltrpModel,
  Area
};
/**
 * Install
 */

/**
 * Проверка на включение BVI
 */
(async function (){
  if(window.Cookies.get('bvi-theme')){
    const  loadVIPlugin =  (await import(/* webpackChunkName: 'altrp-js-plugins' */'../../js/helpers/plugins')).loadVIPlugin;
    await loadVIPlugin(false);
    $.bvi();
  }
})();
/**
 * Запускаем обновление списка страниц
 */
(async function () {

  window.addEventListener && window.addEventListener('render-altrp', replaceApp);
  // window.addEventListener('render-altrp', updater);
})();
/**
 * Смена Разрешения
 */
(async function (){
  const  setCurrentScreen =  (await import(/* webpackChunkName: 'media-screen-storage-actions' */'../../js/store/media-screen-storage/actions')).setCurrentScreen;
  const  CONSTANTS =  (await import(/* webpackChunkName: 'CONSTANTS' */'../../../../editor/src/js/consts')).default;
  window.CONSTANTS = CONSTANTS;
  window.addEventListener && window.addEventListener('resize', e=>{
    const {currentScreen} = appStore.getState();
    const changedScreen = CONSTANTS.SCREENS.find(screen=>{
      if(! screen.fullMediaQuery){
        return false;
      }
      let query = screen.fullMediaQuery;
      query = query.replace('@media', '');
      return window.matchMedia(query).matches;
    }) || CONSTANTS.SCREENS[0];
    if(currentScreen !== changedScreen){
      appStore.dispatch(setCurrentScreen(changedScreen));
    }
  });
})();

function replaceApp(){
  if(! document.getElementById('front-app-server')){
    console.error(document.getElementById('front-app-server'));
    return;
  }
  const appElement = document.getElementById('front-app');
  const appServer = document.getElementById('front-app-server');
  appServer.remove();
  appElement.removeAttribute('style');
  window.removeEventListener('render-altrp', replaceApp);
}
