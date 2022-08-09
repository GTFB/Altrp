import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/slider_range.svg';
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
    return'Range Slider';
  }

  static getIconComponent(){
    return widgetIcon;
  }
  static getType(){
    return 'widget';
  }
  static getGroup() {
    return "Form";
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
      locked: true,
    });

    this.addControl('min', {
      type: CONTROLLER_NUMBER,
      label: 'Min',
      default: 0,
      locked: true,
    });

    this.addControl('max', {
      type: CONTROLLER_NUMBER,
      label: 'Max',
      default: 100,
      locked: true,
    });

    this.addControl('step', {
      type: CONTROLLER_NUMBER,
      label: 'Step Size',
      locked: true,
    });

    this.addControl('label_step', {
      type: CONTROLLER_NUMBER,
      label: 'Label Step Size',
      default: 25,
      locked: true,
    });

    this.addControl('thousands_separator', {
      type: CONTROLLER_SWITCHER,
      label: 'Thousands separator',
      locked: true,
    });

    this.addControl('thousands_separator_value', {
      type: CONTROLLER_TEXT,
      label: 'Separator',
      locked: true,
    });

    this.addControl('decimal_place', {
      type: CONTROLLER_NUMBER,
      label: 'Rounding Degree',
      locked: true,
    });

    this.addControl('decimal_separator', {
      type: CONTROLLER_TEXT,
      label: 'Separator',
      locked: true,
    });

    this.addControl('custom_label', {
      type: CONTROLLER_TEXT,
      label: '',
      default: "value: {n}",
      locked: true,
    });

    this.endControlSection();


    this.startControlSection('form_start', {
      tab: TAB_CONTENT,
      label: 'Start Form',
    });

    this.addControl("form_id_start", {
      type: CONTROLLER_TEXT,
      label: "Start Form ID",
      responsive: false
    });

    this.addControl("field_id_start", {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: "Start field ID (Column Name)"
    });

    this.addControl("content_default_value_start", {
      type: CONTROLLER_NUMBER,
      responsive: false,
      label: "Start Default Value"
    });

    this.addControl("content_calculation_start", {
      type: CONTROLLER_TEXTAREA,
      label: "Start calculation",
      responsive: false,
      description:
        "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10"
    });

    this.endControlSection();

    this.startControlSection('form_end', {
      tab: TAB_CONTENT,
      label: 'End form',
    });

    this.addControl("form_id_end", {
      type: CONTROLLER_TEXT,
      label: "End form ID",
      responsive: false
    });

    this.addControl("field_id_end", {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: "End field ID (Column Name)"
    });

    this.addControl("content_default_value_end", {
      type: CONTROLLER_NUMBER,
      responsive: false,
      label: "End default Value"
    });

    this.addControl("content_calculation_end", {
      type: CONTROLLER_TEXTAREA,
      label: "End calculation",
      responsive: false,
      description:
        "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10"
    });

    this.endControlSection();


    this.startControlSection('slider_styles', {
      tab: TAB_STYLE,
      label: 'Slider',
    });

    this.addControl('width', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 500,
      min: 0,
      conditions: {
        'vertical!': true,
      },
    });

    this.addControl('height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
      conditions: {
        'vertical!': true,
      },
    });

    this.addControl('thickness', {
      type: CONTROLLER_SLIDER,
      label: 'thickness',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
      conditions: {
        'vertical': true,
      },
    });

    this.addControl('length', {
      type: CONTROLLER_SLIDER,
      label: 'length',
      units: ['px', '%', 'vh', 'vw'],
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
      label: 'Height',
      units: ['px', '%', 'vh', 'vw'],
      max: 50,
      min: 0,
    });

    this.addControl("handle_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 50,
      min: 0,
      locked: true,
    });

    this.addControl("tr_x", {
      label: 'Translate X',
      type: CONTROLLER_NUMBER,
    });

    this.addControl("tr_y", {
      label: 'Translate Y',
      type: CONTROLLER_NUMBER,
    });

    this.addControl('handle_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius first',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('handle_radius_second', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius second',
      units: ['px', '%', 'vh', 'vw'],
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
