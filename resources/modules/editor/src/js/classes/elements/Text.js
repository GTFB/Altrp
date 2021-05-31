import BaseElement from "./BaseElement";
import TextIcon from "../../../svgs/text.svg";
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
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_WYSIWYG
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Text extends BaseElement {
  static getName() {
    return "text";
  }
  static getTitle() {
    return "Text";
  }
  static getIconComponent() {
    return TextIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("text_editor", {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: "Text editor"
    });

    this.addControl("ckeditor", {
      type: CONTROLLER_SWITCHER,
      label: "Use CKEditor5?",
      default: true
    });

    // this.addControl("text", {
    //   type: CONTROLLER_WYSIWYG,
    //   label: "Text",
    //   default: "I Am Advanced Text",
    // });

    this.addControl("text_drop_cap", {
      type: CONTROLLER_SWITCHER,
      label: "Drop Cap",
      conditions: {
        ckeditor: true
      }
    });

    this.endControlSection();

    this.startControlSection("text_settings", {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: "Text Settings"
    });

    this.addControl("text_link", {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: "Link"
    });

    this.endControlSection();

    this.startControlSection("text_style", {
      tab: TAB_STYLE,
      label: "Columns"
    });

    this.addControl("text_style_column-count", {
      type: CONTROLLER_NUMBER,
      label: "Column count",
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "column-count: {{VALUE}}"
      // }
    });

    this.addControl("text_style_column-gap", {
      type: CONTROLLER_SLIDER,
      label: "Column gap",
      default: {
        size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      // rules: {
      //   "{{ELEMENT}} .altrp-text": "column-gap: {{SIZE}}{{UNIT}}"
      // }
    });

    this.endControlSection();

    this.startControlSection("text_style_position", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("text_style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": [
      //     "padding-top: {{TOP}}{{UNIT}};",
      //     "padding-right: {{RIGHT}}{{UNIT}};",
      //     "padding-bottom: {{BOTTOM}}{{UNIT}};",
      //     "padding-left: {{LEFT}}{{UNIT}};"
      //   ]
      // }
    });

    this.addControl("text_style_position_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": [
      //     "margin-top: {{TOP}}{{UNIT}};",
      //     "margin-right: {{RIGHT}}{{UNIT}};",
      //     "margin-bottom: {{BOTTOM}}{{UNIT}};",
      //     "margin-left: {{LEFT}}{{UNIT}};"
      //   ]
      // }
    });

    this.addControl("text_position_z_index", {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "z-index: {{VALUE}}"
      // }
    });

    this.addControl("text_position_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID"
    });

    this.addControl("text_position_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes"
    });

    this.endControlSection();

    this.startControlSection("text_style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("text_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "background-color: {{COLOR}};"
      // }
    });

    this.addControl("text_style_background_opacity", {
      hideOnEmail: true,
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      // default: {
      //   size: 1
      // },
      max: 1,
      min: 0,
      step: 0.01,
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "opacity: {{SIZE}}"
      // }
    });

    this.endControlSection();

    this.startControlSection("text_style_font", {
      tab: TAB_STYLE,
      label: "Font"
    });

    this.addControl("text_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      // default:{
      //   lineHeight: 1.5,
      //   spacing: 0,
      //   size: 16,
      //   weight: "normal",
      //   family: "Open Sans",
      //   decoration: ""
      // },
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": [
      //     'font-family: "{{FAMILY}}", sans-serif;',
      //     "font-size: {{SIZE}}px;",
      //     "line-height: {{LINEHEIGHT}};",
      //     "letter-spacing: {{SPACING}}px",
      //     "font-weight: {{WEIGHT}}",
      //     "text-transform: {{TRANSFORM}}",
      //     "font-style: {{STYLE}}",
      //     "text-decoration: {{DECORATION}}"
      //   ]
      // }
    });

    this.addControl("text_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      // default: {
      //   color: "rgb(0, 0, 1)",
      //   colorPickedHex: "#000000"
      // },
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "color: {{COLOR}};"
      // }
    });

    this.endControlSection();

    this.startControlSection("text_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("text_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
      units: ["px", "%", "vh"],
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
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "border-style: {{VALUE}};"
      // }
    });

    this.addControl("text_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}":
      //     "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      // }
    });

    this.addControl("text_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      // default: {
      //   color: "rgb(50,168,82)",
      //   colorPickedHex: "#32a852"
      // },
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "border-color: {{COLOR}};"
      // }
    });

    this.addControl("text_style_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Border radius",
      default: {
        // size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
      // rules: {
      //   "{{ELEMENT}} .altrp-text{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
      // }
    });

    this.endControlSection();

    this.startControlSection("text_advanced_tooltip", {
      tab: TAB_ADVANCED,
      label: "Tooltip"
    });

    this.addControl("text_advanced_tooltip_active", {
      type: CONTROLLER_SWITCHER,
      label: "Tooltip active",
      default: false
    });

    this.addControl("text_advanced_tooltip_label", {
      type: CONTROLLER_TEXT,
      default: "tooltip",
      label: "Label"
    });

    this.addControl("text_advanced_tooltip_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "rgb(206,205,237)",
        colorPickedHex: "#CECDED"
      },
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}": "background: {{COLOR}};",
      //   "{{ELEMENT}} .altrp-tooltip::after{{STATE}}":
      //     "border-color: transparent transparent {{COLOR}};"
      // }
    });

    this.addControl("text_advanced_tooltip_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font color",
      default: {
        color: "rgb(0,0,0)",
        colorPickedHex: "#000000"
      },
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}": "color: {{COLOR}};"
      // }
    });

    this.addControl("text_advanced_tooltip_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
      units: ["px", "%", "vh"],
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
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}": "border-style: {{VALUE}};"
      // }
    });

    this.addControl("text_advanced_tooltip_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh"],
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}":
      //     "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      // }
    });

    this.addControl("text_advanced_tooltip_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}": "border-color: {{COLOR}};"
      // }
    });

    this.addControl("text_advanced_tooltip_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Border radius",
      default: {
        size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
      // }
    });

    this.addControl("text_advanced_tooltip_font", {
      type: CONTROLLER_SELECT2,
      label: "Font",
      placeholder: "Lato",
      default: '"Open Sans"',
      options: [
        {
          value: '"Roboto"',
          label: "Roboto"
        },
        {
          value: '"Open Sans"',
          label: "Open Sans"
        },
        {
          value: '"Lato"',
          label: "Lato"
        }
      ],
      // rules: {
      //   "{{ELEMENT}} .altrp-tooltip{{STATE}}": "font-family: {{VALUE}}"
      // }
    });

    this.endControlSection();
    advancedTabControllers(this);
  }
}

export default Text;
