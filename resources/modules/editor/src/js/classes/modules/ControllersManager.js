import TextareaController from "../../components/controllers/TextareaController";
import GroupController from "../../components/controllers/GroupController";
import TextController from "../../components/controllers/TextController";
import NumberController from "../../components/controllers/NumberController";
import SwitcherController from "../../components/controllers/SwitcherController";
import DateController from "../../components/controllers/DateController";
import RangeController from "../../components/controllers/RangeController";
import DimensionsController from "../../components/controllers/DimensionsController";
import SelectController from "../../components/controllers/SelectController";
import ChooseController from "../../components/controllers/ChooseController";
import SliderController from "../../components/controllers/SliderController";
import Select2Controller from "../../components/controllers/Select2Controller";
import LinkController from "../../components/controllers/LinkController";
import ColorController from "../../components/controllers/ColorController";
import MediaController from "../../components/controllers/MediaController";
import ButtonController from "../../components/controllers/ButtonController";
import HeadingController from "../../components/controllers/HeadingController";
import CssEditorController from "../../components/controllers/CssEditorController";
import ShadowController from "../../components/controllers/ShadowController";
import TransformController from "../../components/controllers/TransformController";
import TypographicController from "../../components/controllers/TypographicController";
import WysiwygController from "../../components/controllers/WysisygController";
import RepetaerController from "../../components/controllers/RepeaterController";
import QueryController from "../../components/controllers/QueryController";
import FiltersController from "../../components/controllers/FiltersController";
import ColumnWidthController from "../../components/controllers/ColumnWidthController";
import GradientController from "../../components/controllers/GradientController";
import CreativeLinkController from "../../components/controllers/CreativeLinkController";
import CreativeHoverController from "../../components/controllers/CreativeHoverController";
import SqlSelectController from "../../components/controllers/SqlSelectController";
import SqlAsParamsController from "../../components/controllers/SqlAsParamsController";
import EventSelectController from "../../components/controllers/EventSelectController";
import ElementChooseController from "../../components/controllers/ElementChooseController";
window.CONTROLLERS = window.CONTROLLERS || {}
export const TAB_CONTENT = "content";
window.CONTROLLERS.TAB_CONTENT = TAB_CONTENT
export const TAB_STYLE = "style";
window.CONTROLLERS.TAB_STYLE = TAB_STYLE
export const TAB_ADVANCED = "advanced";
window.CONTROLLERS.TAB_ADVANCED = TAB_ADVANCED
export const CONTROLLER_TEXTAREA = "textarea";
window.CONTROLLERS.CONTROLLER_TEXTAREA = CONTROLLER_TEXTAREA
export const CONTROLLER_DATE = "date";
window.CONTROLLERS.CONTROLLER_DATE = CONTROLLER_DATE
export const CONTROLLER_RANGE = "range";
window.CONTROLLERS.CONTROLLER_RANGE = CONTROLLER_RANGE
export const CONTROLLER_WYSIWYG = "wysiwyg";
window.CONTROLLERS.CONTROLLER_WYSIWYG = CONTROLLER_WYSIWYG
export const CONTROLLER_TEXT = "text";
window.CONTROLLERS.CONTROLLER_TEXT = CONTROLLER_TEXT
export const CONTROLLER_NUMBER = "number";
window.CONTROLLERS.CONTROLLER_NUMBER = CONTROLLER_NUMBER
export const CONTROLLER_SWITCHER = "switcher";
window.CONTROLLERS.CONTROLLER_SWITCHER = CONTROLLER_SWITCHER
export const CONTROLLER_DIMENSIONS = "dimensions";
window.CONTROLLERS.CONTROLLER_DIMENSIONS = CONTROLLER_DIMENSIONS
export const CONTROLLER_SELECT = "select";
window.CONTROLLERS.CONTROLLER_SELECT = CONTROLLER_SELECT
export const CONTROLLER_GROUP = "group";
window.CONTROLLERS.CONTROLLER_GROUP = CONTROLLER_GROUP
export const CONTROLLER_CHOOSE = "choose";
window.CONTROLLERS.CONTROLLER_CHOOSE = CONTROLLER_CHOOSE
export const CONTROLLER_SLIDER = "slider";
window.CONTROLLERS.CONTROLLER_SLIDER = CONTROLLER_SLIDER
export const CONTROLLER_SELECT2 = "select2";
window.CONTROLLERS.CONTROLLER_SELECT2 = CONTROLLER_SELECT2
export const CONTROLLER_LINK = "link";
window.CONTROLLERS.CONTROLLER_LINK = CONTROLLER_LINK
export const CONTROLLER_COLOR = "color";
window.CONTROLLERS.CONTROLLER_COLOR = CONTROLLER_COLOR
export const CONTROLLER_MEDIA = "media";
window.CONTROLLERS.CONTROLLER_MEDIA = CONTROLLER_MEDIA
export const CONTROLLER_BUTTON = "button";
window.CONTROLLERS.CONTROLLER_BUTTON = CONTROLLER_BUTTON
export const CONTROLLER_HEADING = "heading";
window.CONTROLLERS.CONTROLLER_HEADING = CONTROLLER_HEADING
export const CONTROLLER_CSSEDITOR = "css-editor";
window.CONTROLLERS.CONTROLLER_CSSEDITOR = CONTROLLER_CSSEDITOR
export const CONTROLLER_SHADOW = "shadow";
window.CONTROLLERS.CONTROLLER_SHADOW = CONTROLLER_SHADOW
export const CONTROLLER_TRANSFORM = "transform";
window.CONTROLLERS.CONTROLLER_TRANSFORM = CONTROLLER_TRANSFORM
export const CONTROLLER_TYPOGRAPHIC = "typographic";
window.CONTROLLERS.CONTROLLER_TYPOGRAPHIC = CONTROLLER_TYPOGRAPHIC
export const CONTROLLER_REPEATER = "repeater";
window.CONTROLLERS.CONTROLLER_REPEATER = CONTROLLER_REPEATER
export const CONTROLLER_QUERY = "query";
window.CONTROLLERS.CONTROLLER_QUERY = CONTROLLER_QUERY
export const CONTROLLER_FILTERS = "filters";
window.CONTROLLERS.CONTROLLER_FILTERS = CONTROLLER_FILTERS
export const CONTROLLER_COLWIDTH = "colwidth";
window.CONTROLLERS.CONTROLLER_COLWIDTH = CONTROLLER_COLWIDTH
export const CONTROLLER_GRADIENT = "gradient";
window.CONTROLLERS.CONTROLLER_GRADIENT = CONTROLLER_GRADIENT
export const CONTROLLER_SQL = "sql";
window.CONTROLLERS.CONTROLLER_SQL = CONTROLLER_SQL
export const CONTROLLER_SQL_PARAMS = "sql-params";
window.CONTROLLERS.CONTROLLER_SQL_PARAMS = CONTROLLER_SQL_PARAMS
export const CONTROLLER_CREATIVE_LINK = "creative-link";
window.CONTROLLERS.CONTROLLER_CREATIVE_LINK = CONTROLLER_CREATIVE_LINK
export const CONTROLLER_CREATIVE_HOVER = "creative-hover";
window.CONTROLLERS.CONTROLLER_CREATIVE_HOVER = CONTROLLER_CREATIVE_HOVER
export const CONTROLLER_EVENT_HANDLER = "event-handler";
window.CONTROLLERS.CONTROLLER_EVENT_HANDLER = CONTROLLER_EVENT_HANDLER
export const CONTROLLER_ELEMENTS = "elements";
window.CONTROLLERS.CONTROLLER_ELEMENTS = CONTROLLER_ELEMENTS

class ControllersManager {
  constructor() {
    this.conttrollers = {};
    this.conttrollers[CONTROLLER_GROUP] = GroupController;
    this.conttrollers[CONTROLLER_TEXTAREA] = TextareaController;
    this.conttrollers[CONTROLLER_WYSIWYG] = WysiwygController;
    this.conttrollers[CONTROLLER_TEXT] = TextController;
    this.conttrollers[CONTROLLER_NUMBER] = NumberController;
    this.conttrollers[CONTROLLER_SWITCHER] = SwitcherController;
    this.conttrollers[CONTROLLER_DIMENSIONS] = DimensionsController;
    this.conttrollers[CONTROLLER_SELECT] = SelectController;
    this.conttrollers[CONTROLLER_CHOOSE] = ChooseController;
    this.conttrollers[CONTROLLER_SLIDER] = SliderController;
    this.conttrollers[CONTROLLER_SELECT2] = Select2Controller;
    this.conttrollers[CONTROLLER_LINK] = LinkController;
    this.conttrollers[CONTROLLER_COLOR] = ColorController;
    this.conttrollers[CONTROLLER_MEDIA] = MediaController;
    this.conttrollers[CONTROLLER_BUTTON] = ButtonController;
    this.conttrollers[CONTROLLER_HEADING] = HeadingController;
    this.conttrollers[CONTROLLER_CSSEDITOR] = CssEditorController;
    this.conttrollers[CONTROLLER_SHADOW] = ShadowController;
    this.conttrollers[CONTROLLER_TRANSFORM] = TransformController;
    this.conttrollers[CONTROLLER_TYPOGRAPHIC] = TypographicController;
    this.conttrollers[CONTROLLER_CREATIVE_LINK] = CreativeLinkController;
    this.conttrollers[CONTROLLER_CREATIVE_HOVER] = CreativeHoverController;
    this.conttrollers[CONTROLLER_REPEATER] = RepetaerController;
    this.conttrollers[CONTROLLER_QUERY] = QueryController;
    this.conttrollers[CONTROLLER_FILTERS] = FiltersController;
    this.conttrollers[CONTROLLER_COLWIDTH] = ColumnWidthController;
    this.conttrollers[CONTROLLER_GRADIENT] = GradientController;
    this.conttrollers[CONTROLLER_SQL] = SqlSelectController;
    this.conttrollers[CONTROLLER_SQL_PARAMS] = SqlAsParamsController;
    this.conttrollers[CONTROLLER_EVENT_HANDLER] = EventSelectController;
    this.conttrollers[CONTROLLER_ELEMENTS] = ElementChooseController;
    this.conttrollers[CONTROLLER_DATE] = DateController;
    this.conttrollers[CONTROLLER_RANGE] = RangeController;
    this.elementsControls = null;
    this._cache = {
      controls: {}
    };
  }
  init() {
    this.registerControls();
  }
  getController(controllerName) {
    if (!this.conttrollers[controllerName]) {
      throw `Controller with Name ${controllerName} not Found!`;
    }
    return this.conttrollers[controllerName];
  }

  registerControls() {
    let elementClasses = window.appStore.getState().widgetsManager.elements;
    this.elementsControls = {};
    for (let elementClassName in elementClasses) {
      if (elementClasses.hasOwnProperty(elementClassName) && ! this.elementsControls[elementClassName]) {
        this.elementsControls[elementClassName] = new elementClasses[
          elementClassName
        ]().getControls();
      }
    }
  }
  getControls(elementName) {
    if (!this.elementsControls) {
      this.registerControls();
    }

    return this.elementsControls[elementName];
  }

  getElementControl(elementName, controlId) {
    let controls = { ...this.getControls(elementName) };
    let control;
    control = this._cache.controls[elementName + controlId];
    if (control) {
      return control;
    }
    for (let tabName in controls.data) {
      if (controls.data.hasOwnProperty(tabName)) {
        if (!controls.data[tabName].length) {
          continue;
        }
        for (let section of controls.data[tabName]) {
          if (!section.controls.length) {
            continue;
          }
          for (let _control of section.controls) {
            if (_control.controlId === controlId) {
              control = _control;
            }
          }
        }
      }
    }
    return control;
  }

  setControlsCache(controlsCacheName, args) {
    this._cache.controls[controlsCacheName] = args;
  }
}

export default ControllersManager;
