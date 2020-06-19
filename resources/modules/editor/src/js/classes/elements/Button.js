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
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED
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
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn': [ 
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
        unit:'px'
      },
      units:[
        'px',
        '%',  
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn': [ 
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
        '{{ELEMENT}} .altrp-btn': 'z-index: {{VALUE}}'
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

    this.addControl(
      'font_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'typographic',
        default:{
          lineHeight: 0.1,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: '"lato"',
          decoration: ""
        },
        familyOptions: [
              {
                value: '1',
                label:'Select sd  Content 1'
              },
              {
                value: '2',
                label:'Select Content 2'
              },
            ],
        weightOptions: [
          {
            value: '100',
            label:'100'
          },
          {
            value: '200',
            label:'200'
          },
          {
            value: '300',
            label:'300'
          },
          {
            value: '400',
            label:'400'
          },
          {
            value: '500',
            label:'500'
          },
          {
            value: '600',
            label:'600'
          },
          {
            value: '700',
            label:'700'
          },
          {
            value: '800',
            label:'800'
          },
          {
            value: '900',
            label:'900'
          },
          {
            value: 'bold',
            label:'bold'
          },
          {
            value: 'normal',
            label:'normal'
          },
          {
            value: 'bolder',
            label:'bolder'
          },
          {
            value: 'lighter',
            label:'lighter'
          },
        ],
        transformOptions: [
          {
            value: 'none',
            label:'default',
            key: 0
          },
          {
            value: 'capitalize',
            label:'capitalize',
            key: 1
          },
          {
            value: 'uppercase',
            label:'uppercase',
            key: 2
          },
          {
            value: 'lowercase',
            label:'lowercase',
            key: 3
          },
        ],
        styleOptions: [
          {
            value: 'normal',
            label:'normal',
            key: 0
          },
          {
            value: 'italic',
            label:'italic',
            key: 1
          },
          {
            value: 'oblique',
            label:'oblique',
            key: 2
          },
        ],
        decorationOptions: [
          {
            value: 'none',
            label:'none',
            key: 0
          },
          {
            value: 'underline',
            label:'underline',
            key: 1
          },
          {
            value: 'overline',
            label:'overline',
            key: 3
          },
          {
            value: 'line-through',
            label:'line-through',
            key: 4
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-btn': [
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
        '{{ELEMENT}} .altrp-btn': 'color: {{COLOR}};',
      },
    }
  );

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
          '{{ELEMENT}} .altrp-btn': 'border-style: {{VALUE}};',
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
          '{{ELEMENT}} .altrp-btn': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
          '{{ELEMENT}} .altrp-btn': 'border-color: {{COLOR}};',
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
        '{{ELEMENT}} .altrp-btn': 'border-radius: {{SIZE}}{{UNIT}}',
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
        '{{ELEMENT}} .altrp-btn': 'background-color: {{COLOR}};',
      },
    }
  );

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