import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/pie.svg";
import { advancedTabControllers } from "../../../decorators/register-controllers";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_TEXT,
  CONTROLLER_REPEATER,
  CONTROLLER_COLOR,
  CONTROLLER_NUMBER,
  CONTROLLER_DATE,
  CONTROLLER_SHADOW,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_CHOOSE,
  CONTROLLER_TEXTAREA
} from "../../modules/ControllersManager";

import {actionsControllers} from "../../../decorators/actions-controllers";

import Repeater from "../../Repeater";
import legendControllers from "../../../decorators/diagrams/diagram-legend.js";
import titleControllers from "../../../decorators/diagrams/diagram-title-subtitle.js";
import valueFormatControllers from "../../../decorators/diagrams/diagram-value-format.js";

class PieDiagram extends BaseElement {
  static getName() {
    return "pie-diagram";
  }
  static getTitle() {
    return "Pie Diagram";
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
      label: "Path To Data",
      locked: true,
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use Legend?",
    });

    this.addControl("useCenteredMetric", {
      type: CONTROLLER_SWITCHER,
      label: "Use Centered Metric?",
      locked: true,
    });

    this.addControl("useProcent", {
      type: CONTROLLER_SWITCHER,
      label: "Add Procent?",
      locked: true,
    });

    this.addControl("useLinkArcLabels", {
      type: CONTROLLER_SWITCHER,
      label: "Use Link Arc Labels?",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_CONTENT,
      label: "Visual"
    });

    const colors = Schemes.map(object => {
      return { label: object.label, value: object.value };
    });

    this.addControl("activeOuterRadiusOffset", {
      type: CONTROLLER_NUMBER,
      label: "Active Outer Radius Offset",
      locked: true,
    });

    this.addControl("activeInnerRadiusOffset", {
      type: CONTROLLER_NUMBER,
      label: "Active Inner Radius Offset",
      locked: true,
    });

    this.addControl("innerRadius", {
      type: CONTROLLER_SLIDER,
      label: "Inner Radius",
      min: 0,
      max: 0.95,
      step: 0.05,
      locked: true,
    });

    this.addControl("padAngle", {
      type: CONTROLLER_SLIDER,
      label: "Pad Angle",
      min: 0,
      max: 45,
      step: 1,
      locked: true,
    });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      options: colors,
      locked: true,
    });

    this.addControl("yScaleMax", {
      type: CONTROLLER_NUMBER,
      label: "Y Scale Max",
      locked: true,
    });

    this.addControl("cornerRadius", {
      type: CONTROLLER_SLIDER,
      label: "Corner Radius",
      min: 0,
      max: 45,
      step: 1,
      locked: true,
    });

    this.endControlSection();

    legendControllers(this)

    valueFormatControllers(this)

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

    this.endControlSection()

    this.startControlSection("centered_metric", {
      tab: TAB_STYLE,
      label: "Center Metric"
    });

    this.addControl('centered_metric_typography', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typography'
    })

    this.addControl('centered_metric_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
    })

    this.endControlSection()

    this.startControlSection("arc_label", {
      tab: TAB_STYLE,
      label: "Arc Label"
    });

    this.addControl('arc_label_typography', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typography'
    })

    this.addControl('arc_label_color', {
      type: CONTROLLER_COLOR,
      label: 'Color'
    })

    this.endControlSection()

    advancedTabControllers(this);
  }
}
export default PieDiagram;
