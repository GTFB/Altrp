import BaseElement from "./BaseElement";
import TextIcon from "../../../svgs/editor.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_NUMBER,
  CONTROLLER_HEADING,
  CONTROLLER_SHADOW
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Text extends BaseElement {
  static getName() {
    return "text";
  }
  static getTitle() {
    return "Content";
  }
  static getIconComponent() {
    return TextIcon;
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
    this.startControlSection("content_section", {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: "Content"
    });

    this.addControl('content', {
      label: 'Path To Content',
      type: CONTROLLER_TEXTAREA,
      locked: true,
    })

    this.endControlSection()

    this.startControlSection("text_style_position", {
      tab: TAB_STYLE,
      label: "Position (content)"
    });

    this.addControl("text_style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      stateless: true,
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
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

    this.addControl("text_style_background_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      max: 1,
      min: 0,
      step: 0.01,
    });

    this.endControlSection();

    this.startControlSection("text_style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("text_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
    });

    this.endControlSection();

    this.startControlSection("text_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("text_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
      stateless: true,
      units: ["px", "%", "vh"],
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

    this.addControl("text_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });


    this.addControl('text_style_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.endControlSection();

    // this.startControlSection("text_advanced_tooltip", {
    //   tab: TAB_ADVANCED,
    //   label: "Tooltip"
    // });
    //
    // this.addControl("text_advanced_tooltip_active", {
    //   type: CONTROLLER_SWITCHER,
    //   label: "Tooltip Active",
    //   locked: true,
    // });
    //
    // this.addControl("text_advanced_tooltip_label", {
    //   type: CONTROLLER_TEXT,
    //   label: "Label",
    //   locked: true,
    // });
    //
    // this.addControl("text_advanced_tooltip_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Background Color",
    //
    // });
    //
    // this.addControl("text_advanced_tooltip_font_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Font Color",
    //
    // });
    //
    // this.addControl("text_advanced_tooltip_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Border Type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    // });
    //
    // this.addControl("text_advanced_tooltip_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Border Width",
    //   units: ["px", "%", "vh"],
    // });
    //
    // this.addControl("text_advanced_tooltip_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Border Color",
    //
    // });
    //
    // this.addControl("text_advanced_tooltip_border_radius", {
    //   type: CONTROLLER_SLIDER,
    //   label: "Border Radius",
    //
    //   units: ["px", "%", "vh"],
    //   max: 100,
    //   min: 0,
    // });
    //
    // this.addControl("text_advanced_tooltip_font", {
    //   type: CONTROLLER_SELECT2,
    //   label: "Font",
    //   placeholder: "Lato",
    //   options: [
    //     {
    //       value: '"Roboto"',
    //       label: "Roboto"
    //     },
    //     {
    //       value: '"Open Sans"',
    //       label: "Open Sans"
    //     },
    //     {
    //       value: '"Lato"',
    //       label: "Lato"
    //     }
    //   ],
    // });
    // this.endControlSection();

    this.startControlSection("text_paragraph_settings", {
      tab: TAB_STYLE,
      label: "Paragraph"
    });

    this.addControl("text_paragraph_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_paragraph_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
    });

    this.addControl("text_paragraph_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("text_paragraph_indent", {
      type: CONTROLLER_SLIDER,
      label: "Text Indent",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection("text_blockquote_settings", {
      tab: TAB_STYLE,
      label: "Blockquote"
    });

    this.addControl("text_blockquote_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_blockquote_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_blockquote_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
    });


    // this.startControlSection("text_blockquote_border", {
    //   conditions: {
    //     'type': 'heading',
    //   },
    //   tab: TAB_STYLE,
    //   label: "Border"
    // });

    this.addControl("text_blockquote_border_type", {
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

    this.addControl("text_blockquote_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_blockquote_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });

    this.addControl("text_blockquote_border_radius", {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_blockquote_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl('text_blockquote_box_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Box Shadow',
      }
    );

    this.addControl('text_blockquote_text_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Text Shadow',
      }
    );
    this.endControlSection();

    this.startControlSection("text_table_settings", {
      tab: TAB_STYLE,
      label: "Table"
    });

    this.addControl("text_table_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_table_rows_color", {
      type: CONTROLLER_COLOR,
      label: "Rows Color",
    });

    this.addControl("text_table_odd_rows_color", {
      type: CONTROLLER_COLOR,
      label: "Odd Rows Color",
    });

    this.addControl("text_table_border_type", {
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

    this.addControl("text_table_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_table_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
    });

    // this.addControl("text_table_border_radius", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Border radius',
    //   default:{
    //     size: 0,
    //     unit: 'px',
    //   },
    //   units:[
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   max: 100,
    //   min: 0,
    // });

    this.addControl('text_table_cells_settings', {
      type: CONTROLLER_HEADING,
      label: 'Cells',
    });

    this.addControl("text_table_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_table_cells_border_type", {
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

    this.addControl("text_table_cells_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_table_cells_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",

    });

    // this.addControl("text_table_cells_border_radius", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Border radius',
    //   default:{
    //     size: 0,
    //     unit: 'px',
    //   },
    //   units:[
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   max: 100,
    //   min: 0,
    // });

    this.addControl("text_table_cells_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl('text_table_cells_text_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Text Shadow',

      }
    );

    this.endControlSection();

    this.startControlSection("text_link_settings", {
      tab: TAB_STYLE,
      label: "Link"
    });

    this.addControl("text_link_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
    });

    this.addControl("text_link_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl('text_link_text_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Text Shadow',
    });

    this.endControlSection();

    this.startControlSection("text_numbered_list_settings", {
      tab: TAB_STYLE,
      label: "Numbered List"
    });

    this.addControl("text_numbered_list_color", {
      type: CONTROLLER_COLOR,
      label: "Items Color",
    });

    this.addControl("text_numbered_list_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "List Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      stateless: true,
    });

    this.addControl("text_numbered_list_item_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Element Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_numbered_list_style_type", {
      type: CONTROLLER_SELECT,
      label: "List Style Type",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "decimal",
          label: "Decimal"
        },
        {
          value: "lower-alpha",
          label: "Greek"
        },
        {
          value: "upper-latin",
          label: "Latin"
        },
        {
          value: "upper-roman",
          label: "Upper Roman"
        },
        {
          value: "lower-roman",
          label: "Lower Roman"
        }
      ],

    });

    this.addControl('start_number', {
      type: CONTROLLER_NUMBER,
      label: 'Start number',
      default: 0
    });


    this.endControlSection();

    this.startControlSection("text_unordered_list_settings", {
      tab: TAB_STYLE,
      label: "Unordered List"
    });

    this.addControl('text_unordered_list_color', {
      type: CONTROLLER_COLOR,
      label: 'Items Color'
    })

    this.addControl("text_unordered_list_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "List Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      stateless: true,
    });

    this.addControl("text_unordered_list_item_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Element Margin",
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl("text_unordered_list_style_type", {
      type: CONTROLLER_SELECT,
      label: "List Style Type",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "circle",
          label: "Circle"
        },
        {
          value: "disc",
          label: "Disc"
        },
        {
          value: "square",
          label: "Square"
        },
      ],
    });


    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Text;
