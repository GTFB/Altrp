import BaseElement from "./BaseElement";
import TableIcon from "../../../svgs/post-list.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_SHADOW,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA,
  CONTROLLER_WYSIWYG, CONTROLLER_QUERY, CONTROLLER_REPEATER, CONTROLLER_FILTERS, CONTROLLER_HEADING, CONTROLLER_SELECT2
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";
import Repeater from "../Repeater";

class Notifications extends BaseElement {
  static getName() {
    return "notifications";
  }
  static getTitle() {
    return "Notifications";
  }
  static getIconComponent() {
    return TableIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("notifi_content_datasource", {
        tab: TAB_CONTENT,
        label: "Data Source"
    });

    this.addControl("notifi_query_heading", {
      type: CONTROLLER_HEADING,
      label: 'Select Models',
    });

    this.addControl("notifi_query", {
      type: CONTROLLER_QUERY,
    });

    this.endControlSection();
    advancedTabControllers(this);
  }
}

export default Notifications;
