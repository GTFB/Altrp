import BaseElement from "./BaseElement";
import TableIcon from "../../../svgs/widget_post.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_WYSIWYG, CONTROLLER_QUERY, CONTROLLER_REPEATER
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";
import Repeater from "../Repeater";

class Table extends BaseElement {
  static getName() {
    return "table";
  }
  static getTitle() {
    return "Table";
  }
  static getIconComponent() {
    return TableIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("table_table", {
      tab: TAB_CONTENT,
      label: "Table"
    });

    this.addControl('table_table_header_alignment', {
        type: CONTROLLER_CHOOSE,
        label: 'Header alignment',
        default: 'center',
        options:[
          {
            icon: 'left',
            value: 'left',
          },
          {
            icon: 'center',
            value: 'center',
          },
          {
            icon: 'right',
            value: 'right',
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-table-th': 'text-align: {{VALUE}}',
        },
    });

      this.addControl('table_table_body_alignment', {
        type: CONTROLLER_CHOOSE,
        label: 'Body alignment',
        default: 'left',
        options:[
          {
            icon: 'left',
            value: 'left',
          },
          {
            icon: 'center',
            value: 'center',
          },
          {
            icon: 'right',
            value: 'right',
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-table-td': 'text-align: {{VALUE}}',
        },
    });
      
    this.endControlSection();

    this.startControlSection("table_data_settings", {
        tab: TAB_CONTENT,
        label: "Data table settings"
    });

    this.addControl('table_data_settings_search', {
      type: CONTROLLER_SWITCHER,
      label: 'Search',
      default: true
    });

    this.addControl('table_data_settings_ordering', {
        type: CONTROLLER_SWITCHER,
        label: 'Ordering',
        default: true
    });

    this.addControl('table_data_settings_pagination', {
        type: CONTROLLER_SWITCHER,
        label: 'Pagination',
        default: true
    });
    
    this.addControl('table_data_settings_info', {
        type: CONTROLLER_SWITCHER,
        label: 'Info',
        default: true
    });

    this.endControlSection();

    this.startControlSection("table_content_query", {
        tab: TAB_CONTENT,
        label: "Query"
    });

    this.addControl("table_query", {
      type: CONTROLLER_QUERY,
    });

    this.endControlSection();

    this.startControlSection("table_content_table_settings", {
      tab: TAB_CONTENT,
      label: "Table Settings",
    });

    this.addControl('next_text', {
      label: 'Next Page Text',
      type: CONTROLLER_TEXT,
    });

    this.addControl('prev_text', {
      label: 'Previous Page Text',
      type: CONTROLLER_TEXT,
    });

    this.addControl('current_page_text', {
      label: 'Current Page Text',
      type: CONTROLLER_TEXT,
    });


    let repeater = new Repeater();

    repeater.addControl('accessor',{
      label: 'Column Name',
    });
    repeater.addControl('column_name',{
      label: 'Column Heading',
    });
    repeater.addControl('column_link',{
      label: 'Link Template',
      description: '/path/:id',
    });

    this.addControl('tables_columns', {
      label: 'Columns',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
    });

    this.endControlSection();

    this.startControlSection("table_style_table", {
        tab: TAB_STYLE,
        label: "Table"
    });

    this.addControl('table_style_table_striple_style', {
        type: CONTROLLER_SWITCHER,
        label: 'Striple style',
    });
    
    this.addControl("table_style_table_border_type", {
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
      rules: {
        '{{ELEMENT}} .altrp-table-tbody': 'border-style: {{VALUE}} !important'
      }
    });

    this.addControl("table_style_table_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-table-tbody': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}}  {{BOTTOM}}{{UNIT}}  {{LEFT}}{{UNIT}} !important'
      }
    });

    this.addControl("table_style_table_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(186,186,186)",
        colorPickedHex: "#32a852"
      },
      rules: {
        '{{ELEMENT}} .altrp-table-tbody': 'border-color: {{COLOR}} !important'
      }
    });

    this.endControlSection();

    this.startControlSection("table_style_pagination", {
        tab: TAB_STYLE,
        label: "Pagination"
    });

    this.addControl("table_style_pagination_buttons_text_color", {
        type: CONTROLLER_COLOR,
        label: "Buttons text color",
        default: {
          color: "",
          colorPickedHex: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-pagination__previous, .altrp-pagination__next': 'color: {{COLOR}}'
        }
    });

    this.addControl("table_style_pagination_buttons_background_color", {
      type: CONTROLLER_COLOR,
      label: "Buttons background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous, .altrp-pagination__next': 'background-color: {{COLOR}}'
      }
  });

  this.addControl('table_style_pagination_padding_buttons', {
    type: CONTROLLER_DIMENSIONS,
    label: 'buttons Padding',
    default:{
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      unit:'px'
    },
    units:[
      'px',
      '%',
      'vh',
    ],
    rules: {
      '{{ELEMENT}} .altrp-pagination__previous, .altrp-pagination__next': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    },
  });

  this.addControl("table_style_pagination_count_text_color", {
      type: CONTROLLER_COLOR,
      label: "Count text color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__count': 'color: {{COLOR}}'
      }
  });

  this.addControl("table_style_pagination_count_background_color", {
    type: CONTROLLER_COLOR,
    label: "Count background color",
    default: {
      color: "",
      colorPickedHex: ""
    },
    rules: {
      '{{ELEMENT}} .altrp-pagination__count': 'background-color: {{COLOR}}'
    }
  });

  this.addControl('table_style_pagination_padding_count', {
    type: CONTROLLER_DIMENSIONS,
    label: 'count Padding',
    default:{
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      unit:'px'
    },
    units:[
      'px',
      '%',
      'vh',
    ],
    rules: {
      '{{ELEMENT}} .altrp-pagination__count': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    },
  });

  this.addControl(
    'table_style_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'typographic',
      default:{
        lineHeight: 0.8,
        spacing: 0,
        size: 16,
        weight: 700,
        family: 'Open Sans',
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__next, .altrp-pagination__count, .altrp-pagination__previous': [
          'font-family: "{{FAMILY}}", sans-sefir;',
          'font-size: {{SIZE}}px;',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
    }
  );

  this.addControl("table_style_pagination_border_type", {
    type: CONTROLLER_SELECT,
    label: "Border type",
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
    rules: {
      '{{ELEMENT}} .altrp-pagination__previous, .altrp-pagination__next': 'border-style: {{VALUE}};',
    }
  });

  this.addControl("table_style_pagination_border_width", {
    type: CONTROLLER_DIMENSIONS,
    label: "Border width",
    units: ["px", "%", "vh"],
    rules: {
      '{{ELEMENT}} .altrp-pagination__previous, .altrp-pagination__next': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    }
  });  

  this.addControl("table_style_pagination_border_color", {
    type: CONTROLLER_COLOR,
    label: "Border color",
    default: {
      color: "",
      colorPickedHex: ""
    },
    rules: {
      '{{ELEMENT}} .altrp-pagination__previous, .altrp-pagination__next': 'border-color: {{COLOR}};',
    }
  });

  this.addControl('table_style_pagination_padding', {
    type: CONTROLLER_DIMENSIONS,
    label: 'Padding',
    default:{
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      unit:'px'
    },
    units:[
      'px',
      '%',
      'vh',
    ],
    rules: {
      '{{ELEMENT}} .altrp-pagination': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    },
  });

  this.endControlSection();  

    this.startControlSection("table_style_header", {
        tab: TAB_STYLE,
        label: "Header"
    });

    this.addControl("table_style_header_background", {
      type: CONTROLLER_COLOR,
      label: "Background",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-head': 'background: {{COLOR}}'
      }
    });

    this.addControl("table_style_header_text_color", {
        type: CONTROLLER_COLOR,
        label: "Text color",
        default: {
          color: "",
          colorPickedHex: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-table-th': 'color: {{COLOR}}'
        }
    });

    this.addControl("table_style_header_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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
      rules: {
        '{{ELEMENT}} .altrp-table-th': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("table_style_header_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-table-th': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      }
    });

    this.addControl("table_style_header_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-th': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('table_style_header_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-table-th': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    });

    this.endControlSection();

    this.startControlSection("table_style_body", {
        tab: TAB_STYLE,
        label: "Body"
    });

    this.addControl("table_style_body_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
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
      rules: {
        '{{ELEMENT}} .altrp-table-td': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("table_style_body_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-table-td': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      }
    });

    this.addControl("table_style_body_border_color_", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-td': 'border-color: {{COLOR}};',
      }
    });
    
    this.addControl('table_style_body_cell_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Cell padding',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-table-td': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    });

    this.addControl("table_style_body_border_background", {
      type: CONTROLLER_COLOR,
      label: "Background",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-td': 'background: {{COLOR}};',
      }
    });

    this.addControl("table_style_body_border_text_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-td': 'color: {{COLOR}};',
      }
    });

    this.addControl("table_style_body_links_color", {
      type: CONTROLLER_COLOR,
      label: "links_color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
      }
    });

    this.endControlSection();

    advancedTabControllers(this);  
  }
}

export default Table;
