import {getSheet, stringifyStylesheet} from "../../../../../front-app/src/js/helpers/elements";
import {delay} from "../../../../../front-app/src/js/helpers";
import CONSTANTS from "../../consts";
import {setCurrentScreen} from "../../store/responsive-switcher/actions";

class TemplateStylesModule{
  all_styles = []

  /**
   *
   * @returns {{all_styles, important_styles}}
   */
  async generateStyles(){
    let styles
    let stylesElements
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
    styles = {
    };
    stylesElements = _.uniq(stylesElements)
    for(const screen of CONSTANTS.SCREENS){
      await delay(300)
      editorStore.dispatch(setCurrentScreen(screen))

      let styledTag = window.altrpEditorContent.editorWindow.current
        .getRootNode()
        .querySelector('[data-styled="active"]');
      if (styledTag) {
        const contentDocument = styledTag.getRootNode();
        let css = stringifyStylesheet(
          getSheet(styledTag, contentDocument)
        );
        // console.log(editorStore.getState().currentScreen);
        if(screen.name !== CONSTANTS.DEFAULT_BREAKPOINT && stylesElements.indexOf(css) === -1){
          css = `${screen.fullMediaQuery}{${css}}`
        }
        const _stylesElements = [...stylesElements]
        _stylesElements.push(css);
        styles[screen.name] = _stylesElements;
      }
    }
    editorStore.dispatch(setCurrentScreen(currentScreen))

    return styles
  }
}
const templateStylesModule = new TemplateStylesModule()
export default templateStylesModule
