import BaseElement from "./BaseElement";
import IconIcon from '../../../svgs/widget_icon.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_WYSIWYG,
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED,
  CONTROLLER_MEDIA,
  CONTROLLER_CREATIVE_LINK,
  CONTROLLER_GRADIENT, CONTROLLER_REPEATER
} from "../modules/ControllersManager";

class Icon extends BaseElement{

  static getName(){
    return'icon';
  }
  static getTitle(){
    return'Icon';
  }

  static getIconComponent(){
    return IconIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('button_type_section', {
      tab: TAB_CONTENT,
      label: 'Button type',
    });
    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Icon
