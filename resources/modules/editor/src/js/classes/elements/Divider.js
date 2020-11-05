import BaseElement from "./BaseElement";
import DividerIcon from "../../../svgs/divider.svg";
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
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Divider extends BaseElement {
  static getName() {
    return "divider";
  }
  static getTitle() {
    return "Divider";
  }
  static getIconComponent() {
    return DividerIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("divider", {
      tab: TAB_CONTENT,
      label: "Divider",
    });

    this.addControl('divider_style_type', {
      type: CONTROLLER_SELECT,
      label: 'Style',
      default: 'solid',
      options: [
        {
          value: 'solid',
          label: 'solid'
        },
        {
          value: 'none',
          label: 'none'

        },
        {
          value: 'double',
          label: 'double'
        },
        {
          value: 'dotted',
          label: 'dotted'
        },
        {
          value: 'dashed',
          label: 'dashed'
        },
        {
          value: 'curly',
          label: 'curly'
        },
        {
          value: 'curved',
          label: 'curved'
        },
        {
          value: 'slashes',
          label: 'slashes'
        },
        {
          value: 'squared',
          label: 'squared'
        },
        {
          value: 'wavy',
          label: 'wavy'
        },
        {
          value: 'zigzag',
          label: 'zigzag'
        }
      ]
    });

    this.addControl("divider_width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      default: {
        size: 100,
        unit: "%"
      },
      max: 1000,
      min: 0,
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        "{{ELEMENT}} .altrp-divider-separator{{STATE}}": "width: {{SIZE}}{{UNIT}}",
      }
    });

    this.addControl('divider_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'alignment',
      default: 'left',
      options: [
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
        '{{ELEMENT}}': 'align-items: {{VALUE}};',
      },
    });

    this.addControl('divider_add_element', {
      type: CONTROLLER_CHOOSE,
      label: 'add Element',
      default: 'left',
      options: [
        {
          icon: 'left',
          value: 'none',
        },
        {
          icon: 'center',
          value: 'text',
        },
        {
          icon: 'right',
          value: 'icon',
        }
      ],
    });

    this.addControl('divider_text', {
      type: CONTROLLER_TEXT,
      default: 'divider',
      label: 'Text',
    });

    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-divider{{STATE}}': [
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
      default: {
        top: 20,
        right: 25,
        bottom: 20,
        left: 25,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-divider{{STATE}}': [
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
        '{{ELEMENT}} .altrp-divider{{STATE}}': 'z-index: {{VALUE}}'
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

    this.startControlSection("divider_style", {
      tab: TAB_STYLE,
      label: "Divider",
    });

    this.addControl("divider_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "rgb(0,0,0)",
        colorPickedHex: "#000000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
    });

    this.addControl("divider_style_weight", {
      type: CONTROLLER_SLIDER,
      label: "Weight",
      default: {
        size: 3
      },
      max: 10,
      min: 1,
      step: 0.01,
    });

    this.addControl("divider_style_size", {
      type: CONTROLLER_SLIDER,
      label: "Size",
      default: {
        size: 20
      },
      max: 100,
      min: 0,
      step: 0.01,
    });

    this.addControl("divider_style_amount", {
      type: CONTROLLER_SLIDER,
      label: "Amount",
      default: {
        size: 20
      },
      max: 100,
      min: 0,
      step: 0.01,
    });

    this.addControl("divider_style_gap", {
      type: CONTROLLER_SLIDER,
      label: "Gap",
      default: {
        size: 15
      },
      max: 50,
      min: 2,
      rules: {
        "{{ELEMENT}} .altrp-divider{{STATE}}": ["padding-bottom: {{SIZE}}px", "padding-top: {{SIZE}}px"]
      }
    });

    this.endControlSection();

    this.startControlSection("text_style", {
      tab: TAB_STYLE,
      label: "Text",
    });

    this.addControl("text_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "rgb(0,0,0)",
        colorPickedHex: "#000000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-divider-label{{STATE}}": "color: {{COLOR}}"
      }
    });

    this.addControl('text_style_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: "normal",
        spacing: 0,
        size: "medium",
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-divider-label{{STATE}}': [
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

    this.addControl('text_style_position', {
      type: CONTROLLER_CHOOSE,
      label: 'position',
      default: 'center',
      options: [
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
    });

    this.addControl('text_style_spacing', {
      type: CONTROLLER_SLIDER,
      label: 'spacing',
      default: {
        size: 0,
        unit: "px"
      },
      max: 100,
      min: 0,
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Divider;
