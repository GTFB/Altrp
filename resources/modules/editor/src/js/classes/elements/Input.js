import BaseElement from './BaseElement';
import FromIcon from '../../../svgs/form.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_SWITCHER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_NUMBER,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT2,
  TAB_CONTENT,
  TAB_STYLE
} from "../modules/ControllersManager";

class Input extends BaseElement{
  static getName(){
    return 'input';
  }
  static getTitle(){
    return'Field';
  }
  static getIconComponent(){
    return FromIcon;
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

    this.addControl('form_id', {
      type: CONTROLLER_TEXT,
      label: 'Form ID',
    });

    this.addControl('field_id', {
      type: CONTROLLER_TEXT,
      label: 'Field ID (Column Name)',
    });

    this.addControl('content_shortcode', {
      type: CONTROLLER_TEXT,
      label: 'Shortcode',
    });

    this.addControl('content_type', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      default: 'text',
      options: [
        {
          value: 'text',
          label: 'text'
        },
        {
          value: 'number',
          label: 'number'
        },
        {
          value: 'date',
          label: 'date'
        },
        {
          value: 'email',
          label: 'email'
        },
        {
          value: 'tel',
          label: 'tel'
        },
        {
          value: 'file',
          label: 'file'
        }
      ]
    });

    this.addControl('content_label', {
      type: CONTROLLER_TEXT,
      label: 'Label',
    });

    this.addControl('content_label_position_type', {
        type: CONTROLLER_SELECT,
        label: 'label position',
        default: 'top',
        options:[
          {
            'value' : 'top',
            'label' : 'default',
          },
          {
            'value' : 'bottom',
            'label' : 'bottom',
          },
          {
            'value' : 'left',
            'label' : 'left',
          }
        ],
        rules: {
        },
      }
    );

    this.addControl('content_placeholder', {
      type: CONTROLLER_TEXT,
      label: 'Placeholder',
      default: 'Placeholder'
    });

    this.addControl('content_mask', {
      type: CONTROLLER_TEXT,
      label: 'Mask',
    });

    
    this.addControl('content_required', {
      type: CONTROLLER_SWITCHER,
      label: 'Required',
    });

    this.addControl('content_autocomplete', {
      type: CONTROLLER_SWITCHER,
      label: 'Autocomplete',
    });

    this.addControl('content_default_value', {
      type: CONTROLLER_TEXTAREA,
      label: 'Default Value',
    });

    this.endControlSection();

    this.startControlSection('logic_section', {
      tab: TAB_CONTENT,
      label: 'Logic',
    });

    this.addControl('logic_action', {
      type: CONTROLLER_SELECT2,
      label: 'Action',
      placeholder: 'action',
      default: '1',
      options: [
        {
          value: '1',
          label:'Select sd  Content 1'
        }, 
        {
          value: '2',
          label:'Select Content 2'
        },
      ]
    });

    this.endControlSection();
    
    this.startControlSection('label_style_section', {
      tab: TAB_STYLE,
      label: 'label',
    });

    this.addControl("label_style_spacing", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      default: {
        size: 2,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 60,
      min: 0,
      rules: {
      }
    });

    this.addControl("label_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field-label": "color: {{COLOR}};"
      }
    });

    this.addControl('label_style_font_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-field-label': [
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
    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-field-container': [ 
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
        top: 2,
        right: 2,
        bottom: 2,
        left: 2,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} input': [ 
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
        '{{ELEMENT}} input': 'z-index: {{VALUE}}'
      }
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID',
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes'
    });

    this.endControlSection();
    
    this.startControlSection('placeholder_style_section', {
      tab: TAB_STYLE,
      label: 'placeholder',
    });

    this.addControl("placeholder_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field::placeholder": "color: {{COLOR}};"
      }
    });

    this.addControl('placeholder_style_font_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 13,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-field::placeholder': [
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
    
    this.endControlSection();

    this.startControlSection('required_style_section', {
      tab: TAB_STYLE,
      label: 'Required',
    });

    this.addControl("required_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field-required": "color: {{COLOR}};"
      }
    });

    this.addControl('required_style_font_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 13,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-field-required': [
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
    
    this.endControlSection();

    this.startControlSection('overlay_section', {
      tab: TAB_STYLE,
      label: 'Overlay',
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      tab: TAB_STYLE,
      label: 'Background',
    });

    this.addControl('background_style_background_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "",
          colorPickedHex: "",
        },
        rules: {
          '{{ELEMENT}} input': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('background_section_opacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      default:{
        size: 1,
      },
      max: 1,
      min: 0,
      step: 0.01,
      rules: {
        '{{ELEMENT}}': 'opacity: {{SIZE}}',
      },
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        default: 'solid',
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
          '{{ELEMENT}} input': 'border-style: {{VALUE}};',
        },
      }
    );
  
    this.addControl('border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        units:[
          'px',
          '%',
          'vh',
        ],
        default: {
          top: 2,
          right: 2,
          bottom: 2,
          left: 2
        },
        rules: {
          '{{ELEMENT}} input': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );
  
    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "rgb(142,148,170)",
          colorPickedHex: "#8E94AA",
        },
        rules: {
          '{{ELEMENT}} input': 'border-color: {{COLOR}};',
        },
      }
    );
    
    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Radius',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} input': [ 
          'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        ]
      },
    });

    this.endControlSection();

    this.startControlSection('transform_section', {
      tab: TAB_STYLE,
      label: 'Transform'
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Input;