import ElementWrapper from "./js/components/ElementWrapper";
import frontDecorate from './js/decorators/front-element-component';
import CONSTANTS from "../../editor/src/js/consts";
import {setCurrentScreen} from "./js/store/media-screen-storage/actions";
/**
 * Elements Wrapper
 * */
window.ElementWrapper = ElementWrapper;

/**
 * Elements Decorator for Front/Editor
 * */

window.elementDecorator = frontDecorate;
(async function (){
  /**
   * Менеджер форм загружаем ассинхронно
   */
  await import(
      "../../editor/src/js/classes/modules/FormsManager.js"
      )
})();
window.addEventListener('resize', e=>{
  const {currentMediaScreen} = appStore.getState();
  const changedScreen = CONSTANTS.SCREENS.find(screen=>{
    if(! screen.fullMediaQuery){
      return false;
    }
    let query = screen.fullMediaQuery;
    query = query.replace('@media', '');
    return window.matchMedia(query).matches;
  }) || CONSTANTS.SCREENS[0];
  if(currentMediaScreen !== changedScreen){
    appStore.dispatch(setCurrentScreen(changedScreen));
  }
});