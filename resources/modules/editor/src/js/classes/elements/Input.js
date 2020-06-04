import BaseElement from './BaseElement';
import FromIcon from '../../../svgs/form.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_SWITCHER,
  CONTROLLER_DIMENSIONS,
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

    this.addControl('content_form_id', {
      type: CONTROLLER_TEXT,
      label: 'Form ID',
    });

    this.addControl('content_field_id', {
      type: CONTROLLER_TEXT,
      label: 'Field ID',
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

    this.addControl('content_placeholder', {
      type: CONTROLLER_TEXT,
      label: 'Placeholder',
      default: 'placeholder'
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
      label: 'action',
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
    
    this.startControlSection('style_section', {
      tab: TAB_STYLE,
      label: '',
    });

    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'margin',
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
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'padding',
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
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'z-index',
      default: 0,
      rules: {
        '{{ELEMENT}} input': 'z-index: {{VALUE}}'
      }
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes'
    });

    this.endControlSection();
    
    this.startControlSection('overlay_section', {
      tab: TAB_STYLE,
      label: 'Overlay',
    });

    this.addControl('text_style_background_opacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      default:{
        size: 1,
      },
      max: 1,
      min: 0,
      step: 0.01,
      rules: {
        '{{ELEMENT}} input': 'opacity: {{SIZE}}',
      },
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      tab: TAB_STYLE,
      label: 'Background',
    });

    this.addControl('background_section_opacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      default:{
        size: 1,
      },
      max: 1,
      min: 0,
      step: 0.01,
      // rules: {
      //   '{{ELEMENT}}': 'opacity: {{SIZE}}',
      // },
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl(
      'border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        units:[
          'px',
          '%',
          'vh',
        ],
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
  
    this.addControl(
      'border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} input': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );
  
    this.addControl(
      'border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "rgb(50,168,82)",
          colorPickedHex: "#32a852",
        },
        rules: {
          '{{ELEMENT}} input': 'border-color: {{COLOR}};',
        },
      }
    );
    
    this.addControl('border_radius', {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default:{
        size: 0,
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
        '{{ELEMENT}} input': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Input;