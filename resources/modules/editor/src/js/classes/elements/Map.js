import BaseElement from "./BaseElement";
import MapIcon from "../../../svgs/map.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXT,
  CONTROLLER_SWITCHER,
  CONTROLLER_NUMBER,
  TAB_CONTENT,
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

    this.addControl("editable", {
      type: CONTROLLER_SWITCHER,
      label: "Editable",
      default: false,
    });

    this.addControl("canvas", {
      type: CONTROLLER_SWITCHER,
      label: "Canvas",
      default: true,
    });


    this.addControl("lat", {
      type: CONTROLLER_TEXT,
      label: "Latitude",
      default: 50.7496449,
    });

    this.addControl("lng", {
      type: CONTROLLER_TEXT,
      label: "Longitude",
      default: 86.1250068,
    });

    this.addControl("zoom", {
      type: CONTROLLER_NUMBER,
      label: "Zoom",
      default: 6,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Map;
