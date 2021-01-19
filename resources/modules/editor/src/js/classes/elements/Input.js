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
  CONTROLLER_REPEATER,
  CONTROLLER_MEDIA
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { CONDITIONS_OPTIONS } from "../../../../../front-app/src/js/helpers";
import { actionsControllers } from "../../decorators/actions-controllers";

class Input extends BaseElement {
  static getName() {
    return "input";
  }
  static getTitle() {
    return "Form";
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

    this.addControl("content_shortcode", {
      type: CONTROLLER_TEXT,
      label: "Shortcode"
    });

    this.addControl("content_type", {
      type: CONTROLLER_SELECT,
      label: "Type",
      default: "text",
      options: [
        {
          value: "text",
          label: "Text"
        },
        {
          value: "password",
          label: "Password"
        },
        {
          value: "number",
          label: "Number"
        },
        {
          value: "date",
          label: "Date"
        },
        {
          value: "email",
          label: "Email"
        },
        {
          value: "tel",
          label: "Tel"
        },
        {
          value: "file",
          label: "File"
        },
        {
          value: "select",
          label: "Select"
        },
        {
          value: "select2",
          label: "Select2"
        },
        {
          value: "image_select",
          label: "Image Select"
        },
        {
          value: "hidden",
          label: "Hidden"
        },
        {
          value: "radio",
          label: "Radio"
        },
        {
          value: "checkbox",
          label: "Checkbox"
        },
        {
          value: "textarea",
          label: "Textarea"
        },
        {
          value: "wysiwyg",
          label: "wysiwyg"
        }
      ]
    });

    this.addControl("textarea_resize", {
      type: CONTROLLER_SELECT,
      label: "Resize",
      options: [
        {
          label: "both",
          value: "both"
        },
        {
          label: "none",
          value: "none"
        },
        {
          label: "horizontal",
          value: "horizontal"
        },
        {
          label: "vertical",
          value: "vertical"
        }
      ],
      conditions: { content_type: ["textarea"] },
      rules: {
        "{{ELEMENT}} .altrp-field": "resize: {{VALUE}};"
      }
    });

    this.addControl("justify_options", {
      type: CONTROLLER_SELECT,
      label: "Options Alignment",
      options: [
        {
          label: "left",
          value: "flex-start"
        },
        {
          label: "center",
          value: "center"
        },
        {
          label: "right",
          value: "flex-end"
        },
        {
          label: "space-between",
          value: "space-between"
        },
        {
          label: "space-around",
          value: "space-around"
        },
        {
          label: "space-evenly",
          value: "space-evenly"
        }
      ],
      conditions: {
        content_type: ["image_select"]
      },
      rules: {
        "{{ELEMENT}} .altrp-image-select": "justify-content: {{VALUE}};"
      }
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

    this.addControl("image_select_options", {
      label: "Options",
      type: CONTROLLER_REPEATER,
      fields: optionsRepeater.getControls(),
      conditions: {
        content_type: ["image_select"]
      },
      default: []
    });

    this.addControl("image_select_item_width", {
      type: CONTROLLER_SLIDER,
      label: "Item Width",
      max: 500,
      min: 0,
      units: ["px", "%", "vw"],
      default: { unit: "px" },
      conditions: {
        content_type: ["image_select"]
      },
      rules: {
        "{{ELEMENT}} .altrp-image-select>.altrp-field{{STATE}}":
          "width: {{SIZE}}{{UNIT}};"
      }
    });

    this.addControl("image_select_item_height", {
      type: CONTROLLER_SLIDER,
      label: "Item Height",
      max: 500,
      min: 0,
      units: ["px", "%", "vh"],
      default: { unit: "px" },
      conditions: {
        'content_type': ['image_select']
      },
      rules: {
        "{{ELEMENT}} .altrp-image-select>.altrp-field{{STATE}}": 'height: {{SIZE}}{{UNIT}};'
      }
    });

    this.addControl('image_select_image_fit', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "unset",
          label: "unset"
        },
        {
          value: "fill",
          label: "fill"
        },
        {
          value: "cover",
          label: "cover"
        },
        {
          value: "contain",
          label: "contain"
        },
        {
          value: "scale-down",
          label: "scale-down"
        },
        {
          value: "none",
          label: "none"
        }
      ],
      label: "Background Size",
      conditions: {
        content_type: ["image_select"]
      },
      rules: {
        "{{ELEMENT}} .altrp-image-select img{{STATE}}": "object-fit: {{VALUE}};"
      }
    });

    this.addControl("image_select_image_position", {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "top left",
          label: "top left"
        },
        {
          value: "top",
          label: "top"
        },
        {
          value: "top right",
          label: "top right"
        },
        {
          value: "right",
          label: "right"
        },
        {
          value: "bottom right",
          label: "bottom right"
        },
        {
          value: "bottom",
          label: "bottom"
        },
        {
          value: "bottom left",
          label: "bottom left"
        },
        {
          value: "left",
          label: "left"
        },
        {
          value: "center",
          label: "center"
        }
      ],
      label: "Background Position",
      rules: {
        "{{ELEMENT}} .altrp-image-select img{{STATE}}":
          "object-position: {{VALUE}};"
      }
    });

    this.addControl('content_accept', {
      type: CONTROLLER_TEXT,
      label: "Accept",
      conditions: {
        content_type: ["file"]
      }
    });

    this.addControl("content_label", {
      type: CONTROLLER_TEXT,
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
          value: "absolute",
          label: "Absolute"
        }
      ]
    });

    this.addControl('label_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Choose Icon',
    });

    this.addControl('label_icon_position', {
      type: CONTROLLER_SELECT,
      label: 'Icon Position',
      default: 'default',
      options: [
        {
          value: 'row',
          label: 'Right'
        },
        {
          value: 'row-reverse',
          label: 'Left'
        },
        {
          value: 'column',
          label: 'Bottom'
        },
        {
          value: 'column-reverse',
          label: 'Top'
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-field-label-container{{STATE}}': 'flex-direction: {{VALUE}};'
      },
    });

    this.addControl('content_placeholder', {
      type: CONTROLLER_TEXT,
      label: "Placeholder",
      default: "Placeholder"
    });

    this.addControl("content_mask", {
      type: CONTROLLER_TEXT,
      label: "Mask",
      conditions: {
        content_type: ["text", "tel"]
      }
    });

    this.addControl("mask_mismatch_message", {
      type: CONTROLLER_TEXT,
      label: "Mask Mismatch Message",
      conditions: {
        content_type: ["text", "tel"],
        "content_mask!": [""]
      }
    });

    this.addControl("read_only", {
      type: CONTROLLER_SWITCHER,
      label: "Read only",
      conditions: {
        content_type: "wysiwyg"
      }
    });

    this.addControl("content_required", {
      type: CONTROLLER_SWITCHER,
      label: "Required"
    });

    this.addControl("content_readonly", {
      type: CONTROLLER_SWITCHER,
      label: "Readonly"
    });

    this.addControl("content_autocomplete", {
      type: CONTROLLER_SWITCHER,
      label: "Autocomplete",
      conditions: {
        content_type: ["text", "password", "email"]
      }
    });

    this.addControl("content_timestamp", {
      type: CONTROLLER_SWITCHER,
      label: "Timestamp",
      default: false
    });

    this.addControl("content_clearable", {
      type: CONTROLLER_SWITCHER,
      label: "Clearable",
      default: false,
      conditions: {
        content_type: ["select2"]
      }
    });

    this.addControl("content_options_nullable", {
      type: CONTROLLER_SWITCHER,
      label: "Select Nullable",
      default: false,
      conditions: {
        content_type: ["select", "select2"]
      }
    });
    this.addControl("nulled_option_title", {
      type: CONTROLLER_TEXT,
      label: "Nulled Option Label",
      conditions: {
        content_type: ["select", "select2", "radio", "checkbox"]
      }
    });

    this.addControl("options_sorting", {
      type: CONTROLLER_SELECT,
      label: "Options Sorting",
      default: "",
      conditions: {
        content_type: ["select", "select2", "radio", "checkbox"]
      },
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
      conditions: {
        content_type: ["select", "select2", "radio", "checkbox"]
      },
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
      default: false,
      conditions: {
        content_type: ["select2", "file", "image_select"]
      }
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

    this.addControl("content_options", {
      type: CONTROLLER_TEXTAREA,
      label: "Or Type Select Options",
      conditions: {
        content_type: ["select", "select2", "radio", "checkbox"]
      },
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
      conditions: {
        "content_type!": ["file"]
      },
      description:
        "E.g {{altrpforms.form_id.field_id}}*{{altrpforms.form_id.field_id_2}}+10"
    });

    this.endControlSection();

    this.startControlSection("create_options", {
      tab: TAB_CONTENT,
      label: "Create Options Settings",
      conditions: {
        content_type: ["select2"]
      }
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

    actionsControllers(this);

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

    this.startControlSection("form_condition_display", {
      tab: TAB_CONTENT,
      label: "Field Condition"
    });

    this.addControl("form_condition_display_on", {
      type: CONTROLLER_SELECT,
      label: "Display on",
      responsive: false,
      options: [
        {
          label: "All Conditions Met",
          value: "AND"
        },
        {
          label: "Any Condition Met",
          value: "OR"
        }
      ],
      default: "AND"
    });

    const formConditionsRepeater = new Repeater();

    formConditionsRepeater.addControl("field_id", {
      responsive: false,
      dynamic: false,
      label: "Field ID"
    });

    formConditionsRepeater.addControl("operator", {
      type: CONTROLLER_SELECT,
      responsive: false,
      default: "empty",
      options: CONDITIONS_OPTIONS
    });

    formConditionsRepeater.addControl("value", {
      dynamic: false,
      responsive: false,
      label: "Value"
    });

    this.addControl("form_conditions", {
      label: "Conditions",
      type: CONTROLLER_REPEATER,
      fields: formConditionsRepeater.getControls(),
      default: []
    });

    this.endControlSection();

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
      rules: {}
    });

    this.addControl("label_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
          "background-color: {{COLOR}};"
      }
    });

    this.addControl("label_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        // top: 2,
        // right: 2,
        // bottom: 2,
        // left: 2,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-field-label-container{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("label_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field-label{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("label_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      // default:{
      //   lineHeight: 1.5,
      //   spacing: 0,
      //   size: 16,
      //   weight: "normal",
      //   family: "Open Sans",
      //   decoration: ""
      // },
      rules: {
        "{{ELEMENT}} .altrp-field-label{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
      }
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
      min: -100,
      rules: {
        "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
          "top: {{SIZE}}{{UNIT}};"
      }
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
      min: -100,
      rules: {
        "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
          "left: {{SIZE}}{{UNIT}};"
      }
    });

    this.addControl("label_width", {
      type: CONTROLLER_SLIDER,
      label: "Label Width",
      default: {
        unit: "%",
        size: null
      },
      units: ["%"],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-field-label-container{{STATE}}":
          "width: {{SIZE}}%; flex-shrink: 0;"
      }
    });

    this.addControl('icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Icon Padding',
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-label-icon{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Icon color',
      rules: {
        '{{ELEMENT}} .altrp-label-icon path{{STATE}}': 'fill: {{COLOR}};',
      },
    });

    this.addControl('icon_color_background', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
      rules: {
        '{{ELEMENT}} .altrp-label-icon svg{{STATE}}': 'background: {{COLOR}};',
      },
    }
    );

    this.addControl('icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-label-icon{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-label-icon svg{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-label-icon img{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl('cross_color', {
      type: CONTROLLER_COLOR,
      label: "Cross Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      conditions: {
        content_clearable: [true]
      },
      rules: {
        "{{ELEMENT}} .input-clear-btn{{STATE}}": "color: {{COLOR}};"
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
      min: 0,
      rules: {
        "{{ELEMENT}} .input-clear-btn{{STATE}}": "font-size: {{SIZE}}px;"
      }
    });

    this.endControlSection();

    this.startControlSection("font_style_section", {
      tab: TAB_STYLE,
      label: "Font"
    });

    this.addControl("field_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      // default: {
      //   lineHeight: 1.5,
      //   spacing: 0,
      //   size: 16,
      //   weight: "normal",
      //   family: "Open Sans",
      //   decoration: ""
      // },
      rules: {
        "{{ELEMENT}} .altrp-field-select2__single-value{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px;",
          "font-weight: {{WEIGHT}};",
          "text-transform: {{TRANSFORM}};",
          "font-style: {{STYLE}};",
          "text-decoration: {{DECORATION}};"
        ],
        "{{ELEMENT}} .altrp-field{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px;",
          "font-weight: {{WEIGHT}};",
          "text-transform: {{TRANSFORM}};",
          "font-style: {{STYLE}};",
          "text-decoration: {{DECORATION}};"
        ],
        "{{ELEMENT}} .altrp-image-select__label{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px;",
          "font-weight: {{WEIGHT}};",
          "text-transform: {{TRANSFORM}};",
          "font-style: {{STYLE}};",
          "text-decoration: {{DECORATION}};"
        ]
      }
    });

    this.addControl("field_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field-select2__single-value{{STATE}}":
          "color : {{COLOR}};",
        "{{ELEMENT}} .altrp-field{{STATE}}": "color : {{COLOR}};",
        "{{ELEMENT}} .altrp-image-select__label{{STATE}}": "color : {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection("position_section", {
      tab: TAB_STYLE,
      label: "Position"
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
      ],
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": "text-align: {{VALUE}};",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "text-align: {{VALUE}};",
        "{{ELEMENT}} .altrp-image-select__label{{STATE}}":
          "text-align: {{VALUE}};"
      }
    });

    this.addControl("position_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-field-container{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
        '{{ELEMENT}} .altrp-image-select{{STATE}}': [
          'margin-right: -{{RIGHT}}{{UNIT}};',
          'margin-left: -{{LEFT}}{{UNIT}};'
        ]
      }
    });

    this.addControl("position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: 'px'
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ],
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("position_z_index", {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": "z-index: {{VALUE}}",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "z-index: {{VALUE}}"
      }
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
      label: "Placeholder",
      conditions: {
        "content_type!": ["image_select", "hidden", "radio", "checkbox"]
      }
    });

    this.addControl("placeholder_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color",
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field::placeholder{{STATE}}": "color: {{COLOR}};",
        "{{ELEMENT}} .altrp-field-select2__placeholder{{STATE}}":
          "color: {{COLOR}};"
      }
    });

    this.addControl("placeholder_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      rules: {
        "{{ELEMENT}} .altrp-field::placeholder{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ],
        "{{ELEMENT}} .altrp-field-select2__placeholder{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection("required_style_section", {
      tab: TAB_STYLE,
      label: "Required"
    });

    this.addControl("required_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "font color",
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field-label--required::after{{STATE}}":
          "color: {{COLOR}};"
      }
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
      },
      rules: {
        "{{ELEMENT}} .altrp-field-label--required::after{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
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
      label: "Background Color",
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": "background-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "background-color: {{COLOR}};"
      }
    });

    this.addControl("option_background_color", {
      type: CONTROLLER_COLOR,
      label: "Option Background Color",
      default: {
        color: "#FFF",
        colorPickedHex: "#FFF"
      },
      conditions: { content_type: ["select2"] },
      rules: {
        ".{{ID}}.altrp-field-select2__option{{STATE}}":
          "background-color: {{COLOR}};"
      }
    });

    this.addControl("option_focused_background_color", {
      type: CONTROLLER_COLOR,
      label: "Focused Option Background Color",
      default: {
        color: "#DEEBFF",
        colorPickedHex: "#DEEBFF"
      },
      conditions: { content_type: ["select2"] },
      rules: {
        ".{{ID}}.altrp-field-select2__option.altrp-field-select2__option--is-focused{{STATE}}":
          "background-color: {{COLOR}};"
      }
    });

    this.addControl("option_selected_background_color", {
      type: CONTROLLER_COLOR,
      label: "Selected Option Background Color",
      default: {
        color: "#2684FF",
        colorPickedHex: "#2684FF"
      },
      conditions: { content_type: ["select2"] },
      rules: {
        ".{{ID}}.altrp-field-select2__option.altrp-field-select2__option--is-selected{{STATE}}":
          "background-color: {{COLOR}};"
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
      step: 0.01,
      rules: {
        "{{ELEMENT}}": "opacity: {{SIZE}}"
      }
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
      ],
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": "border-style: {{VALUE}};",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh"],
      // default: {
      //   top: 2,
      //   right: 2,
      //   bottom: 2,
      //   left: 2
      // },
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      // default: {
      //   color: "rgb(142,148,170)",
      //   colorPickedHex: "#8E94AA",
      // },
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": "border-color: {{COLOR}};",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "border-color: {{COLOR}};"
      }
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
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}":
          "box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};",
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}":
          "box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};"
      }
    });

    this.addControl("border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: "Radius",
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-field{{STATE}}": [
          "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
        ],
        "{{ELEMENT}} .altrp-field-select2__control{{STATE}}": [
          "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection("transform_section", {
      tab: TAB_STYLE,
      label: "Transform"
    });

    this.endControlSection();

    this.startControlSection("radio-_checkbox_styles", {
      tab: TAB_STYLE,
      label: "Radio Checkbox Styles"
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
      default: "left",
      rules: {
        "{{ELEMENT}} .altrp-field-option{{STATE}}": "flex-direction:{{VALUE}};"
      }
    });

    this.endControlSection();

    this.startControlSection("mismatch_message_styles", {
      tab: TAB_STYLE,
      label: "Mask Mismatch Message",
      conditions: { "mask_mismatch_message!": [""] }
    });

    this.addControl("mismatch_message_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: { unit: "px" },
      units: ["px", "%", "vh", "vw"],
      rules: {
        "{{ELEMENT}} .mask-mismatch-message{{STATE}}": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("mismatch_message_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: { unit: "px" },
      units: ["px", "%", "vh", "vw"],
      rules: {
        "{{ELEMENT}} .mask-mismatch-message{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("mismatch_message_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font Color",
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .mask-mismatch-message{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("mismatch_message_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
      rules: {
        "{{ELEMENT}} .mask-mismatch-message{{STATE}}": [
          'font-family: "{{FAMILY}}", sans-serif;',
          "font-size: {{SIZE}}px;",
          "line-height: {{LINEHEIGHT}};",
          "letter-spacing: {{SPACING}}px",
          "font-weight: {{WEIGHT}}",
          "text-transform: {{TRANSFORM}}",
          "font-style: {{STYLE}}",
          "text-decoration: {{DECORATION}}"
        ]
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Input;
