import BaseElement from "./BaseElement";
import NotificationIcon from "../../../svgs/notification.svg";
import {
  CONTROLLER_TEXT,
  TAB_CONTENT,
  CONTROLLER_QUERY,
  CONTROLLER_REPEATER
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
    return NotificationIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("notice_content_datasource", {
        tab: TAB_CONTENT,
        label: "Select Models"
    });

    let repeater = new Repeater();

    repeater.addControl("model", {
      type: CONTROLLER_QUERY,
    });

    repeater.addControl("text", {
      type: CONTROLLER_TEXT,
      label: 'Field name 1',
      dynamic: false
    });  

    repeater.addControl("subtext", {
      type: CONTROLLER_TEXT,
      label: 'Field name 2',
      dynamic: false
    }); 

    this.addControl('repeaterModels', {
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
    });
  

    this.endControlSection();

    advancedTabControllers(this);
  }

}

export default Notifications;
