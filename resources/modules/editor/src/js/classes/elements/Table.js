import BaseElement from "./BaseElement";
import TableIcon from "../../../svgs/table.svg";
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
  CONTROLLER_WYSIWYG,
  CONTROLLER_QUERY,
  CONTROLLER_REPEATER,
  CONTROLLER_FILTERS,
  CONTROLLER_HEADING,
  CONTROLLER_MEDIA,
  CONTROLLER_SELECT2
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
      // default: 'center',
      options: [
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
        '{{ELEMENT}} .altrp-table-th{{STATE}}': 'text-align: {{VALUE}}',
      },
    });

    this.addControl('table_table_body_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Body alignment',
      // default: 'left',
      options: [
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
        '{{ELEMENT}} .altrp-table-td{{STATE}}': 'text-align: {{VALUE}}',
      },
    });

    this.addControl('table_hover_row', {
      type: CONTROLLER_SWITCHER,
      label: 'Hover Row',
      default: false
    });


    this.addControl('table_2_0', {
      type: CONTROLLER_SWITCHER,
      label: 'Table 2.0',
      default: false
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

    this.startControlSection("table_content_datasource", {
      tab: TAB_CONTENT,
      label: "Data Source"
    });

    this.addControl("choose_datasource", {
      type: CONTROLLER_SELECT,
      label: 'Choose Data Source',
      options: [
        {
          label: 'Query',
          value: 'query'
        },
        {
          label: 'From Page Data Source',
          value: 'datasource'
        },
      ],
      default: 'query',
    });

    this.addControl("table_datasource", {
      label: 'Path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'choose_datasource': 'datasource',
      },
    });

    this.addControl("table_query_heading", {
      type: CONTROLLER_HEADING,
      label: 'Query',
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.addControl("table_query", {
      type: CONTROLLER_QUERY,
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.endControlSection();

    this.startControlSection("table_content_table_settings", {
      tab: TAB_CONTENT,
      label: "Table Settings",
    });

    this.addControl('field_name_for_row_styling', {
      label: 'Field Name for Styling Rows',
    });

    this.addControl('not_found_text', {
      label: 'Not Found Text',
    });

    this.addControl('next_text', {
      label: 'Next Page Text',
    });

    this.addControl('prev_text', {
      label: 'Previous Page Text',
    });

    this.addControl('current_page_text', {
      label: 'Current Page Text',
    });
    let repeater = new Repeater();

    repeater.addControl('accessor', {
      label: 'Column Name',
      dynamic: false,
    });
    repeater.addControl('column_name', {
      label: 'Column Heading',
      dynamic: false,
    });
    repeater.addControl('group_by', {
      type: CONTROLLER_SWITCHER,
      default: false,
      label: 'Group by',
    });

    repeater.addControl('column_template', {
      type: CONTROLLER_SELECT2,
      label: 'Card Template',
      default: false,
      prefetch_options: true,
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      nullable: true,
    });

    repeater.addControl('column_link', {
      label: 'Link Template',
      dynamic: false,
      description: '/path/:id',
    });

    repeater.addControl('column_width', {
      label: 'Column Width',
      dynamic: false,
      type: CONTROLLER_NUMBER,
    });

    repeater.addControl('column_header_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Header alignment',
      default: 'center',
      options: [
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
      ]
    });

    repeater.addControl('column_body_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Body alignment',
      default: 'center',
      options: [
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
      ]
    });

    repeater.addControl('column_is_sorted', {
      type: CONTROLLER_SWITCHER,
      label: 'Is Sorted',
      default: false
    });

    repeater.addControl('column_is_filtered', {
      type: CONTROLLER_SWITCHER,
      label: 'Add Filter',
      default: false
    });

    repeater.addControl('column_filter_type', {
      type: CONTROLLER_SELECT,
      label: 'Filter Type',
      nullable: true,
      options: [
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'Min-Max',
          value: 'min_max',
        },
        {
          label: 'Select',
          value: 'select',
        },
        {
          label: 'Slider',
          value: 'slider',
        },
      ],
      responsive: false,
      conditions: {
        'column_is_filtered': true,
      },
    });

    repeater.addControl('filter_placeholder', {
      label: 'Placeholder',
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'text',
      },
      dynamic: false,
      responsive: false,
      description: 'Search {{count}} records...',
    });

    repeater.addControl('filter_min_placeholder', {
      label: 'MinPlaceholder',
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'min_max',
      },
      dynamic: false,
      responsive: false,
      description: 'Min ({{min}})',
    });


    repeater.addControl('filter_max_placeholder', {
      label: 'Max Placeholder',
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'min_max',
      },
      dynamic: false,
      responsive: false,
      description: 'Min ({{max}})',
    });

    repeater.addControl('filter_button_text', {
      label: 'Placeholder',
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'slider',
      },
      dynamic: false,
      responsive: false,
      description: 'Off',
    });

    repeater.addControl('aggregate', {
      type: CONTROLLER_SELECT,
      label: 'Aggregate',
      nullable: true,
      options: [
        {
          label: 'Average',
          value: 'average',
        },
        {
          label: 'Sum',
          value: 'sum',
        },
        {
          label: 'Count',
          value: 'count',
        },
        {
          label: 'Unique Count',
          value: 'uniqueCount',
        },
      ],
      responsive: false,
    });

    repeater.addControl('aggregate_template', {
      type: CONTROLLER_TEXTAREA,
      label: 'Aggregate Template',
      responsive: false,
      dynamic: false,
      conditions:{
        'aggregate!' : '',
      },
      description: '{{value}} Unique Names',
    });

    repeater.addControl('column_is_editable', {
      type: CONTROLLER_SWITCHER,
      label: 'Editable',
      default: false
    });

    repeater.addControl('column_edit_url', {
      label: 'Edit URL',
      description: '/ajax/models/tests/:id/title',
      default: '',
      conditions:{
        column_is_editable: true,
      },
    });

    repeater.addControl('column_is_default_sorted', {
      type: CONTROLLER_SWITCHER,
      label: 'Is Default Sorted',
      default: false
    });

    repeater.addControl('column_is_default_sorted_direction', {
      type: CONTROLLER_SELECT,
      label: 'Default Sorted Direction',
      responsive: false,
      options: [
        {
          'label': 'ASC',
          'value': 'ASC',
        },
        {
          'label': 'DESC',
          'value': 'DESC',
        },
      ],
      default: 'ASC'
    });

    repeater.addControl('column_styles_field', {
      label: 'Column Styles Field',
      default: ''
    });

    const actionsRepeater = new Repeater();

    actionsRepeater.addControl('icon', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    actionsRepeater.addControl('text', {
      type: CONTROLLER_TEXTAREA,
      dynamic: false,
      label: 'Content',
    });

    actionsRepeater.addControl('link', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      label: 'Link',
    });

    actionsRepeater.addControl('type', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      dynamic: false,
      options: [
        {
          label: 'Inner Link',
          value: 'Link',
        },
        {
          label: 'External Link',
          value: 'a',
        },
        {
          label: 'Button',
          value: 'button',
        },
      ],
    });

    actionsRepeater.addControl('classes', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      label: 'CSS class',
    });

    actionsRepeater.addControl('target_blank', {
      type: CONTROLLER_SWITCHER,
      label: 'In New Window',
    });

    actionsRepeater.addControl('size', {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    actionsRepeater.addControl('spacing', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Spacing',
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    repeater.addControl('actions', {
      label: 'Actions',
      type: CONTROLLER_REPEATER,
      fields: actionsRepeater.getControls(),
    });

    this.addControl('tables_columns', {
      label: 'Columns',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
    });

    let additionalTableHeadRowsRepeater = new Repeater();
    let additionalTableHeadCellsRepeater = new Repeater();
    additionalTableHeadCellsRepeater.addControl('title', {
      label: 'Title',
    });
    additionalTableHeadCellsRepeater.addControl('colspan', {
      label: 'Colspan',
      type: CONTROLLER_NUMBER
    });
    additionalTableHeadCellsRepeater.addControl('rowspan', {
      label: 'Rowpan',
      type: CONTROLLER_NUMBER
    });

    additionalTableHeadRowsRepeater.addControl('additional_cells', {
      label: 'Cells',
      type: CONTROLLER_REPEATER,
      fields: additionalTableHeadCellsRepeater.getControls(),
    });

    this.addControl('additional_rows', {
      label: 'Additional Heading',
      type: CONTROLLER_REPEATER,
      fields: additionalTableHeadRowsRepeater.getControls(),
    });
    this.endControlSection();
    /**
     * Настройки для группировки START
     */
    this.startControlSection("group_settings", {
      tab: TAB_CONTENT,
      label: "Group Settings",
    });

    this.addControl('group_by_column_name', {
      label: 'Group by Column Name',
    });

    this.addControl('group_default_text', {
      label: 'Group Default Text',
    });

    this.addControl('group_collapsing', {
      type: CONTROLLER_SWITCHER,
      default: false,
      label: 'Group Collapsing',
    });

    // this.addControl('group_collapsed_default',{
    //   type: CONTROLLER_SWITCHER,
    //   conditions: {
    //     'group_collapsing': true,
    //   },
    //   default: false,
    //   label: 'Collapsed Default',
    // });

    this.addControl('collapsed_icon', {
      type: CONTROLLER_MEDIA,
      conditions: {
        'group_collapsing': true,
      },
      label: 'Collapsed Icon',
    });
    this.addControl('expanded_icon', {
      type: CONTROLLER_MEDIA,
      conditions: {
        'group_collapsing': true,
      },

      label: 'Expanded Icon',
    });

    this.endControlSection();
    /**
     * Настройки для группировки END
     */

    /**
     * Настройки для футера таблицы
     */

    this.startControlSection("table_footer", {
      label: "Footer"
    });

    const footerRepeater = new Repeater();

    footerRepeater.addControl('content', {
      label: 'Content',
      dynamic: false,
    });

    footerRepeater.addControl('colspan', {
      label: 'Colspan',
      type: CONTROLLER_NUMBER,
      dynamic: false,
    });

    footerRepeater.addControl('column_footer_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Header alignment',
      default: 'center',
      options: [
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
      ]
    });

    this.addControl('footer_columns', {
      label: 'Columns',
      type: CONTROLLER_REPEATER,
      fields: footerRepeater.getControls(),
    });

    this.endControlSection();

    /**
     * Настройки для футера таблицы END
     */

    /**
     * Настройки для футера таблицы
     */

    this.startControlSection("deep_customization", {
      label: "Deep Customization"
    });

    this.addControl('inner_page_size', {
      type: CONTROLLER_NUMBER,
      label: 'Page Size',
      default: 0
    });

    this.addControl('store_state', {
      type: CONTROLLER_SWITCHER,
      dynamic: false,
      label: 'Store State',
    });

    this.addControl('loading_text', {
      type: CONTROLLER_TEXTAREA,
      default: 'Loading...',
      label: 'Loading Text',
    });

    this.addControl('inner_page_count_options', {
      type: CONTROLLER_TEXTAREA,
      label: 'Counts',
    });

    this.addControl('inner_sort', {
      type: CONTROLLER_SWITCHER,
      label: 'Sort',
      default: false
    });

    this.addControl('global_filter', {
      type: CONTROLLER_SWITCHER,
      label: 'Global Filter',
      default: false
    });

    this.addControl('global_filter_label', {
      type: CONTROLLER_TEXTAREA,
      dynamic: false,
      label: 'Label',
      conditions: {
        global_filter: true,
      },
    });

    this.addControl('global_filter_placeholder', {
      type: CONTROLLER_TEXTAREA,
      dynamic: false,
      label: 'Placeholder',
      conditions: {
        global_filter: true,
      },
      description: '{{counts}} records ...',
    });

    this.addControl('row_select', {
      type: CONTROLLER_SWITCHER,
      label: 'Row Select',
      default: false,
    });

    this.addControl('row_select_width', {
      type: CONTROLLER_NUMBER,
      label: 'Width',
      default: 50,
      conditions: {
        row_select: true,
      },
    });

    this.addControl('row_select_all', {
      type: CONTROLLER_SWITCHER,
      label: 'Select All',
      default: false,
      conditions: {
        row_select: true,
      },
    });


    this.addControl('selected_storage', {
      label: 'Selected Storage',
      dynamic: false,
      responsive: false,
      conditions: {
        row_select: true,
      },
    });

    this.addControl('ids_storage', {
      label: 'Selected IDs Storage',
      dynamic: false,
      responsive: false,
      conditions: {
        row_select: true,
      },
    });

    this.addControl('hide_columns', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Columns',
      default: false,
    });

    this.addControl('resize_columns', {
      type: CONTROLLER_SWITCHER,
      label: 'Resize',
      prefixClass: 'table-resize_',
      default: false,
    });

    this.addControl('replace_rows', {
      type: CONTROLLER_SWITCHER,
      label: 'Replacing Rows',
      default: false,
    });

    this.addControl('replace_text', {
      type: CONTROLLER_TEXTAREA,
      label: 'Text',
      condition:{
        replace_rows: true,
      },
    });

    this.addControl('replace_width', {
      type: CONTROLLER_NUMBER,
      label: 'Width',
      default: 100,
      condition:{
        replace_rows: true,
      },
    });

    this.addControl('virtualized_rows', {
      type: CONTROLLER_SWITCHER,
      label: 'Virtualized Rows',
      default: false,
      prefixClass: 'table-virtualized_'
    });

    this.addControl('virtualized_height', {
      type: CONTROLLER_NUMBER,
      label: 'Height',
      conditions:{
        virtualized_rows: true,
      },
    });
    this.addControl('item_size', {
      type: CONTROLLER_NUMBER,
      label: 'Item Size',
      conditions:{
        virtualized_rows: true,
      },
    });

    this.addControl('row_expand', {
      type: CONTROLLER_SWITCHER,
      label: 'Row Expand',
      default: false,
    });

    this.addControl('card_template', {
      type: CONTROLLER_SELECT2,
      label: 'Card Template',
      default: false,
      prefetch_options: true,
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      nullable: true,
      conditions: {
        row_expand: true,
      },
    });

    this.endControlSection();

    this.startControlSection("filter_style_table", {
      tab: TAB_STYLE,
      label: "Filter"
    });

    this.addControl("filter_style_table_text_color", {
      type: CONTROLLER_COLOR,
      label: "Text Color",
      default: {
        color: "rgb(27,27,27)",
        colorPickedHex: "#1B1B1B"
      },
      rules: {
        '{{ELEMENT}} .altrp-field{{STATE}}': 'color: {{COLOR}} !important'
      }
    });

    this.addControl("filter_style_table_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background Color",
      default: {
        color: "rgb(186,186,186)",
        colorPickedHex: "#BABABA"
      },
      rules: {
        '{{ELEMENT}} .altrp-field{{STATE}}': 'background: {{COLOR}} !important'
      }
    });

    this.addControl('filter_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Input Padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-field{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });
    this.addControl('label_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Label Padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-label{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl(
      'filter_style_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 0.8,
        spacing: 0,
        size: 14,
        weight: 700,
        family: 'Open Sans',
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-field{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
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

    this.addControl("filter_style_table_border_type", {
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
        '{{ELEMENT}} .altrp-field{{STATE}}': 'border-style: {{VALUE}} !important'
      }
    });

    this.addControl("filter_style_table_border_width", {
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
        '{{ELEMENT}} .altrp-field{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}}  {{BOTTOM}}{{UNIT}}  {{LEFT}}{{UNIT}} !important'
      }
    });

    this.addControl("filter_style_table_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(186,186,186)",
        colorPickedHex: "#32a852"
      },
      rules: {
        '{{ELEMENT}} .altrp-field{{STATE}}': 'border-color: {{COLOR}} !important'
      }
    });

    this.addControl('filter_style_border_shadow', {
      type: CONTROLLER_FILTERS,
      label: 'filters',
      rules: {
        '{{ELEMENT}} .altrp-image{{STATE}}': [
          'filter: blur({{BLUR}}px);',
          'filter: brightness({{BRIGHTNESS}}%);',
          'filter: contrast({{CONTRAST}}%);',
          'filter: saturate({{SATURATION}}%);',
          'filter: hue-rotate({{HUE}}deg);;'
        ],
      },
    }
    );
    this.endControlSection();

    this.startControlSection("table_style_table", {
      tab: TAB_STYLE,
      label: "Table"
    });

    this.addControl('table_style_table_striple_style', {
      type: CONTROLLER_SWITCHER,
      label: 'Striple style'
    });
    this.addControl('table_transpose', {
      type: CONTROLLER_SWITCHER,
      default: false,
      prefixClass: 'altrp-transpose_',
      label: 'Transpose',
    });

    this.addControl("table_style_table_stripe_color", {
      type: CONTROLLER_COLOR,
      label: "Stripe Color",
      // default: {
      //   color: "rgba(0, 0, 50, .05)",
      //   colorPickedHex: "#32a852"
      // },
      rules: {
        '{{ELEMENT}} .altrp-table-tbody--striped tr:nth-child(2n)': 'background-color: {{COLOR}}'
      }
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
        '{{ELEMENT}} .altrp-table{{STATE}}': 'border-style: {{VALUE}} !important'
      }
    });

    this.addControl("table_style_table_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      default: {
        // top: 1,
        // right: 1,
        // bottom: 1,
        // left: 1,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-table{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}}  {{BOTTOM}}{{UNIT}}  {{LEFT}}{{UNIT}} !important'
      }
    });

    this.addControl("table_style_table_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      // default: {
      //   color: "rgb(186,186,186)",
      //   colorPickedHex: "#32a852"
      // },
      rules: {
        '{{ELEMENT}} .altrp-table{{STATE}}': 'border-color: {{COLOR}} !important'
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
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'color: {{COLOR}}'
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
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.addControl('table_style_pagination_padding_buttons', {
      type: CONTROLLER_DIMENSIONS,
      label: 'buttons Padding',
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': 'color: {{COLOR}}'
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
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.addControl('table_style_pagination_padding_count', {
      type: CONTROLLER_DIMENSIONS,
      label: 'count Padding',
      default: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    });

    this.addControl(
      'table_style_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 0.8,
        spacing: 0,
        size: 16,
        weight: 700,
        family: 'Open Sans',
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}, .altrp-pagination__count{{STATE}}, .altrp-pagination__previous{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
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
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("table_style_pagination_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('table_style_pagination_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-table-head{{STATE}}': 'background: {{COLOR}}'
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
        '{{ELEMENT}} .altrp-table-th{{STATE}}': 'color: {{COLOR}}'
      }
    });

    this.addControl('table_style_header_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      // default: {
      //   lineHeight: 1.5,
      //   spacing: 0,
      //   size: 14,
      //   weight: "normal",
      //   family: "Open Sans",
      //   decoration: ""
      // },
      rules: {
        '{{ELEMENT}} .altrp-table-th{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
          'font-size: {{SIZE}}px;',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
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
        '{{ELEMENT}} .altrp-table-th{{STATE}}': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("table_style_header_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-table-th{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        '{{ELEMENT}}.altrp-transpose_true .altrp-table-th:not(:first-child){{STATE}}': 'margin-top: -{{TOP}}{{UNIT}};',
        '{{ELEMENT}}.altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-th{{STATE}}': 'margin-left: -{{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-table-th{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('table_style_header_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-table-th{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-table-td{{STATE}}': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("table_style_body_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        '{{ELEMENT}} .altrp-table-td{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        '{{ELEMENT}}.altrp-transpose_true .altrp-table-td:not(:first-child){{STATE}}': 'margin-top: -{{TOP}}{{UNIT}};',
        '{{ELEMENT}}.altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-td{{STATE}}': 'margin-left: -{{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-table-td{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('table_style_body_cell_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Cell padding',
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-table-td{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
        '{{ELEMENT}} .altrp-table-tbody .altrp-table-background{{STATE}}': 'background: {{COLOR}};',
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
        '{{ELEMENT}} .altrp-table-td{{STATE}}': 'color: {{COLOR}};',
      }
    });

    this.addControl('table_style_body_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      // default: {
      //   lineHeight: 1.5,
      //   spacing: 0,
      //   size: 14,
      //   weight: "normal",
      //   family: "Open Sans",
      //   decoration: ""
      // },
      rules: {
        '{{ELEMENT}} .altrp-table-td{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
          'font-size: {{SIZE}}px;',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
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
    // <editor-fold desc="table_style_group"
    /**
     * Стили для заголовка группы START
     */

    this.startControlSection("table_style_group", {
      tab: TAB_STYLE,
      label: "Group"
    });

    this.addControl('table_style_group_cell_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Cell padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    });

    this.addControl('table_style_group_cell_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Header alignment',
      options: [
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
        '{{ELEMENT}} .altrp-table-tbody .altrp-table-td__grouping{{STATE}}': 'text-align: {{VALUE}};',
      }
    });

    this.addControl("table_style_group_border_background", {
      type: CONTROLLER_COLOR,
      label: "Background",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-tbody .altrp-table-td__grouping{{STATE}}': 'background: {{COLOR}};',
      }
    });

    this.addControl("table_style_group_border_text_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}}': 'color: {{COLOR}};',
      }
    });

    this.addControl('table_style_group_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
          'font-size: {{SIZE}}px;',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
    });

    this.addControl("table_style_group_icon_size", {
      type: CONTROLLER_SLIDER,
      label: "Icon Size",
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon svg': [
          'width: {{SIZE}}{{UNIT}};',
          'height: {{SIZE}}{{UNIT}};',
        ],
      }
    });
    this.addControl("table_style_group_icon_left_space", {
      type: CONTROLLER_SLIDER,
      label: "Icon Left Spacing",
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon svg': [
          'margin-left: {{SIZE}}{{UNIT}};',
        ],
      }
    });
    this.addControl("table_style_group_icon_right_space", {
      type: CONTROLLER_SLIDER,
      label: "Icon Right Spacing",
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon svg': [
          'margin-right: {{SIZE}}{{UNIT}};',
        ],
      }
    });
    this.addControl("table_style_group_icon_top", {
      type: CONTROLLER_SLIDER,
      label: "Top Translate",
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 100,
      min: -100,
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon svg': [
          'top: {{SIZE}}{{UNIT}};',
        ],
      }
    });
    this.addControl("table_style_group_icon_left", {
      type: CONTROLLER_SLIDER,
      label: "left Translate",
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 100,
      min: -100,
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon svg': [
          'left: {{SIZE}}{{UNIT}};',
        ],
      }
    });


    this.addControl("table_style_group_icon_color", {
      type: CONTROLLER_COLOR,
      label: "Icon Color",
      rules: {
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon svg': 'fill: {{COLOR}};',
        '{{ELEMENT}} .altrp-table-td__grouping{{STATE}} .altrp-table__collapse-icon path': 'fill: {{COLOR}};',
      }
    });

    this.endControlSection();
    /**
     * Стили для заголовка группы END
     *
     */
    //</editor-fold>
    // <editor-fold desc="table_style_footer"
    /**
     * Стили для футера группы START
     */

    this.startControlSection("table_style_footer", {
      tab: TAB_STYLE,
      label: "Footer"
    });

    this.addControl('table_style_footer_cell_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Cell padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-table-foot .altrp-table-td{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    });

    this.addControl('table_style_footer_cell_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Header alignment',
      options: [
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
        '{{ELEMENT}} .altrp-table-foot .altrp-table-td{{STATE}}': 'text-align: {{VALUE}};',
      }
    });

    this.addControl("table_style_footer_border_background", {
      type: CONTROLLER_COLOR,
      label: "Background",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-foot .altrp-table-td{{STATE}}': 'background: {{COLOR}};',
      }
    });

    this.addControl("table_style_footer_border_text_color", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-table-foot .altrp-table-td{{STATE}}': 'color: {{COLOR}};',
      }
    });

    this.addControl('table_style_footer_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      rules: {
        '{{ELEMENT}}  .altrp-table-foot .altrp-table-td{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
          'font-size: {{SIZE}}px;',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
    });

    this.endControlSection();
    /**
     * Стили для футера группы END
     *
     */
    //</editor-fold>
    advancedTabControllers(this);
  }
}

export default Table;
