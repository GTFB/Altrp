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

    // this.addControl("sort", {
    //   type: CONTROLLER_SELECT,
    //   label: "Сортировка",
    //   default: false,
    //   options: [
    //     {
    //       id: 0,
    //       value: "",
    //       label: "По умолчанию"
    //     },
    //     {
    //       id: 1,
    //       value: "value",
    //       label: "По значению"
    //     },
    //     {
    //       id: 2,
    //       value: "key",
    //       label: "По ключу"
    //     }
    //   ]
    // });

    this.addControl("use_legend", {
      type: CONTROLLER_SWITCHER,
      label: "Use legend?",
      default: false
    });

    this.endControlSection();

    this.startControlSection("main", {
      tab: TAB_CONTENT,
      dynamic: false,
      label: "Main"
    });

    this.addControl("widget_name", {
      dynamic: false,
      label: "Widget name"
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
      label: "Отобразить нижнюю легенду",
      default: true
    });

    this.addControl("enableGridX", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить сетку по X",
      default: true
    });

    this.addControl("enableGridY", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить сетку по Y",
      default: true
    });

    this.addControl("layout", {
      type: CONTROLLER_SELECT,
      label: "Вид графика",
      default: "vertical",
      options: [
        {
          id: 0,
          value: "vertical",
          label: "Вертикальный"
        },
        {
          id: 1,
          value: "horizontal",
          label: "Горизонтальный"
        }
      ]
    });

    this.addControl("groupMode", {
      type: CONTROLLER_SELECT,
      label: "Группировка",
      default: "stacked",
      options: [
        {
          id: 0,
          value: "stacked",
          label: "Сложенный"
        },
        {
          id: 1,
          value: "grouped",
          label: "Группированный"
        }
      ]
    });

    this.addControl("enableLabel", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить данные на секторах",
      default: false
    });

    this.addControl("reverse", {
      type: CONTROLLER_SWITCHER,
      label: "Отразить",
      default: false
    });

    this.addControl("padding", {
      type: CONTROLLER_RANGE,
      label: "Отступы",
      default: 0,
      min: 0,
      max: 0.95,
      step: 0.05
    });

    this.addControl("borderRadius", {
      type: CONTROLLER_RANGE,
      label: "Скругление рамки",
      default: 0,
      min: 0,
      max: 36,
      step: 1
    });

    this.addControl("borderWidth", {
      type: CONTROLLER_RANGE,
      label: "Ширина рамки",
      default: 0,
      min: 0,
      max: 20,
      step: 1
    });

    this.endControlSection();

    titleControllers(this)

    legendControllers(this)

    this.startControlSection("Tooltip", {
      tab: TAB_STYLE,
      label: "Tooltip style",
      default: "|"
    });

    this.addControl("style_margin_tooltip", {
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
    });

    this.addControl("style_padding_tooltip", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("style_width_tooltip", {
      type: CONTROLLER_NUMBER,
      label: "Width",
      default: {
        width: 350,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("style_font_tooltip", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("style_font_color_tooltip", {
      type: CONTROLLER_COLOR,
      label: "Typographic color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_background_color_tooltip", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_background_tooltip_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Shadow",
      default: {
        // blur: 0,
        // horizontal: 0,
        // vertical: 0,
        // opacity: 1,
        // spread: 0,
        // colorRGB: 'rgb(0, 0, 0)',
        // color: 'rgb(0, 0, 0)',
        // colorPickedHex: '#000000',
        // type: ""
      },
    });

    this.addControl("border_type_tooltip", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "solid",
          label: "Solid"
        },
        {
          value: "double",
          label: "Double"
        },
        {
          value: "dotted",
          label: "Dotted"
        },
        {
          value: "dashed",
          label: "Dashed"
        },
        {
          value: "groove",
          label: "Groove"
        }
      ],
    });

    this.addControl("border_width_tooltip", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("border_color_tooltip", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      // default: {
      //   color: "rgb(50,168,82)",
      //   colorPickedHex: "#32a852",
      // },
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
