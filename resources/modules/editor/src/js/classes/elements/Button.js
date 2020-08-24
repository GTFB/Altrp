import BaseElement from "./BaseElement";
import ButtonIcon from '../../../svgs/button.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED,
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";

class Button extends BaseElement{

  static getName(){
    return'button';
  }
  static getTitle(){
    return'Button';
  }

  static getIconComponent(){
    return ButtonIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }
    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('button_text', {
      type: CONTROLLER_TEXTAREA,
      label: 'Button Text',
      default: 'Click Me'
    });

    this.addControl('button_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'center',
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
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
      rules: {
            '{{ELEMENT}}': 'align-items: {{VALUE}};',
      },
    });

    this.addControl('button_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Choose Icon',
    });

    this.addControl('button_icon_position', {
      type: CONTROLLER_SELECT,
      label: 'Icon Position',
      default: 'default',
      options: [
        {
          value: 'row',
          label: 'Right'
        },
        {
          value: 'row-reverse',
          label: 'Left'
        },
        {
          value: 'column',
          label: 'Bottom'
        },
        {
          value: 'column-reverse',
          label: 'Top'
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'flex-direction: {{VALUE}};'
      },
    });

    this.endControlSection();

    this.startControlSection("link", {
      tab: TAB_CONTENT,
      label: "Link"
    });

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false,
        tag: 'Link'
      },
      label: 'Link',
    });

    this.endControlSection();
    this.startControlSection("form_section", {
      tab: TAB_CONTENT,
      label: "Form Settings"
    });

    this.addControl('form_id', {
      label: 'Form ID',
      placeholder: 'Form ID'
    });

    this.addControl('form_actions', {
      type: CONTROLLER_SELECT2,
      label: 'Form Actions',
      options: [
        {
          value: 'add_new',
          label: 'Add New',
        },
        {
          value: 'delete',
          label: 'Delete',
        },
        {
          value: 'edit',
          label: 'Edit',
        },
        {
          value: 'login',
          label: 'Login',
        },
        {
          value: 'logout',
          label: 'Logout',
        },
      ],
    });

    this.addControl('choose_model', {
      conditions: {
        'form_actions': 'add_new',
      },
      type: CONTROLLER_SELECT,
      resource: '/admin/ajax/models_options?with_names=true',
    });

    this.addControl('redirect_after', {
      label: 'Redirect After',
    });

    this.addControl('redirect_to_prev_page', {
      type: CONTROLLER_SWITCHER,
      label: 'Redirect To Prev Page',
    });

    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default:{
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        top: 20,
        right: 25,
        bottom: 20,
        left: 25,
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
      default: 0,
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'z-index: {{VALUE}}'
      }
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes',
      default: ''
    });

    this.endControlSection();

    this.startControlSection('font_section', {
      tab: TAB_STYLE,
      label: 'Font',
    });

    this.addControl('font_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: '"lato"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': [
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

    this.addControl('font_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
      default: {
        color: "rgb(255,255,255)",
        colorPickedHex: "#FFF",
      },
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
      },
    }
  );

  this.endControlSection();

  this.startControlSection("icon_style", {
    tab: TAB_STYLE,
    label: "Icon"
  });

  this.addControl('alignment_icon_style', {
    type: CONTROLLER_CHOOSE,
    label: 'Alignment',
    default: 'left',
    options: [
      {
        icon: 'block_left',
        value: 'left',
      },
      {
        icon: 'block_right',
        value: 'right',
      },
    ],
  });

  this.addControl("color_icon_style", {
    type: CONTROLLER_COLOR,
    label: "Color",
    default: {
      color: "rgb(50,168,82)",
      colorPickedHex: "#32a852"
    },
    // rules: {
    //   "{{ELEMENT}} .altrp-tab-btn-icon{{STATE}} svg path": "fill: {{COLOR}};"
    // }
  });

  this.addControl("spacing_icon_style", {
    type: CONTROLLER_SLIDER,
    label: "Spacing",
    default: {
      size: 8,
      unit: "px"
    },
    units: ["px", "%", "vh"],
    max: 100,
    min: 0,
  });

  this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('border_type', {
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl(
      'border_width', {
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "rgb(50,168,82)",
          colorPickedHex: "#32a852",
        },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default:{
        size: 6,
        unit: 'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl('background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
      default: {
        color: "rgb(52,59,76)",
        colorPickedHex: "#343B4C",
      },
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'background-color: {{COLOR}};',
      },
    });

  this.addControl('style_background_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          spread: 0,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
          type: ""
        },
        presetColors: [
          '#eaeaea',
          '#9c18a8'
        ],
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
        },
      }
    );

  this.endControlSection();

    this.startControlSection("Icon", {
      tab: TAB_STYLE,
      label: "Icon"
    });

    this.addControl('icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn-icon{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('icon_color', {
        type: CONTROLLER_COLOR,
        label: 'Icon Color',
        default: {
          color: "rgb(255,255,255)",
          colorPickedHex: "#fff",
        },
        rules: {
          '{{ELEMENT}} .altrp-btn-icon path{{STATE}}': 'fill: {{COLOR}};',
        },
      }
    );

    this.addControl('icon_color_background', {
        type: CONTROLLER_COLOR,
        label: 'Icon Color',
        rules: {
          '{{ELEMENT}} .altrp-btn-icon svg{{STATE}}': 'background: {{COLOR}};',
        },
      }
    );

    this.addControl('icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Size',
      default:{
        size: 20,
        unit: 'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-btn-icon{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-btn-icon svg{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
      },
    });

    this.endControlSection();

    this.startControlSection('button_advanced_tooltip', {
      tab: TAB_ADVANCED,
      label: 'Tooltip'
    });

    this.addControl('button_advanced_tooltip_font', {
      type: CONTROLLER_SELECT2,
      label: 'Font',
      placeholder: 'Lato',
      default: '"Lato"',
      options: [
        {
          value: '"Roboto"',
          label:'Roboto'
        },
        {
          value: '"Lato"',
          label:'Lato'
        },
      ],
      rules: {
        '{{ELEMENT}}': 'font-family: {{VALUE}}'
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Button
