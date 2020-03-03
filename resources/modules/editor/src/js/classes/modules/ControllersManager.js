import TextareaController from "../../components/controllers/TextareaController";

export const TAB_CONTENT = 'content';
export const TAB_STYLE = 'style';
export const TAB_ADVANCED = 'advanced';
export const CONTROLLER_TEXTAREA = 'textarea';

class ControllersManager {
  constructor(){
    this.conttrollers = {};
    this.conttrollers[CONTROLLER_TEXTAREA] = TextareaController;
  }
  getController(controllerName){
    if(! this.conttrollers[controllerName]){
      throw 'Controller with Name ' + controllerName + ' not Found!';
    }
    return  this.conttrollers[controllerName];
  }
}

export default ControllersManager