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
  CONTROLLER_RANGE,
  CONTROLLER_DATE,
  CONTROLLER_SHADOW,
  CONTROLLER_TYPOGRAPHIC
} from "../../modules/ControllersManager";

import {
  TABLE,
  LINE,
  POINT,
  BAR,
  PIE,
  widgetTypes
} from "../../../../../../admin/src/components/dashboard/widgetTypes";
import Repeater from "../../Repeater";

class PointDiagram extends BaseElement {
  static getName() {
    return "point-diagram";
  }
  static getTitle() {
    return "Point Diagram";
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

    this.addControl("datasource_path", {
      dynamic: false,
      label: "Path to Data"
    });

    this.addControl("key_name", {
      dynamic: false,
      label: "Key Field (X)"
    });

    this.addControl("key_is_date", {
      dynamic: false,
      default: false,
      label: "Key has Date format?",
      type: CONTROLLER_SWITCHER
    });

    this.addControl("data_name", {
      dynamic: false,
      label: "Data Field (Y)"
    });

    this.addControl("sort", {
      type: CONTROLLER_SELECT,
      label: "Сортировка",
      default: false,
      options: [
        {
          id: 0,
          value: "",
          label: "По умолчанию"
        },
        {
          id: 1,
          value: "value",
          label: "По значению"
        },
        {
          id: 2,
          value: "key",
          label: "По ключу"
        }
      ]
    });

    this.addControl("customTooltip", {
      type: CONTROLLER_SWITCHER,
      label: "Use custom tooltip?",
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

    this.startControlSection("multiple_data", {
      dynamic: false,
      label: "Multiple data"
    });

    let repeater = new Repeater();
    repeater.addControl("title", {
      label: "Title",
      dynamic: false
    });
    repeater.addControl("path", {
      label: "Path",
      dynamic: false
    });
    repeater.addControl("data", {
      label: "Y",
      dynamic: false
    });
    repeater.addControl("key", {
      label: "X",
      dynamic: false
    });

    this.addControl("isMultiple", {
      type: CONTROLLER_SWITCHER,
      label: "Использовать множественные данные?",
      default: false
    });

    // this.addControl("keysIsDate", {
    //   label: "Ключи как дата",
    //   type: CONTROLLER_SWITCHER,
    //   default: false,
    //   dynamic: false
    // });

    this.addControl("rep", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeater.getControls()
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Visual type"
    });

    const types = widgetTypes.map(type => {
      return { label: type.name, value: type.value };
    });

    this.addControl("type", {
      type: CONTROLLER_SELECT,
      label: "Type",
      default: TABLE,
      options: types
    });

    // this.addControl("isVertical", {
    //   type: CONTROLLER_SWITCHER,
    //   label: "Vertical table",
    //   default: true,
    //   type: TABLE
    // });

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

    this.addControl("tickRotation", {
      type: CONTROLLER_RANGE,
      label: "Наклон нижней легенды",
      default: 0,
      min: -90,
      max: 90,
      step: 1
    });

    this.addControl("xScaleType", {
      type: CONTROLLER_SELECT,
      label: "Тип оси X",
      default: "point",
      options: [
        {
          id: 0,
          label: "Линейный",
          value: "linear"
        },
        {
          id: 1,
          label: "Точечный",
          value: "point"
        },
        {
          id: 2,
          label: "Временной",
          value: "time"
        }
      ],
    });

    this.addControl("precision", {
      type: CONTROLLER_SELECT,
      label: "Масштаб времени",
      default: "point",
      options: [
        { id: 0, label: "День", value: "day" },
        { id: 1, label: "Месяц", value: "month" },
        { id: 2, label: "Год", value: "year" }
      ],
      conditions: {
        xScaleType: "time",
      }
    });

    this.addControl("pointSize", {
      type: CONTROLLER_NUMBER,
      label: "Размер точки",
      default: 6,
      conditions: {
        enablePoints: true,
      }
    });

    this.endControlSection();

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
      default: "vertical",
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
      default: [],
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
      default: false,
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
      default: "vertical",
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
      default: [],
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
export default PointDiagram;
