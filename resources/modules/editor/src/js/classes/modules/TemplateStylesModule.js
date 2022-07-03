import {getSheet, stringifyStylesheet} from "../../../../../front-app/src/js/helpers/elements";
import {delay} from "../../../../../front-app/src/js/helpers";
import CONSTANTS from "../../consts";
import {setCurrentScreen} from "../../store/responsive-switcher/actions";
import isProd from "../../../../../admin/src/js/helpers/isProd";
import {changeStateByName} from "../../store/editor-state/actions";
import store from '../../store/store'
import {getTemplateType} from "../../helpers";

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
      await delay(650)

      let styledTag = window.altrpEditorContent.editorWindow.current
        .getRootNode()
        .querySelector('[data-styled="active"]');

      if (styledTag) {
        const contentDocument = styledTag.getRootNode();


        editorStore.dispatch(setCurrentScreen(screen))
        let css = stringifyStylesheet(
          getSheet(styledTag, contentDocument)
        );
        // let css = styledTag.innerHTML
// console.log(editorStore.getState().currentScreen);
        // if(screen.name !== CONSTANTS.DEFAULT_BREAKPOINT && stylesElements.indexOf(css) === -1){
        //   css = `${screen.fullMediaQuery}{${css}}`
        // }
        const _stylesElements = [...stylesElements]
        _stylesElements.push(css);
        styles[screen.name] = _stylesElements;
      }
    }
    /**
     * Delete styled styles
     */

    // window.top.document.getElementById("editorContent").contentWindow.document.querySelector('[data-styled]').inn()
    editorStore.dispatch(setCurrentScreen(currentScreen))
    store.dispatch(changeStateByName('ignoreUpdate', false))
    if (getTemplateType() === 'header') {
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
    styles['important_styles'] = importantStyles
    return styles
  }
}

const templateStylesModule = new TemplateStylesModule()
export default templateStylesModule
