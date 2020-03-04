import TextareaController from "../../components/controllers/TextareaController";

export const TAB_CONTENT = 'content';
export const TAB_STYLE = 'style';
export const TAB_ADVANCED = 'advanced';
export const CONTROLLER_TEXTAREA = 'textarea';

class ControllersManager {
  constructor(){
    this.conttrollers = {};
    this.conttrollers[CONTROLLER_TEXTAREA] = TextareaController;
    this.elementsControls = null;
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
        console.log((new  elementClasses[elementClassName]).getControls());
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
}

export default ControllersManager