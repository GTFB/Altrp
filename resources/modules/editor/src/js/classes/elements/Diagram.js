import { schemes } from "reaviz";
import BaseElement from "./BaseElement";
import PieIcon from "../../../svgs/pie.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SWITCHER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
  TAB_STYLE,
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
      label: "Type",
      default: TABLE,
      options: types,
    });

    this.addControl("query", {
      type: CONTROLLER_QUERY,
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Size",
    });

    const colors = Object.keys(schemes).map((name) => {
      return { label: name, value: name };
    });

    colors.push({ label: "Custom", value: "Custom" });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      default: "Set1",
      options: colors,
    });

    this.addControl("animated", {
      type: CONTROLLER_SWITCHER,
      label: "Animated",
      default: true,
    });

    this.addControl("width", {
      type: CONTROLLER_SLIDER,
      label: "width",
      default: {
        size: 400,
        unit: "px",
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-diagram{{STATE}}": "width: {{SIZE}}{{UNIT}}",
      },
    });

    this.addControl("margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: "px",
        bind: true,
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-btn{{STATE}}": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};",
        ],
      },
    });

    advancedTabControllers(this);
  }
}
export default Diagram;
