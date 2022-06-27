import {getSheet, stringifyStylesheet} from "../../../../../front-app/src/js/helpers/elements";
import {delay} from "../../../../../front-app/src/js/helpers";
import CONSTANTS from "../../consts";
import {setCurrentScreen} from "../../store/responsive-switcher/actions";
import isProd from "../../../../../admin/src/js/helpers/isProd";

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
      await delay(650)

      let styledTag = window.altrpEditorContent.editorWindow.current
        .getRootNode()
        .querySelector('[data-styled="active"]');

      if (styledTag) {
        const contentDocument = styledTag.getRootNode();

        // this.deleteStyledRules()

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
    // this.deleteStyledRules()
    return styles
  }
  deleteStyledRules(){

    let styledTag = window.altrpEditorContent.editorWindow.current
      .getRootNode()
      .querySelector('[data-styled="active"]');


    if (styledTag) {
      if(! isProd()){
        styledTag.innerHTML = ''
        return
      }
      const contentDocument = styledTag.getRootNode();
      const styleSheet = [...contentDocument.styleSheets].find(ss => {
        return ss.ownerNode === styledTag
      })
      if (styleSheet) {

         [...styleSheet.cssRules].forEach(r=>{
           console.log(r);
           // r.cssText = ''
        })

      }
    }
  }
}
const templateStylesModule = new TemplateStylesModule()
export default templateStylesModule
