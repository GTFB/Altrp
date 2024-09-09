import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/bar.svg";
import { advancedTabControllers } from "../../../decorators/register-controllers";
import legendControllers from '../../../decorators/diagrams/diagram-legend'
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SWITCHER,
  CONTROLLER_QUERY,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_REPEATER,
  CONTROLLER_COLOR,
  CONTROLLER_NUMBER,
  CONTROLLER_SHADOW,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_TEXTAREA
} from "../../modules/ControllersManager";

import Repeater from "../../Repeater";
import titleControllers from "../../../decorators/diagrams/diagram-title-subtitle.js";
import valueFormatControllers from "../../../decorators/diagrams/diagram-value-format.js";

class BarDiagram extends BaseElement {
  static getName() {
    return "bar-diagram";
  }
  static getTitle() {
    return "Bar Diagram";
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

    this.addControl('dataKeys', {
      type: CONTROLLER_TEXTAREA,
      label: 'Data Keys',
      locked: true,
    })

    this.addControl('indexBy', {
      type: CONTROLLER_TEXTAREA,
      label: 'Index By',
      locked: true,
    })

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('markers', {
      tab: TAB_CONTENT,
      label: 'Markers',
    })

    let repeaterMarker = new Repeater();

    repeaterMarker.addControl("legend", {
      label: "Label",
    })

    repeaterMarker.addControl("value", {
      label: "Value",
      type: CONTROLLER_NUMBER,
    })

    repeaterMarker.addControl("legendOrientation", {
      label: "Orientation",
      type: CONTROLLER_SELECT,
      options: [
        {
          label: 'Vertical',
          value: 'vertical'
        },
        {
          label: 'Horizontal',
          value: 'horizontal'
        },
      ]
    })

    repeaterMarker.addControl('stroke', {
      label: 'Color',
      type: CONTROLLER_COLOR,
    })

    this.addControl("markersRepeater", {
      type: CONTROLLER_REPEATER,
      fields: repeaterMarker.getControls(),
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("visual", {
      tab: TAB_CONTENT,
      label: "Visual"
    });

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

    this.addControl("bottomAxis", {
      type: CONTROLLER_SWITCHER,
      label: "Enable bottom legend",
      locked: true,
    });

    this.addControl("enableGridX", {
      type: CONTROLLER_SWITCHER,
      label: "Enable grid X",
      locked: true,
    });

    this.addControl("enableGridY", {
      type: CONTROLLER_SWITCHER,
      label: "Enable grid Y",
      locked: true,
    });

    this.addControl("layout", {
      type: CONTROLLER_SELECT,
      label: "Chart type",
      options: [
        {
          id: 0,
          value: "vertical",
          label: "Vertical"
        },
        {
          id: 1,
          value: "horizontal",
          label: "Horizontal"
        }
      ],
      locked: true,
    });

    this.addControl("groupMode", {
      type: CONTROLLER_SELECT,
      label: "Grouping",
      options: [
        {
          id: 0,
          value: "stacked",
          label: "Stacked"
        },
        {
          id: 1,
          value: "grouped",
          label: "Grouped"
        }
      ],
      locked: true,
    });

    this.addControl("enableLabel", {
      type: CONTROLLER_SWITCHER,
      label: "Enable arc labels",
      locked: true,
    });

    this.addControl("reverse", {
      type: CONTROLLER_SWITCHER,
      label: "Reverse",
      locked: true,
    });

    this.addControl('enableMinValue', {
      type: CONTROLLER_SWITCHER,
      label: 'Enable min value',
      locked: true,
    })

    this.addControl('minValue', {
      type: CONTROLLER_NUMBER,
      label: 'Min value',
      conditions: {
        enableMinValue: true
      },
      locked: true,
    })

    this.addControl('enableMaxValue', {
      type: CONTROLLER_SWITCHER,
      label: 'Enable max value',
      locked: true,
    })

    this.addControl('maxValue', {
      type: CONTROLLER_NUMBER,
      label: 'Max value',
      conditions: {
        enableMaxValue: true
      },
      locked: true,
    })

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

    this.startControlSection('styles', {
      label: 'Common styles',
      tab: TAB_STYLE
    })

    this.addControl("padding", {
      type: CONTROLLER_SLIDER,
      label: "Padding",
      min: 0,
      max: 0.95,
      step: 0.05,
      locked: true,
    });

    this.addControl("borderRadius", {
      type: CONTROLLER_SLIDER,
      label: "Border radius",
      min: 0,
      max: 36,
      step: 1,
      locked: true,
    });

    this.addControl("borderWidth", {
      type: CONTROLLER_SLIDER,
      label: "Border width",
      min: 0,
      max: 20,
      step: 1,
      locked: true,
    });

    this.addControl("borderColor", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      locked: true,
    });

    this.endControlSection()

    legendControllers(this)

    valueFormatControllers(this)

    this.startControlSection("custom_color_scheme", {
      tab: TAB_STYLE,
      label: "Custom Color Scheme",
      locked: true,
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
      locked: true,
    });

    this.addControl("customScheme", {
      type: CONTROLLER_REPEATER,
      fields: repeaterScheme.getControls(),
      locked: true,
    });

    this.endControlSection()

    advancedTabControllers(this);
  }
}
export default BarDiagram;
