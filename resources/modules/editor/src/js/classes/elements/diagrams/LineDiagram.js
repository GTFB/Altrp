import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/line.svg";
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
  static getGroup() {
    return "Diagrams";
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
      label: "Path to Data",
      locked: true,
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_CONTENT,
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
      options: colors,
      locked: true,
    });

    this.addControl("yScaleMax", {
      type: CONTROLLER_NUMBER,
      label: "Y scale max",
      locked: true,
    });

    this.addControl("xScaleType", {
      type: CONTROLLER_SELECT,
      label: "X scale type",
      options: [
        {
          label: "Point",
          value: "point"
        },
        {
          label: "Linear",
          value: "linear"
        },
        {
          label: "Time",
          value: "time"
        }
      ],
      locked: true,
    });

    this.addControl("precision", {
      type: CONTROLLER_SELECT,
      label: "Time scale",
      options: [
        { id: 0, label: "Day", value: "day" },
        { id: 1, label: "Month", value: "month" },
        { id: 2, label: "Year", value: "year" }
      ],
      conditions: {
        xScaleType: 'time'
      },
      locked: true,
    });

    this.addControl('lineWidth', {
      type: CONTROLLER_SLIDER,
      label: 'Line width',
      min: 0,
      max: 30,
      step: 1,
      locked: true,
    })

    this.addControl("curve", {
      type: CONTROLLER_SELECT,
      label: "Curve type",
      options: [
        { id: 0, value: "basis", label: "Basis" },
        { id: 1, value: "cardinal", label: "Cardinal" },
        { id: 2, value: "catmullRom", label: "Catmull Rom" },
        { id: 3, value: "linear", label: "Linear" },
        { id: 4, value: "monotoneX", label: "MonotoneX" },
        { id: 5, value: "monotoneY", label: "MonotoneY" },
        { id: 6, value: "natural", label: "Natural" },
        { id: 7, value: "step", label: "Step" },
        { id: 8, value: "stepAfter", label: "Step After" },
        { id: 9, value: "stepBefore", label: "Step Before" }
      ],
      locked: true,
    });

    this.addControl('enableSlices', {
      type: CONTROLLER_SELECT,
      label: 'Enable slices',
      options: [
        {
          label: 'False',
          value: null
        },
        {
          label: 'X',
          value: 'x'
        },
        {
          label: 'Y',
          value: 'y'
        },
      ],
      locked: true,
    })

    this.endControlSection();

    this.startControlSection('axis', {
      tab: TAB_STYLE,
      label: 'Axis'
    })

    this.addControl("enableGridX", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Grid X",
      locked: true,
    });

    this.addControl("enableGridY", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Grid Y",
      locked: true,
    });

    this.addControl("axisBottom", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Bottom Axis",
      locked: true,
    });

    this.addControl('bottomTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisBottom: true
      },
      locked: true,
    })

    this.addControl('bottomTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Tick Padding',
      conditions: {
        axisBottom: true
      },
      locked: true,
    })

    this.addControl("bottomTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Bottom Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisBottom: true
      },
      locked: true,
    });

    this.addControl('bottomLegend', {
      type: CONTROLLER_TEXT,
      label: 'Bottom Legend',
      conditions: {
        axisBottom: true
      },
      locked: true,
    })

    this.addControl('bottomLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisBottom: true
      },
      locked: true,
    })

    this.addControl("axisTop", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Top Axis",
      locked: true,
    });

    this.addControl('topTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Top Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisTop: true
      },
      locked: true,
    })

    this.addControl('topTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Top Tick Padding',
      conditions: {
        axisTop: true
      },
      locked: true,
    })

    this.addControl("topTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Top Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisTop: true
      },
      locked: true,
    });

    this.addControl('topLegend', {
      type: CONTROLLER_TEXT,
      label: 'Top Legend',
      conditions: {
        axisTop: true
      },
      locked: true,
    })

    this.addControl('topLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Top Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisTop: true
      },
      locked: true,
    })

    this.addControl("axisLeft", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Left Axis",
      locked: true,
    });

    this.addControl('leftTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Left Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisLeft: true
      },
      locked: true,
    })

    this.addControl('leftTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Left Tick Padding',
      conditions: {
        axisLeft: true
      },
      locked: true,
    })

    this.addControl("leftTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Left Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisLeft: true
      },
      locked: true,
    });

    this.addControl('leftLegend', {
      type: CONTROLLER_TEXT,
      label: 'Left Legend',
      conditions: {
        axisLeft: true
      },
      locked: true,
    })

    this.addControl('leftLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Left Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisLeft: true
      },
      locked: true,
    })

    this.addControl("axisRight", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Right Axis",
      locked: true,
    });

    this.addControl('rightTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Right Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisRight: true
      },
      locked: true,
    })

    this.addControl('rightTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Right Tick Padding',
      conditions: {
        axisRight: true
      },
      locked: true,
    })

    this.addControl("rightTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Right Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisRight: true
      },
      locked: true,
    });

    this.addControl('rightLegend', {
      type: CONTROLLER_TEXT,
      label: 'Right Legend',
      conditions: {
        axisRight: true
      },
      locked: true,
    })

    this.addControl('rightLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Right Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisRight: true
      },
      locked: true,
    })

    this.endControlSection()

    this.startControlSection('points', {
      tab: TAB_STYLE,
      label: 'Points'
    })

    this.addControl("enablePoints", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Points?",
      locked: true,
    });

    this.addControl("pointSize", {
      type: CONTROLLER_NUMBER,
      label: "Point Size",
      locked: true,
    });

    this.addControl("pointColor", {
      type: CONTROLLER_COLOR,
      label: "Point color",
      locked: true,
    });

    this.addControl('pointBorderColor', {
      type: CONTROLLER_COLOR,
      label: 'Point Border Color',
      locked: true,
    })

    this.addControl('pointBorderWidth', {
      type: CONTROLLER_SLIDER,
      label: 'Point Border Width',
      min: 0,
      max: 25,
      step: 1,
      locked: true,
    })

    this.endControlSection()

    this.startControlSection('area_settings', {
      tab: TAB_STYLE,
      label: 'Area Settings'
    })

    this.addControl("enableArea", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Area?",
      locked: true,
    });

    this.addControl('areaBaselineValue', {
      type: CONTROLLER_NUMBER,
      label: 'Baseline Value',
      locked: true,
    })

    this.addControl('areaOpacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      min: 0,
      max: 1,
      step: 0.05,
      locked: true,
    })

    this.addControl('areaBlendMode', {
      type: CONTROLLER_SELECT,
      label: 'Area Blend Mode',
      options: [
        {
          label: "Normal",
          value: "normal"
        },
        {
          label: "Multiply",
          value: "multiply"
        },
        {
          label: "Screen",
          value: "screen"
        },
        {
          label: "Overlay",
          value: "overlay"
        },
        {
          label: "Darken",
          value: "darken"
        },
        {
          label: "Lighten",
          value: "lighten"
        },
        {
          label: "Color Dodge",
          value: "color-dodge"
        },
        {
          label: "Color Burn",
          value: "color-burn"
        },
        {
          label: "Hard Light",
          value: "hard-light"
        },
        {
          label: "Soft Light",
          value: "soft-light"
        },
        {
          label: "Difference",
          value: "difference"
        },
        {
          label: "Exclusion",
          value: "exclusion"
        },
        {
          label: "Hue",
          value: "hue"
        },
        {
          label: "Saturation",
          value: "saturation"
        },
        {
          label: "Color",
          value: "color"
        },
        {
          label: "Luminosity",
          value: "luminosity"
        },
      ],
      locked: true,
    })

    this.addControl("enableGradient", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Gradient?",
      locked: true,
    });

    this.endControlSection()

    legendControllers(this)

    valueFormatControllers(this, {
      name: 'yFormat',
      tabID: 'y_format_value',
      tabName: 'Y Format Value',
      useCurrency: false,
      locked: true,
    })

    valueFormatControllers(this, {
      name: 'xFormat',
      tabID: 'x_format_value',
      tabName: 'X Format Value',
      useCurrency: false,
      locked: true,
    })

    this.startControlSection("axisConstants", {
      tab: TAB_STYLE,
      label: "Axis Constatns"
    });
    let repeaterY = new Repeater();

    repeaterY.addControl("yMarkerLabel", {
      type: CONTROLLER_TEXT,
      label: "Label Y",
      dynamic: false
    });
    repeaterY.addControl("yMarkerValue", {
      type: CONTROLLER_TEXT,
      label: "Value Y (Only Numbers)",
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
      label: "Label Color Y",
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
      fields: repeaterY.getControls(),
      locked: true,
    });

    let repeaterX = new Repeater();

    repeaterX.addControl("xMarkerLabel", {
      type: CONTROLLER_TEXT,
      label: "Label X",
      dynamic: false,
      locked: true,
    });

    repeaterX.addControl("xMarkerIsDate", {
      type: CONTROLLER_SWITCHER,
      label: "Value X Is Date",
      dynamic: false,
      locked: true,
    });
    repeaterX.addControl("xMarkerValue", {
      type: CONTROLLER_TEXT,
      label: "Value X (Only Numbers Or Dates)",
      dynamic: false,
      locked: true,
    });
    repeaterX.addControl("xMarkerOrientation", {
      type: CONTROLLER_SELECT,
      label: "Orientation X",
      options: [
        { id: 0, value: "vertical", label: "Vertical" },
        { id: 1, value: "horizontal", label: "Horizontal" }
      ],
      dynamic: false,
      locked: true,
    });

    repeaterX.addControl("xMarkerColor", {
      type: CONTROLLER_COLOR,
      label: "Color X",
      dynamic: false,
      locked: true,
    });

    repeaterX.addControl("xMarkerLabelColor", {
      type: CONTROLLER_COLOR,
      label: "Label Color X",
      dynamic: false,
      locked: true,
    });

    repeaterX.addControl("xMarkerWidth", {
      type: CONTROLLER_NUMBER,
      label: "Width X",
      dynamic: false,
      locked: true,
    });
    //X AXIS
    this.addControl("axisX", {
      label: "AXIS X",
      type: CONTROLLER_REPEATER,
      fields: repeaterX.getControls(),
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("custom_color_scheme", {
      tab: TAB_STYLE,
      label: "Custom Color Scheme"
    });

    let repeaterScheme = new Repeater();

    repeaterScheme.addControl("color", {
      label: "Color",
      type: CONTROLLER_COLOR,
      dynamic: false,
      locked: true,
    });

    this.addControl("isCustomColor", {
      type: CONTROLLER_SWITCHER,
      label: "Use Custom Color Scheme?",
      locked: true,
    });

    this.addControl("customScheme", {
      type: CONTROLLER_REPEATER,
      fields: repeaterScheme.getControls(),
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("size", {
      tab: TAB_STYLE,
      label: "Size",
      locked: true,
    });

    this.addControl("width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl("height", {
      type: CONTROLLER_SLIDER,
      label: "Height",
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl("margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      units: ["px", "%", "vh"],
      locked: true,
    });

    advancedTabControllers(this);
  }
}
export default LineDiagram;
