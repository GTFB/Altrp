import BaseElement from "./BaseElement";
import DashIcon from "../../../svgs/archive.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXT,
  CONTROLLER_SWITCHER,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_QUERY,
  CONTROLLER_COLOR,
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_SQL,
  CONTROLLER_SQL_PARAMS,
  CONTROLLER_REPEATER,
  CONTROLLER_SELECT
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class Dashboards extends BaseElement {
  static getName() {
    return "dashboards";
  }
  static getTitle() {
    return "Dashboard";
  }
  static getIconComponent() {
    return DashIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("Data type", {
      tab: TAB_CONTENT,
      label: "Data type"
    });

    this.addControl("showButton", {
      type: CONTROLLER_SWITCHER,
      label: "Show add button?",
      default: true
    });

    this.addControl("dataSource", {
      type: CONTROLLER_SWITCHER,
      label: "Get data by data source?",
      default: true
    });

    let repeater = new Repeater();

    repeater.addControl("path", {
      label: "Path",
      dynamic: false
    });
    repeater.addControl("title", {
      label: "Title",
      dynamic: false
    });
    repeater.addControl("data", {
      label: "Y (data)",
      dynamic: false
    });
    repeater.addControl("key", {
      label: "X (key)",
      dynamic: false
    });

    repeater.addControl("keyIsDate", {
      label: "X is date",
      dynamic: false,
      type: CONTROLLER_SWITCHER,
      default: false
    });

    repeater.addControl("splitFrom", {
      label: "Split from",
      dynamic: false
    });
    repeater.addControl("splitTo", {
      label: "Split To",
      dynamic: false
    });

    this.addControl("rep", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeater.getControls()
    });

    this.addControl("filter_datasource", {
      type: CONTROLLER_SQL_PARAMS,
      default: []
    });

    this.endControlSection();

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content (DEPRECATED)"
    });

    this.addControl("global_parameter", {
      type: CONTROLLER_SQL,
      default: [],
      multi: false,
      label: "Select global paramenters",
      onlySQL: true
    });

    // this.addControl("rep", {
    //   type: CONTROLLER_REPEATER,
    //   default: [],
    //   fields: repeater.getControls(),
    // });

    this.addControl("sql", {
      type: CONTROLLER_SQL,
      default: []
    });

    this.addControl("filter", {
      type: CONTROLLER_SQL_PARAMS,
      default: []
    });

    this.endControlSection();

    // this.startControlSection("style", {
    //   tab: TAB_STYLE,
    //   label: "Visual type"
    // });

    // this.addControl("animated", {
    //   type: CONTROLLER_SWITCHER,
    //   label: "Animated",
    //   default: false
    // });

    // this.endControlSection();

    this.startControlSection("card", {
      tab: TAB_STYLE,
      label: "Card",
      default: "|"
    });

    this.addControl("style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Цвет фона",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--background{{STATE}}":
          "background-color: {{COLOR}} !important;"
      }
    });

    this.addControl("style_settings_tooltip_background_color", {
      type: CONTROLLER_COLOR,
      label: "Цвет фона настройки",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--settings-tooltip-background{{STATE}}":
          "background-color: {{COLOR}} !important;"
      }
    });

    this.addControl("style_settings_tooltip_icon_background_color", {
      type: CONTROLLER_COLOR,
      label: "Цвет фона иконок в настройке",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--settings-tooltip-icon-background{{STATE}}": [
          "background-color: {{COLOR}} !important;"
        ]
      }
    });

    this.addControl("style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Цвет рамки",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--border-color{{STATE}}":
          "border-color: {{COLOR}};"
      }
    });

    this.addControl("style_border_style", {
      type: CONTROLLER_SELECT,
      label: "Вид рамки",
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
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--border-style{{STATE}}":
          "border-style: {{VALUE}}"
      }
    });
    this.addControl("style_border_width", {
      type: CONTROLLER_SLIDER,
      label: "Ширина рамки",
      default: {
        size: 2,
        unit: "px"
      },
      units: ["px", "%"],
      max: 50,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--border{{STATE}}":
          "border-width: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("style_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Закругление рамки",
      default: {
        size: 2,
        unit: "px"
      },
      units: ["px", "%"],
      max: 50,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--border-radius{{STATE}}":
          "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Типографика",
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--font{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif !important;'
        ],
        "{{ELEMENT}} .altrp-dashboard__card--font{{STATE}} text": [
          'font-family: "{{FAMILY}}", sans-serif !important;'
        ]
      }
    });

    this.addControl("style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Цвет шрифта заголовка",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--font-color{{STATE}}":
          "color: {{COLOR}};"
      }
    });

    this.addControl("style_font_size", {
      type: CONTROLLER_SLIDER,
      label: "Размер шрифта заголовка",
      default: {
        size: 14,
        unit: "px"
      },
      units: ["px", "%"],
      max: 72,
      min: 4,
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--font-size{{STATE}}":
          "font-size: {{SIZE}}{{UNIT}};"
      }
    });

    this.addControl("style_font_weight", {
      type: CONTROLLER_SLIDER,
      label: "Толщина шрифта заголовка",
      default: {
        weight: 400
      },
      max: 900,
      min: 100,
      rules: {
        "{{ELEMENT}} .altrp-dashboard__card--font-weight{{STATE}}":
          "font-weight: {{WEIGHT}} !important;"
      }
    });

    this.endControlSection();

    this.startControlSection("drawer", {
      tab: TAB_STYLE,
      label: "Drawer style",
      default: "|"
    });

    this.addControl("style_font_drawer_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Типографика",
      rules: {
        ".{{ID}}.altrp-dashboard__drawer--font{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif !important;'
        ]
      }
    });

    this.addControl("style_font_size_drawer_section", {
      type: CONTROLLER_SLIDER,
      label: "Размер шрифта секций",
      default: {
        size: 14,
        unit: "px"
      },
      units: ["px", "%"],
      max: 72,
      min: 4,
      rules: {
        ".{{ID}}.altrp-dashboard__drawer--section-font-size{{STATE}}": [
          "font-size: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    this.addControl("style_font_size_drawer_label", {
      type: CONTROLLER_SLIDER,
      label: "Размер шрифта подписей",
      default: {
        size: 14,
        unit: "px"
      },
      units: ["px", "%"],
      max: 72,
      min: 4,
      rules: {
        ".{{ID}}.altrp-dashboard__drawer--label-font-size{{STATE}}": [
          "font-size: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    // this.addControl("style_range_drawer_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Цвет range",
    //   default: {
    //     color: "",
    //     colorPickedHex: ""
    //   },
    //   rules: {
    //     ".{{ID}}.altrp-dashboard__drawer--range-drawer-color{{STATE}}": [
    //       "background-color: {{COLOR}};",
    //       "-webkit-appearance: none;",
    //       "border-radius: 10px"
    //     ],
    //     ".{{ID}}.altrp-dashboard__drawer--range-drawer-color::-webkit-slider-runnable-track{{STATE}}": [
    //       // "background-color: {{COLOR}};",
    //       // "height: 10px;",
    //       "border-radius: 10px",
    //       "-webkit-appearance: none;",
    //       "margin-top: 5px"
    //       // "color: #13bba4;",
    //     ],
    //     ".{{ID}}.altrp-dashboard__drawer--range-drawer-color:--webkit-slider-thumb{{STATE}}": [
    //       // "background-color: {{COLOR}};",
    //       // "width: 10px;",
    //       "-webkit-appearance: none;",
    //       "border-radius: 10px",
    //       // "height: 10px;",
    //       "cursor: pointer;",
    //       "background: {{COLOR}};",
    //       "color: {{COLOR}};"
    //     ]
    //   }
    // });

    this.endControlSection();

    this.startControlSection("common", {
      tab: TAB_STYLE,
      label: "Common",
      default: "|"
    });

    this.addControl("delimer", {
      type: CONTROLLER_TEXT,
      label: "Разделитель"
    });

    this.endControlSection();

    this.startControlSection("size", {
      tab: TAB_STYLE,
      label: "Size",
      default: "|"
    });

    this.addControl("drawerWidth", {
      type: CONTROLLER_SLIDER,
      label: "drawer width",
      default: {
        size: 30,
        unit: "%"
      },
      units: ["px", "%"],
      max: 100,
      min: 0
    });

    this.addControl("style_height", {
      type: CONTROLLER_SLIDER,
      label: "height",
      default: {
        size: 400,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-image{{STATE}}": "height: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("style_margin", {
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
export default Dashboards;
