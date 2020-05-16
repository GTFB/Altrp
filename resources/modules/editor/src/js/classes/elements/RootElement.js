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
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 10,
      min: -10,
      rules: {
        '{{ELEMENT}}': 'padding: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl('select2', {
      type: CONTROLLER_SELECT2,
      label: 'Select2 Content',
      placeholder: 'placeholder',
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
        atributes: "",
        noFollow: false
      },
      label: 'link content',
    });

    this.addControl('color', {
      type: CONTROLLER_MEDIA,
      label: 'color content',
      colorPickedHex: "#274BC8",
      presetColors: [
        "#eaeaea",
        "#9c18a8"
      ],
      rules: {
        '{{ELEMENT}}': 'background: {{VALUE}};',
      },
    });

    this.addControl('button', {
      type: CONTROLLER_BUTTON,
      label: 'button content',
      button: 'button',
      classes: {
        backgroundColor: '#20c74c',
        color: '#FFF'
      }
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
      rules: '{{VALUE}}'
    });

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
    return `altrp-template-root${this.getId()}`;
  }
}

export default RootElement;
