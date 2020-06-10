import BaseElement from "./BaseElement";
import TextIcon from '../../../svgs/widget_text.svg';
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER, CONTROLLER_WYSIWYG
} from "../modules/ControllersManager";
import {advancedTabControllers} from "../../decorators/register-controllers";

class Text extends BaseElement{
  static getName(){
    return'Text';
  }
  static getTitle(){
    return'Text';
  }
  static getIconComponent(){
    return TextIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }
    this.startControlSection('text_editor', {
      tab: TAB_CONTENT,
      label: 'Text editor',
    });

    this.addControl('text', {
      type: CONTROLLER_TEXTAREA,
      label: 'Text',
      default: 'I Am Advanced Text'
    });

    this.addControl('text_drop_cap', {
      type: CONTROLLER_SWITCHER,
      label: 'Drop Cap',
    });

    this.endControlSection();

    this.startControlSection('text_style', {
      tab: TAB_STYLE,
      label: ''
    });

    this.addControl('text_style_column-count', {
      type: CONTROLLER_NUMBER,
      label: 'column count',
      default: 1,
      rules: {
        '{{ELEMENT}} .altrp-text': 'column-count: {{VALUE}}'
      }
    });

    this.addControl('text_style_column-width', {
      type: CONTROLLER_SLIDER,
      label: 'column width',
      default:{
        size: 0,
        unit:'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-text': 'column-width: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl('text_style_column-gap', {
      type: CONTROLLER_SLIDER,
      label: 'column width',
      default:{
        size: 0,
        unit:'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-text': 'column-gap: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl('text_transition', {
      type: CONTROLLER_NUMBER,
      label: 'transition',
      default: 0,
      rules: {
        '{{ELEMENT}} .altrp-text': 'transition: {{VALUE}}s'
      }
    });
    
    this.endControlSection();

    this.startControlSection('text_style_position', {
      tab: TAB_STYLE,
      label: 'position'
    });
    
    this.addControl('text_style_position_padding', {
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
        '{{ELEMENT}} .altrp-text': [ 
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('text_position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'z-index',
      default: 0,
      rules: {
        '{{ELEMENT}} .altrp-text': 'z-index: {{VALUE}}'
      }
    });

    this.endControlSection();

    this.startControlSection('text_style_background', {
      tab: TAB_STYLE,
      label: 'background'
    });
    
    this.addControl('text_style_background_color', {
      type: CONTROLLER_COLOR,
      label: 'background color',
      default: {
        color: "rgb(234, 234, 234)",
        colorPickedHex: "#EAEAEA",
      },
      presetColors: [
        "#eaeaea",
        "#9c18a8"
      ],
      rules: {
        '{{ELEMENT}} .altrp-text': 'background-color: {{COLOR}};',
      },
    });


    this.addControl('text_style_background_opacity', {
      type: CONTROLLER_SLIDER,
      label: 'opacity',
      default:{
        size: 1,
      },
      max: 1,
      min: 0,
      step: 0.01,
      rules: {
        '{{ELEMENT}} .altrp-text': 'opacity: {{SIZE}}',
      },
    });

    this.endControlSection();
    
    this.startControlSection('text_style_font', {
      tab: TAB_STYLE,
      label: 'font'
    });
    
    this.addControl('text_style_font_color', {
      type: CONTROLLER_COLOR,
      label: 'color',
      default: {
        color: "rgb(0, 0, 1)",
        colorPickedHex: "#000000",
      },
      presetColors: [
        "#eaeaea",
        "#9c18a8"
      ],
      rules: {
        '{{ELEMENT}} .altrp-text': 'color: {{COLOR}};',
      },
    });

    this.endControlSection();

    this.startControlSection('text_style_border', {
      tab: TAB_STYLE,
      label: 'border'
    });

    this.addControl(
      'text_style_border_type', {
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
          '{{ELEMENT}} .altrp-text': 'border-style: {{VALUE}};',
        },
      }
    );
  
    this.addControl(
      'text_style_border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-text': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );
  
    this.addControl(
      'text_style_border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        default: {
          color: "rgb(50,168,82)",
          colorPickedHex: "#32a852",
        },
        rules: {
          '{{ELEMENT}} .altrp-text': 'border-color: {{COLOR}};',
        },
      }
    );
    
    this.addControl('text_style_border_radius', {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default:{
        size: 1,
        unit: 'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 1,
      min: 0,
      step: 0.01,
      rules: {
        '{{ELEMENT}} .altrp-text': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });

    this.endControlSection();

    this.startControlSection('text_advanced_tooltip', {
      tab: TAB_ADVANCED,
      label: 'Tooltip'
    });

    this.addControl('tex_advanced_tooltip_font', {
      type: CONTROLLER_SELECT2,
      label: 'font',
      placeholder: 'placeholder',
      default: '"Roboto"',
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

    this.startControlSection('text_advanced_attributes', {
      tab: TAB_ADVANCED,
      label: 'attributes'
    });
    
    this.addControl('text_advanced_attributes_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    })

    this.addControl('text_advanced_attributes_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes'
    });

    this.endControlSection();
    advancedTabControllers(this);
  }
}

export default Text