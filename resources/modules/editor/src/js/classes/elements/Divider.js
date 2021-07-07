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
      ]
    });

    this.addControl("divider_width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      default: {
        unit: "%"
      },
      max: 1000,
      min: 0,
      units: [
        'px',
        '%',
        'vw',
      ],
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
    });

    this.addControl('divider_text', {
      type: CONTROLLER_TEXT,
      label: 'Text',
    });

    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
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
        color: "",
        colorPickedHex: "",
      },
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

    this.addControl("divider_style_gap", {
      type: CONTROLLER_SLIDER,
      label: "Gap",
      max: 50,
      min: 2,
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
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('text_style_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
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
        "vw"
      ],
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Divider;
