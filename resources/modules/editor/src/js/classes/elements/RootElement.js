import BaseElement from "./BaseElement";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER, 
  CONTROLLER_SWITCHER,
  CONTROLLER_TEXT,
  CONTROLLER_TEXTAREA,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_SELECT2,
  CONTROLLER_LINK,
  CONTROLLER_COLOR,
  CONTROLLER_BUTTON,
  CONTROLLER_HEADING,
  CONTROLLER_CSSEDITOR,
  CONTROLLER_SHADOW,
  CONTROLLER_TRANSFORM,
  TAB_ADVANCED,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_MEDIA,
} from "../modules/ControllersManager";

class RootElement extends BaseElement {
  constructor() {
    super();
  }

  static getName() {
    return 'root-element';
  }

  static getTitle() {
    return 'Page';
  }

  static getType() {
    return 'root-element';
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

  }

  appendNewSection(newSection) {
    if (newSection.getType() !== 'section') {
      throw 'Only Section can be a Child of Template';
    }
    this.appendChild(newSection);
  }
  getSelector(){
    return `.altrp-template-root${this.getId()}`;
  }
}

export default RootElement;
