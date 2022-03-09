import BaseElement from "./BaseElement";
import Column from "./Column";
import {
  CONTROLLER_TEXT,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_COLOR,
  CONTROLLER_SWITCHER,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_SHADOW,
  CONTROLLER_LINK,
  CONTROLLER_COLWIDTH,
  TAB_STYLE,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA, CONTROLLER_CHOOSE
} from "../modules/ControllersManager";
import RowIcon from "../../../svgs/progress.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";

class ProgressBar extends BaseElement {
  static getName() {
    return "progress-bar";
  }
  static getTitle() {
    return "Progress Bar";
  }

  static getIconComponent() {
    return RowIcon;
  }

  static getType() {
    return "widget";
  }

  static getGroup() {
    return "Advanced";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("progress_bar", {
      label: "Progress bar"
    });

    this.addControl("value", {
      type: CONTROLLER_TEXT,
      label: "Value",
      locked: true,
    });

    this.addControl("stripes", {
      type: CONTROLLER_SWITCHER,
      label: "Stripes",
      default: true,
      locked: true,
    });

    this.addControl("animate", {
      type: CONTROLLER_SWITCHER,
      label: "Animate",
      default: true,
      conditions: {
        stripes: true
      },
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("progress_bar_styles", {
      tab: TAB_STYLE,
      label: "Progress bar"
    });

    this.addControl("width", {
      type: CONTROLLER_TEXT,
      label: "Width"
    });

    this.addControl('alignment', {
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
      ],
    })

    this.addControl('color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('stripes_color', {
      type: CONTROLLER_COLOR,
      label: 'Stripes color',
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default ProgressBar;
