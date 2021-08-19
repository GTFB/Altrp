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

class InputRangeSlider extends BaseElement{

  static getName(){
    return'input-range-slider';
  }
  static getTitle(){
    return'Input range slider';
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

    this.addControl("form_id", {
      type: CONTROLLER_TEXT,
      label: "Form ID",
      responsive: false
    });

    this.addControl("field_id", {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: "Field ID (Column Name)"
    });

    this.addControl("content_default_value", {
      type: CONTROLLER_TEXTAREA,
      responsive: false,
      label: "Default Value"
    });

    this.addControl("content_calculation", {
      type: CONTROLLER_TEXTAREA,
      label: "Calculation",
      responsive: false,
      description:
        "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10"
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
      label: 'Initial first',
      default: 0,
    });

    this.addControl('initial_second', {
      type: CONTROLLER_NUMBER,
      label: 'Initial second',
      default: 10,
    });

    this.addControl('step', {
      type: CONTROLLER_NUMBER,
      label: 'Step count',
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

    this.addControl('thousands_separator_value', {
      type: CONTROLLER_TEXT,
      label: 'Separator',
      default: "."
    });

    this.addControl('decimal_place', {
      type: CONTROLLER_NUMBER,
      label: 'Decimal place',
    });

    this.addControl('decimal_separator', {
      type: CONTROLLER_TEXT,
      label: 'Separator',
      default: ",",
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
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 500,
      min: 0,
      conditions: {
        'vertical!': true,
      },
    });

    this.addControl('height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      units: [
        'px',
        'vh',
      ],
      max: 100,
      min: 0,
      conditions: {
        'vertical!': true,
      },
    });

    this.addControl('thickness', {
      type: CONTROLLER_SLIDER,
      label: 'thickness',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      conditions: {
        'vertical': true,
      },
    });

    this.addControl('length', {
      type: CONTROLLER_SLIDER,
      label: 'length',
      units: [
        'px',
        'vh',
      ],
      max: 500,
      min: 0,
      conditions: {
        'vertical': true,
      },
    });

    this.addControl('filled_color', {
      type: CONTROLLER_COLOR,
      label: 'Filled color',
    });

    this.addControl('blank_color', {
      type: CONTROLLER_COLOR,
      label: 'Blank color',
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
    });

    this.addControl('current_label_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Current label typographic',
      }
    );

    this.addControl('current_label_color', {
      type: CONTROLLER_COLOR,
      label: 'Current label color',
    });

    this.endControlSection();

    this.startControlSection('handle_styles', {
      tab: TAB_STYLE,
      label: 'Handle',
    });

    this.addControl("handle_size", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      units: [
        'px',
      ],
      max: 50,
      min: 0,
    });

    this.addControl('handle_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('handle_color', {
      type: CONTROLLER_COLOR,
      label: 'Handle color',
    });

    this.addControl('tooltip_color', {
      type: CONTROLLER_COLOR,
      label: 'Handle tooltip color',
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default InputRangeSlider
