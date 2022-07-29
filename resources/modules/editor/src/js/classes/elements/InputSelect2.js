import BaseElement from "./BaseElement";
import FromIcon from "../../../svgs/form-horizontal.svg";
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_SWITCHER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_NUMBER,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT2,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_SHADOW,
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { actionsControllers } from "../../decorators/actions-controllers";

class InputSelect2 extends BaseElement {
  static getName() {
    return "input-select2";
  }
  static getTitle() {
    return "Input Select2";
  }
  static getIconComponent() {
    return FromIcon;
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

    this.addControl("form_id", {
      type: CONTROLLER_TEXT,
      label: "Form ID"
    });

    this.addControl("field_id", {
      type: CONTROLLER_TEXT,
      label: "Field ID (Column Name)"
    });

    this.addControl("sort_default", {
      type: CONTROLLER_SWITCHER,
      label: "Sort Default"
    });

    const optionsRepeater = new Repeater();

    optionsRepeater.addControl("label", {
      type: CONTROLLER_TEXT,
      label: "Label"
    });

    optionsRepeater.addControl("value", {
      type: CONTROLLER_TEXT,
      label: "Value"
    });

    optionsRepeater.addControl("image", {
      type: CONTROLLER_MEDIA,
      label: "Image"
    });

    this.addControl("content_label", {
      type: CONTROLLER_TEXT,
      locked:true,
      label: "Label"
    });

    this.addControl("content_label_position_type", {
      type: CONTROLLER_SELECT,
      label: "Label Position",
      default: "top",
      options: [
        {
          value: "top",
          label: "Top"
        },
        {
          value: "bottom",
          label: "Bottom"
        },
        {
          value: "left",
          label: "Left"
        },
        {
          value: "right",
          label: "Right"
        },
        {
          value: "absolute",
          label: "Absolute"
        }
      ]
    });

    this.addControl("label_icon", {
      type: CONTROLLER_MEDIA,
      label: "Choose Icon"
    });

    this.addControl("label_icon_position", {
      type: CONTROLLER_SELECT,
      label: "Icon Position",
      default: "default",
      options: [
        {
          value: "row",
          label: "Right"
        },
        {
          value: "row-reverse",
          label: "Left"
        },
        {
          value: "column",
          label: "Bottom"
        },
        {
          value: "column-reverse",
          label: "Top"
        }
      ]
    });

    this.addControl("content_placeholder", {
      type: CONTROLLER_TEXT,
      label: "Placeholder",
      default: "Placeholder"
    });

    this.addControl("content_required", {
      type: CONTROLLER_SWITCHER,
      label: "Required"
    });

    this.addControl("content_readonly", {
      type: CONTROLLER_SWITCHER,
      label: "Readonly"
    });

    this.addControl("content_timestamp", {
      type: CONTROLLER_SWITCHER,
      label: "Timestamp",
      default: false
    });

    this.addControl("content_clearable", {
      type: CONTROLLER_SWITCHER,
      label: "Clearable",
      default: false
    });

    this.addControl("content_options_nullable", {
      type: CONTROLLER_SWITCHER,
      label: "Select Nullable",
      default: false
    });
    this.addControl("nulled_option_title", {
      type: CONTROLLER_TEXT,
      label: "Nulled Option Label"
    });

    this.addControl("options_sorting", {
      type: CONTROLLER_SELECT,
      label: "Options Sorting",
      default: "",
      options: [
        {
          value: "",
          label: "None"
        },
        {
          value: "asc",
          label: "ASC"
        },
        {
          value: "desc",
          label: "DESC"
        }
      ]
    });

    this.addControl("model_for_options", {
      type: CONTROLLER_SELECT2,
      label: "Choose Datasource for Select Options",
      default: "",
      nullable: true,
      options_resource:
        "/admin/ajax/models_options?with_names=1&not_plural=1&with_sql_queries=1"
    });

    this.addControl("params_for_update", {
      type: CONTROLLER_TEXTAREA,
      label: "Params for Update Options",
      conditions: {
        "model_for_options!": ""
      },
      description:
        'Enter each param for Query in a separate line.<br/>To differentiate between label and value, separate them with a pipe char ("|").<br/>For example: title | Post.<br/>Or<br/>title | {\'{{title}}\'} for Take Value from This Form Field with Name "title" \n'
    });

    this.addControl("params_as_filters", {
      type: CONTROLLER_SWITCHER,
      label: "Use Params as Filters",
      default: false,
      conditions: {
        "params_for_update!": ""
      }
    });

    this.addControl("select2_multiple", {
      type: CONTROLLER_SWITCHER,
      label: "Multiple",
      default: false
    });

    this.addControl("content_options", {
      type: CONTROLLER_TEXTAREA,
      label: "Or Type Select Options",
      description:
        'Enter each option in a separate line. To differentiate between label and value, separate them with a pipe char ("|"). For example: f_name | First Name'
    });

    this.addControl("content_default_value", {
      type: CONTROLLER_TEXTAREA,
      label: "Default Value"
    });

    this.addControl("content_calculation", {
      type: CONTROLLER_TEXTAREA,
      label: "Calculation",
      locked: true,
      description:
        "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10"
    });

    this.endControlSection();

    this.startControlSection("create_options", {
      tab: TAB_CONTENT,
      label: "Create Options Settings"
    });

    this.addControl("create_allowed", {
      type: CONTROLLER_SWITCHER,
      label: "Allowed"
    });

    this.addControl("create_url", {
      label: "URL",
      dynamic: false,
      responsive: false,
      description: "/ajax/models/tests",
      conditions: {
        create_allowed: true
      }
    });

    this.addControl("create_label", {
      label: "Label Field",
      dynamic: false,
      responsive: false,
      conditions: {
        create_allowed: true
      }
    });

    this.addControl("create_data", {
      type: CONTROLLER_TEXTAREA,
      label: "Data",
      conditions: {
        create_allowed: true
      },
      description:
        'Enter additional data for new item in a separate line.<br/>To differentiate between label and value, separate them with a pipe char ("|").<br/>For example: title | Post.<br/>Or<br/>title | {\'{{title}}\'} for Take Value from This Form Field with Name "title" \n'
    });

    this.endControlSection();

    actionsControllers(this, "Blur Actions");

    actionsControllers(this, "Focus Actions", "focus_");

    actionsControllers(this, "Change Actions", "change_");

    // this.startControlSection('logic_section', {
    //   tab: TAB_CONTENT,
    //   label: 'Logic',
    // });
    //
    // this.addControl('logic_action', {
    //   type: CONTROLLER_SELECT2,
    //   label: 'Action',
    //   placeholder: 'action',
    //   default: '1',
    //   options: [
    //     {
    //       value: '1',
    //       label: 'Select sd  Content 1'
    //     },
    //     {
    //       value: '2',
    //       label: 'Select Content 2'
    //     },
    //   ]
    // });
    //
    // this.endControlSection();
    //
    // this.startControlSection("form_condition_display", {
    //   tab: TAB_CONTENT,
    //   label: "Field Condition"
    // });
    //
    // this.addControl("form_condition_display_on", {
    //   type: CONTROLLER_SELECT,
    //   label: "Display on",
    //   responsive: false,
    //   options: [
    //     {
    //       label: "All Conditions Met",
    //       value: "AND"
    //     },
    //     {
    //       label: "Any Condition Met",
    //       value: "OR"
    //     }
    //   ],
    //   default: "AND"
    // });
    //
    // const formConditionsRepeater = new Repeater();
    //
    // formConditionsRepeater.addControl("field_id", {
    //   responsive: false,
    //   dynamic: false,
    //   label: "Field ID"
    // });
    //
    // formConditionsRepeater.addControl("operator", {
    //   type: CONTROLLER_SELECT,
    //   responsive: false,
    //   default: "empty",
    //   options: CONDITIONS_OPTIONS
    // });
    //
    // formConditionsRepeater.addControl("value", {
    //   dynamic: false,
    //   responsive: false,
    //   label: "Value"
    // });
    //
    // this.addControl("form_conditions", {
    //   label: "Conditions",
    //   type: CONTROLLER_REPEATER,
    //   fields: formConditionsRepeater.getControls(),
    //   default: []
    // });
    //
    // this.endControlSection();

    this.startControlSection("label_style_section", {
      tab: TAB_STYLE,
      label: "Label"
    });

    this.addControl("label_style_spacing", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      default: {
        size: 2,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 60,
      min: 0,

    });

    this.addControl("label_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.addControl("label_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"]
    });

    this.addControl("label_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.addControl("label_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("label_position_top", {
      type: CONTROLLER_SLIDER,
      label: "Label Y Position",
      default: {
        unit: "px",
        size: null
      },
      conditions: {
        content_label_position_type: ["absolute"]
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: -100
      // rules: {
      //   "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
      //     "top: {{SIZE}}{{UNIT}};"
      // }
    });

    this.addControl("label_position_left", {
      type: CONTROLLER_SLIDER,
      label: "Label X Position",
      default: {
        unit: "px",
        size: null
      },
      conditions: {
        content_label_position_type: ["absolute"]
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: -100
      // rules: {
      //   "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
      //     "left: {{SIZE}}{{UNIT}};"
      // }
    });

    this.addControl("label_width", {
      type: CONTROLLER_SLIDER,
      label: "Label Width",
      default: {
        unit: "%",
        size: null
      },
      units: ["%", "px", "vw"],
      max: 100,
      min: 0
    });

    this.addControl("icon_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Icon Padding",
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("icon_color", {
      type: CONTROLLER_COLOR,
      label: "Icon color"
      // rules: {
      //   "{{ELEMENT}} .altrp-label-icon{{STATE}} path": "fill: {{COLOR}};"
      // }
    });

    this.addControl("icon_color_background", {
      type: CONTROLLER_COLOR,
      label: "Background Color"
      // rules: {
      //   "{{ELEMENT}} .altrp-label-icon{{STATE}} svg": "background: {{COLOR}};"
      // }
    });

    this.addControl("icon_size", {
      type: CONTROLLER_SLIDER,
      label: "Icon Size",
      units: ["px", "%", "vh", "vw"],
      max: 100,
      min: 0
    });

    this.addControl("cross_color", {
      type: CONTROLLER_COLOR,
      label: "Cross Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      conditions: {
        content_clearable: [true]
      }
    });

    this.addControl("cross_size", {
      type: CONTROLLER_SLIDER,
      label: "Cross Size",
      default: {
        unit: "px",
        size: null
      },
      conditions: {
        content_clearable: [true]
      },
      max: 50,
      min: 0
      // rules: {
      //   "{{ELEMENT}} .input-clear-btn{{STATE}}": "font-size: {{SIZE}}px;"
      // }
    });

    this.endControlSection();

    this.startControlSection("font_style_section", {
      tab: TAB_STYLE,
      label: "Font"
    });

    this.addControl("field_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("field_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      }
    });

    this.endControlSection();

    this.startControlSection("position_section", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("field_width", {
      type: CONTROLLER_SLIDER,
      label: "Width",
      max: 500,
      min: 0,
      units: ["px", "%", "vw"]
    });

    this.addControl("placeholder_and_value_alignment_position_section", {
      type: CONTROLLER_CHOOSE,
      label: "Alignment",
      options: [
        {
          icon: "left",
          value: "left"
        },
        {
          icon: "center",
          value: "center"
        },
        {
          icon: "right",
          value: "right"
        }
      ]
    });

    this.addControl("position_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"]
    });

    this.addControl("position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"]
    });

    this.addControl("position_z_index", {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0
    });

    this.addControl("position_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID"
    });

    this.addControl("position_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes"
    });

    this.endControlSection();

    this.startControlSection("placeholder_style_section", {
      tab: TAB_STYLE,
      label: "Placeholder"
    });

    this.addControl("placeholder_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color"
    });

    this.addControl("placeholder_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.endControlSection();

    this.startControlSection("required_style_section", {
      tab: TAB_STYLE,
      label: "Required"
    });

    this.addControl("required_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color"
    });

    this.addControl("required_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      default: {
        lineHeight: 1.5,
        spacing: 0,
        // size: 13,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      }
    });

    this.endControlSection();

    this.startControlSection("overlay_section", {
      tab: TAB_STYLE,
      label: "Overlay"
    });

    this.endControlSection();

    this.startControlSection("background_section", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("background_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color"
    });

    this.addControl("option_background_color", {
      type: CONTROLLER_COLOR,
      label: "Option Background Color",
      default: {
        color: "#FFF",
        colorPickedHex: "#FFF"
      }
    });

    this.addControl("option_focused_background_color", {
      type: CONTROLLER_COLOR,
      label: "Focused Option Background Color",
      default: {
        color: "#DEEBFF",
        colorPickedHex: "#DEEBFF"
      }
    });

    this.addControl("option_selected_background_color", {
      type: CONTROLLER_COLOR,
      label: "Selected Option Background Color",
      default: {
        color: "#2684FF",
        colorPickedHex: "#2684FF"
      }
    });

    this.addControl("background_section_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      default: {
        size: 1
      },
      max: 1,
      min: 0,
      step: 0.01
    });

    this.endControlSection();

    this.startControlSection("border_section", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("border_type", {
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
      ]
    });

    this.addControl("border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh"]
    });

    this.addControl("border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color"
    });

    this.addControl("box_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Box shadow",
      default: {
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        spread: 0,
        colorRGB: "rgb(0, 0, 0)",
        color: "rgb(0, 0, 0)",
        colorPickedHex: "#000000",
        type: " "
      }
    });

    this.addControl("border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: "Radius",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"]
    });

    this.endControlSection();

    this.startControlSection("transform_section", {
      tab: TAB_STYLE,
      label: "Transform"
    });

    this.endControlSection();

    this.startControlSection("radio_checkbox_styles", {
      tab: TAB_STYLE,
      label: "Radio Checkbox Styles",
      conditions: {
        "content_type!": "select"
      }
    });

    this.addControl("input_position", {
      label: "Position",
      type: CONTROLLER_SELECT,
      options: [
        {
          label: "Left",
          value: "row"
        },
        {
          label: "Top",
          value: "column"
        },
        {
          label: "Right",
          value: "row-reverse"
        },
        {
          label: "Bottom",
          value: "column-reverse"
        }
      ],
      default: "left"
    });

    this.endControlSection();

    this.startControlSection("mismatch_message_styles", {
      tab: TAB_STYLE,
      label: "Validation Error Message",
      conditions: { "mask_mismatch_message!": [""] }
    });

    this.addControl("mismatch_message_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: { unit: "px" },
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("mismatch_message_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: { unit: "px" },
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("mismatch_message_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color"
    });

    this.addControl("mismatch_message_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default InputSelect2;
