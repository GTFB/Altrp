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
      options: colors
    });

    this.addControl("yScaleMax", {
      type: CONTROLLER_NUMBER,
      label: "Y scale max"
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
      ]
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
      }
    });

    this.addControl('lineWidth', {
      type: CONTROLLER_SLIDER,
      label: 'Line width',
      min: 0,
      max: 30,
      step: 1
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
      ]
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
      ]
    })
    
    this.endControlSection();

    this.startControlSection('axis', {
      tab: TAB_STYLE,
      label: 'Axis'
    })

    this.addControl("enableGridX", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Grid X",
    });

    this.addControl("enableGridY", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Grid Y",
    });

    this.addControl("axisBottom", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Bottom Axis",
    });

    this.addControl('bottomTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisBottom: true
      }
    })

    this.addControl('bottomTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Tick Padding',
      conditions: {
        axisBottom: true
      }
    })

    this.addControl("bottomTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Bottom Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisBottom: true
      }
    });

    this.addControl('bottomLegend', {
      type: CONTROLLER_TEXT,
      label: 'Bottom Legend',
      conditions: {
        axisBottom: true
      }
    })

    this.addControl('bottomLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisBottom: true
      }
    })

    this.addControl("axisTop", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Top Axis",
    });

    this.addControl('topTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Top Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisTop: true
      }
    })

    this.addControl('topTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Top Tick Padding',
      conditions: {
        axisTop: true
      }
    })

    this.addControl("topTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Top Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisTop: true
      }
    });

    this.addControl('topLegend', {
      type: CONTROLLER_TEXT,
      label: 'Top Legend',
      conditions: {
        axisTop: true
      }
    })

    this.addControl('topLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Top Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisTop: true
      }
    })
    
    this.addControl("axisLeft", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Left Axis",
    });

    this.addControl('leftTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Left Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisLeft: true
      }
    })

    this.addControl('leftTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Left Tick Padding',
      conditions: {
        axisLeft: true
      }
    })

    this.addControl("leftTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Left Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisLeft: true
      }
    });

    this.addControl('leftLegend', {
      type: CONTROLLER_TEXT,
      label: 'Left Legend',
      conditions: {
        axisLeft: true
      }
    })

    this.addControl('leftLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Left Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisLeft: true
      }
    })
    
    this.addControl("axisRight", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Right Axis",
    });

    this.addControl('rightTickSize', {
      type: CONTROLLER_SLIDER,
      label: 'Right Tick Size',
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        axisRight: true
      }
    })

    this.addControl('rightTickPadding', {
      type: CONTROLLER_SLIDER,
      label: 'Right Tick Padding',
      conditions: {
        axisRight: true
      }
    })

    this.addControl("rightTickRotation", {
      type: CONTROLLER_SLIDER,
      label: "Right Tick Rotation",
      min: -90,
      max: 90,
      step: 1,
      conditions: {
        axisRight: true
      }
    });

    this.addControl('rightLegend', {
      type: CONTROLLER_TEXT,
      label: 'Right Legend',
      conditions: {
        axisRight: true
      }
    })

    this.addControl('rightLegendOffset', {
      type: CONTROLLER_SLIDER,
      label: 'Right Legend Offset',
      min: -60,
      max: 60,
      step: 1,
      conditions: {
        axisRight: true
      }
    })

    this.endControlSection()

    this.startControlSection('points', {
      tab: TAB_STYLE,
      label: 'Points'
    })

    this.addControl("enablePoints", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Points?",
    });

    this.addControl("pointSize", {
      type: CONTROLLER_NUMBER,
      label: "Point Size"
    });

    this.addControl("pointColor", {
      type: CONTROLLER_COLOR,
      label: "Point color"
    });

    this.addControl('pointBorderColor', {
      type: CONTROLLER_COLOR,
      label: 'Point Border Color'
    })

    this.addControl('pointBorderWidth', {
      type: CONTROLLER_SLIDER,
      label: 'Point Border Width',
      min: 0,
      max: 25,
      step: 1
    })

    this.endControlSection()

    this.startControlSection('area_settings', {
      tab: TAB_STYLE,
      label: 'Area Settings'
    })
    
    this.addControl("enableArea", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Area?",
    });

    this.addControl('areaBaselineValue', {
      type: CONTROLLER_NUMBER,
      label: 'Baseline Value',
    })

    this.addControl('areaOpacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      min: 0,
      max: 1, 
      step: 0.05
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
      ]
    })

    this.addControl("enableGradient", {
      type: CONTROLLER_SWITCHER,
      label: "Enable Gradient?",
    });

    this.endControlSection()

    legendControllers(this)

    valueFormatControllers(this, {
      name: 'yFormat',
      tabID: 'y_format_value',
      tabName: 'Y Format Value',
      useCurrency: false,
    })

    valueFormatControllers(this, {
      name: 'xFormat',
      tabID: 'x_format_value',
      tabName: 'X Format Value',
      useCurrency: false,
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
      label: "Value X Is Date",
      dynamic: false
    });
    repeaterX.addControl("xMarkerValue", {
      type: CONTROLLER_TEXT,
      label: "Value X (Only Numbers Or Dates)",
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
      label: "Label Color X",
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
      label: "Custom Color Scheme"
    });

    let repeaterScheme = new Repeater();

    repeaterScheme.addControl("color", {
      label: "Color",
      type: CONTROLLER_COLOR,
      dynamic: false
    });

    this.addControl("isCustomColor", {
      type: CONTROLLER_SWITCHER,
      label: "Use Custom Color Scheme?",
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
      label: "Width",
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("height", {
      type: CONTROLLER_SLIDER,
      label: "Height",
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