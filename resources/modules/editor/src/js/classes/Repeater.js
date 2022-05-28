import ControlStack from "./elements/ControlStack";

class Repeater extends ControlStack{
  constructor(){
    super();
    this.name = 'repeater';
    this.section = {};
    this.section.controls = [];
    this.currentSection = this.section;
    this.controlsIds = [];
  }
  getName(){
    return this.name;
  }
  _getCurrentSection(){
    return this.section;
  }
  getControls(){
    return this.section.controls;
  }
}
window.CONTROLLERS = window.CONTROLLERS || {}
window.CONTROLLERS.Repeater = Repeater
export default Repeater
