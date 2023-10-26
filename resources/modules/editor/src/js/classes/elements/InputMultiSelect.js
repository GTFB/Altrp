import BaseElement from "./BaseElement";
import FromIcon from "../../../svgs/select_multi.svg";
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
  CONTROLLER_MEDIA, CONTROLLER_GRADIENT
} from "../modules/ControllersManager";
import { actionsControllers } from "../../decorators/actions-controllers";

class InputMultiSelect extends BaseElement {
  static getName() {
    return "input-multi-select";
  }
  static getTitle() {
    return "Multi Select";
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
      label: "Content"
    });

    this.addControl("form_id", {
      type: CONTROLLER_TEXT,
      locked: true,
      label: "Form ID"
    });

    this.addControl("field_id", {
      type: CONTROLLER_TEXT,
      locked: true,
      label: "Field ID (Column Name)"
    });

    this.addControl("query_sync", {
      responsive: false,
      type: CONTROLLER_SWITCHER,
      locked: true,
      label: "Sync With Query String",
    });

    this.addControl("content_label", {
      type: CONTROLLER_TEXT,
      label: "Label",
      locked: true,
    });

    this.addControl("content_label_position_type", {
      type: CONTROLLER_SELECT,
      label: "Label Position",
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
      label: "Search Placeholder",
      responsive: false,
      locked: true,
    });

    this.addControl("no_results_text", {
      type: CONTROLLER_TEXT,
      label: "no results text",
      responsive: false,
      locked: true,
    });

    this.addControl("reset__input", {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: "reset input",
      locked: true,
    });

    this.addControl("open_popover_on_key_down", {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: "Open popover on key down",
      locked: true,
    });

    this.addControl("minimal", {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: "Minimal",
      locked: true,
    });

    this.addControl("content_required", {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: "Required",
      locked: true,
    });

    this.addControl("content_readonly", {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: "Readonly",
      locked: true,
    });

    this.addControl("content_options_nullable", {
      type: CONTROLLER_SWITCHER,
      label: "Select Nullable",
      responsive: false,
      locked: true,
    });

    this.addControl("nulled_option_title", {
      type: CONTROLLER_TEXT,
      label: "Nulled Option Label",
      responsive: false,
      conditions:{
        content_options_nullable: true,
      },
    });

    this.addControl("options_sorting", {
      type: CONTROLLER_SELECT,
      label: "Options Sorting",
      responsive: false,
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
      ],
      locked: true,
    });

    this.addControl("sort_default", {
      type: CONTROLLER_SWITCHER,
      label: "Sort Default",
      locked: true,
    });

    // this.addControl("model_for_options", {
    //   type: CONTROLLER_SELECT2,
    //   label: "Choose Datasource for Select Options",
    //   nullable: true,
    //   isClearable: true,
    //   options_resource: "/admin/ajax/models_options?with_names=1&not_plural=1&with_sql_queries=1",
    //   locked: true,
    // });

    this.addControl("params_for_update", {
      type: CONTROLLER_TEXTAREA,
      label: "Params for Update Options",
      conditions: {
        "model_for_options!": ""
      },
      description: 'Enter each param for Query in a separate line.<br/>To differentiate between label and value, separate them with a pipe char ("|").<br/>For example: title | Post.<br/>Or<br/>title | {\'{{title}}\'} for Take Value from This Form Field with Name "title" \n',
      locked: true,
    });

    this.addControl("params_as_filters", {
      type: CONTROLLER_SWITCHER,
      label: "Use Params as Filters",
      conditions: {
        "params_for_update!": ""
      },
      locked: true,
    });

    this.addControl("content_options", {
      type: CONTROLLER_TEXTAREA,
      label: "Or Type Select Options",
      description: 'Enter each option in a separate line. To differentiate between label and value, separate them with a pipe char ("|"). For example: f_name | First Name',
      locked: true,
    });

    this.addControl("content_default_value", {
      type: CONTROLLER_TEXTAREA,
      label: "Default Value",
      description: 'Enter each option in a separate line. Separate them with a pipe char ("|"). For example:  value one | value two',
      locked: true,
    });

    this.addControl("content_calculation", {
      type: CONTROLLER_TEXTAREA,
      label: "Calculation",
      description: "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('button_content', {
      label: 'Input',
    })

    this.addControl('alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      options: [
        {
          icon: 'left',
          value: 'flex-start',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'flex-end',
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
    });

    this.endControlSection();

    actionsControllers(this, "Click Actions", "click_");

    actionsControllers(this, "Change Actions", "change_");

    actionsControllers(this, "On Search Actions", "s_");

    this.startControlSection("create_section", {
      label: "Creating New Items"
    });

    this.addControl("create", {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: "Allow Creating New Items",
      locked: true,
    });

    this.addControl("create_text", {
      responsive: false,
      type: CONTROLLER_TEXTAREA,
      conditions: {
        create: true,
      },
      label: "Create Text",
      description:'Create {{__query__}}',
      locked: true,
    });

    this.addControl("create_url", {
      responsive: false,
      conditions: {
        create: true,
      },
      label: "POST URL",
      locked: true,
    });

    this.addControl("create_params", {
      responsive: false,
      type: CONTROLLER_TEXTAREA,
      conditions: {
        create: true,
      },
      label: "POST Params",
      description:'Enter each param for Query in a separate line.<br/>To differentiate between label and value, separate them with a pipe char ("|").<br/>For example: title | Post.<br/>Or<br/>title | {\'{{title}}\'} for Take Value from This Form Field with Name "title" \n',
      locked: true,
    });

    this.addControl('label_path', {
      label: 'Label Alias',
      responsive: false,
      locked: true,
    })

    this.addControl('value_path', {
      label: 'Value Alias',
      responsive: false,
      locked: true,
    })

    this.endControlSection()

    this.startControlSection("label_style_section", {
      tab: TAB_STYLE,
      label: "Label"
    });

    this.addControl("label_width", {
      type: CONTROLLER_SLIDER,
      label: "Label Width",

      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0
    });

    this.addControl("label_style_spacing", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",

      units: ['px', '%', 'vh', 'vw'],
      max: 60,
      min: 0,
      locked: true,
    });

    this.addControl("label_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",

      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("label_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",

    });

    this.addControl("label_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",

    });

    this.addControl("label_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("label_position_top", {
      type: CONTROLLER_SLIDER,
      label: "Label Y Position",

      conditions: {
        content_label_position_type: ["absolute"]
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: -100,
      locked: true,
      // rules: {
      //   "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
      //     "top: {{SIZE}}{{UNIT}};"
      // }
    });

    this.addControl("label_position_left", {
      type: CONTROLLER_SLIDER,
      label: "Label X Position",
      conditions: {
        content_label_position_type: ["absolute"]
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: -100
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

    this.addControl("cross_color", {
      type: CONTROLLER_COLOR,
      label: "Cross Color",
      conditions: {
        content_clearable: [true]
      }
    });

    this.addControl("cross_size", {
      type: CONTROLLER_SLIDER,
      label: "Cross Size",
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

    this.startControlSection("position_section", {
      tab: TAB_STYLE,
      label: "Input Position"
    });

    this.addControl("field_width", {
      type: CONTROLLER_SLIDER,
      stateless: true,
      label: "Width",
      max: 500,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("field_height-m", {
      type: CONTROLLER_SLIDER,
      stateless: true,
      label: "Height",
      max: 500,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("position_margin", {
      stateless: true,
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("position_padding", {
      stateless: true,
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      units: ["px", "%", "vh", "vw"]
    });

    this.endControlSection();

    this.startControlSection("tags_styles", {
      tab: TAB_STYLE,
      label: "Tags Position"
    });

    this.addControl("tags_ma", {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: "Margin",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("tags_pa", {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: "Padding",
      units: ['px', '%', 'vh', 'vw'],
    });


    this.addControl("delete_s", {
      type: CONTROLLER_SLIDER,
      stateless: true,
      label: "Tag Delete Size",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("delete_ma", {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: "Tag Delete Margin",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.endControlSection();

    this.endControlSection();

    this.startControlSection("clear_styles", {
      tab: TAB_STYLE,
      label: "Clear Styles"
    });

    this.addControl('clear_align', {
      type: CONTROLLER_CHOOSE,
      stateless: true,
      label: 'Vertical Alignment',
      options: [
        {
          icon: 'block_top',
          value: 'flex-start',
        },
        {
          icon: 'block_horiz',
          value: 'center',
        },
        {
          icon: 'block_bottom',
          value: 'flex-end',
        },
      ],
    });

    this.addControl("clear_s", {
      type: CONTROLLER_SLIDER,
      stateless: true,
      label: "Size",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("clear_ma", {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: "Margin",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("clear_pa", {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: "Padding",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("clear_color", {
      type: CONTROLLER_COLOR,
      stateless: true,
      label: "Color",
      units: ["px", "%", "vh"]
    });

    this.addControl("clear_bg", {
      type: CONTROLLER_COLOR,
      stateless: true,
      label: "Background Color",
      units: ["px", "%", "vh"]
    });

    this.startControlSection("font_style_section", {
      tab: TAB_STYLE,
      label: "Font"
    });

    this.addControl("field_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic"
    });

    this.addControl("tags_t", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Tags Typographic"
    });

    this.addControl("field_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
    });

    this.addControl("tags_color", {
      type: CONTROLLER_COLOR,
      label: "Tags Color",
    });

    this.addControl("tags_delete_color", {
      type: CONTROLLER_COLOR,
      label: "Tags Delete Icon Color",
    });

    this.addControl("items_font_color", {
      type: CONTROLLER_COLOR,
      label: "Items Font Color",
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
    });

    this.endControlSection();

    this.startControlSection("overlay_section", {
      tab: TAB_STYLE,
      label: "Overlay"
    });

    this.endControlSection();

    this.startControlSection("background_section", {
      tab: TAB_STYLE,
      label: "Backgrounds"
    });

    this.addControl("input_bg", {
      type: CONTROLLER_COLOR,
      label: "Input Background Color"
    });


    this.addControl("menu_bg", {
      type: CONTROLLER_COLOR,
      label: "Menu Background Color"
    });

    this.addControl("tags_bg", {
      type: CONTROLLER_COLOR,
      label: "Tags Background Color"
    });

    this.addControl("background_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Menu Items Background Color"
    });

    this.addControl("background_section_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
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
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color"
    });

    this.addControl("box_shadow", {
      type: CONTROLLER_SHADOW,
      label: "Box shadow",
    });

    this.addControl("border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Radius",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('multiselect_style_border_gradient_custom', {
      type: CONTROLLER_SWITCHER,
      label: "Border Gradient",
    });

    this.addControl("multiselect_style_gradient_text", {
      type: CONTROLLER_TEXTAREA,
      label: "Gradient",
      default: '',
      description: "Example:<br>linear-gradient(90deg,#0068e1,#a161ee) <a style='margin-top: 10px; color: #007bff; display: block' href='https://www.colorzilla.com/gradient-editor/' target='_blank'>--> CSS Gradient Generator</a>"
    });

    this.endControlSection();

    this.startControlSection("transform_section", {
      tab: TAB_STYLE,
      label: "Transform"
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
      units: ["px", "%", "vh", "vw"]
    });

    this.addControl("mismatch_message_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
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

    this.startControlSection("add_icon", {
      tab: TAB_STYLE,
      label: "Add Icon"
    });

    this.addControl("a_size", {
      type:   CONTROLLER_SLIDER,
      units: ['px', '%', 'vh', 'vw'],
      stateless: true,
      label: "Icon Size"
    });

    this.addControl("a_margin", {
      type:   CONTROLLER_DIMENSIONS,
      units: ['px', '%', 'vh', 'vw'],
      stateless: true,
      label: "Icon Margin"
    });

    this.addControl("a_color", {
      type:   CONTROLLER_COLOR,
      label: "Icon Color"
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default InputMultiSelect;
