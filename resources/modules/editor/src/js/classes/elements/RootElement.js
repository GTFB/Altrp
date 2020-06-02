import BaseElement from "./BaseElement";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER, CONTROLLER_SWITCHER,
  CONTROLLER_TEXT,
  CONTROLLER_TEXTAREA,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_SELECT2,
  CONTROLLER_LINK,
  CONTROLLER_COLOR,
  CONTROLLER_BUTTON,
  CONTROLLER_HEADING,
  CONTROLLER_CSSEDITOR,
  CONTROLLER_SHADOW,
  CONTROLLER_TRANSFORM,
  TAB_ADVANCED,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_MEDIA,
} from "../modules/ControllersManager";

class RootElement extends BaseElement {
  constructor() {
    super();
  }

  static getName() {
    return 'root-element';
  }

  static getTitle() {
    return 'Page';
  }

  static getType() {
    return 'root-element';
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return
    }
    this.startControlSection('text_section', {
      tab: TAB_CONTENT,
      label: 'Text Section',
    });

    this.addControl('textContainer', {
      type: CONTROLLER_TEXT,
      label: "textContainer"  
    });

    this.addControl('text', {
      type: CONTROLLER_SWITCHER,
      label: 'Switcher Content',
    });

    this.addControl('font-size', {
      type: CONTROLLER_NUMBER,
      label: 'Font Size',
      default: 16,
      rules: {
        '{{ELEMENT}}': [
          'font-size: {{VALUE}}px;',
          'line-height: {{VALUE}}px',
        ],
      },
    });

    this.addControl('padding', {
      type: CONTROLLER_NUMBER,
      label: 'Padding All',
      default: 17,
      rules: {
        '{{ELEMENT}}': 'padding: {{VALUE}}px;',
      },
    });

    this.addControl('dimensions', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Dimensions',
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
        '{{ELEMENT}}': [ 
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('dimenssions', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Dimensions',
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
        '{{ELEMENT}}': [ 
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('select', {
      type: CONTROLLER_SELECT,
      label: 'Select Content',
      default: 'select1',
      options: [
        {
          value: 'select1',
          label: 'Select Content 231'
        },
        {
          value: 'select2',
          label: 'Select Content 2'
        }
      ]
    });

    this.addControl('choose', {
      type: CONTROLLER_CHOOSE,
      label: 'Choose Content',
      default: 1,
      options:[
        {
          icon: 'add',
          value: 'add',
        }
      ],
    });

    this.addControl('slider', {
      type: CONTROLLER_SLIDER,
      label: 'Slider Content',
      default:{
        size:12,
        unit:'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 10,
      min: -10,
      step: 10,
      rules: {
        '{{ELEMENT}}': 'padding: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl('select2', {
      type: CONTROLLER_SELECT2,
      label: 'Select2 Content',
      placeholder: 'placeholder',
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

    this.addControl('link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link content',
    });

    this.addControl('color', {
      type: CONTROLLER_COLOR,
      label: 'color content',
      default: {
        color: "rgb(234, 234, 234)",
        colorPickedHex: "#EAEAEA",
      },
      presetColors: [
        "#eaeaea",
        "#9c18a8"
      ],
      rules: {
        '{{ELEMENT}}': 'background: {{COLOR}};',
      },
    });

    this.addControl('buttonContrainer', {
      type: CONTROLLER_BUTTON,
      default: {
        activeClass: 'control-button-active',
        button: 'normal'
      },
      buttons: [
        {
          value: 'normal',
          label: 'normal',
          key: 0,
          styles: {
            background: 'none',
            color: '#FFF',
            borderRadius: '3px',
            border: '1.5px solid #3C455B',
            color: '#3C455B',
            margin: '6px',
            marginLeft: '0',
            marginTop: '3px',
            marginBottom: '3px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '3px',
            paddingRight: '3px',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            lineHeight: '15px',
            fontWeight: 'bold'
          },     
        },
        {
          value: 'Hover',
          label: 'Hover',
          key: 1,
          styles: {
            background: 'none',
            color: '#FFF',
            borderRadius: '3px',
            border: '1.5px solid #3C455B',
            color: '#3C455B',
            margin: '6px',
            marginLeft: '2px',
            marginTop: '3px',
            marginBottom: '3px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '3px',
            paddingRight: '3px',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            lineHeight: '15px',
            fontWeight: 'bold'
          }
        },
        {
          value: 'active',
          label: 'active',
          key: 2,
          styles: {
            background: 'none',
            color: '#FFF',
            borderRadius: '3px',
            border: '1.5px solid #3C455B',
            color: '#3C455B',
            margin: '6px',
            marginLeft: '2px',
            marginTop: '3px',
            marginBottom: '3px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '3px',
            paddingRight: '3px',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            lineHeight: '15px',
            fontWeight: 'bold'
          }
        },
        {
          value: 'disabled',
          label: 'disabled',
          key: 3,
          styles: {
            background: 'none',
            color: '#FFF',
            borderRadius: '3px',
            border: '1.5px solid #3C455B',
            color: '#3C455B',
            marginLeft: '2px',
            marginTop: '3px',
            marginRight: '0',
            marginBottom: '3px',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '3px',
            paddingRight: '3px',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            lineHeight: '15px',
            fontWeight: 'bold'
          }
        }
      ],
    });

    this.addControl('heading', {
      type: CONTROLLER_HEADING,
      default: {
        label: 'heading'
      }
    });
    
    this.addControl('css editor', {
      type: CONTROLLER_CSSEDITOR,
      default: {
        value: null
      },
    });

    this.addControl('shadow', {
        type: CONTROLLER_SHADOW,
        label: 'box shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
        },
        presetColors: [
          '#eaeaea',
          '#9c18a8'
        ],
        rules: {
          '{{ELEMENT}}': 'box-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
        },
      }
    );

    this.addControl('transform Header', {
      type: CONTROLLER_HEADING,
      default: {
        label: 'transform'
      }
    })

    this.addControl('transform', {
      type: CONTROLLER_TRANSFORM,
      label: 'transform',
      default: {
        size: 0
      },
      options: [
        {
          label: 'none',
          value: ''
        },
        {
          label: 'rotate',
          value: 'rotate',
        },
        {
          label: 'scaleX',
          value: 'scaleX',
        },
        {
          label: 'scaleY',
          value: 'scaleY',
        },
        {
          label: 'skewY',
          value: 'skewY',
        },
        {
          label: 'skewX',
          value: 'skewX',
        },
        {
          label: 'translateX',
          value: 'translateX',
        },
        {
          label: 'translateY',
          value: 'translateY',
        }
      ],
      rules: {
        '{{ELEMENT}}': 'transform: {{FUNCTION}}( {{SIZE}}{{UNIT}} )'
      }
    })
    this.endControlSection();

    this.startControlSection('text_style', {
      tab: TAB_STYLE,
      label: 'Text Section',
    });

    this.addControl('text_', {
      type: CONTROLLER_TEXTAREA,
      label: 'Text Content',
      default: 'Default Text!!!',
    });

    this.endControlSection();

    this.startControlSection('text_advanced', {
      tab: TAB_ADVANCED,
      label: 'Text Section',
    });

    this.addControl('text__', {
      type: CONTROLLER_TEXT,
      label: 'Text Content',
      default: 'Default Advanced Text!!!',
    });

    this.endControlSection();
    // this.startControlSection('text_section', {
    //   tab: TAB_CONTENT,
    //   label: 'Text Section',
    // });
    //
    // this.addControl('text', {
    //   type: CONTROLLER_TEXT,
    //   label: 'Text Content',
    // });
    //
    //
    // this.endControlSection();
    //
    // this.startControlSection('text_style', {
    //   tab: TAB_STYLE,
    //   label: 'Text Section',
    // });
    //
    // this.addControl('text_', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Text Content',
    // });
    //
    // this.endControlSection();
    //
    // this.startControlSection('text_advanced', {
    //   tab: TAB_ADVANCED,
    //   label: 'Text Section',
    // });
    //
    // this.addControl('text__', {
    //   type: CONTROLLER_TEXT,
    //   label: 'Text Content',
    // });
    //
    // this.endControlSection();

  }

  appendNewSection(newSection) {
    if (newSection.getType() !== 'section') {
      throw 'Only Section can be a Child of Template';
    }
    this.appendChild(newSection);
  }
  getSelector(){
    return `.altrp-template-root${this.getId()}`;
  }
}

export default RootElement;
