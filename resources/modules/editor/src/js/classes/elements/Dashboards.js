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
  CONTROLLER_SELECT,
  CONTROLLER_SHADOW
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

  static getGroup() {
    return "Basic";
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

    this.addControl("showExportButton", {
      type: CONTROLLER_SWITCHER,
      label: "Show export button?",
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
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_settings_tooltip_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color in settings",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_settings_tooltip_icon_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background icon color in settings",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Frame color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_border_style", {
      type: CONTROLLER_SELECT,
      label: "Frame view",
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
    this.addControl("style_border_width", {
      type: CONTROLLER_SLIDER,
      label: "Frame width",
      default: {
        size: 2,
        unit: "px"
      },
      units: ["px", "%"],
      max: 50,
      min: 0,
    });

    this.addControl("style_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Frame border",
      default: {
        size: 2,
        unit: "px"
      },
      units: ["px", "%"],
      max: 50,
      min: 0,
    });

    this.addControl("style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      default:{
        lineHeight: 1,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
    });

    this.addControl("style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Header font",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_font_size", {
      type: CONTROLLER_SLIDER,
      label: "Header font size",
      default: {
        size: 14,
        unit: "px"
      },
      units: ["px", "%"],
      max: 72,
      min: 4,
    });

    this.addControl("style_font_weight", {
      type: CONTROLLER_SLIDER,
      label: "Header weight",
      default: {
        weight: 400
      },
      max: 900,
      min: 100,
    });
    // Border <--------------------------!--------------------------->

    this.addControl("border_type_card", {
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

    this.addControl("border_width_card", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("border_color_card", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });

    this.addControl("border_radius_card", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Radius",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("style_background_shadow", {
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

    this.endControlSection();

    this.startControlSection("drawer", {
      tab: TAB_STYLE,
      label: "Drawer style",
      default: "|"
    });

    this.addControl("style_font_drawer_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      default:{
        lineHeight: 1,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
    });

    this.addControl("style_font_color_typographic", {
      type: CONTROLLER_COLOR,
      label: "Typographic color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_background_color_typographic", {
      type: CONTROLLER_COLOR,
      label: "Typographic background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("style_font_drawer_typographic_input", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic input",
      default:{
        lineHeight: 1,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
    });

    this.addControl("style_font_size_drawer_section", {
      type: CONTROLLER_SLIDER,
      label: "Section font size",
      default: {
        size: 14,
        unit: "px"
      },
      units: ["px", "%"],
      max: 72,
      min: 4,
    });

    this.addControl("style_font_size_drawer_label", {
      type: CONTROLLER_SLIDER,
      label: "Sign font size",
      default: {
        size: 14,
        unit: "px"
      },
      units: ["px", "%"],
      max: 72,
      min: 4,
    });

    this.addControl("style_margin_subheading", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin subheading",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px",
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    // << ЦВЕТ ЧЕКОБОКСА

    this.addControl("checkbox_color", {
      type: CONTROLLER_COLOR,
      label: "Checkbox color",
      default: {
        color: "black",
        colorPickedHex: ""
      },
    });

    this.addControl("slider_range_color", {
      type: CONTROLLER_COLOR,
      label: "Slider color",
      default: {
        color: "black",
        colorPickedHex: ""
      },
    });

    this.addControl("background_color_btn", {
      type: CONTROLLER_COLOR,
      label: "Background color button",
      // default: {
      //   color: "rgb(52,59,76)",
      //   colorPickedHex: "#343B4C",
      // },
    });

    this.addControl("font_typographic_btn", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic button",
    });

    this.addControl("font_color_btn", {
      type: CONTROLLER_COLOR,
      label: "Color font button",
    });

    this.addControl("border_type_select", {
      type: CONTROLLER_SELECT,
      label: "Border Type Select",
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

    this.addControl("border_width_select", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width Select",
      default: {
        bind: true
      },
      units: ["px", "%", "vh"],
    });

    this.addControl("border_color_select", {
      type: CONTROLLER_COLOR,
      label: "Border Color Select",
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
    });

    this.endControlSection();

    this.startControlSection("common", {
      tab: TAB_STYLE,
      label: "Common",
      default: "|"
    });

    this.addControl("delimer", {
      type: CONTROLLER_TEXT,
      label: "Divider"
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
