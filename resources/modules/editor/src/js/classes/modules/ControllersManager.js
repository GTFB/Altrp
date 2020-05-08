import TextareaController from "../../components/controllers/TextareaController";
import TextController from "../../components/controllers/TextController";
import NumberController from "../../components/controllers/NumberController";
import SwitcherController from "../../components/controllers/SwitcherController";
import Controller from "../Controller";
import DimensionsController from "../../components/controllers/DimensionsController";
import SelectController from "../../components/controllers/SelectController";
import ChooseController from "../../components/controllers/ChooseController";
import SliderController from "../../components/controllers/SliderController";
import Select2Controller from "../../components/controllers/Select2Controller";
import LinkController from "../../components/controllers/LinkController";
import ColorController from "../../components/controllers/ColorController";

export const TAB_CONTENT = 'content';
export const TAB_STYLE = 'style';
export const TAB_ADVANCED = 'advanced';
export const CONTROLLER_TEXTAREA = 'textarea';
export const CONTROLLER_TEXT = 'text';
export const CONTROLLER_NUMBER = 'number';
export const CONTROLLER_SWITCHER = 'switcher';
export const CONTROLLER_DIMENSIONS = 'dimensions';
export const CONTROLLER_SELECT = 'select';
export const CONTROLLER_CHOOSE = 'choose';
export const CONTROLLER_SLIDER = 'slider';
export const CONTROLLER_SELECT2 = 'select2';
export const CONTROLLER_LINK = 'link';
export const CONTROLLER_COLOR = 'color';

class ControllersManager {
  constructor(){
    this.conttrollers = {};
    this.conttrollers[CONTROLLER_TEXTAREA] = TextareaController;
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
    this.elementsControls = null;
    this._cache = {
      controls: {},
    };
  }
  init(){
    this.registerControls();
  }
  getController(controllerName){
    if(! this.conttrollers[controllerName]){
      throw `Controller with Name ${controllerName} not Found!`;
    }
    return  this.conttrollers[controllerName];
  }

  registerControls(){
    let elementClasses = window.elementsManager.getElements();
    this.elementsControls = {};
    for(let elementClassName in elementClasses ){
        if(elementClasses.hasOwnProperty(elementClassName)){
          this.elementsControls[elementClassName] = (new  elementClasses[elementClassName]).getControls();
      }
    }
  }

  getControls(elementName){
    if(!this.elementsControls){
      this.registerControls();
    }
    return this.elementsControls[elementName];
  }


  getElementControl(elementName, controlId){
    let controls = {...this.getControls(elementName)};
    let control;
    control = this._cache.controls[elementName + controlId];
    if(control){
      return control;
    }
    for (let tabName in controls.data){
      if(controls.data.hasOwnProperty(tabName)){
        if(!controls.data[tabName].length){
          continue;
        }
        for (let section of controls.data[tabName]) {
          if(!section.controls.length){
            continue;
          }
          for (let _control of section.controls){
            if(_control.controlId === controlId){
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

export default ControllersManager