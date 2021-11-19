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
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import RowIcon from "../../../svgs/row.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";

class ProgressBar extends BaseElement {
  static getName() {
    return "progress-bar";
  }
  static getTitle() {
    return "Progress bar";
  }

  static getIconComponent() {
    return RowIcon;
  }

  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("Layout", {
      label: "Layout"
    });
    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default ProgressBar;
