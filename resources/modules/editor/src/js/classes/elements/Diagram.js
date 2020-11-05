import { schemes } from "reaviz";
import BaseElement from "./BaseElement";
import PieIcon from "../../../svgs/skill-bar.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SWITCHER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_TEXTAREA,
  CONTROLLER_REPEATER,
  CONTROLLER_COLOR
} from '../modules/ControllersManager';

import { TABLE, LINE, AREA, widgetTypes } from "../../../../../admin/src/components/dashboard/widgetTypes";
import Repeater from '../Repeater';

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

    this.addControl("query", {
      type: CONTROLLER_QUERY,
    });


    this.addControl("datasource_path", {
      dynamic: false,
      label: "Path to Data",
    });

    this.addControl("key_name", {
      dynamic: false,
      label: "Key Field",
    });

    this.addControl("data_name", {
      dynamic: false,
      label: "Data Field",
    });

    this.endControlSection();

    this.startControlSection('multiple_data', {
      dynamic: false,
      label: "Multiple data",
      conditions: {
        'type': {
          LINE, AREA
        }
      }
    });

    let repeater = new Repeater();
    repeater.addControl(
      'path',
      {
        label: 'Path',
        dynamic: false,
      }
    );
    repeater.addControl(
      'data',
      {
        label: 'Data',
        dynamic: false,
      }
    );
    repeater.addControl(
      'key',
      {
        label: 'Key',
        dynamic: false,
      }
    );

    this.addControl("isMultiple", {
      type: CONTROLLER_SWITCHER,
      label: "Use multiple data?",
      default: false,
    });

    this.addControl("rep", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeater.getControls(),
    });
    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Visual type",
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

    this.addControl("isVertical", {
      type: CONTROLLER_SWITCHER,
      label: "Vertical table",
      default: true,
    });

    this.addControl("legend", {
      type: CONTROLLER_SELECT,
      label: "Legend Type",
      default: "",
      options: [
        { label: "", value: "none" },
        { label: "vertical", value: "vertical" },
        { label: "horizontal", value: "horizontal" },
      ],
    });

    this.addControl("legendPosition", {
      type: CONTROLLER_SELECT,
      label: "Legend Position",
      default: "bottom",
      options: [
        { label: "bottom", value: "bottom" },
        { label: "left", value: "left" },
        { label: "right", value: "right" },
        { label: "top", value: "top" },
      ],
    });

    const colors = Object.keys(schemes).map((name) => {
      return { label: name, value: name };
    });

    colors.push({ label: "Custom", value: "Custom" });


    this.addControl("isCustomColors", {
      type: CONTROLLER_SWITCHER,
      label: "Set custom colors?",
      default: false,
    });

    let repeaterColor = new Repeater();

    repeaterColor.addControl(
      'color',
      {
        label: 'HEX color',
        dynamic: false,
        type: CONTROLLER_COLOR
      }
    );

    this.addControl("repcolor", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeaterColor.getControls(),
    });


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

    this.endControlSection();

    this.startControlSection("size", {
      tab: TAB_STYLE,
      label: "Size",
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
