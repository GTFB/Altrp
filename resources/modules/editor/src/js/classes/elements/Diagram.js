import Schemes from "../../components/altrp-dashboards/settings/NivoColorSchemes.js";
import BaseElement from "./BaseElement";
import PieIcon from "../../../svgs/skill-bar.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
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
  CONTROLLER_DATE
} from "../modules/ControllersManager";

import {
  TABLE,
  LINE,
  POINT,
  BAR,
  PIE,
  widgetTypes
} from "../../../../../admin/src/components/dashboard/widgetTypes";
import Repeater from "../Repeater";

class Diagram extends BaseElement {
  static getName() {
    return "diagram";
  }
  static getTitle() {
    return "Diagram";
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

    this.endControlSection();

    this.startControlSection("multiple_data", {
      dynamic: false,
      label: "Multiple data",
      conditions: {
        type: {
          LINE
        }
      }
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

    this.addControl("innerRadius", {
      type: CONTROLLER_RANGE,
      label: "Внутренний радиус",
      default: 0,
      min: 0,
      max: 0.95,
      step: 0.05,
      conditions: {
        type: PIE
      }
    });

    this.addControl("padAngle", {
      type: CONTROLLER_RANGE,
      label: "Угол между секторами",
      default: 0,
      min: 0,
      max: 45,
      step: 1,
      conditions: {
        type: PIE
      }
    });

    this.addControl("cornerRadius", {
      type: CONTROLLER_RANGE,
      label: "Скругление углов",
      default: 0,
      min: 0,
      max: 45,
      step: 1,
      conditions: {
        type: PIE
      }
    });

    this.addControl("enableRadialLabels", {
      type: CONTROLLER_SWITCHER,
      label: "Внешние подписи к секторам",
      default: false,
      conditions: {
        type: PIE
      }
    });

    this.addControl("sortByValue", {
      type: CONTROLLER_SWITCHER,
      label: "Сортировка по значению",
      default: false,
      conditions: {
        type: PIE
      }
    });

    this.addControl("enableSliceLabels", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить данные на секторах",
      default: false,
      conditions: {
        type: PIE
      }
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
      ],
      conditions: {
        type: BAR
      }
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
      ],
      conditions: {
        type: BAR
      }
    });

    this.addControl("enableLabel", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить данные на секторах",
      default: false,
      conditions: {
        type: BAR
      }
    });

    this.addControl("reverse", {
      type: CONTROLLER_SWITCHER,
      label: "Отразить",
      default: false,
      conditions: {
        type: BAR
      }
    });

    this.addControl("padding", {
      type: CONTROLLER_RANGE,
      label: "Отступы",
      default: 0,
      min: 0,
      max: 0.95,
      step: 0.05,
      conditions: {
        type: BAR
      }
    });

    this.addControl("borderRadius", {
      type: CONTROLLER_RANGE,
      label: "Скругление рамки",
      default: 0,
      min: 0,
      max: 36,
      step: 1,
      conditions: {
        type: BAR
      }
    });

    this.addControl("borderWidth", {
      type: CONTROLLER_RANGE,
      label: "Ширина рамки",
      default: 0,
      default: 0,
      min: 0,
      max: 20,
      step: 1,
      conditions: {
        type: BAR
      }
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
      conditions: {
        type: { LINE, POINT }
      }
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
        type: { LINE, POINT }
      }
    });

    this.addControl("curve", {
      type: CONTROLLER_SELECT,
      label: "Тип кривой",
      default: "linear",
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
      ],
      conditions: {
        type: LINE
      }
    });
    this.addControl("lineWidth", {
      type: CONTROLLER_NUMBER,
      label: "Ширина линии",
      default: 2,
      conditions: {
        type: LINE
      }
    });

    this.addControl("enableArea", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить области?",
      default: false,
      conditions: {
        type: LINE
      }
    });

    this.addControl("enablePoints", {
      type: CONTROLLER_SWITCHER,
      label: "Отобразить точки?",
      default: true,
      conditions: {
        type: LINE
      }
    });

    this.addControl("pointSize", {
      type: CONTROLLER_NUMBER,
      label: "Размер точки",
      default: 6,
      conditions: {
        enablePoints: true,
        type: { POINT, LINE }
      }
    });
    this.addControl("pointColor", {
      type: CONTROLLER_COLOR,
      label: "Цвет точки",
      conditions: {
        enablePoints: true,
        type: LINE
      }
    });

    this.addControl("yMarker", {
      type: CONTROLLER_SWITCHER,
      label: "Нормаль по Y",
      default: false,
      conditions: {
        type: LINE
      }
    });

    this.addControl("yMarkerLabel", {
      type: CONTROLLER_TEXT,
      label: "Подпись нормали по Y",
      conditions: {
        yMarker: true,
        type: LINE
      }
    });

    this.addControl("yMarkerValue", {
      type: CONTROLLER_NUMBER,
      label: "Значение нормали по Y",
      conditions: {
        yMarker: true,
        type: LINE
      }
    });

    this.addControl("yMarkerOrientation", {
      type: CONTROLLER_SELECT,
      label: "Ориентация легенды по Y",
      default: "vertical",
      options: [
        { id: 0, value: "vertical", label: "Вертикальная" },
        { id: 1, value: "horizontal", label: "Горизонтальная" }
      ],
      conditions: {
        yMarker: true,
        type: LINE
      }
    });

    this.addControl("yMarkerColor", {
      type: CONTROLLER_COLOR,
      label: "Цвет линии по Y",
      conditions: {
        yMarker: true,
        type: LINE
      }
    });

    this.addControl("yMarkerLabelColor", {
      type: CONTROLLER_COLOR,
      label: "Цвет подписи по Y",
      conditions: {
        yMarker: true,
        type: LINE
      }
    });

    this.addControl("yMarkerWidth", {
      type: CONTROLLER_NUMBER,
      label: "Ширина линии по Y",
      conditions: {
        yMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarker", {
      type: CONTROLLER_SWITCHER,
      label: "Нормаль по X",
      default: false,
      conditions: {
        type: LINE
      }
    });
    this.addControl("xMarkerLabel", {
      type: CONTROLLER_TEXT,
      label: "Подпись нормали по X",
      conditions: {
        xMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarkerValue", {
      type: CONTROLLER_NUMBER,
      label: "Значение нормали по X (если ключ - число)",
      conditions: {
        xMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarkerValueDate", {
      type: CONTROLLER_DATE,
      label: "Значение нормали по X (если ключ - дата)",
      conditions: {
        xMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarkerOrientation", {
      type: CONTROLLER_SELECT,
      label: "Ориентация легенды по X",
      default: "vertical",
      options: [
        { id: 0, value: "vertical", label: "Вертикальная" },
        { id: 1, value: "horizontal", label: "Горизонтальная" }
      ],
      conditions: {
        xMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarkerColor", {
      type: CONTROLLER_COLOR,
      label: "Цвет линии по X",
      conditions: {
        xMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarkerLabelColor", {
      type: CONTROLLER_COLOR,
      label: "Цвет подписи по X",
      conditions: {
        xMarker: true,
        type: LINE
      }
    });

    this.addControl("xMarkerWidth", {
      type: CONTROLLER_NUMBER,
      label: "Ширина линии по X",
      conditions: {
        xMarker: true,
        type: LINE
      }
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
        size: 400,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-diagram{{STATE}}": "width: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("margin", {
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
      rules: {
        "{{ELEMENT}} .altrp-btn{{STATE}}": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    advancedTabControllers(this);
  }
}
export default Diagram;
