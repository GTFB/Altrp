import {getSheet, parseStylesheetToArray} from "../../../../../front-app/src/js/helpers/elements";
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
    let styles, styleJsons;
    let stylesElements = [];
    let importantStyleJsons = {};
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

    stylesElements = stylesElements.map(style => {
      let styleText = style ? style.innerHTML : "";
      return styleText.replace(/[^{}]*{}/g, '');
    });
    styles = {};
    stylesElements = _.uniq(stylesElements)
    styleJsons = {};

    for (const screen of [...CONSTANTS.SCREENS, ...CONSTANTS.SCREENS_ADDITIONAL]) {

      let styledTag = window.altrpEditorContent.editorWindow.current
        .getRootNode()
        .querySelector('[data-styled="active"]');

      if (styledTag) {
        const contentDocument = styledTag.getRootNode();


        editorStore.dispatch(setCurrentScreen(screen))
        await delay(600)

        if(screen.name === CONSTANTS.DEFAULT_BREAKPOINT){
          extractElements(rootElement, elements, callback)
          elements = elements.map(e=>{
            return _.cloneDeep(e)
          })
          store.dispatch(setSections(elements))
        }
        const sheet = getSheet(styledTag, contentDocument);
        let jsons = parseStylesheetToArray(sheet);

        // let css = styledTag.innerHTML
        styleJsons[screen.name] = jsons;
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

        const sheet = getSheet(importantStylesElement, contentDocument);
        let jsons = parseStylesheetToArray(sheet);

        importantStyleJsons[screen.name] = jsons;
      }
    }
    /**
     * Delete styled styles
     */

    // window.top.document.getElementById("editorContent").contentWindow.document.querySelector('[data-styled]').inn()
    store.dispatch(changeStateByName('ignoreUpdate', false))
    editorStore.dispatch(setCurrentScreen(currentScreen))
    if (templateType === 'header') {
      for (const screen of CONSTANTS.SCREENS) {
        if (_.isArray(styleJsons[screen.name])) {
          importantStyleJsons[screen.name] = styleJsons[screen.name];
        }
      }
    }
    store.dispatch(setSections([]))

    const importantGlobalStyleMap = {};

    importantStyleJsons[CONSTANTS.DEFAULT_BREAKPOINT].forEach(json => {
      Object.entries(json.style).map(([key, value]) => {
        importantGlobalStyleMap[`${json.selectorText}??${key}??${value}`] = true;
      });
    });

    Object.keys(importantStyleJsons).forEach(key => {
      if (key !== CONSTANTS.DEFAULT_BREAKPOINT) {
        importantStyleJsons[key] = importantStyleJsons[key]
          .map(json => {
            const jsonStyleEntries = Object.entries(json.style).filter(([styleKey, styleValue]) => {
              return !importantGlobalStyleMap[`${json.selectorText}??${styleKey}??${styleValue}`]
            });
            if (jsonStyleEntries.length <= 0) {
              return null;
            }
            return { ...json, style: Object.fromEntries(jsonStyleEntries) };
          })
          .filter(json => json);
      }
    });

    let cssValue = '';
    for (const screen of [...CONSTANTS.SCREENS, ...CONSTANTS.SCREENS_ADDITIONAL]) {
      const uniqJsonDomArray = this.dedupJsonDomArray(importantStyleJsons[screen.name]);
      const screenStyle = this.generateStylesFromJsonDomArray(uniqJsonDomArray);
      if (styles[screen.name]) {
        styles[screen.name].push(screenStyle);
      } else {
        styles[screen.name] = [screenStyle];
      }
      if (screen.name !== CONSTANTS.DEFAULT_BREAKPOINT) {
        cssValue += screenStyle && `${screen.fullMediaQuery}{${screenStyle}}`;
      } else {
        cssValue += screenStyle + stylesElements.join('');
        styles[screen.name].push(...stylesElements);
      }
    }
    styles['important_styles'] = cssValue;
    return styles
  }

  dedupJsonDomArray(ary) {
    if (!ary || !ary.length) {
      return [];
    }

    const obj = {};

    ary.forEach(json => {
      Object.entries(json.style).forEach(([key, value]) => {
        if (!obj[json.selectorText]) {
          obj[json.selectorText] = {};
        }
        obj[json.selectorText][`${key}??${value}`] = true;
      });
    });

    const result = Object.entries(obj).map(([selectorText, attrs]) => {
      const property = {};
      Object.keys(attrs).forEach(key => {
        const [attr, value] = key.split('??');
        property[attr] = value;
      });
      return { selectorText, style: property };
    });

    return result;
  }

  generateStylesFromJsonStyle(json) {
    if (!Object.keys(json).length) {
      return '';
    }

    return Object.entries(json).map(([key, value]) => {
      let attr = key;
      if (attr === 'background-clip') {
        attr = '-webkit-background-clip';
      }
      return `${attr}:${value};`;
    }).join('');
  }

  generateStylesFromJsonDom(json) {
    if (!json || !Object.keys(json.style).length) {
      return '';
    }

    return `${json.selectorText} {${this.generateStylesFromJsonStyle(json.style)}}`;
  }

  generateStylesFromJsonDomArray(ary) {
    if (!ary || !ary.length) {
      return '';
    }

    return ary.map(json => this.generateStylesFromJsonDom(json)).join('');
  }
}

const templateStylesModule = new TemplateStylesModule()
export default templateStylesModule
