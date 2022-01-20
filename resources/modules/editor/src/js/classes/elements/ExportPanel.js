import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/export.svg";
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
  CONTROLLER_REPEATER,
  CONTROLLER_WYSIWYG,
  CONTROLLER_MEDIA,
  CONTROLLER_SWITCHER
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class ExportPanel extends BaseElement {
  static getName() {
    return "export";
  }
  static getTitle() {
    return "Export Panel";
  }
  static getIconComponent() {
    return WidgetIcon;
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

    this.startControlSection("Content", {
      tab: TAB_CONTENT,
      label: "Content"
    });

    this.addControl("hidePanel", {
      type: CONTROLLER_SWITCHER,
      label: "Hide export panel?",
      default: false
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default ExportPanel;
