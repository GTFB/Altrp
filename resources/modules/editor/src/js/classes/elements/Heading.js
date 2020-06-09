import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/widget_heading.svg";
import { CONTROLLER_WYSIWYG, TAB_CONTENT } from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Heading extends BaseElement {
  static getName() {
    return "heading";
  }
  static getTitle() {
    return "Heading";
  }
  static getIconComponent() {
    return HeadingIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("text_section", {
      tab: TAB_CONTENT,
      label: "Text Section",
    });

    this.addControl("text", {
      type: CONTROLLER_WYSIWYG,
      label: "Text",
      default: "I Am Advanced Heading",
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Heading;
