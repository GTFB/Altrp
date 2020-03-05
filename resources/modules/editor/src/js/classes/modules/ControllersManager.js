import TextareaController from "../../components/controllers/TextareaController";
import TextController from "../../components/controllers/TextController";

export const TAB_CONTENT = 'content';
export const TAB_STYLE = 'style';
export const TAB_ADVANCED = 'advanced';
export const CONTROLLER_TEXTAREA = 'textarea';
export const CONTROLLER_TEXT = 'text';

class ControllersManager {
  constructor(){
    this.conttrollers = {};
    this.conttrollers[CONTROLLER_TEXTAREA] = TextareaController;
    this.conttrollers[CONTROLLER_TEXT] = TextController;
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
      throw 'Controller with Name ' + controllerName + ' not Found!';
    }
    return  this.conttrollers[controllerName];
  }

  registerControls(){
    let elementClasses = window.elementsManager.getElements();
    this.elementsControls = {};
    for(let elementClassName in elementClasses ){

        if(elementClasses.hasOwnProperty(elementClassName)){
        this.elementsControls[elementClassName] = (new  elementClasses[elementClassName]).getControls()
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
    let controls = this.getControls(elementName);
    let control;
    control = this._cache.controls[elementName + controlId];
    if(control){
      return control;
    }
    for (let tabName in controls){
      if(controls.hasOwnProperty(tabName)){
        if(!controls[tabName].length){
          continue;
        }
        for (let section of controls[tabName]) {
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