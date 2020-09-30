  import BaseElement from "./BaseElement";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SWITCHER,
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
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_FILTERS,
  CONTROLLER_GRADIENT,
  TAB_ADVANCED,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_MEDIA, CONTROLLER_REPEATER,
} from "../modules/ControllersManager";
  import Repeater from "../Repeater";

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
/*
    this.addControl( 'test_repeater', {
      label: 'test Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default : [{
        text: 'Item 1',
      }, {
        text: 'Item 2',
      },],
  } );
*/

    this.startControlSection('preview_section',{
      label: 'Preview Settings',
    });

    this.addControl('choose_page', {
      type: CONTROLLER_SELECT2,
      label: 'Choose Page',
      options_resource: '/admin/ajax/pages_options',
    });

    this.addControl('preview_heading', {
      label: 'Model Settings',
      type: CONTROLLER_HEADING
    });

    this.addControl('preview_model', {
      type: CONTROLLER_SELECT,
      resource: '/admin/ajax/models_options?with_names=1&not_plural=1',
      nullable: true,
    });
    this.addControl('preview_model_instance', {
      type: CONTROLLER_SELECT2,
      options_resource: '/ajax/models/{{preview_model}}_options',
      conditions:{
        'preview_model!': [null, '', undefined],
      },
      nullable: true,
    });

    this.endControlSection();

    this.startControlSection('content_section', {
      tab: TAB_STYLE,
      label: 'Page Styles',
    });

    this.addControl("section_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "body": "background-color: {{COLOR}};"
      }
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      rules: {
        "body": "background-image: url({{URL}});"
      }
    });

    this.addControl('background_position', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "top left",
          label: "top left"
        },
        {
          value: "top",
          label: "top"
        },
        {
          value: "top right",
          label: "top right"
        },
        {
          value: "right",
          label: "right"
        },
        {
          value: "bottom right",
          label: "bottom right"
        },
        {
          value: "bottom",
          label: "bottom"
        },
        {
          value: "bottom left",
          label: "bottom left"
        },
        {
          value: "left",
          label: "left"
        },
        {
          value: "center",
          label: "center"
        }
      ],
      label: 'Background Position',
      default: 'top left',
      rules: {
        "body": "background-position: {{VALUE}};"
      }
    });

    this.addControl('background_attachment', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "scroll",
          label: "scroll"
        },
        {
          value: "fixed",
          label: "fixed"
        },
        {
          value: "local",
          label: "local"
        }
      ],
      label: 'Background Attachment',
      default: 'scroll',
      rules: {
        "body": "background-attachment: {{VALUE}};"
      }
    });

    this.addControl('background_repeat', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "repeat",
          label: "repeat"
        },
        {
          value: "repeat-x",
          label: "repeat-x"
        },
        {
          value: "repeat-y",
          label: "repeat-y"
        },
        {
          value: "space",
          label: "space"
        },
        {
          value: "round",
          label: "round"
        },
        {
          value: "no-repeat",
          label: "no-repeat"
        }
      ],
      label: 'Background Repeat',
      default: 'repeat',
      rules: {
        "body": "background-repeat: {{VALUE}};"
      }
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 100,
        unit: 'px',
      },
      conditions: {
        'background_size': [''],
      },
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 1000,
      min: 0,
      rules: {
        "body": "background-size: {{SIZE}}{{UNIT}};"
      }
    });

    this.addControl('background_size', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "unset",
          label: "unset"
        },
        {
          value: "cover",
          label: "cover"
        },
        {
          value: "contain",
          label: "contain"
        },
        {
          value: "",
          label: "set width"
        },
      ],
      label: 'Background Size',
      default: 'unset',
      rules: {
        "body": "background-size: {{VALUE}};"
      }
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '0',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "100",
        angle: "0",
        value: ""
      },
      rules: {
        "body{{STATE}}": "background-image: {{VALUE}}"
      }
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        'body': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.endControlSection();

    this.startControlSection('heading_defaults', {
      tab: TAB_STYLE,
      label: 'Heading Defaults',
    });

    this.addControl("heading_h1_color", {
      type: CONTROLLER_COLOR,
      label: "H1 Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "h1.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("heading_h2_color", {
      type: CONTROLLER_COLOR,
      label: "H2 Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "h2.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("heading_h3_color", {
      type: CONTROLLER_COLOR,
      label: "H3 Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "h3.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("heading_h4_color", {
      type: CONTROLLER_COLOR,
      label: "H4 Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "h4.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("heading_h5_color", {
      type: CONTROLLER_COLOR,
      label: "H5 Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "h5.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("heading_h6_color", {
      type: CONTROLLER_COLOR,
      label: "H6 Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "h6.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("heading_p_color", {
      type: CONTROLLER_COLOR,
      label: "P Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "p.altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('heading_h1_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'H1 Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'h1.altrp-heading{{STATE}}': [
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
    });

    this.addControl('heading_h2_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'H2 Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'h2.altrp-heading{{STATE}}': [
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
    });
    this.addControl('heading_h3_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'H3 Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'h3.altrp-heading{{STATE}}': [
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
    });
    this.addControl('heading_h4_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'H4 Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'h4.altrp-heading{{STATE}}': [
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
    });
    this.addControl('heading_h5_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'H5 Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'h5.altrp-heading{{STATE}}': [
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
    });
    this.addControl('heading_h6_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'H6 Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'h6.altrp-heading{{STATE}}': [
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
    });
    this.addControl('heading_p_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'P Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 36,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        'p.altrp-heading{{STATE}}': [
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
    });

    this.endControlSection();

    this.startControlSection('button_defaults', {
      tab: TAB_STYLE,
      label: 'Button Defaults',
    });

    

    this.endControlSection();
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

  /**
   * Задать настройки
   * для корневого элемента проверим настройки моделей для предпросмотра
   * @param settings
   */
  setSettings(settings){
    super.setSettings(settings);
    if(this.settings.choose_page){
      this.addModelInfo({
        modelName: 'page',
        modelId: this.settings.choose_page
      })
    }
  }
}

export default RootElement;
