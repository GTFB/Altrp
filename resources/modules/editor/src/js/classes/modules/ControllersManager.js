import TextareaController from "../../components/controllers/TextareaController";
import TextController from "../../components/controllers/TextController";
import NumberController from "../../components/controllers/NumberController";
import SwitcherController from "../../components/controllers/SwitcherController";
import DateController from "../../components/controllers/DateController";
import RangeController from "../../components/controllers/RangeController";
import Controller from "../Controller";
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

export const TAB_CONTENT = "content";
export const TAB_STYLE = "style";
export const TAB_ADVANCED = "advanced";
export const CONTROLLER_TEXTAREA = "textarea";
export const CONTROLLER_DATE = "date";
export const CONTROLLER_RANGE = "range";
export const CONTROLLER_WYSIWYG = "wysiwyg";
export const CONTROLLER_TEXT = "text";
export const CONTROLLER_NUMBER = "number";
export const CONTROLLER_SWITCHER = "switcher";
export const CONTROLLER_DIMENSIONS = "dimensions";
export const CONTROLLER_SELECT = "select";
export const CONTROLLER_CHOOSE = "choose";
export const CONTROLLER_SLIDER = "slider";
export const CONTROLLER_SELECT2 = "select2";
export const CONTROLLER_LINK = "link";
export const CONTROLLER_COLOR = "color";
export const CONTROLLER_MEDIA = "media";
export const CONTROLLER_BUTTON = "button";
export const CONTROLLER_HEADING = "heading";
export const CONTROLLER_CSSEDITOR = "css-editor";
export const CONTROLLER_SHADOW = "shadow";
export const CONTROLLER_TRANSFORM = "transform";
export const CONTROLLER_TYPOGRAPHIC = "typographic";
export const CONTROLLER_REPEATER = "repeater";
export const CONTROLLER_QUERY = "query";
export const CONTROLLER_FILTERS = "filters";
export const CONTROLLER_COLWIDTH = "colwidth";
export const CONTROLLER_GRADIENT = "gradient";
export const CONTROLLER_SQL = "sql";
export const CONTROLLER_SQL_PARAMS = "sql-params";
export const CONTROLLER_CREATIVE_LINK = "creative-link";
export const CONTROLLER_CREATIVE_HOVER = "creative-hover";
export const CONTROLLER_EVENT_HANDLER = "event-handler";
export const CONTROLLER_ELEMENTS = "elements";

class ControllersManager {
  constructor() {
    this.conttrollers = {};
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
      if (elementClasses.hasOwnProperty(elementClassName)) {
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
