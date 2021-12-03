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
  CONTROLLER_TYPOGRAPHIC
} from "../../modules/ControllersManager";

import Repeater from "../../Repeater";
import titleControllers from "../../../decorators/diagrams/diagram-title-subtitle.js";
import legendControllers from "../../../decorators/diagrams/diagram-legend.js";

class FunnelDiagram extends BaseElement {
  static getName() {
    return "funnel-diagram";
  }
  static getTitle() {
    return "Funnel Diagram";
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
      label: "Path to Data"
    });

    this.addControl("key_name", {
      dynamic: false,
      label: "Key Field"
    });

    this.addControl("data_name", {
      dynamic: false,
      label: "Data Field"
    });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
      default: false
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

    this.addControl("fillOpacity", {
      type: CONTROLLER_SLIDER,
      label: "Fill opacity",
      default: 1,
      min: 0,
      max: 1,
      step: 0.01
    });

    this.addControl("borderOpacity", {
        type: CONTROLLER_SLIDER,
        label: "Border opacity",
        default: 1,
        min: 0,
        max: 1,
        step: 0.01
    });

    this.addControl('borderWidth', {
        type: CONTROLLER_NUMBER,
        label: 'Border width'
    })
    
    this.addControl('interpolation', {
      type: CONTROLLER_SELECT,
      label: 'Interpolation',
      options: [
          {
              label: 'Smooth',
              value: 'smooth'
          },
          {
              label: 'Linear',
              value: 'linear'
          },
      ]
    })

    this.addControl("spacing", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      default: 0,
      min: 0,
      max: 50,
      step: 1
    });

    this.addControl("shapeBlending", {
      type: CONTROLLER_SLIDER,
      label: "Shape blending",
      default: 1,
      min: 0,
      max: 1,
      step: 0.05
    });
    
    this.addControl('direction', {
      type: CONTROLLER_SELECT,
      label: 'Direction',
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

    this.addControl("isInteractive", {
      type: CONTROLLER_SWITCHER,
      label: "Is interactive",
      default: true,
    });

    this.addControl("currentPartSizeExtension", {
      type: CONTROLLER_SLIDER,
      label: "Hover part size",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      conditions: {
        isInteractive: true
      }
    });

    this.addControl("currentBorderWidth", {
      type: CONTROLLER_SLIDER,
      label: "Hover border width",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      conditions: {
        isInteractive: true
      }
    });

    this.endControlSection();

    this.startControlSection('labels', {
        tab: TAB_STYLE,
        label: 'Label Styles',
    })

    this.addControl('label_color_type', {
        type: CONTROLLER_SELECT,
        label: 'Color type',
        options: [
            {
                label: 'Custom',
                value: 'custom'
            },
            {
                label: 'Darker',
                value: 'darker'
            },
            {
                label: 'Brighter',
                value: 'brighter'
            }
        ]
    })

    this.addControl('label_modifier', {
        type: CONTROLLER_SLIDER,
        label: 'Value',
        min: 0,
        max: 3,
        step: 0.1,
        conditions: {
            label_color_type: ['darker', 'brighter']
        }
    })

    this.addControl('label_color', {
        type: CONTROLLER_COLOR,
        label: 'Color'
    })

    this.endControlSection()

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
export default FunnelDiagram;