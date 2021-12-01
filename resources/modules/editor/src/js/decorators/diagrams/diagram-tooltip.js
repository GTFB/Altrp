import { CONTROLLER_CHOOSE, CONTROLLER_COLOR, CONTROLLER_DIMENSIONS, CONTROLLER_TYPOGRAPHIC, TAB_STYLE } from "../../classes/modules/ControllersManager";

export default function tooltipControllers(element) {
  this.startControlSection("Tooltip", {
    tab: TAB_STYLE,
    label: "Tooltip style",
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

  this.addControl('border_radius_tooltip', {
    type: CONTROLLER_SLIDER,
    label: "Border radius",
    default: {
      size: 2,
      unit: "px"
    },
    units: ["px", "%"],
    max: 50,
    min: 0,
  })

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
}