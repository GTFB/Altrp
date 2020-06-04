import BaseElement from "./BaseElement";
import ImageIcon from '../../../svgs/image.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
	CONTROLLER_MEDIA,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED
} from "../modules/ControllersManager";

class Image extends BaseElement{
	static getName(){
    return'image';
  }
  static getTitle(){
    return'image';
  }

  static getIconComponent(){
    return ImageIcon;
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

    this.addControl('content_media', {
      type: CONTROLLER_MEDIA,
      label: 'import image',
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Image