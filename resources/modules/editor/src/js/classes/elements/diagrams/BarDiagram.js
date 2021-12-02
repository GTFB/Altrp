import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/skill-bar.svg";
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
  CONTROLLER_RANGE,
  CONTROLLER_SHADOW,
  CONTROLLER_TYPOGRAPHIC
} from "../../modules/ControllersManager";

import Repeater from "../../Repeater";
import titleControllers from "../../../decorators/diagrams/diagram-title-subtitle.js";

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
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content"
    });

    this.addControl("query", {
      type: CONTROLLER_QUERY
    });

    this.addControl("datasource_title", {
      dynamic: false,
      label: "Title"
    });

    this.addControl("subtitle", {
      dynamic: false,
      label: "Subtitle"
    });

    this.addControl("datasource_path", {
      dynamic: false,
      label: "Path to Data"
    });

    this.addControl("group_name", {
      dynamic: false,
      label: "Group Field"
    });

    this.addControl("key_name", {
      dynamic: false,
      label: "Key Field"
    });

    this.addControl("data_name", {
      dynamic: false,
      label: "Data Field"
    });

    this.addControl("key_is_date", {
      dynamic: false,
      default: false,
      label: "Key has Date format?",
      type: CONTROLLER_SWITCHER
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
      default: false
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
          label: 'vartical',
          value: 'vertical'
        },
        {
          label: 'horizontal',
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
      default: [],
      fields: repeaterMarker.getControls()
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Visual"
    });

    const colors = Schemes.map(object => {
      return { label: object.label, value: object.value };
    });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      default: "regagro",
      options: colors
    });

    this.addControl("yScaleMax", {
      type: CONTROLLER_NUMBER,
      label: "Y scale max"
    });

    this.addControl("bottomAxis", {
      type: CONTROLLER_SWITCHER,
      label: "Enable bottom legend",
      default: true
    });

    this.addControl("enableGridX", {
      type: CONTROLLER_SWITCHER,
      label: "Enable grid X",
      default: true
    });

    this.addControl("enableGridY", {
      type: CONTROLLER_SWITCHER,
      label: "Enable grid Y",
      default: true
    });

    this.addControl("layout", {
      type: CONTROLLER_SELECT,
      label: "Chart type",
      default: "vertical",
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
      ]
    });

    this.addControl("groupMode", {
      type: CONTROLLER_SELECT,
      label: "Grouping",
      default: "stacked",
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
      ]
    });

    this.addControl("enableLabel", {
      type: CONTROLLER_SWITCHER,
      label: "Enable arc labels",
      default: false
    });

    this.addControl("reverse", {
      type: CONTROLLER_SWITCHER,
      label: "Reverse",
      default: false
    });

    this.addControl("padding", {
      type: CONTROLLER_RANGE,
      label: "Padding",
      default: 0,
      min: 0,
      max: 0.95,
      step: 0.05
    });

    this.addControl("borderRadius", {
      type: CONTROLLER_RANGE,
      label: "Border radius",
      default: 0,
      min: 0,
      max: 36,
      step: 1
    });

    this.addControl("borderWidth", {
      type: CONTROLLER_RANGE,
      label: "Border width",
      default: 0,
      min: 0,
      max: 20,
      step: 1
    });

    this.endControlSection();

    titleControllers(this)

    legendControllers(this)

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
      default: false
    });

    this.addControl("customScheme", {
      type: CONTROLLER_REPEATER,
      default: [],
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
      default: {
        size: 100,
        unit: "%"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("height", {
      type: CONTROLLER_SLIDER,
      label: "height",
      default: {
        size: 420,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.addControl("margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    advancedTabControllers(this);
  }
}
export default BarDiagram;