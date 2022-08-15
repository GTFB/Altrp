import BaseElement from "./BaseElement";
import FromIcon from "../../../svgs/form-horizontal.svg";
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
  CONTROLLER_MEDIA, CONTROLLER_REPEATER
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { actionsControllers } from "../../decorators/actions-controllers";

class InputNumber extends BaseElement {
  static getName() {
    return "input-pagination";
  }
  static getTitle() {
    return "Input Pagination";
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
      label: "Content"
    });

    this.addControl("form_id", {
      type: CONTROLLER_TEXT,
      label: "Form ID"
    });

    this.addControl("field_id", {
      type: CONTROLLER_TEXT,
      label: "Field ID (Column Name)"
    });

    this.addControl("default_value", {
      type: CONTROLLER_TEXT,
      label: "Default value"
    });

    const valuesRepeater = new Repeater();

    valuesRepeater.addControl("label", {
      type: CONTROLLER_TEXT,
      label: "Label"
    });

    valuesRepeater.addControl("value", {
      type: CONTROLLER_TEXT,
      label: "value"
    });

    this.addControl('values', {
      label: 'Values',
      type: CONTROLLER_REPEATER,
      fields: valuesRepeater.getControls(),
      default: [
      ],
      locked: true,
    });


    this.endControlSection();

    actionsControllers(this, "Change Actions", "change_");

    this.startControlSection("content_style", {
      tab: TAB_STYLE,
      label: "content"
    });

    this.addControl('gap', {
      type: CONTROLLER_SLIDER,
      label: 'Gap',
      min: 0,
      max: 100,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.endControlSection();

    this.startControlSection("item_style", {
      tab: TAB_STYLE,
      label: "item"
    });

    this.addControl("padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.addControl("typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color"
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

    advancedTabControllers(this);
  }
}
export default InputNumber;
