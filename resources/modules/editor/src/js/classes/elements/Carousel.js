import BaseElement from "./BaseElement";
import WidgetIcon from '../../../svgs/widget_gallery.svg';
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
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED
} from "../modules/ControllersManager";

class Carousel extends BaseElement{

  static getName(){
    return'carousel';
  }
  static getTitle(){
    return'Carousel';
  }

  static getIconComponent(){
    return WidgetIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('type_content', {
      tab: TAB_CONTENT,
      label: 'Type',
    });


    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Carousel
