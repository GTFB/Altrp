import {getSheet, stringifyStylesheet} from "../../../../../front-app/src/js/helpers/elements";
import {delay} from "../../../../../front-app/src/js/helpers";
import CONSTANTS from "../../consts";
import {setCurrentScreen} from "../../store/responsive-switcher/actions";
import {changeStateByName} from "../../store/editor-state/actions";
import store from '../../store/store'
import {getTemplateDataStorage, getTemplateType} from "../../helpers";
import extractElements from "../../helpers/extractElements";
import {setSections} from "../../store/primary-sections/actions";

class TemplateStylesModule {
  all_styles = []

  /**
   *
   * @returns {{all_styles, important_styles}}
   */
  async generateStyles() {
    let styles
    let stylesElements
    let importantStyles = ''
    const templateType = getTemplateType()
    const rootElement = getTemplateDataStorage()
      .getRootElement()

    let elements = []

    const callback = e=>{
      const maxTop = 980
      if(e.getType() !== 'section'){
        return false
      }
      const htmlElement = window.altrpEditorContent.editorWindow.current.getElementsByClassName(`altrp-element${e.getId()}`)[0]
      if(! htmlElement){
        return false
      }
      const rect = htmlElement.getBoundingClientRect();
      console.log(rect.y);
      return rect.y < maxTop
    }

    store.dispatch(changeStateByName('ignoreUpdate', true))
    if (window.altrpEditorContent.editorWindow.current) {
      let rootElement = window.altrpEditorContent.editorWindow.current.getElementsByClassName(
        "sections-wrapper"
      )[0];
      if (rootElement) {
        rootElement = rootElement.cloneNode(true);
        _.toArray(rootElement.getElementsByClassName("overlay")).forEach(
          overlayElement => {
            overlayElement.remove();
          }
        );
        _.toArray(
          rootElement.getElementsByClassName("column-empty-plus")
        ).forEach(overlayElement => {
          overlayElement.remove();
        });
        _.forEach(rootElement.querySelectorAll("[id]"), item => {
          item.removeAttribute("id");
        });
      }
      stylesElements = window.altrpEditorContent.editorWindow.current
        .getRootNode()
        .getElementById("styles-container")?.children;
      stylesElements = _.toArray(stylesElements);
      stylesElements = stylesElements.filter(style => {
        return style.tagName === "STYLE";
      });
    }

    const {currentScreen} = editorStore.getState()
    /**
     * проходим по всем разрешениям экрана
     */

    stylesElements = stylesElements.map(style =>
      style ? style.innerHTML : ""
    );
    styles = {};
    stylesElements = _.uniq(stylesElements)

    for (const screen of CONSTANTS.SCREENS) {

      let styledTag = window.altrpEditorContent.editorWindow.current
        .getRootNode()
        .querySelector('[data-styled="active"]');

      if (styledTag) {
        const contentDocument = styledTag.getRootNode();


        editorStore.dispatch(setCurrentScreen(screen))
        await delay(650)

        if(screen.name === CONSTANTS.DEFAULT_BREAKPOINT){
          extractElements(rootElement, elements, callback)
          elements = elements.map(e=>{
            return _.cloneDeep(e)
          })
          console.log(elements);
          store.dispatch(setSections(elements))
        }
        let css = stringifyStylesheet(
          getSheet(styledTag, contentDocument)
        );
        // let css = styledTag.innerHTML
// console.log(editorStore.getState().currentScreen);
        const _stylesElements = [...stylesElements]
        _stylesElements.push(css);
        styles[screen.name] = _stylesElements;
      }
      if (templateType === 'content' || [
        'card',
        'popup',
        'reports',
        'footer',
        'header',
        'email'
      ].indexOf(templateType) === -1){
        const importantStylesElement = window.document.querySelector('.important_styles [data-styled="active"]');

        const contentDocument = importantStylesElement.getRootNode();

        let css = stringifyStylesheet(
          getSheet(importantStylesElement, contentDocument)
        );

        if(screen.name !== CONSTANTS.DEFAULT_BREAKPOINT && stylesElements.indexOf(css) === -1){
          css = `${screen.fullMediaQuery}{${css}}`
        }
        importantStyles += css
      }
    }
    /**
     * Delete styled styles
     */

    // window.top.document.getElementById("editorContent").contentWindow.document.querySelector('[data-styled]').inn()
    editorStore.dispatch(setCurrentScreen(currentScreen))
    store.dispatch(changeStateByName('ignoreUpdate', false))
    if (templateType === 'header') {
      for (const screen of CONSTANTS.SCREENS) {
        if (_.isArray(styles[screen.name])) {
          let css = styles[screen.name].join('')
          if (screen.name !== CONSTANTS.DEFAULT_BREAKPOINT && stylesElements.indexOf(css) === -1) {
            css = `${screen.fullMediaQuery}{${css}}`
          }
          importantStyles += css
        }
      }
    }
    store.dispatch(setSections([]))
    styles['important_styles'] = importantStyles
    return styles
  }
}

const templateStylesModule = new TemplateStylesModule()
export default templateStylesModule
