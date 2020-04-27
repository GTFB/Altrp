import BaseElement from "./BaseElement";
import {
  CONTROLLER_NUMBER, CONTROLLER_SWITCHER,
  CONTROLLER_TEXT,
  CONTROLLER_TEXTAREA,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_SELECT2,
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
    this.startControlSection('text_section', {
      tab: TAB_CONTENT,
      label: 'Text Section',
    });

    this.addControl('text', {
      type: CONTROLLER_SWITCHER,
      label: 'Switcher Content',
      default: 'Switcher Content'
    });

    this.addControl('number', {
      type: CONTROLLER_NUMBER,
      label: 'Number Content',
    });

    this.addControl('select', {
      type: CONTROLLER_SELECT,
      label: 'Select Content',
      select: [
        {
          id: 1,
          value: 'select1',
          label: 'Select Content 1'
        },
        {
          id: 2,
          value: 'select2',
          label: 'Select Content 2'
        }
      ]
    });

    this.addControl('choose', {
      type: CONTROLLER_CHOOSE,
      label: 'Choose Content',
      value: 0
    });

    this.addControl('slider', {
      type: CONTROLLER_SLIDER,
      label: 'Slider Content',
      value: 0
    });

    this.addControl('select2', {
      type: CONTROLLER_SELECT2,
      label: 'Select2 Content',
      select: [ 
        {
          value: 'select',
          label:'Select Content 1'
        }, 
        {
          value: 'select',
          label:'Select Content 2'
        }
      ]
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
  appendNewSection(newSection){
    if(newSection.getType() !== 'section'){
      throw 'Only Section can be a Child of Template';
    }
    this.appendChild(newSection);
  }
}

export default RootElement;
