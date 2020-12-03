import BaseElement from "./BaseElement";
import DashIcon from "../../../svgs/archive.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXT,
  CONTROLLER_SWITCHER,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_SQL,
  CONTROLLER_SQL_PARAMS,
  CONTROLLER_REPEATER
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class Dashboards extends BaseElement {
  static getName() {
    return "dashboards";
  }
  static getTitle() {
    return "Dashboard";
  }
  static getIconComponent() {
    return DashIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("Data type", {
      tab: TAB_CONTENT,
      label: "Data type"
    });

    this.addControl("showButton", {
      type: CONTROLLER_SWITCHER,
      label: "Show add button?",
      default: true
    });

    this.addControl("dataSource", {
      type: CONTROLLER_SWITCHER,
      label: "Get data by data source?",
      default: true
    });

    let repeater = new Repeater();

    repeater.addControl("path", {
      label: "Path",
      dynamic: false
    });
    repeater.addControl("title", {
      label: "Title",
      dynamic: false
    });
    repeater.addControl("data", {
      label: "Y (data)",
      dynamic: false
    });
    repeater.addControl("key", {
      label: "X (key)",
      dynamic: false
    });

    repeater.addControl("keyIsDate", {
      label: "X is date",
      dynamic: false,
      type: CONTROLLER_SWITCHER,
      default: false
    });

    repeater.addControl("splitFrom", {
      label: "Split from",
      dynamic: false
    });
    repeater.addControl("splitTo", {
      label: "Split To",
      dynamic: false
    });

    this.addControl("rep", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeater.getControls()
    });

    this.addControl("filter_datasource", {
      type: CONTROLLER_SQL_PARAMS,
      default: []
    });

    this.endControlSection();

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content (DEPRECATED)"
    });

    this.addControl("global_parameter", {
      type: CONTROLLER_SQL,
      default: [],
      multi: false,
      label: "Select global paramenters",
      onlySQL: true
    });

    // this.addControl("rep", {
    //   type: CONTROLLER_REPEATER,
    //   default: [],
    //   fields: repeater.getControls(),
    // });

    this.addControl("sql", {
      type: CONTROLLER_SQL,
      default: []
    });

    this.addControl("filter", {
      type: CONTROLLER_SQL_PARAMS,
      default: []
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Visual type"
    });

    this.addControl("animated", {
      type: CONTROLLER_SWITCHER,
      label: "Animated",
      default: false
    });

    this.endControlSection();

    this.startControlSection("size", {
      tab: TAB_STYLE,
      label: "Size"
    });

    this.addControl("style_height", {
      type: CONTROLLER_SLIDER,
      label: "height",
      default: {
        size: 400,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-image{{STATE}}": "height: {{SIZE}}{{UNIT}}"
      }
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
        bind: true
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-btn{{STATE}}": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    advancedTabControllers(this);
  }
}
export default Dashboards;
