import BaseElement from "./BaseElement";
import CodeIcon from "../../../svgs/html.svg";

import {
  TAB_CONTENT,
  CONTROLLER_TEXTAREA
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Html extends BaseElement {
  static getName() {
    return "html";
  }
  static getTitle() {
    return "HTML";
  }
  static getIconComponent() {
    return CodeIcon;
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

    this.startControlSection("Data", {
      tab: TAB_CONTENT,
      label: "Data",
      locked: true,
    });
    this.addControl("data", {
      type: CONTROLLER_TEXTAREA,
      label: "Inner HTML"
    });
    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Html;
