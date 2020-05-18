import BaseElement from "./BaseElement";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER, CONTROLLER_SWITCHER,
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
    this.startControlSection('text_section', {
      tab: TAB_CONTENT,
      label: 'Text Section',
    });

    this.addControl('textContainer', {
      type: CONTROLLER_MEDIA,
      label: "textContainer"  
    });

    this.endControlSection();

    this.startControlSection('text_style', {
      tab: TAB_STYLE,
      label: 'Text Section',
    });

    this.addControl('text_', {
      type: CONTROLLER_TEXTAREA,
      label: 'Text Content',
      default: 'Default Text!!!',
    });

    this.endControlSection();

    this.startControlSection('text_advanced', {
      tab: TAB_ADVANCED,
      label: 'Text Section',
    });

    this.addControl('text__', {
      type: CONTROLLER_TEXT,
      label: 'Text Content',
      default: 'Default Advanced Text!!!',
    });

    this.endControlSection();
    // this.startControlSection('text_section', {
    //   tab: TAB_CONTENT,
    //   label: 'Text Section',
    // });
    //
    // this.addControl('text', {
    //   type: CONTROLLER_TEXT,
    //   label: 'Text Content',
    // });
    //
    //
    // this.endControlSection();
    //
    // this.startControlSection('text_style', {
    //   tab: TAB_STYLE,
    //   label: 'Text Section',
    // });
    //
    // this.addControl('text_', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Text Content',
    // });
    //
    // this.endControlSection();
    //
    // this.startControlSection('text_advanced', {
    //   tab: TAB_ADVANCED,
    //   label: 'Text Section',
    // });
    //
    // this.addControl('text__', {
    //   type: CONTROLLER_TEXT,
    //   label: 'Text Content',
    // });
    //
    // this.endControlSection();

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
