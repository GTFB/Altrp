import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/widget_nav.svg';
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
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED
} from "../modules/ControllersManager";

class Nav extends BaseElement{

  static getName(){
    return'nav';
  }
  static getTitle(){
    return'Nav';
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
    this.startControlSection('type_section', {
      tab: TAB_CONTENT,
      label: 'Type',
    });
    
    this.addControl("type_type", {
      type: CONTROLLER_SELECT,
      label: "type",
      default: "Bread crumbs",
      options: [
        {
          value: "menu",
          label: "Menu"
        },
        {
          value: "breadCrumbs",
          label: "Bread crumbs"
        },
        {
          value: "prevNextPost",
          label: "Prev/Next post"
        },
        {
          value: "ticker",
          label: "Ticker"
        },
        {
          value: "scroll",
          label: "Scroll"
        },
        {
          value: "icon",
          label: "Icon"
        },
        {
          value: "helpDesk",
          label: "Help desk"
        },
        {
          value: "cookie",
          label: "Cookie"
        }
      ],
    });

    this.endControlSection();

    this.startControlSection('bread_crumbs_section', {
      tab: TAB_STYLE,
      label: 'Bread crumbs',
    });

    this.addControl('bread_crumbs_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 0.1,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading': [
            'font-family: "{{FAMILY}}", sans-sefir;',
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px',
            'font-weight: {{WEIGHT}}',
            'text-transform: {{TRANSFORM}}',
            'font-style: {{STYLE}}',
            'text-decoration: {{DECORATION}}'
          ],
        },
      }
    );

    this.addControl("bread_crumbs_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-text": "color: {{COLOR}};"
      }
    });

    this.addControl("bread_crumbs_style_space_between", {
      type: CONTROLLER_SLIDER,
      label: "Space between",
      default: {
        size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 20,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-text": "padding-left: {{SIZE}}{{UNIT}}",
        "{{ELEMENT}} .altrp-text": "padding-right: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('bread_crumbs_style_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'alignment',
      default: 'left',
      options:[
        {
          icon: 'left',
          value: 'left',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'right',
        }
      ],
      rules: {
            '{{ELEMENT}}': 'text-align: {{VALUE}};',
      },
    });

    this.endControlSection();

    this.startControlSection('links_section', {
      tab: TAB_STYLE,
      label: 'Links',
    });

    this.addControl('links_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 0.1,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading': [
            'font-family: "{{FAMILY}}", sans-sefir;',
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px',
            'font-weight: {{WEIGHT}}',
            'text-transform: {{TRANSFORM}}',
            'font-style: {{STYLE}}',
            'text-decoration: {{DECORATION}}'
          ],
        },
      }
    );

    this.addControl("links_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-text": "color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection('separator_section', {
      tab: TAB_STYLE,
      label: 'Separator',
    });

    this.addControl('separator_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 0.1,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading': [
            'font-family: "{{FAMILY}}", sans-sefir;',
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px',
            'font-weight: {{WEIGHT}}',
            'text-transform: {{TRANSFORM}}',
            'font-style: {{STYLE}}',
            'text-decoration: {{DECORATION}}'
          ],
        },
      }
    );

    this.addControl("separator_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-text": "color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection('current_page_section', {
      tab: TAB_STYLE,
      label: 'Current page',
    });

    this.addControl('current_page_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 0.1,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading': [
            'font-family: "{{FAMILY}}", sans-sefir;',
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px',
            'font-weight: {{WEIGHT}}',
            'text-transform: {{TRANSFORM}}',
            'font-style: {{STYLE}}',
            'text-decoration: {{DECORATION}}'
          ],
        },
      }
    );

    this.addControl("current_page_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-text": "color: {{COLOR}};"
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Nav