import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/bullet-list.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_REPEATER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED,
  CONTROLLER_MEDIA,
  CONTROLLER_SWITCHER,
  CONTROLLER_LINK
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class List extends BaseElement{

  static getName(){
    return'input-slider';
  }
  static getTitle(){
    return'Input slider';
  }

  static getIconComponent(){
    return widgetIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('slider', {
      tab: TAB_CONTENT,
      label: 'Slider',
    });

    this.addControl('vertical', {
      type: CONTROLLER_SWITCHER,
      label: 'Vertical',
    });

    this.addControl('min', {
      type: CONTROLLER_NUMBER,
      label: 'Min',
      default: 0,
    });

    this.addControl('max', {
      type: CONTROLLER_NUMBER,
      label: 'Max',
      default: 100,
    });

    this.addControl('initial', {
      type: CONTROLLER_NUMBER,
      label: 'Initial',
      default: 0,
    });

    this.addControl('step', {
      type: CONTROLLER_NUMBER,
      label: 'Step',
      default: 1,
    });

    this.addControl('label_step', {
      type: CONTROLLER_NUMBER,
      label: 'Label step size',
      default: 25,
    });

    this.addControl('thousands_separator', {
      type: CONTROLLER_SWITCHER,
      label: 'Thousands separator',
    });

    this.addControl('decimal_place', {
      type: CONTROLLER_NUMBER,
      label: 'Decimal place',
    });

    this.addControl('custom_label', {
      type: CONTROLLER_TEXT,
      label: '',
      default: "value: {n}"
    });

    this.endControlSection();

    this.startControlSection('slider_styles', {
      tab: TAB_STYLE,
      label: 'Slider',
    });

    this.addControl('width', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: "px"
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 500,
      min: 0,
    });

    this.addControl('height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
    });

    this.addControl('filled_color', {
      type: CONTROLLER_COLOR,
      label: 'Filled color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('blank_color', {
      type: CONTROLLER_COLOR,
      label: 'Blank color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.endControlSection();

    this.startControlSection('font_styles', {
      tab: TAB_STYLE,
      label: 'Font',
    });

    this.addControl('label_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Label typographic',
      }
    );

    this.addControl('label_color', {
      type: CONTROLLER_COLOR,
      label: 'Label color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('current_label_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Current label typographic',
      }
    );

    this.addControl('current_label_color', {
      type: CONTROLLER_COLOR,
      label: 'Current label color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.endControlSection();

    this.startControlSection('handle_styles', {
      tab: TAB_STYLE,
      label: 'Handle',
    });

    this.addControl("handle_size", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default: {
        unit: 'px',
      },
      units: [
        'px',
      ],
      max: 50,
      min: 0,
    });

    this.addControl('handle_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
        bind: true,
      },
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('handle_color', {
      type: CONTROLLER_COLOR,
      label: 'Handle color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default List
