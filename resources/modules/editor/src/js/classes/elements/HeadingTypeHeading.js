import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/text.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_LINK,
  CONTROLLER_TRANSFORM,
  CONTROLLER_CHOOSE,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA, CONTROLLER_SWITCHER, CONTROLLER_HEADING, CONTROLLER_CREATIVE_LINK, CONTROLLER_REPEATER, CONTROLLER_RANGE
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class HeadingTypeHeading extends BaseElement {
  static getName() {
    return "heading";
  }
  static getTitle() {
    return "Text";
  }
  static getIconComponent() {
    return HeadingIcon;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Basic";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("text_section", {
      tab: TAB_CONTENT,
      label: "Text Section",
    });

    this.addControl("text", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Text",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('heading_settings', {
      tab: TAB_CONTENT,
      label: 'Text Settings',
    });

    this.addControl('heading_settings_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      options: [
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
    });

    this.addControl('heading_settings_html_tag', {
      hideOnEmail: true,
      type: CONTROLLER_SELECT,
      label: 'HTML Tag',
      default: 'h2',
      options: [
        {
          value: 'h1',
          label: 'h1'
        },
        {
          value: 'h2',
          label: 'h2'
        },
        {
          value: 'h3',
          label: 'h3'
        },
        {
          value: 'h4',
          label: 'h4'
        },
        {
          value: 'h5',
          label: 'h5'
        },
        {
          value: 'h6',
          label: 'h6'
        },
        {
          value: 'p',
          label: 'p'
        },
        {
          value: 'span',
          label: 'span'
        },
        {
          value: 'div',
          label: 'div'
        }
      ],
      locked: true,
    });

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      label: 'Link',
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("style_position", {
      tab: TAB_STYLE,
      label: 'Position (content)'
    });

    this.addControl('style_position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      // default:{
      // top: 5,
      // right: 0,
      // bottom: 5,
      // left: 0,
      // unit:'px'
      // },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    });

    this.addControl("style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: "Z-Index",
      default: 0,
    });

    this.addControl("position_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID",
      locked: true,
    });

    this.addControl("position_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes",
      locked: true,
    });

    this.addControl("style_background_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      max: 1,
      min: 0,
      step: 0.01,
    });

    this.endControlSection();

    this.startControlSection("style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
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
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      locked: true,
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
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
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
    });

    this.endControlSection();

    this.startControlSection("style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("style_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "solid",
          label: "Solid"
        },
        {
          value: "double",
          label: "Double"
        },
        {
          value: "dotted",
          label: "Dotted"
        },
        {
          value: "dashed",
          label: "Dashed"
        },
        {
          value: "groove",
          label: "Groove"
        }
      ],
    });

    this.addControl("style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });

    this.addControl("style_border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
        bind: true,
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.endControlSection();

    this.startControlSection('heading_style_font', {
      tab: TAB_STYLE,
      label: 'Font',
    });

    this.addControl("heading_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
    });

    this.addControl("style_text_gradient_switcher", {
      type: CONTROLLER_SWITCHER,
      label: "gradient color",
    });

    this.addControl("style_text_gradient_textarea", {
      type: CONTROLLER_TEXTAREA,
      label: "Gradient",
      default: '',
      description: "Example:<br>linear-gradient(90deg,#0068e1,#a161ee) <a style='margin-top: 10px; color: #007bff; display: block' href='https://www.colorzilla.com/gradient-editor/' target='_blank'>--> CSS Gradient Generator</a>"
    });

    this.addControl('heading_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('heading_style_text_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Text Shadow',
    });

    this.endControlSection();

    this.startControlSection('transform_style_font', {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Transform',
    });

    this.addControl('transform_rotate', {
      type: CONTROLLER_SLIDER,
      label: 'Rotate',
      min: -360,
      max: 360,
      step: 0.5,
      units: ['deg'],
    })

    this.addControl('transform_scaleX', {
      type: CONTROLLER_SLIDER,
      label: 'ScaleX',
      min: -5,
      max: 5,
      step: 0.1
    })

    this.addControl('transform_scaleY', {
      type: CONTROLLER_SLIDER,
      label: 'ScaleY',
      min: -5,
      max: 5,
      step: 0.1
    })

    this.addControl('transform_skewY', {
      type: CONTROLLER_SLIDER,
      label: 'SkewY',
      min: -180,
      max: 180,
      step: 0.5,
      units: ['deg']
    })

    this.addControl('transform_skewX', {
      type: CONTROLLER_SLIDER,
      label: 'SkewX',
      min: -180,
      max: 180,
      step: 0.5,
      units: ['deg']
    })

    this.addControl('transform_translateX', {
      type: CONTROLLER_SLIDER,
      label: 'TranslateX',
      min: -100,
      max: 100,
      step: 1
    })

    this.addControl('transform_translateY', {
      type: CONTROLLER_SLIDER,
      label: 'TranslateY',
      min: -100,
      max: 100,
      step: 1
    })

    this.endControlSection();

    this.startControlSection('creative_link', {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Creative Link',
    });

    this.addControl('creative_link_controller', {
      type: CONTROLLER_CREATIVE_LINK,
      label: 'Creative Link',
      rules: {
        "{{ELEMENT}} .altrp-link-creative{{STATE}}": "background-color: {{BACKGROUND}}",
        "{{ELEMENT}} .altrp-link-cl-style-1{{STATE}}": "color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-3:after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-4:after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-5-clone{{STATE}}": [
          "color: {{COLOR}};",
          "background-color: {{SECONDCOLOR}};"
        ],
        "{{ELEMENT}} .altrp-link-cl-style-6::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-7::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-7::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-8::before{{STATE}}": "border-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-8::after{{STATE}}": "border-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-9::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-9::after{{STATE}}": "background-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-9-description{{STATE}}": [
          "color: {{THIRDCOLOR}};",
          "background-color: {{FOURTHCOLOR}};"
        ],
        "{{ELEMENT}} .altrp-link-cl-style-10::after{{STATE}}": [
          "background: {{COLOR}};",
          "color: {{SECONDCOLOR}};",
        ],
        "{{ELEMENT}} .altrp-link-cl-style-11::after{{STATE}}": [
          "color: {{COLOR}};",
          "border-bottom-color: {{SECONDCOLOR}};",
        ],
        "{{ELEMENT}} .altrp-link-cl-style-12::after{{STATE}}": "border-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-12::before{{STATE}}": "border-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-13-link:hover .altrp-link-cl-style-13:after": [
          "color: {{COLOR}};",
          "text-shadow: 10px 0 {{COLOR}}, -10px 0 {{COLOR}};",
        ],
        "{{ELEMENT}} .altrp-link-cl-style-14::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-14::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-15::before{{STATE}}": "color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-16::before{{STATE}}": "color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-17::before{{STATE}}": "color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-17::after{{STATE}}": "background-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-18::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-18::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-19::before{{STATE}}": [
          "background-color: {{COLOR}};",
          "color: {{SECONDCOLOR}}"
        ],
        "{{ELEMENT}} .altrp-link-cl-style-20::before{{STATE}}": [
          "background-color: {{SECONDCOLOR}};",
          "color: {{COLOR}}"
        ],
        "{{ELEMENT}} .altrp-link-cl-style-21::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-21::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-22::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-23::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-24::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-24::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-25::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-26::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-27::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-27::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-28::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-28::before{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-29::after{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-link-cl-style-29::before{{STATE}}": "background-color: {{COLOR}};",
      },
      locked: true,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default HeadingTypeHeading;
