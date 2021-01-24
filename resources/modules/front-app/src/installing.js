import ElementWrapper from "./js/components/ElementWrapper";
import frontDecorate from './js/decorators/front-element-component';
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