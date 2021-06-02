import BaseElement from "./BaseElement";
import MapIcon from "../../../svgs/layout-settings.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXT,
  CONTROLLER_SWITCHER,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_REPEATER,
  CONTROLLER_SELECT,
  CONTROLLER_COLOR,
  CONTROLLER_QUERY,
  CONTROLLER_EVENT_HANDLER,
  CONTROLLER_TYPOGRAPHIC
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

const icons = [
  { label: "GoogleMarker", value: "GoogleMarker" },
  { label: "Animals", value: "Animals" },
  { label: "Bee", value: "Bee" },
  { label: "Cow", value: "Cow" },
  { label: "Home", value: "Home" },
  { label: "Horse", value: "Horse" },
  { label: "Marker", value: "Marker" },
  { label: "Pig", value: "Pig" },
  { label: "Sheep", value: "Sheep" }
];
class MapConstructor extends BaseElement {
  static getName() {
    return "map_builder";
  }
  static getTitle() {
    return "Map Builder";
  }
  static getIconComponent() {
    return MapIcon;
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

    this.addControl("editable", {
      type: CONTROLLER_SWITCHER,
      label: "Editable",
      default: false
    });

    this.addControl("canvas", {
      type: CONTROLLER_SWITCHER,
      label: "Canvas",
      default: true
    });

    this.addControl("centerByDatasource", {
      type: CONTROLLER_SWITCHER,
      label: "Center By Datasource",
      default: false
    });

    this.addControl("latDs", {
      type: CONTROLLER_TEXT,
      label: "Longitude from datasource",
      conditions: { centerByDatasource: true }
    });

    this.addControl("lngDs", {
      type: CONTROLLER_TEXT,
      label: "Latitude from datasource",
      conditions: { centerByDatasource: true }
    });

    this.addControl("lat", {
      type: CONTROLLER_TEXT,
      label: "Latitude",
      default: 50.7496449
    });

    this.addControl("lng", {
      type: CONTROLLER_TEXT,
      label: "Longitude",
      default: 86.1250068
    });

    this.addControl("zoom", {
      type: CONTROLLER_NUMBER,
      label: "Zoom",
      default: 6
    });

    this.addControl("handler", {
      type: CONTROLLER_EVENT_HANDLER,
      label: "Event handler",
      default: {
        evt: "",
        params: ""
      }
    });

    this.endControlSection();

    this.startControlSection("model_to_save", {
      tab: TAB_CONTENT,
      label: "Model to save data"
    });

    this.addControl("url", {
      label: "URL",
      responsive: false,
      dynamic: false,
      description: "/ajax/models/tests/{{id}}"
    });

    this.addControl("field_id", {
      type: CONTROLLER_TEXT,
      label: "Field ID (Column Name)"
    });

    const parameters = new Repeater();

    parameters.addControl("parent_field_to_save", {
      label: "Set field name on parent model",
      dynamic: false
    });

    parameters.addControl("input_type", {
      label: "Set input type",
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "select",
          label: "Select"
        },
        {
          value: "text",
          label: "Text"
        },
        {
          value: "number",
          label: "Number"
        },
        {
          value: "date",
          label: "Date"
        }
      ]
    });

    parameters.addControl("parameter_path", {
      label: "Set datasource",
      dynamic: false,
      conditions: {
        input_type: ["select"]
      }
    });

    parameters.addControl("parameter_title", {
      label: "Set title for parameter",
      dynamic: false
    });

    parameters.addControl("parameter_label", {
      label: "Set field from datasource for parameter label",
      dynamic: false,
      conditions: {
        input_type: ["select"]
      }
    });

    parameters.addControl("parameter_value", {
      label: "Set field from datasource for parameter value",
      dynamic: false,
      conditions: {
        input_type: ["select"]
      }
    });

    this.addControl("parameters", {
      label: "Custom parameters",
      type: CONTROLLER_REPEATER,
      default: [],
      fields: parameters.getControls()
    });

    this.addControl("url_connect", {
      label: "URL to connect",
      responsive: false,
      dynamic: false,
      description: "/ajax/models/tests/{{id}}"
    });

    this.addControl("field_first_connect", {
      type: CONTROLLER_TEXT,
      label: "Field First ID (Column Name)"
    });

    this.addControl("field_second_connect", {
      type: CONTROLLER_TEXT,
      label: "Field Second ID (Column Name)"
    });

    this.endControlSection();

    this.startControlSection("objects_section", {
      tab: TAB_CONTENT,
      label: "Custom Objects"
    });

    let repeaterObjects = new Repeater();

    repeaterObjects.addControl("path", {
      label: "Path",
      dynamic: false
    });

    repeaterObjects.addControl("longitude", {
      label: "Longitude key",
      default: "longitude",
      dynamic: false
    });

    repeaterObjects.addControl("latitude", {
      label: "Latitude key",
      default: "latitude",
      dynamic: false
    });

    repeaterObjects.addControl("useCluster", {
      label: "Clusters",
      type: CONTROLLER_SWITCHER,
      dynamic: true
    });

    repeaterObjects.addControl("tooltipByKeyboard", {
      label: "Enter tooltip value by keyboard?",
      type: CONTROLLER_SWITCHER,
      default: false
    });

    repeaterObjects.addControl("tooltip", {
      label: "Tooltip key",
      dynamic: false
    });

    repeaterObjects.addControl("popupByKeyboard", {
      label: "Enter popup value by keyboard?",
      type: CONTROLLER_SWITCHER,
      default: false
    });

    repeaterObjects.addControl("popup", {
      label: "Popup key",
      dynamic: false
    });

    repeaterObjects.addControl("icon", {
      label: "Popup key",
      type: CONTROLLER_SELECT,
      options: icons,
      dynamic: false
    });

    repeaterObjects.addControl("color", {
      label: "Icon color",
      type: CONTROLLER_COLOR,
      default: {
        colorPickedHex: "#3388ff"
      }
    });

    this.addControl("onlyDatasource", {
      label: "Data only from datasource",
      type: CONTROLLER_SWITCHER,
      default: false
    });

    this.addControl("objects", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeaterObjects.getControls()
    });

    this.endControlSection();

    this.startControlSection("style", {
      tab: TAB_STYLE,
      label: "Size"
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

    this.endControlSection();

    this.startControlSection("styles", {
      tab: TAB_STYLE,
      label: "Custom Panel"
    });

    this.addControl("styles_font_drawer", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      rules: {
        ".{{ID}}.altrp-custom--typographic{{STATE}}": [
          "font-size: {{SIZE}}px;",
          "font-family: {{FAMILY}}",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
      }
    });

    this.addControl("styles_font_color_drawer", {
      type: CONTROLLER_COLOR,
      label: "Typographic color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        ".{{ID}}.altrp-custom--typographic{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("background_color_btn", {
      type: CONTROLLER_COLOR,
      label: "Background color button",
      // default: {
      //   color: "rgb(52,59,76)",
      //   colorPickedHex: "#343B4C",
      // },
      rules: {
        ".{{ID}}.altrp-map__modal.modal__body-save{{STATE}}":
          "background-color: {{COLOR}};"
      }
    });

    this.addControl("font_typographic_btn", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic button",
      // default:{
      //   lineHeight: 1,
      //   spacing: 0,
      //   size: 16,
      //   weight: "normal",
      //   family: "Open Sans",
      //   decoration: ""
      // },
      rules: {
        ".{{ID}}.modal__body-save{{STATE}}": [
          "font-size: {{SIZE}}px;",
          "font-family: {{FAMILY}}",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
      }
    });

    this.addControl("font_color_btn", {
      type: CONTROLLER_COLOR,
      label: "Color font button",
      // default: {
      //   color: "rgb(255,255,255)",
      //   colorPickedHex: "#FFF",
      // },
      rules: {
        ".{{ID}}.modal__body-save{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("slider_range_color", {
      type: CONTROLLER_COLOR,
      label: "Slider color",
      default: {
        color: "black",
        colorPickedHex: ""
      },
      rules: {
        ".{{ID}}.altrp-dashboard__edit--range-edit-color.MuiSlider-root{{STATE}}":
          "color: {{COLOR}};"
      }
    });

    this.addControl("styles_font_drawer_label", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic label",
      rules: {
        ".{{ID}}.altrp-map__modal .modal__body-text label{{STATE}}": [
          "font-size: {{SIZE}}px;",
          "font-family: {{FAMILY}}",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
      }
    });

    this.addControl("styles_font_color_drawer_label", {
      type: CONTROLLER_COLOR,
      label: "Typographic color label",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        ".{{ID}}.altrp-map__modal .modal__body-text label{{STATE}}":
          "color: {{COLOR}};"
      }
    });

    // .altrp-map__modal .modal__body-text label
    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default MapConstructor;
