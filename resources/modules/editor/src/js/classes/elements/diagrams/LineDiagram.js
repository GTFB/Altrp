import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/skill-bar.svg";
import { advancedTabControllers } from "../../../decorators/register-controllers";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SWITCHER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_TEXT,
  CONTROLLER_REPEATER,
  CONTROLLER_COLOR,
  CONTROLLER_NUMBER,
  CONTROLLER_DATE,
  CONTROLLER_SHADOW,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_TEXTAREA
} from "../../modules/ControllersManager";

import Repeater from "../../Repeater";
import titleControllers from "../../../decorators/diagrams/diagram-title-subtitle.js";
import legendControllers from "../../../decorators/diagrams/diagram-legend.js";
import valueFormatControllers from "../../../decorators/diagrams/diagram-value-format.js";

class LineDiagram extends BaseElement {
  static getName() {
    return "line-diagram";
  }
  static getTitle() {
    return "Line Diagram";
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
      label: "Content"
    });

    this.addControl("datasource_path", {
      dynamic: false,
      type: CONTROLLER_TEXTAREA,
      label: "Path to Data"
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
    });
    
    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Visual"
    });

    // this.addControl("isVertical", {
    //   type: CONTROLLER_SWITCHER,
    //   label: "Vertical table",
    //   type: TABLE
    // });

    const colors = Schemes.map(object => {
      return { label: object.label, value: object.value };
    });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      options: colors
    });

    this.addControl("yScaleMax", {
      type: CONTROLLER_NUMBER,
      label: "Y scale max"
    });

    this.addControl("bottomAxis", {
      type: CONTROLLER_SWITCHER,
      label: "Enable bottom axis",
    });

    this.addControl("enableGridX", {
      type: CONTROLLER_SWITCHER,
      label: "Enable grid X",
    });

    this.addControl("enableGridY", {
      type: CONTROLLER_SWITCHER,
      label: "Enable grid Y",
    });

    this.addControl("tickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Bottom axis rotation",
      min: -90,
      max: 90,
      step: 1
    });

    this.addControl("xScaleType", {
      type: CONTROLLER_SELECT,
      label: "X scale type",
      options: [
        {
          id: 0,
          label: "Linear",
          value: "linear"
        },
        {
          id: 1,
          label: "Point",
          value: "point"
        },
        {
          id: 2,
          label: "Time",
          value: "time"
        }
      ]
    });

    this.addControl("precision", {
      type: CONTROLLER_SELECT,
      label: "Time scale",
      options: [
        { id: 0, label: "Day", value: "day" },
        { id: 1, label: "Month", value: "month" },
        { id: 2, label: "Year", value: "year" }
      ]
    });

    this.addControl("curve", {
      type: CONTROLLER_SELECT,
      label: "Curve type",
      options: [
        { id: 0, value: "basis", label: "basis" },
        { id: 1, value: "cardinal", label: "cardinal" },
        { id: 2, value: "catmullRom", label: "catmullRom" },
        { id: 3, value: "linear", label: "linear" },
        { id: 4, value: "monotoneX", label: "monotoneX" },
        { id: 5, value: "monotoneY", label: "monotoneY" },
        { id: 6, value: "natural", label: "natural" },
        { id: 7, value: "step", label: "step" },
        { id: 8, value: "stepAfter", label: "stepAfter" },
        { id: 9, value: "stepBefore", label: "stepBefore" }
      ]
    });

    this.addControl("lineWidth", {
      type: CONTROLLER_NUMBER,
      label: "Line width",
    });

    this.addControl("enableArea", {
      type: CONTROLLER_SWITCHER,
      label: "Enable area?",
    });

    this.addControl("enableGradient", {
      type: CONTROLLER_SWITCHER,
      label: "Enable gradient?",
    });

    this.addControl("enablePoints", {
      type: CONTROLLER_SWITCHER,
      label: "Enable points?",
    });

    this.addControl("pointSize", {
      type: CONTROLLER_NUMBER,
      label: "Point size",
      conditions: {
        enablePoints: true
      }
    });
    this.addControl("pointColor", {
      type: CONTROLLER_COLOR,
      label: "Point color"
    });
    this.endControlSection();

    legendControllers(this)

    valueFormatControllers(this, {
      name: 'yFormat',
      tabID: 'y_format_value',
      tabName: 'Y format value',
      useCurrency: false,
    })

    valueFormatControllers(this, {
      name: 'xFormat',
      tabID: 'x_format_value',
      tabName: 'X format value',
      useCurrency: false,
    })

    this.startControlSection("axisConstants", {
      tab: TAB_STYLE,
      label: "Axis constatns"
    });
    let repeaterY = new Repeater();

    repeaterY.addControl("yMarkerLabel", {
      type: CONTROLLER_TEXT,
      label: "Label Y",
      dynamic: false
    });
    repeaterY.addControl("yMarkerValue", {
      type: CONTROLLER_TEXT,
      label: "Value Y (only numbers)",
      dynamic: false
    });
    repeaterY.addControl("yMarkerOrientation", {
      type: CONTROLLER_SELECT,
      label: "Orientation Y",
      options: [
        { id: 0, value: "vertical", label: "Vertical" },
        { id: 1, value: "horizontal", label: "Horizontal" }
      ],
      dynamic: false
    });

    repeaterY.addControl("yMarkerColor", {
      type: CONTROLLER_COLOR,
      label: "Color Y",
      dynamic: false
    });

    repeaterY.addControl("yMarkerLabelColor", {
      type: CONTROLLER_COLOR,
      label: "Label color Y",
      dynamic: false
    });

    repeaterY.addControl("yMarkerWidth", {
      type: CONTROLLER_NUMBER,
      label: "Width Y",
      dynamic: false
    });

    //Y AXIS
    this.addControl("axisY", {
      label: "AXIS Y",
      type: CONTROLLER_REPEATER,
      fields: repeaterY.getControls()
    });

    let repeaterX = new Repeater();

    repeaterX.addControl("xMarkerLabel", {
      type: CONTROLLER_TEXT,
      label: "Label X",
      dynamic: false
    });

    repeaterX.addControl("xMarkerIsDate", {
      type: CONTROLLER_SWITCHER,
      label: "Value X is Date",
      dynamic: false
    });
    repeaterX.addControl("xMarkerValue", {
      type: CONTROLLER_TEXT,
      label: "Value X (only numbers or dates)",
      dynamic: false
    });
    repeaterX.addControl("xMarkerOrientation", {
      type: CONTROLLER_SELECT,
      label: "Orientation X",
      options: [
        { id: 0, value: "vertical", label: "Vertical" },
        { id: 1, value: "horizontal", label: "Horizontal" }
      ],
      dynamic: false
    });

    repeaterX.addControl("xMarkerColor", {
      type: CONTROLLER_COLOR,
      label: "Color X",
      dynamic: false
    });

    repeaterX.addControl("xMarkerLabelColor", {
      type: CONTROLLER_COLOR,
      label: "Label color X",
      dynamic: false
    });

    repeaterX.addControl("xMarkerWidth", {
      type: CONTROLLER_NUMBER,
      label: "Width X",
      dynamic: false
    });
    //X AXIS
    this.addControl("axisX", {
      label: "AXIS X",
      type: CONTROLLER_REPEATER,
      fields: repeaterX.getControls()
    });

    this.endControlSection();

    this.startControlSection("custom_color_scheme", {
      tab: TAB_STYLE,
      label: "Custom color scheme"
    });

    let repeaterScheme = new Repeater();

    repeaterScheme.addControl("color", {
      label: "Color",
      type: CONTROLLER_COLOR,
      dynamic: false
    });

    this.addControl("isCustomColor", {
      type: CONTROLLER_SWITCHER,
      label: "Use custom color scheme?",
    });

    this.addControl("customScheme", {
      type: CONTROLLER_REPEATER,
      fields: repeaterScheme.getControls()
    });

    this.endControlSection();

    this.startControlSection("size", {
      tab: TAB_STYLE,
      label: "Size"
    });

    this.addControl("width", {
      type: CONTROLLER_SLIDER,
      label: "width",
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("height", {
      type: CONTROLLER_SLIDER,
      label: "height",
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      units: ["px", "%", "vh"],
    });

    advancedTabControllers(this);
  }
}
export default LineDiagram;