import Schemes from "../../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from ".././BaseElement";
import PieIcon from "../../../../svgs/radar.svg";
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

class RadarDiagram extends BaseElement {
  static getName() {
    return "radar-diagram";
  }
  static getTitle() {
    return "Radar Diagram";
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
      label: "Path to Data"
    });

    this.addControl('dataKeys', {
      type: CONTROLLER_TEXTAREA,
      label: 'Data Keys'
    })

    this.addControl('indexBy', {
      label: 'Index By'
    })

    this.addControl("data_name", {
        dynamic: false,
        label: "Data Field"
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use Legend?",
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_CONTENT,
      label: "Visual"
    });

    this.addControl('curve', {
      type: CONTROLLER_SELECT,
      label: 'Curve Type',
      options: [
        {
          label: 'Linear',
          value: 'linear'
        },
        {
          label: 'Cardinal Closed',
          value: 'cardinalClosed'
        },
        {
          label: 'Catmull Rom Closed',
          value: 'catmullRomClosed'
        },
        {
          label: 'Basics Closed',
          value: 'basicsClosed'
        },
      ]
    })

    this.addControl('fillOpacity', {
      type: CONTROLLER_SLIDER,
      label: 'Fill Opacity',
      min: 0,
      max: 1,
      step: 0.01
    })

    this.addControl('borderWidth', {
      type: CONTROLLER_SLIDER,
      label: 'Border Width',
      min: 0,
      max: 20,
      step: 1
    })

    this.addControl('blendMode', {
      type: CONTROLLER_SELECT,
      label: 'Blend Mode',
      options: [
        {
          label: 'Multiply',
          value: 'multiply'
        },
        {
          label: 'Normal',
          value: 'normal'
        },
      ]
    })

    this.addControl('gridLevels', {
      type: CONTROLLER_SLIDER,
      label: 'Grid Levels',
      min: 0,
      max: 12,
      step: 1
    })

    this.addControl('gridShape', {
      type: CONTROLLER_SELECT,
      label: 'Grid Shape',
      options: [
        {
          label: 'Circular',
          value: 'circular'
        },
        {
          label: 'Linear',
          value: 'linear'
        },
      ]
    })

    this.addControl('enableDots', {
      type: CONTROLLER_SWITCHER,
      label: 'Enable Dots'
    })

    this.addControl('dotSize', {
      type: CONTROLLER_SLIDER,
      label: 'Dot Size',
      min: 0,
      max: 32,
      step: 1
    })

    const colors = Schemes.map(object => {
      return { label: object.label, value: object.value };
    });

    this.addControl("colorScheme", {
      type: CONTROLLER_SELECT,
      label: "Color Scheme",
      options: colors
    });
    this.endControlSection();

    legendControllers(this)

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
export default RadarDiagram;
