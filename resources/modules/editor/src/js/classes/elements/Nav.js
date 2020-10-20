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

    repeaterMenu.addControl('id_repeater_menu_layout', {
      type: CONTROLLER_TEXT,
      label: "ID"
    });

    repeaterMenu.addControl('parent_id_repeater_menu_layout', {
      type: CONTROLLER_TEXT,
      label: "Parent ID"
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
      default: [
        {
          id: 0,
          label_repeater_menu_layout: "one",
        },
        {
          id: 1,
          label_repeater_menu_layout: "two",
        },
        {
          id: 2,
          label_repeater_menu_layout: "three",
        }

      ],
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

    this.addControl('label_dropdown_menu_layout', {
      type: CONTROLLER_HEADING,
      label: "Dropdown"
    });

    // this.addControl('full_width_dropdown_menu_layout', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Full width',
    // });

    this.addControl('align_dropdown_menu_layout', {
      type: CONTROLLER_CHOOSE,
      label: "Align",
      default: 'flex-start',
      options:[
        {
          icon: 'left',
          value: 'flex-start',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'flex-end',
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-nav-menu-dropdown-content .altrp-nav-menu-li-link': "justify-content: {{VALUE}}",
      },
    });

    this.addControl('toggle_align_dropdown_menu_layout', {
      type: CONTROLLER_CHOOSE,
      label: "Toggle align",
      default: 'flex-start',
      options:[
        {
          icon: 'left',
          value: 'flex-start',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'flex-end',
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-nav-menu-dropdown-wrapper': "justify-content: {{VALUE}}",
      },
    });

    this.endControlSection();

    this.startControlSection('main_menu_style', {
      tab: TAB_STYLE,
      label: 'Main menu',
    });

    this.addControl('typographic_main_menu_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: "Open Sans",
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-nav-menu-li-link-label{{STATE}}': [
            'font-family: "{{FAMILY}}", sans-serif;',
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

    this.addControl("text_color_main_menu_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-li-link-label{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("horizontal_padding_main_menu_style", {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal padding',
      default:{
        size: "15",
        unit: 'px',
      },
      max: 50,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("vertical_padding_main_menu_style", {
      type: CONTROLLER_SLIDER,
      label: 'Vertical padding',
      default:{
        size: "10",
        unit: 'px',
      },
      max: 50,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-li-link{{STATE}}": [
          "padding-top: {{SIZE}}{{UNIT}}",
          "padding-bottom: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("space_between_main_menu_style", {
      type: CONTROLLER_SLIDER,
      label: 'Space between',
      default:{
        size: "0",
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-li{{STATE}}": [
          "margin-right: {{SIZE}}{{UNIT}}",
        ]
      }
    });

    this.addControl("pointer_heading_main_menu_style", {
      type: CONTROLLER_HEADING,
      label: "Pointer"
    });

    this.addControl("pointer_color_main_menu_style", {
      type: CONTROLLER_COLOR,
      label: "Pointer color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-li-pointer{{STATE}}::after": "background: {{COLOR}};"
      }
    });

    this.addControl("pointer_height_main_menu_style", {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      default:{
        size: "3",
        unit: 'px',
      },
      max: 30,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-li-pointer:hover::after": "height: {{SIZE}}{{UNIT}}"
      }
    });

    this.endControlSection();

    this.startControlSection('dropdown_hor_ver_menu_section', {
      tab: TAB_STYLE,
      label: 'Dropdown (Hor Ver)',
    });

    this.addControl('typographic_dropdown_hor_ver_menu_section', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 15,
          weight: "normal",
          family: "Open Sans",
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-nav-menu-li-dropdown-hor-ver-link-label{{STATE}}': [
            'font-family: "{{FAMILY}}", sans-serif;',
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

    this.addControl("text_color_dropdown_hor_ver_menu_section", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}} .altrp-nav-menu-li-dropdown-hor-ver-link-label": "color: {{COLOR}};",
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon path": [
          "stroke: {{COLOR}};",
        ]
      }
    });

    this.addControl("background_color_dropdown_hor_ver_menu_section", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li{{STATE}}": "background: {{COLOR}};"
      }
    });

    this.addControl('border_type_dropdown_hor_ver_menu_section', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options:[
          {
            'value' : 'none',
            'label' : 'None',
          },
          {
            'value' : 'solid',
            'label' : 'Solid',
          },
          {
            'value' : 'double',
            'label' : 'Double',
          },
          {
            'value' : 'dotted',
            'label' : 'Dotted',
          },
          {
            'value' : 'dashed',
            'label' : 'Dashed',
          },
          {
            'value' : 'groove',
            'label' : 'Groove',
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('border_width_dropdown_hor_ver_menu_section', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true
        },
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color_dropdown_hor_ver_menu_section', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl("border_radius_dropdown_hor_ver_menu_section", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li:first-child{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} 0 0",
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li:last-child{{STATE}}": "border-radius: 0 0 {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
      }
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
          family: "Open Sans",
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading': [
            'font-family: "{{FAMILY}}", sans-serif;',
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
          family: "Open Sans",
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
            'font-family: "{{FAMILY}}", sans-serif;',
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
          family: "Open Sans",
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
            'font-family: "{{FAMILY}}", sans-serif;',
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
          family: "Open Sans",
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
            'font-family: "{{FAMILY}}", sans-serif;',
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
