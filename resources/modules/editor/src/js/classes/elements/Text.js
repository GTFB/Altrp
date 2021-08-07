import BaseElement from "./BaseElement";
import TextIcon from "../../../svgs/text.svg";
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
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_WYSIWYG,
  CONTROLLER_HEADING,
  CONTROLLER_SHADOW
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Text extends BaseElement {
  static getName() {
    return "text";
  }
  static getTitle() {
    return "Text";
  }
  static getIconComponent() {
    return TextIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("text_editor", {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: "Text editor"
    });

    this.addControl("ckeditor", {
      type: CONTROLLER_SWITCHER,
      label: "Use CKEditor5?",
      default: true
    });

    // this.addControl("text", {
    //   type: CONTROLLER_WYSIWYG,
    //   label: "Text",
    //   default: "I Am Advanced Text",
    // });

    this.addControl("text_drop_cap", {
      type: CONTROLLER_SWITCHER,
      label: "Drop Cap",
      conditions: {
        ckeditor: true
      }
    });

    this.endControlSection();

    this.startControlSection("text_settings", {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: "Text Settings"
    });

    this.addControl("text_link", {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: "Link"
    });

    this.endControlSection();

    this.startControlSection("text_style", {
      tab: TAB_STYLE,
      label: "Columns"
    });

    this.addControl("text_style_column-count", {
      type: CONTROLLER_NUMBER,
      label: "Column count",
    });

    this.addControl("text_style_column-gap", {
      type: CONTROLLER_SLIDER,
      label: "Column gap",
      default: {
        size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1000,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection("text_style_position", {
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl("text_style_position_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });

    this.addControl("text_style_position_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });

    // this.addControl("text_style_position_margin", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Margin",
    //   default: {
    //     // top: 5,
    //     // right: 0,
    //     // bottom: 5,
    //     // left: 0,
    //     unit: "px"
    //   },
    //   units: ["px", "%", "vh"],
    //   stateless: true,
    // });

    // this.addControl("text_position_z_index", {
    //   hideOnEmail: true,
    //   type: CONTROLLER_NUMBER,
    //   label: "Z-index",
    //   default: 0,
    // });

    // this.addControl("text_position_css_id", {
    //   type: CONTROLLER_TEXT,
    //   label: "CSS ID"
    // });

    // this.addControl("text_position_css_classes", {
    //   type: CONTROLLER_TEXT,
    //   label: "CSS Classes"
    // });

    this.endControlSection();

    this.startControlSection("text_style_background", {
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("text_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      stateless: true,
    });

    this.addControl("text_style_background_opacity", {
      hideOnEmail: true,
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      // default: {
      //   size: 1
      // },
      max: 1,
      min: 0,
      step: 0.01,
      stateless: true,
    });

    this.endControlSection();

    this.startControlSection("text_style_font", {
      tab: TAB_STYLE,
      label: "Font"
    });

    this.addControl("text_style_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl("text_style_font_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
    });

    this.endControlSection();

    this.startControlSection("text_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("text_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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
      label: "Border width",
      units: ["px", "%", "vh"],
      stateless: true,
    });

    this.addControl("text_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      stateless: true,
    });

    this.addControl("text_style_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Border radius",
      stateless: true,
      default: {
        // size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection("text_advanced_tooltip", {
      tab: TAB_ADVANCED,
      label: "Tooltip"
    });

    this.addControl("text_advanced_tooltip_active", {
      type: CONTROLLER_SWITCHER,
      label: "Tooltip active",
      default: false
    });

    this.addControl("text_advanced_tooltip_label", {
      type: CONTROLLER_TEXT,
      default: "tooltip",
      label: "Label"
    });

    this.addControl("text_advanced_tooltip_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "rgb(206,205,237)",
        colorPickedHex: "#CECDED"
      },
    });

    this.addControl("text_advanced_tooltip_font_color", {
      type: CONTROLLER_COLOR,
      label: "Font color",
      default: {
        color: "rgb(0,0,0)",
        colorPickedHex: "#000000"
      },
    });

    this.addControl("text_advanced_tooltip_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
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

    this.addControl("text_advanced_tooltip_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh"],
    });

    this.addControl("text_advanced_tooltip_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
    });

    this.addControl("text_advanced_tooltip_border_radius", {
      type: CONTROLLER_SLIDER,
      label: "Border radius",
      default: {
        size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
    });

    this.addControl("text_advanced_tooltip_font", {
      type: CONTROLLER_SELECT2,
      label: "Font",
      placeholder: "Lato",
      default: '"Open Sans"',
      options: [
        {
          value: '"Roboto"',
          label: "Roboto"
        },
        {
          value: '"Open Sans"',
          label: "Open Sans"
        },
        {
          value: '"Lato"',
          label: "Lato"
        }
      ],
    });
    this.endControlSection();

    this.startControlSection("text_paragraph_settings", {
      tab: TAB_STYLE,
      label: "Paragraph"
    });

    this.addControl("text_paragraph_margin", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });
    
    this.addControl("text_paragraph_indent", {
      type: CONTROLLER_SLIDER,
      label: "Text indent",
      stateless: true,
      default: {
        // size: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
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
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });

    this.addControl("text_blockquote_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });
    
    this.addControl("text_blockquote_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",//
      default: {
        color: "",
        colorPickedHex: ""
      },
      stateless: true,
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
      label: "Border type",
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
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("text_blockquote_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(0,0,0)",
        colorPickedHex: "#000000"
      },
    });

    this.addControl("text_blockquote_border_radius", {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default:{
        size: 0,
        unit: 'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
    });

    this.addControl("text_blockquote_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl('text_blockquote_box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Block shadow',
      default:{
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
      },
    }
  );

    this.addControl('text_blockquote_text_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Text shadow',
      default:{
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
      },
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
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });

    
    
    this.addControl("text_table_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",//
      default: {
        color: "",
        colorPickedHex: ""
      },
      stateless: true,
    });

    this.addControl("text_table_odd_rows_color", {
      type: CONTROLLER_COLOR,
      label: "Odd rows color",//
      // default: {
      //   color: "",
      //   colorPickedHex: ""
      // },
      stateless: true,
    });

    this.addControl("text_table_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("text_table_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(0, 0, 0)",
        colorPickedHex: "#000000"
      },
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
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      stateless: true,
    });

    this.addControl("text_table_cells_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("text_table_cells_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(0, 0, 0)",
        colorPickedHex: "#000000"
      },
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
      label: 'Text shadow',
      default:{
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
      },
    }
  );

    this.endControlSection();

    this.startControlSection("text_link_settings", {
      tab: TAB_STYLE,
      label: "Link"
    });

    this.addControl("text_link_font_typographic", {
      type: CONTROLLER_TYPOGRAPHIC,
      label: "Typographic",
    });

    this.addControl('text_link_text_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Text shadow',
      default:{
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
      },
    }
  );

  this.endControlSection();

  this.startControlSection("text_numbered_list_settings", {
    tab: TAB_STYLE,
    label: "Numbered list"
  });

  this.addControl("text_numbered_list_margin", {
    type: CONTROLLER_DIMENSIONS,
    label: "List margin",
    default: {
      // top: 5,
      // right: 0,
      // bottom: 5,
      // left: 0,
      unit: "px"
    },
    units: ["px", "%", "vh"],
    stateless: true,
  });

  this.addControl("text_numbered_list_item_margin", {
    type: CONTROLLER_DIMENSIONS,
    label: "Element margin",
    default: {
      // top: 5,
      // right: 0,
      // bottom: 5,
      // left: 0,
      unit: "px"
    },
    units: ["px", "%", "vh"],
    stateless: true,
  });

  this.addControl("text_numbered_list_style_type", {
    type: CONTROLLER_SELECT,
    label: "List style type",
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
        label: "Upper roman"
      },
      {
        value: "lower-roman",
        label: "Lower roman"
      }
    ],
    
  });


  this.endControlSection();

  this.startControlSection("text_unordered_list_settings", {
    tab: TAB_STYLE,
    label: "Unordered list"
  });

  this.addControl("text_unordered_list_margin", {
    type: CONTROLLER_DIMENSIONS,
    label: "List margin",
    default: {
      // top: 5,
      // right: 0,
      // bottom: 5,
      // left: 0,
      unit: "px"
    },
    units: ["px", "%", "vh"],
    stateless: true,
  });

  this.addControl("text_unordered_list_item_margin", {
    type: CONTROLLER_DIMENSIONS,
    label: "Element margin",
    default: {
      // top: 5,
      // right: 0,
      // bottom: 5,
      // left: 0,
      unit: "px"
    },
    units: ["px", "%", "vh"],
    stateless: true,
  });

  this.addControl("text_unordered_list_style_type", {
    type: CONTROLLER_SELECT,
    label: "List style type",
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
