import BaseElement from "./BaseElement";
import LocationIcon from "../../../svgs/location.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_SWITCHER,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_EVENT_HANDLER,
  TAB_CONTENT,
  TAB_STYLE,
} from "../modules/ControllersManager";

class Location extends BaseElement {
  static getName() {
    return "location";
  }

  static getTitle() {
    return "Location";
  }

  static getIconComponent() {
    return LocationIcon;
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

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content",
    });

    this.addControl("canvas", {
      type: CONTROLLER_SWITCHER,
      label: "Canvas",
      default: true,
      locked: true,
    });

    this.addControl("zoom", {
      type: CONTROLLER_NUMBER,
      label: "Zoom",
      default: 6,
      locked: true,
    });

    this.addControl("handler", {
      type: CONTROLLER_EVENT_HANDLER,
      label: "Event handler",
      default: {
        evt: "",
        params: "",
      },
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Size",
    });

    this.addControl("style_height", {
      type: CONTROLLER_SLIDER,
      label: "height",
      default: {
        size: 400,
        unit: "px",
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl("style_margin", {
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
      locked: true,
    });

    advancedTabControllers(this);
  }
}
export default Location;
