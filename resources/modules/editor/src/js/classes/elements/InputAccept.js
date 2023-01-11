import BaseElement from "./BaseElement";
import FromIcon from "../../../svgs/accept.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
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
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_SHADOW,
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { actionsControllers } from "../../decorators/actions-controllers";

class InputAccept extends BaseElement {
  static getName() {
    return "input-accept";
  }
  static getTitle() {
    return "Accept";
  }
  static getIconComponent() {
    return FromIcon;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Form";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      locked: true,
      label: "Content"
    });

    this.addControl("form_id", {
      type: CONTROLLER_TEXT,
      locked: true,
      label: "Form ID"
    });

    this.addControl("field_id", {
      type: CONTROLLER_TEXT,
      label: "Field ID (Column Name)"
    });

    this.addControl("accept_checked", {
      type: CONTROLLER_TEXT,
      label: "Accept Checked Value",
      locked: true,
    });

    this.addControl("accept_unchecked", {
      type: CONTROLLER_TEXT,
      label: "Accept Unchecked Value",
      locked: true,
    });

    const optionsRepeater = new Repeater();

    optionsRepeater.addControl("label", {
      type: CONTROLLER_TEXT,
      label: "Label"
    });

    optionsRepeater.addControl("value", {
      type: CONTROLLER_TEXT,
      label: "Value"
    });

    optionsRepeater.addControl("image", {
      type: CONTROLLER_MEDIA,
      label: "Image"
    });

    this.addControl("content_label", {
      type: CONTROLLER_TEXT,
      label: "Label",
      locked: true,
    });

    this.addControl("content_label_position_type", {
      type: CONTROLLER_SELECT,
      label: "Label Position",
      default: "top",
      options: [
        {
          value: "top",
          label: "Top"
        },
        {
          value: "bottom",
          label: "Bottom"
        },
        {
          value: "left",
          label: "Left"
        },
        {
          value: "right",
          label: "Right"
        },
        {
          value: "absolute",
          label: "Absolute"
        }
      ],
      locked: true
    });

    this.addControl("label_icon", {
      type: CONTROLLER_MEDIA,
      label: "Choose Icon",
      locked: true,
    });

    this.addControl("label_icon_position", {
      type: CONTROLLER_SELECT,
      label: "Icon Position",
      options: [
        {
          value: "row",
          label: "Right"
        },
        {
          value: "row-reverse",
          label: "Left"
        },
        {
          value: "column",
          label: "Bottom"
        },
        {
          value: "column-reverse",
          label: "Top"
        }
      ]
    });

    this.addControl("content_required", {
      type: CONTROLLER_SWITCHER,
      label: "Required",
      locked: true,
    });

    this.addControl("content_readonly", {
      type: CONTROLLER_SWITCHER,
      label: "Readonly"
    });

    this.addControl("content_default_value", {
      type: CONTROLLER_TEXTAREA,
      label: "Default Value",
      locked: true,
    });

    this.addControl("content_calculation", {
      type: CONTROLLER_TEXTAREA,
      label: "Calculation",
      description: "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10",
      locked: true,
    });

    this.endControlSection();

    actionsControllers(this, "Blur Actions");

    actionsControllers(this, "Focus Actions", "focus_");

    actionsControllers(this, "Change Actions", "change_");

    this.startControlSection("label_style_section", {
      tab: TAB_STYLE,
      label: "Label"
    });

    this.addControl("label_style_spacing", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      default: {
        size: 2,
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 60,
      min: 0,
      locked: true,
    });

    this.addControl("label_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.addControl("label_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("label_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.addControl("label_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("label_position_top", {
      type: CONTROLLER_SLIDER,
      label: "Label Y Position",
      conditions: {
        content_label_position_type: ["absolute"]
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: -100,
      // rules: {
      //   "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
      //     "top: {{SIZE}}{{UNIT}};"
      // }
    });

    this.addControl("label_position_left", {
      type: CONTROLLER_SLIDER,
      label: "Label X Position",
      conditions: {
        content_label_position_type: ["absolute"]
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: -100
      // rules: {
      //   "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
      //     "left: {{SIZE}}{{UNIT}};"
      // }
    });

    this.addControl("label_width", {
      type: CONTROLLER_SLIDER,
      label: "Label Width",
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0
    });

    this.addControl("icon_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Icon Padding",
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("icon_color", {
      type: CONTROLLER_COLOR,
      label: "Icon color"
      // rules: {
      //   "{{ELEMENT}} .altrp-label-icon{{STATE}} path": "fill: {{COLOR}};"
      // }
    });

    this.addControl("icon_color_background", {
      type: CONTROLLER_COLOR,
      label: "Background Color"
      // rules: {
      //   "{{ELEMENT}} .altrp-label-icon{{STATE}} svg": "background: {{COLOR}};"
      // }
    });

    this.addControl("icon_size", {
      type: CONTROLLER_SLIDER,
      label: "Icon Size",
      units: ["px", "%", "vh", "vw"],
      max: 100,
      min: 0
    });

    this.addControl("cross_color", {
      type: CONTROLLER_COLOR,
      label: "Cross Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      conditions: {
        content_clearable: [true]
      }
    });

    this.addControl("cross_size", {
      type: CONTROLLER_SLIDER,
      label: "Cross Size",
      default: {
        unit: "px",
        size: null
      },
      conditions: {
        content_clearable: [true]
      },
      max: 50,
      min: 0
      // rules: {
      //   "{{ELEMENT}} .input-clear-btn{{STATE}}": "font-size: {{SIZE}}px;"
      // }
    });

    this.endControlSection();

    this.startControlSection("font_style_section", {
      tab: TAB_STYLE,
      label: "Font"
    });

    this.addControl("field_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("field_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.endControlSection();

    this.startControlSection("position_section", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("field_width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      max: 500,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("position_z_index", {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0
    });

    this.addControl("position_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID"
    });

    this.addControl("position_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes"
    });

    this.endControlSection();

    this.startControlSection("required_style_section", {
      tab: TAB_STYLE,
      label: "Required"
    });

    this.addControl("required_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color"
    });

    this.addControl("required_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.endControlSection();

    this.startControlSection("overlay_section", {
      tab: TAB_STYLE,
      label: "Overlay"
    });

    this.endControlSection();

    this.startControlSection("background_section", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("background_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color"
    });

    this.addControl("background_section_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      max: 1,
      min: 0,
      step: 0.01
    });

    this.endControlSection();

    this.startControlSection("border_section", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("border_type", {
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
      ]
    });

    this.addControl("border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color"
    });

    this.addControl("box_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Box shadow",
      default: {
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        spread: 0,
        colorRGB: "rgb(0, 0, 0)",
        color: "rgb(0, 0, 0)",
        colorPickedHex: "#000000",
        type: " "
      }
    });

    this.addControl("border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Radius",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.endControlSection();

    this.startControlSection("transform_section", {
      tab: TAB_STYLE,
      label: "Transform"
    });

    this.endControlSection();

    this.startControlSection("mismatch_message_styles", {
      tab: TAB_STYLE,
      label: "Validation Error Message",
      conditions: { "mask_mismatch_message!": [""] }
    });

    this.addControl("mismatch_message_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: { unit: "px" },
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("mismatch_message_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: { unit: "px" },
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("mismatch_message_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color"
    });

    this.addControl("mismatch_message_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default InputAccept;
