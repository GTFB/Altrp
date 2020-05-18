import BaseElement from "./BaseElement";
import ButtonIcon from '../../../svgs/button.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {CONTROLLER_TEXTAREA, TAB_CONTENT} from "../modules/ControllersManager";

class Button extends BaseElement{

  static getName(){
    return'button';
  }
  static getTitle(){
    return'Button';
  }

  static getIconComponent(){
    return ButtonIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }
    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('button_text', {
      type: CONTROLLER_TEXTAREA,
      label: 'Button Text',
      default: 'Click Me'
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Button