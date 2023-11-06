import BaseElement from "./BaseElement";
import FromIcon from "../../../svgs/input.svg";
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
  CONTROLLER_REPEATER,
  CONTROLLER_MEDIA,
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { actionsControllers } from "../../decorators/actions-controllers";

class InputTextCommon extends BaseElement {
  static getName() {
    return "input-text-common";
  }
  static getTitle() {
    return "Input Text";
  }
  static getIconComponent() {
    return FromIcon;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Form";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("content_section", {
      tab: TAB_CONTENT,
      label: "Content",
    });

    this.addControl("content_type", {
      type: CONTROLLER_SELECT,
      label: "Type",
      responsive: false,
      default: "text",
      options: [
        {
          value: "text",
          label: "Text",
        },
        {
          value: "password",
          label: "Password",
        },
        {
          value: "number",
          label: "Number",
        },
        {
          value: "email",
          label: "Email",
        },
      ],
      locked: true,
    });

    this.addControl("form_id", {
      responsive: false,
      locked: true,
      type: CONTROLLER_TEXT,
      label: "Form ID",
    });

    this.addControl("field_id", {
      responsive: false,
      type: CONTROLLER_TEXT,
      locked: true,
      label: "Field ID (Column Name)",
    });

    this.addControl("query_sync", {
      responsive: false,
      type: CONTROLLER_SWITCHER,
      locked: true,
      label: "Sync With Query String",
    });

    this.addControl("max_number", {
      type: CONTROLLER_NUMBER,
      responsive: false,
      locked: true,
      label: "Max number",
      conditions: {
        content_type: ["number"],
      },
    });

    this.addControl("min_number", {
      type: CONTROLLER_NUMBER,
      responsive: false,
      locked: true,
      label: "Min number",
      conditions: {
        content_type: ["number"],
      },
    });

    this.addControl("maxlength_input_text", {
      type: CONTROLLER_NUMBER,
      label: "maxlength",
      default: 0,
      conditions: {
        content_type: ["text", "password"],
      },
      locked: true,
    });

    this.addControl("invalid_email_message", {
      responsive: false,
      type: CONTROLLER_TEXT,
      label: "Invalid Email Message",
      conditions: { content_type: ["email"] },
    });

    const optionsRepeater = new Repeater();

    optionsRepeater.addControl("label", {
      type: CONTROLLER_TEXT,
      label: "Label",
    });

    optionsRepeater.addControl("value", {
      type: CONTROLLER_TEXT,
      label: "Value",
    });

    optionsRepeater.addControl("image", {
      type: CONTROLLER_MEDIA,
      label: "Image",
    });

    this.addControl("content_label", {
      type: CONTROLLER_TEXT,
      label: "Label",
      locked: true,
    });

    this.addControl("content_label_position_type", {
      type: CONTROLLER_SELECT,
      label: "Label Position",
      default: "top",
      options: [
        {
          value: "top",
          label: "Top",
        },
        {
          value: "bottom",
          label: "Bottom",
        },
        {
          value: "left",
          label: "Left",
        },
        {
          value: "right",
          label: "Right",
        },
        {
          value: "absolute",
          label: "Absolute",
        },
      ],
      locked: true,
    });

    this.addControl("label_icon", {
      type: CONTROLLER_MEDIA,
      label: "Label Icon",
      locked: true,
    });

    this.addControl("label_icon_position", {
      type: CONTROLLER_SELECT,
      label: "Icon Position",
      default: "default",
      options: [
        {
          value: "row",
          label: "Right",
        },
        {
          value: "row-reverse",
          label: "Left",
        },
        {
          value: "column",
          label: "Bottom",
        },
        {
          value: "column-reverse",
          label: "Top",
        },
      ],
      locked: true,
    });

    this.addControl("content_placeholder", {
      type: CONTROLLER_TEXT,
      label: "Placeholder",
      locked: true,
    });

    this.addControl("content_mask", {
      type: CONTROLLER_TEXT,
      label: "Mask",
      conditions: {
        content_type: ["text", "tel"],
      },
      locked: true,
    });

    this.addControl("read_only", {
      type: CONTROLLER_SWITCHER,
      label: "Read only",
      conditions: {
        content_type: "wysiwyg",
      },
      locked: true,
    });

    this.addControl("content_required", {
      type: CONTROLLER_SWITCHER,
      label: "Required",
      locked: true,
    });

    this.addControl("content_readonly", {
      type: CONTROLLER_SWITCHER,
      label: "Readonly",
      locked: true,
    });

    this.addControl("content_autocomplete", {
      type: CONTROLLER_SWITCHER,
      label: "Autocomplete",
      conditions: {
        content_type: ["text", "password", "email"],
      },
      locked: true,
    });

    this.addControl("content_timestamp", {
      type: CONTROLLER_SWITCHER,
      label: "Timestamp",
      default: false,
    });



    this.addControl("params_for_update", {
      type: CONTROLLER_TEXTAREA,
      label: "Params for Update Options",
      conditions: {
        "model_for_options!": "",
      },
      description:
        'Enter each param for Query in a separate line.<br/>To differentiate between label and value, separate them with a pipe char ("|").<br/>For example: title | Post.<br/>Or<br/>title | {\'{{title}}\'} for Take Value from This Form Field with Name "title" \n',
    });

    this.addControl("params_as_filters", {
      type: CONTROLLER_SWITCHER,
      label: "Use Params as Filters",
      default: false,
      conditions: {
        "params_for_update!": "",
      },
    });

    // this.addControl('is_select_all_allowed', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Allow Select All',
    //   default: false,
    //   conditions: {
    //     'content_type':
    //         [
    //           'select2',
    //         ],
    //     'select2_multiple': [true]
    //   },
    // });

    this.addControl("content_default_value", {
      type: CONTROLLER_TEXTAREA,
      label: "Default Value",
      responsive: false,
      locked: true,
    });

    this.addControl("content_calculation", {
      type: CONTROLLER_TEXTAREA,
      label: "Calculation",
      locked: true,
      description:
        "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10",
    });

    this.endControlSection();

    this.startControlSection("Behaviors", {
      label: "Behavior",
    });

    this.addControl("beh_enter", {
      type: CONTROLLER_SELECT,
      label: "`Press Enter` Behavior",
      options: [{
        label: 'Focus Next Input (default)',
        value: '',
      },{
        label: 'Dispatch `Change` actions',
        value: 'change',
      },
      ],
      responsive: false,
      locked: true,
    });

    this.addControl("beh_keypress", {
      type: CONTROLLER_SWITCHER,
      label: "`Dispatch `Change` actions after each keypress",

      responsive: false,
      locked: true,
    });

    this.addControl("beh_response_error_show", {
      type: CONTROLLER_SWITCHER,
      label: "Show Validation Error Response",

      responsive: false,
      locked: true,
    });

    this.addControl("beh_clear", {
      type: CONTROLLER_SWITCHER,
      label: "Clear Validation Error Response After Change",
      conditions: {
        beh_response_error_show: true,
      },
      responsive: false,
      default: true,
      locked: true,
    });


    this.addControl("mask_mismatch_message", {
      type: CONTROLLER_TEXT,
      label: "Validation Error Message Custom Text",
      conditions: {
        beh_response_error_show: true,
      },
      responsive: false,
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("icons", {
      label: "Input Icons",
    });

    this.addControl("left_icon", {
      type: CONTROLLER_MEDIA,
      label: "Left Icon",
      locked: true,
    });

    this.addControl("password_show_left_icon", {
      type: CONTROLLER_MEDIA,
      conditions: {
        content_type: "password",
      },
      label: "Password Show Left Icon",
      locked: true,
    });

    this.addControl("right_icon", {
      type: CONTROLLER_MEDIA,
      label: "Right Icon",
      locked: true,
    });

    this.addControl("password_show_right_icon", {
      type: CONTROLLER_MEDIA,
      conditions: {
        content_type: "password",
      },
      label: "Password Show Right Icon",
      locked: true,
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

    this.startControlSection("position_section", {
      tab: TAB_STYLE,
      label: "Input Position",
    });

    this.addControl("field_width", {
      type: CONTROLLER_SLIDER,
      stateless: true,
      label: "Width",
      max: 500,
      min: 0,
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("field_height", {
      type: CONTROLLER_SLIDER,
      stateless: true,
      label: "Height",
      max: 100,
      min: 0,
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("placeholder_and_value_alignment_position_section", {
      type: CONTROLLER_CHOOSE,
      label: "Alignment",
      stateless: true,
      options: [
        {
          icon: "left",
          value: "left",
        },
        {
          icon: "center",
          value: "center",
        },
        {
          icon: "right",
          value: "right",
        },
      ],
    });

    this.addControl("position_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: "px",
      },
      stateless: true,
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      stateless: true,
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("position_z_index-wrapper", {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
    });

    this.addControl("position_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID",
      locked: true,
    });

    this.addControl("position_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes",
      locked: true,
    });

    this.addControl("background_section_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      max: 1,
      min: 0,
      step: 0.01,
    });

    this.endControlSection();

    this.startControlSection("background_section", {
      tab: TAB_STYLE,
      label: "Background",
    });

    this.addControl("background_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
    });

    this.endControlSection();

    this.startControlSection("border_section", {
      tab: TAB_STYLE,
      label: "Border",
    });

    this.addControl("border_type", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "solid",
          label: "Solid",
        },
        {
          value: "double",
          label: "Double",
        },
        {
          value: "dotted",
          label: "Dotted",
        },
        {
          value: "dashed",
          label: "Dashed",
        },
        {
          value: "groove",
          label: "Groove",
        },
      ],
      // stateless: true,
    });

    this.addControl("border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      // stateless:true,
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("disable_box_shadow", {
      type: CONTROLLER_SWITCHER,
      label: "Disable box-shadow",
    });

    this.addControl("border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });

    this.addControl("border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Radius",
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("box_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Box Shadow",
      default: {
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        spread: 0,
        colorRGB: "rgb(0, 0, 0)",
        color: "rgb(0, 0, 0)",
        colorPickedHex: "#000000",
        type: " ",
      },
    });

    this.addControl('input_style_border_gradient_custom', {
      type: CONTROLLER_SWITCHER,
      label: "Border Gradient",
    });

    this.addControl("input_style_gradient_text", {
      type: CONTROLLER_TEXTAREA,
      label: "Gradient",
      description: "Example:<br>linear-gradient(90deg,#0068e1,#a161ee) <a style='margin-top: 10px; color: #007bff; display: block' href='https://www.colorzilla.com/gradient-editor/' target='_blank'>--> CSS Gradient Generator</a>"
    });

    this.endControlSection();

    this.startControlSection("label_style_section", {
      tab: TAB_STYLE,
      label: "Label",
    });

    this.addControl("label_width", {
      type: CONTROLLER_SLIDER,
      label: "Label Width",
      default: {
        unit: "px",
        size: null,
      },
      units: ["px", "%", "vh", "vw"],
      max: 100,
      min: 0,
    });

    this.addControl("label_style_spacing", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      default: {
        size: 2,
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
      max: 60,
      min: 0,
      locked: true,
    });

    this.addControl("label_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("label_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
    });

    this.addControl("label_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("label_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("label_position_top", {
      type: CONTROLLER_SLIDER,
      label: "Label Y Position",
      default: {
        unit: "px",
        size: null,
      },
      conditions: {
        content_label_position_type: ["absolute"],
      },
      units: ["px", "%", "vh", "vw"],
      max: 100,
      min: -100,
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
        size: null,
      },
      conditions: {
        content_label_position_type: ["absolute"],
      },
      units: ["px", "%", "vh", "vw"],
      max: 100,
      min: -100,
      // rules: {
      //   "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
      //     "left: {{SIZE}}{{UNIT}};"
      // }
    });

    this.addControl("icon_size", {
      type: CONTROLLER_SLIDER,
      label: "Icon Size",
      units: ["px", "%", "vh", "vw"],
      max: 100,
      min: 0,
    });

    this.addControl("icon_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Icon Padding",
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("icon_color", {
      type: CONTROLLER_COLOR,
      label: "Icon color",
      // rules: {
      //   "{{ELEMENT}} .altrp-label-icon{{STATE}} path": "fill: {{COLOR}};"
      // }
    });

    this.addControl("icon_color_background", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      // rules: {
      //   "{{ELEMENT}} .altrp-label-icon{{STATE}} svg": "background: {{COLOR}};"
      // }
    });

    this.endControlSection();

    this.startControlSection("font_style_section", {
      tab: TAB_STYLE,
      label: "Font",
    });

    this.addControl("field_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("field_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
    });

    this.endControlSection();

    this.startControlSection("placeholder_style_section", {
      tab: TAB_STYLE,
      label: "Placeholder",
    });

    this.addControl("placeholder_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("placeholder_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
    });

    this.endControlSection();

    this.startControlSection("required_style_section", {
      tab: TAB_STYLE,
      label: "Required",
    });

    this.addControl("required_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      // stateless: true,
    });

    this.addControl("required_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color",
      // stateless: true,
    });

    this.endControlSection();

    this.startControlSection("overlay_section", {
      tab: TAB_STYLE,
      label: "Overlay",
    });

    this.endControlSection();

    this.startControlSection("transform_section", {
      tab: TAB_STYLE,
      label: "Transform",
    });

    this.endControlSection();

    this.startControlSection("mismatch_message_styles", {
      tab: TAB_STYLE,
      label: "Validation Error Message",

    });

    this.addControl("mismatch_message_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("mismatch_message_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      units: ["px", "%", "vh", "vw"],
    });

    this.addControl("mismatch_message_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
    });

    this.addControl("mismatch_message_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.endControlSection();

    this.startControlSection("input_icons", {
      tab: TAB_STYLE,
      label: "Input Icons Settings",
    });

    this.addControl("input_icons_size", {
      type: CONTROLLER_SLIDER,
      label: "Size",
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
      stateless: true,
    });

    this.addControl("input_icons_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
      stateless: true,
    });

    this.addControl("input_icons_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Radius",
      default: {
        unit: "px",
      },
      units: ["px", "%", "vh", "vw"],
      stateless: true,
    });

    this.addControl("input_icons_fill", {
      type: CONTROLLER_COLOR,
      label: "Fill",
    });

    this.addControl("input_icons_stroke", {
      type: CONTROLLER_COLOR,
      label: "Stroke",
    });

    this.addControl("input_icons_background", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default InputTextCommon;
