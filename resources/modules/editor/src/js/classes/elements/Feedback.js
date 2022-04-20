import BaseElement from "./BaseElement";
import IconFeedback from "../../../svgs/feedback.svg";
import {TAB_CONTENT} from "../modules/ControllersManager";
import {advancedTabControllers} from "../../decorators/register-controllers";


class Feedback extends BaseElement {
  static getTitle() {
    return "Feedback";
  }

  static getName() {
    return "feedback";
  }

  static getType() {
    return "widget";
  }

  static getIconComponent() {
    return IconFeedback;
  }

  static getGroup() {
    return "Advanced";
  }

  _registerControls() {

    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.endControlSection();


    advancedTabControllers(this);
  }
}

export default Feedback

