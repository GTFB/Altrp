import { schemes } from "reaviz";
import BaseElement from "./BaseElement";
import PieIcon from "../../../svgs/pie.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_SWITCHER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
} from "../modules/ControllersManager";

import { TABLE, widgetTypes } from "../../../../../admin/src/components/dashboard/widgetTypes";

class Diagram extends BaseElement {
  static getName() {
    return "diagram";
  }
  static getTitle() {
    return "Diagram";
  }
  static getIconComponent() {
    return PieIcon;
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
      label: "Content",
    });

    const types = widgetTypes.map((type) => {
      return { label: type.name, value: type.value };
    });

    this.addControl("type", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      default: TABLE,
      options: types,
    });

    this.addControl("query", {
      type: CONTROLLER_QUERY,
    });

    const colors = Object.keys(schemes).map((name) => {
      return { label: name, value: name };
    });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      default: "Set1",
      options: colors,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Diagram;
