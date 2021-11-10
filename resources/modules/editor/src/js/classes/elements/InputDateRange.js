import BaseElement from "./BaseElement";
import FromIcon from "../../../svgs/form-horizontal.svg";
import {TAB_CONTENT} from "../modules/ControllersManager";
import {advancedTabControllers} from "../../decorators/register-controllers";

class InputDateRange extends BaseElement {
  static getName() {
    return "input-date-range";
  }
  static getTitle() {
    return "Input Date Range";
  }
  static getIconComponent() {
    return FromIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content"
    });
    this.endControlSection();


    advancedTabControllers(this);
  }
}
export default InputDateRange;

