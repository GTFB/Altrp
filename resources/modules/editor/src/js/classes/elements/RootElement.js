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
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_FILTERS,
  TAB_ADVANCED,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_MEDIA, CONTROLLER_REPEATER,
} from "../modules/ControllersManager";
  import Repeater from "../Repeater";

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
/*
    this.addControl( 'test_repeater', {
      label: 'test Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default : [{
        text: 'Item 1',
      }, {
        text: 'Item 2',
      },],
  } );
*/

    this.startControlSection('preview_section',{
      label: 'Preview Settings',
    });

    this.addControl('choose_page', {
      type: CONTROLLER_SELECT2,
      label: 'Choose Page',
      options_resource: '/admin/ajax/pages_options',
    });

    this.addControl('preview_heading', {
      label: 'Model Settings',
      type: CONTROLLER_HEADING
    });

    this.addControl('preview_model', {
      type: CONTROLLER_SELECT,
      resource: '/admin/ajax/models_options?with_names=1&not_plural=1',
      nullable: true,
    });
    this.addControl('preview_model_instance', {
      type: CONTROLLER_SELECT2,
      options_resource: '/ajax/models/{{preview_model}}_options',
      conditions:{
        'preview_model!': [null, '', undefined],
      },
      nullable: true,
    });

    this.endControlSection();

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

  /**
   * Задать настройки
   * для корневого элемента проверим настройки моделей для предпросмотра
   * @param settings
   */
  setSettings(settings){
    super.setSettings(settings);
    if(this.settings.choose_page){
      this.addModelInfo({
        modelName: 'page',
        modelId: this.settings.choose_page
      })
    }
  }
}

export default RootElement;
