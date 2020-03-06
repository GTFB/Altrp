import BaseElement from "./BaseElement";
import {
  CONTROLLER_NUMBER,
  CONTROLLER_TEXT,
  CONTROLLER_TEXTAREA,
  TAB_ADVANCED,
  TAB_CONTENT,
  TAB_STYLE
} from "../modules/ControllersManager";

class RootElement extends BaseElement{
  constructor(){
    super();
  }
  static getName(){
    return 'root-element';
  }
  static getTitle(){
    return 'Page';
  }
  static getType(){
    return 'root-element';
  }
  _registerControls(){
    if(this.controllersRegistered){
      return
    }
    // this.controllers[TAB_CONTENT] = [{
    //   sectionName: 'content',
    //   sectionLabel: 'Text Section',
    //   controllers: [
    //     {
    //       type: CONTROLLER_TEXTAREA,
    //       settingName: 'text',
    //       controllerLabel: 'Text Content'
    //     }
    //   ]
    // }];
    // this.controllersRegistered = true;
    this.startControlSection('text_section', {
      tab: TAB_CONTENT,
      label: 'Text Section',
    });

    this.addControl('text', {
      type: CONTROLLER_TEXT,
      label: 'Text Content',
    });

    this.addControl('number', {
      type: CONTROLLER_NUMBER,
      label: 'Number Content',
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
}

export default RootElement;