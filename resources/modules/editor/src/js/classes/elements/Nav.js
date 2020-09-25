import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/widget_nav.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_HEADING,
  CONTROLLER_SELECT,
  CONTROLLER_REPEATER,
  CONTROLLER_CHOOSE,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED, CONTROLLER_LINK, CONTROLLER_SWITCHER
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

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
      default: "menu",
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

    this.startControlSection('layout_menu_section', {
      tab: TAB_CONTENT,
      label: 'Layout (menu)',
    });

    let repeaterMenu = new Repeater();

    repeaterMenu.addControl('label_repeater_menu_layout', {
      type: CONTROLLER_TEXT,
      label: 'Label',
    });

    repeaterMenu.addControl('link_repeater_menu_layout', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'link',
    });

    this.addControl('repeater_menu_layout', {
      label: 'Items',
      type: CONTROLLER_REPEATER,
      fields: repeaterMenu.getControls(),
    });

    this.addControl('header_menu_layout', {
      type: CONTROLLER_HEADING,
      label: 'Settings',
    });

    this.addControl("menu_layout", {
      type: CONTROLLER_SELECT,
      label: "Layout",
      default: "horizontal",
      options: [
        {
          value: "horizontal",
          label: "Horizontal"
        },
        {
          value: "vertical",
          label: "Vertical"
        },
        {
          value: "dropdown",
          label: "Dropdown"
        }
      ],
    });

    this.addControl('hor_ver_align_menu_layout', {
      type: CONTROLLER_CHOOSE,
      label: 'Align (hor, ver)',
      default: 'center',
      options:[
        {
          icon: 'left',
          value: 'start',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'end',
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
    });

    this.addControl("hor_ver_pointer_menu_layout", {
      type: CONTROLLER_SELECT,
      label: "Pointer (hor, ver)",
      default: "none",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "overLine",
          label: "Overline"
        },
        {
          value: "underLine",
          label: "Underline"
        },
        {
          value: "doubleLine",
          label: "Double line"
        },
        {
          value: "framed",
          label: "Framed"
        },
        {
          value: "background",
          label: "Background"
        },
        {
          value: "text",
          label: "Text"
        }
      ],
    });

    this.addControl("hor_ver_line_animation_menu_layout", {
      type: CONTROLLER_SELECT,
      label: "Animation ((hor, ver), line)",
      default: "fade",
      options: [
        {
          value: "fade",
          label: "Fade"
        },
        {
          value: "slide",
          label: "Slide"
        },
        {
          value: "grow",
          label: "Grow"
        },
        {
          value: "dropIn",
          label: "Drop in"
        },
        {
          value: "dropOut",
          label: "Drop out"
        },
        {
          value: "none",
          label: "None"
        }
      ],
    });

    this.addControl("hor_ver_framed_animation_menu_layout", {
      type: CONTROLLER_SELECT,
      label: "Animation ((hor, ver), framed)",
      default: "fade",
      options: [
        {
          value: "fade",
          label: "Fade"
        },
        {
          value: "grow",
          label: "Grow"
        },
        {
          value: "shrink",
          label: "Shrink"
        },
        {
          value: "draw",
          label: "Draw"
        },
        {
          value: "corners",
          label: "Corners"
        },
        {
          value: "none",
          label: "None"
        }
      ],
    });

    this.addControl("hor_ver_background_animation_menu_layout", {
      type: CONTROLLER_SELECT,
      label: "Animation ((hor, ver), background)",
      default: "fade",
      options: [
        {
          value: "fade",
          label: "Fade"
        },
        {
          value: "grow",
          label: "Grow"
        },
        {
          value: "shrink",
          label: "Shrink"
        },
        {
          value: "sweepLeft",
          label: "Sweep left"
        },
        {
          value: "sweepRight",
          label: "Sweep right"
        },
        {
          value: "sweepUp",
          label: "Sweep up"
        },
        {
          value: "sweepDown",
          label: "Sweep down"
        },
        {
          value: "shutterInVertical",
          label: "Shutter in vertical"
        },
        {
          value: "shutterOutVertical",
          label: "Shutter out vertical"
        },
        {
          value: "shutterInHorizontal",
          label: "Shutter in horizontal"
        },
        {
          value: "shutterOutHorizontal",
          label: "Shutter out horizontal"
        },
        {
          value: "none",
          label: "None"
        },
      ],
    });

    this.addControl("hor_ver_text_animation_menu_layout", {
      type: CONTROLLER_SELECT,
      label: "Animation ((hor, ver), text)",
      default: "grow",
      options: [
        {
          value: "grow",
          label: "Grow"
        },
        {
          value: "shrink",
          label: "Shrink"
        },
        {
          value: "sink",
          label: "Sink"
        },
        {
          value: "float",
          label: "Float"
        },
        {
          value: "skew",
          label: "Skew"
        },
        {
          value: "rotate",
          label: "Rotate"
        },
        {
          value: "none",
          label: "None"
        },
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
          lineHeight: 1.5,
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
        "{{ELEMENT}} .altrp-text{{STATE}}": "color: {{COLOR}};"
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
        "{{ELEMENT}} .altrp-text{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ],
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
          lineHeight: 1.5,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
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
        "{{ELEMENT}} .altrp-text{{STATE}}": "color: {{COLOR}};"
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
          lineHeight: 1.5,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
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
        "{{ELEMENT}} .altrp-text{{STATE}}": "color: {{COLOR}};"
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
          lineHeight: 1.5,
          spacing: 0,
          size: 36,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
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
        "{{ELEMENT}} .altrp-text{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Nav
