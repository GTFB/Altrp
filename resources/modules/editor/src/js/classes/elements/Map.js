import BaseElement from "./BaseElement";
import MapIcon from "../../../svgs/map.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_SWITCHER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_NUMBER,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT2,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
} from "../modules/ControllersManager";

class Map extends BaseElement {
  static getName() {
    return "map";
  }
  static getTitle() {
    return "Map";
  }
  static getIconComponent() {
    return MapIcon;
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

    this.addControl("content_editable", {
      type: CONTROLLER_SWITCHER,
      label: "Editable",
    });

    this.addControl("content_canvas", {
      type: CONTROLLER_SWITCHER,
      label: "Canvas",
    });

    this.addControl("content_center", {
      type: CONTROLLER_TEXT,
      label: "Center coordinates",
    });

    this.addControl("content_zoom", {
      type: CONTROLLER_TEXT,
      label: "Zoom",
      default: 6,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Map;
