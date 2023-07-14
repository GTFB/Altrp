import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/accordion.svg";
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
  CONTROLLER_CHOOSE, CONTROLLER_REPEATER, CONTROLLER_MEDIA, CONTROLLER_SWITCHER,
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

export default class TableOfContent extends BaseElement {
  static getName() {
    return "table-of-content";
  }
  static getTitle() {
    return "Table Of Content";
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

    this.startControlSection("content", {
      tab: TAB_CONTENT,
      label: "Content",
    });
    this.addControl('target', {
      label: 'Element Target',
    })
    // this.addControl('data', {
    //   label: 'Element Target',
    // })
    this.endControlSection();

    this.startControlSection("con-style", {
      tab: TAB_STYLE,
      label: "Content",
    });


    this.endControlSection();

    advancedTabControllers(this);
  }
}
