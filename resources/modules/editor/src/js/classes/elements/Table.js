import BaseElement from './BaseElement';
import TableIcon from '../../../svgs/table.svg';
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_TYPOGRAPHIC,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_QUERY,
  CONTROLLER_REPEATER,
  CONTROLLER_FILTERS,
  CONTROLLER_HEADING,
  CONTROLLER_MEDIA,
  CONTROLLER_SELECT2,
  CONTROLLER_SHADOW
} from '../modules/ControllersManager';
import { advancedTabControllers } from '../../decorators/register-controllers';
import Repeater from '../Repeater';
import {actionsControllers} from "../../decorators/actions-controllers";

class Table extends BaseElement {
  static getName() {
    return 'table';
  }
  static getTitle() {
    return 'Table';
  }
  static getIconComponent() {
    return TableIcon;
  }
  static getType() {
    return 'widget';
  }
  static getGroup() {
    return "Advanced";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection('table_table', {
      tab: TAB_CONTENT,
      label: 'Table'
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
    });

    this.addControl('table_table_body_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Body Alignment',
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
    });

    this.addControl('table_hover_row', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      label: 'Hover Row',
      default: false
    });


    this.addControl('table_2_0', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      label: 'Table 2.0',
      default: true,
      locked: true,
    });

    this.addControl('table_position_style_z_index', {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
    });

    this.endControlSection();

    this.startControlSection('table_data_settings', {
      tab: TAB_CONTENT,
      hideOnEmail: true,
      label: 'Data Table Settings'
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
      locked:true,
      default: true
    });

    this.addControl('table_data_settings_info', {
      type: CONTROLLER_SWITCHER,
      label: 'Info',
      default: true
    });

    this.endControlSection();

    this.startControlSection('table_content_datasource', {
      tab: TAB_CONTENT,
      label: 'Data Source'
    });

    this.addControl('choose_datasource', {
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
      default: 'datasource',
      locked: true,
    });

    this.addControl('table_datasource', {
      label: 'Path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'choose_datasource': 'datasource',
      },
      locked: true,
    });

    this.addControl('table_query_heading', {
      type: CONTROLLER_HEADING,
      label: 'Query',
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.addControl('table_query', {
      type: CONTROLLER_QUERY,
      conditions: {
        'choose_datasource': 'query',
      },
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('table_content_table_settings', {
      tab: TAB_CONTENT,
      label: 'Table Settings',
    });

    this.addControl('field_name_for_row_styling', {
      label: 'Field Name for Styling Rows',
      hideOnEmail: true,
    });

    this.addControl('not_found_text', {
      hideOnEmail: true,
      label: 'Not Found Text',
    });

    this.addControl('next_text', {
      hideOnEmail: true,
      label: 'Next Page Text',
    });

    this.addControl('next_icon', {
      type: CONTROLLER_MEDIA,
      hideOnEmail: true,
      label: 'Next Page Icon',
    });

    this.addControl('next_icon_position', {
      type: CONTROLLER_SELECT,
      hideOnEmail: true,
      label: 'Next Icon Position',
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
    });

    this.addControl('prev_text', {
      hideOnEmail: true,
      label: 'Previous Page Text',
    });

    this.addControl('prev_icon', {
      type: CONTROLLER_MEDIA,
      hideOnEmail: true,
      label: 'Prev Page Icon',
    });

    this.addControl('prev_icon_position', {
      type: CONTROLLER_SELECT,
      hideOnEmail: true,
      label: 'Prev Icon Position',
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
    });

    this.addControl('current_page_text', {
      hideOnEmail: true,
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
      hideOnEmail: true,
      label: 'Group by',
      conditionsCallback: ()=> ! getCurrentElement().getResponsiveSetting('table_2_0')
    });

    repeater.addControl('column_template', {
      type: CONTROLLER_SELECT2,
      label: 'Card Template',
      default: false,
      hideOnEmail: true,
      prefetch_options: true,
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
    });

    repeater.addControl('column_cell_content_type', {
      type: CONTROLLER_SELECT,
      label: 'Content Type',
      options: [
        {
          label: 'Text / Link',
          value: '',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Phone',
          value: 'phone',
        }
      ],
    });

    repeater.addControl('column_link', {
      label: 'Link Template',
      dynamic: false,
      description: '/path/:id',
    });

    repeater.addControl('column_external_link', {
      label: 'External Link',
      conditions: {
        'column_link!' : ['', null, undefined],
      },
      dynamic: false,
      type: CONTROLLER_SWITCHER,
    });

    repeater.addControl('column_blank_link', {
      label: 'Open in New Tab',
      conditions: {
        'column_link!' : ['', null, undefined],
      },
      dynamic: false,
      type: CONTROLLER_SWITCHER,
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
      label: 'Body Alignment',
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

    repeater.addControl('column_cell_vertical_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Vertical Alignment',
      options: [
        {
          label: 'Default',
          value: 'inherit',
        },
        {
          label: 'Super',
          value: 'super',
        },
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Text Top',
          value: 'text-top',
        },
        {
          label: 'Baseline',
          value: 'baseline',
        },
        {
          label: 'Middle',
          value: 'middle',
        },
        {
          label: 'Text Bottom',
          value: 'text-bottom',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
        {
          label: 'Sub',
          value: 'sub',
        },
      ],
    });

    repeater.addControl('column_is_sorted', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      label: 'Is Sorted',
      default: false
    });

    repeater.addControl('column_is_filtered', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      label: 'Add Filter',
      default: false
    });

    repeater.addControl('column_filter_type', {
      type: CONTROLLER_SELECT,
      hideOnEmail: true,
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
          label: 'Range Slider',
          value: 'range_slider',
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

    repeater.addControl('column_switcher_custom_width_list', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      responsive: false,
      label: 'Add Custom Width',
      default: false,
      conditions: {
        'column_filter_type': "select",
      },
    });

    repeater.addControl("column_custom_setWidth_list", {
      type: CONTROLLER_SLIDER,
      hideOnEmail: true,
      responsive: false,
      label: "Custom Width List",
      default: {
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 1500,
      min: 0,
      conditions: {
        'column_switcher_custom_width_list': true,
      },
    });


    repeater.addControl('null_placeholder', {
      type: CONTROLLER_TEXT,
      hideOnEmail: true,
      label: 'Null Placeholder',
      responsive: false,
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'select',
      },
    });

    repeater.addControl('step_size', {
      type: CONTROLLER_SLIDER,
      hideOnEmail: true,
      label: 'Step Size',
      responsive: false,
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'range_slider',
      },
    });



    repeater.addControl('labels_count_on', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      label: 'Fix Labels Count',
      responsive: false,
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'range_slider',
      },
    });

    repeater.addControl('label_step_size', {
      type: CONTROLLER_SLIDER,
      hideOnEmail: true,
      label: 'Label Step Size',
      responsive: false,
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'range_slider',
        'labels_count_on!': true,
      },
    });
    repeater.addControl('labels_count', {
      type: CONTROLLER_NUMBER,
      hideOnEmail: true,
      label: 'Labels Count',
      responsive: false,
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': 'range_slider',
        'labels_count_on': true,
      },
    });

    repeater.addControl('column_text_filter_type', {
      type: CONTROLLER_SELECT,
      hideOnEmail: true,
      label: 'Text Match',
      nullable: true,
      options: [
        {
          label: 'Fuzzy Text Match',
          value: 'fuzzy_match',
        },
        {
          label: 'Full Match',
          value: 'full_match',
        },
        {
          label: 'Partial Match',
          value: 'partial_match',
        },
      ],
      responsive: false,
      conditions: {
        'column_filter_type': 'text',
      },
    });

    repeater.addControl('filter_placeholder', {
      label: 'Placeholder',
      hideOnEmail: true,
      conditions: {
        'column_is_filtered': true,
        'column_filter_type': ['text', 'select'],
      },
      dynamic: false,
      responsive: false,
      description: 'Search {{count}} records...',
    });

    repeater.addControl('filter_min_placeholder', {
      label: 'Min Placeholder',
      hideOnEmail: true,
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
      hideOnEmail: true,
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
      hideOnEmail: true,
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
      hideOnEmail: true,
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
      hideOnEmail: true,
      label: 'Aggregate Template',
      responsive: false,
      dynamic: false,
      conditions: {
        'aggregate!': '',
      },
      description: '{{value}} Unique Names',
    });

    repeater.addControl('column_is_editable', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Editable',
      default: false
    });

    repeater.addControl('column_edit_url', {
      hideOnEmail: true,
      label: 'Edit URL',
      description: '/ajax/models/tests/:id/title',
      default: '',
      conditions: {
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
      hideOnEmail: true,
      label: 'Column Styles Field',
      default: ''
    });

    repeater.addControl('header_full_width', {
      type: CONTROLLER_SWITCHER,
      default: false,
      hideOnEmail: true,
      conditionsCallback: ()=>!!getCurrentElement().getResponsiveSetting('table_transpose'),
      label: 'Header Full Width',
      locked: true,
    });

    repeater.addControl('header_bg', {
      type: CONTROLLER_COLOR,
      label: 'Header BG',
    });

    repeater.addControl('body_bg', {
      type: CONTROLLER_COLOR,
      label: 'Body BG',
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
      hideOnEmail: true,
      fields: actionsRepeater.getControls(),
    });

    actionsControllers(actionsRepeater, 'Actions Button', 'action__button', TAB_CONTENT, false, true);

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
      hideOnEmail: true,
      type: CONTROLLER_REPEATER,
      fields: additionalTableHeadRowsRepeater.getControls(),
    });
    this.endControlSection();
    /**
     * Настройки для группировки START
     */
    this.startControlSection('group_settings', {
      tab: TAB_CONTENT,
      hideOnEmail: true,
      label: 'Group Settings',
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

    this.startControlSection('table_footer', {
      label: 'Footer',
      hideOnEmail: true,
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
     * доп. настройки
     */
    //<editor-fold description=deep_customization>
    this.startControlSection('deep_customization', {
      label: 'Deep Customization',
      hideOnEmail: true,

    });

    this.addControl('inner_page_size', {
      type: CONTROLLER_NUMBER,
      label: 'Page Size',
      default: 0
    });

    this.addControl('inner_page_type', {
      type: CONTROLLER_SELECT,
      nullable: true,
      label: 'Paginate Type',
      default: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'Pages',
          value: 'pages',
        },
      ],
    });

    this.addControl('first_last_buttons_count', {
      type: CONTROLLER_NUMBER,
      label: 'First-Last Buttons Count',
      default: 2,
      conditions: { 'inner_page_type!': 'text', },
    });

    this.addControl('middle_buttons_count', {
      type: CONTROLLER_NUMBER,
      label: 'Middle Buttons Count',
      min: 3, // похоже, не работает. TODO: задать минимальное значение 3
      conditions: { 'inner_page_type!': 'text', },
    });

    this.addControl('is_with_ellipsis', {
      type: CONTROLLER_SWITCHER,
      label: 'Show Ellipsis',
      default: true
    });

    this.addControl('store_state', {
      type: CONTROLLER_SWITCHER,
      dynamic: false,
      label: 'Store State',
      locked: true,
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

    // this.addControl('inner_sort', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Sort',
    //   default: false
    // });

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

    this.addControl('checkbox_checked_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Checked Icon',
      conditions: {
        row_select: true,
      },
    });

    this.addControl('checkbox_unchecked_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Unchecked Icon',
      conditions: {
        row_select: true,
      },
    });

    this.addControl('checkbox_indeterminate_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Indeterminate Icon',
      conditions: {
        row_select: true,
      },
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
      condition: {
        replace_rows: true,
      },
    });

    this.addControl('replace_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
      default: {
        // color: 'rgb(27,27,27)',
        // colorPickedHex: '#1B1B1B'
      },
    });

    this.addControl('replace_text_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 0.8,
        spacing: 0,
        size: 14,
        weight: 700,
        family: 'Open Sans',
        decoration: ''
      },
    }
    );

    this.addControl('replace_image', {
      type: CONTROLLER_MEDIA,
      label: 'Image',
      default: { url: '' }
    });

    this.addControl('replace_image_width', {
      type: CONTROLLER_SLIDER,
      label: 'Image Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 800,
      min: 0,
    });

    this.addControl('replace_image_height', {
      type: CONTROLLER_SLIDER,
      label: 'Image Height',
      units: ['px', '%', 'vh', 'vw'],
      max: 800,
      min: 0,
    });

    this.addControl('replace_width', {
      type: CONTROLLER_NUMBER,
      label: 'Width',
      default: 100,
      condition: {
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
      default: 400,
      conditions: {
        virtualized_rows: true,
      },
    });
    this.addControl('item_size', {
      type: CONTROLLER_NUMBER,
      label: 'Item Size',
      conditions: {
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
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
      conditions: {
        row_expand: true,
      },
    });

    this.endControlSection();
    //</editor-fold>


    this.startControlSection('group_icons', {
      label: 'Group Column, Expanded Row Icons',
      hideOnEmail: true,

    });

    // Grouped Column Icon

    this.addControl('hide_grouped_column_icon', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Grouped Column Icon',
      default: false,
    });

    this.addControl('grouped_column_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Grouped Column Icon',
    });

    this.addControl('grouped_column_icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Grouped Icon Padding',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('grouped_column_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Grouped Column Icon Color',
    });

    this.addControl('grouped_column_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Grouped Column Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    // Not Grouped Column Icon

    this.addControl('hide_not_grouped_column_icon', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Not Grouped Column Icon',
      default: false,
    });

    this.addControl('not_grouped_column_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Not Grouped Column Icon',
    });

    this.addControl('not_grouped_column_icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Not Grouped Icon Padding',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('not_grouped_column_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Not Grouped Column Icon Color',
    });

    this.addControl('not_grouped_column_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Not Grouped Column Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    // Expanded Row Icon

    this.addControl('hide_expanded_row_icon', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Expanded Row Icon',
      default: false,
    });

    this.addControl('expanded_row_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Expanded Row Icon',
    });

    this.addControl('expanded_row_icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Expanded Row Icon Padding',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('expanded_row_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Expanded Row Icon Color',
    });

    this.addControl('expanded_row_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Expanded Row Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    // Not Expanded Row Icon

    this.addControl('hide_not_expanded_row_icon', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Not Expanded Row Icon',
      default: false,
    });

    this.addControl('not_expanded_row_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Not Expanded Row Icon',
    });

    this.addControl('not_expanded_row_icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Not Expanded Row Icon Padding',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('not_expanded_row_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Not Expanded Row Icon Color',
    });

    this.addControl('not_expanded_row_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Not Expanded Row Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    //<editor-fold description=edit_settings>
    this.startControlSection('edit_settings', {
      label: 'Edit',
      hideOnEmail: true,

    });

    this.addControl('edit_disabled', {
      label: 'Disable Edit in All Cells',
      type: CONTROLLER_SWITCHER,
    });

    this.endControlSection();
    //</editor-fold>

    this.startControlSection('table_style_table', {
      tab: TAB_STYLE,
      label: 'Table'
    });

    this.addControl('table_style_table_striple_style', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      label: 'Stripe style'
    });
    this.addControl('table_transpose', {
      type: CONTROLLER_SWITCHER,
      hideOnEmail: true,
      default: false,
      prefixClass: 'altrp-transpose_',
      label: 'Transpose',
    });

    this.addControl('table_style_table_stripe_color', {
      hideOnEmail: true,
      type: CONTROLLER_COLOR,
      label: 'Stripe Color',
    });

    this.addControl('table_style_table_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('table_style_table_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_table_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
    });

    this.endControlSection();

    this.startControlSection('filter_style_table', {
      tab: TAB_STYLE,
      hideOnEmail: true,
      label: 'Filter',
    });

    this.addControl('filter_style_table_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
    });

    this.addControl('filter_style_table_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
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
      units: ['px', '%', 'vh', 'vw'],
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
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl(
        'filter_style_typographic', {
          type: CONTROLLER_TYPOGRAPHIC,
          label: 'Typographic',
        }
    );

    this.addControl('filter_style_table_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('filter_style_table_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('filter_style_table_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
    });

    this.addControl('filter_style_border_shadow', {
          type: CONTROLLER_FILTERS,
          label: 'filters',
        }
    );

    this.endControlSection();

    this.startControlSection('global_filter_style_table', {
      tab: TAB_STYLE,
      label: 'Global Filter',
      conditions: { global_filter: true, }
    });

    this.addControl('global_filter_label_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Label Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('global_filter_label_color', {
      type: CONTROLLER_COLOR,
      label: 'Label Color',
    });

    this.addControl('global_filter_label_typographic', {
          type: CONTROLLER_TYPOGRAPHIC,
          label: 'Label Typographic',
        }
    );

    this.addControl('global_filter_heading', {
      type: CONTROLLER_HEADING,
      label: 'Input'
    });

    this.addControl('global_filter_input_width', {
      type: CONTROLLER_SLIDER,
      label: 'Input Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 800,
      min: 0,
    });

    this.addControl('global_filter_margin_left', {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      units: ['px', '%', 'vh', 'vw'],
      max: 800,
      min: 0,
    });

    this.addControl('global_filter_input_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Input Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('global_filter_input_color', {
      type: CONTROLLER_COLOR,
      label: 'Input Color',
    });

    this.addControl('global_filter_input_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Input Background Color',
    });

    this.addControl('global_filter_input_typographic', {
          type: CONTROLLER_TYPOGRAPHIC,
          label: 'Input Typographic',
        }
    );

    this.addControl('global_filter_input_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Input Border Type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('global_filter_input_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Input Border Width',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('global_filter_input_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Input Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('global_filter_input_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Input Border Color',
    });

    this.addControl('global_filter_input_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Input Shadow',
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
    });

    this.endControlSection();

// <editor-fold desc='table_style_transpose'
    /**
     * Стили для заголовка группы START
     */
    this.startControlSection('table_style_transpose', {
      tab: TAB_STYLE,
      label: 'Transpose',
      conditions: {
        table_transpose: true,
      },
      hideOnEmail: true,
    });

    this.addControl('table_style_main_width', {
      type: CONTROLLER_SLIDER,
      label: 'Main Column Width',
      max: 1000,
      min: 0,
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl('table_style_other_width', {
      type: CONTROLLER_SLIDER,
      label: 'Others Columns Width',
      max: 1000,
      min: 0,
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.endControlSection();
    /**
     * Стили для футера группы END
     *
     */
    //</editor-fold>

    this.startControlSection('table_style_pagination', {
      tab: TAB_STYLE,
      label: 'Pagination',
      hideOnEmail: true,
    });

    this.addControl('hide_pre_page_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Prev Page Button',
      default: false
    });

    this.addControl('hide_pages_buttons_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Pages Buttons',
      default: false
    });

    this.addControl('hide_next_page_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Next Page Button',
      default: false
    });

    this.addControl('hide_page_input', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Page Input',
      default: false
    });

    this.addControl('hide_pagination_select', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Pagination Select',
      default: false
    });

    this.addControl('table_style_pagination_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_buttons_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Buttons Text Color',
    });

    this.addControl('table_style_pagination_buttons_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Buttons Background Color',
    });

    this.addControl('table_style_pagination_padding_buttons', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Buttons Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });

    this.addControl('table_style_pagination_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Buttons Border type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('table_style_pagination_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Buttons Border width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Buttons Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Buttons Border Color',
    });

    this.addControl('pagination_buttons_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
      },
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
    });

    this.endControlSection();

    this.startControlSection('table_style_pre_page_button', {
      tab: TAB_STYLE,
      label: 'Prev Page Button',
      hideOnEmail: true,
      conditions: {
        'hide_pre_page_button!': true,
      },
    });

    this.addControl('prev_page_button_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Previous Page Button Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('prev_icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Prev Icon Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('prev_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Prev Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('prev_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Prev Icon Color',
    });

    this.addControl('table_style_prev_btn_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Previous Page Button Typographic',
    });

    this.endControlSection();

    this.startControlSection('table_style_next_page_button', {
      tab: TAB_STYLE,
      label: 'Next Page Button',
      hideOnEmail: true,
      conditions: {
        'hide_next_page_button!': true,
      },
    });

    this.addControl('next_page_button_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Next Page Button Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('next_icon_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Next Icon Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('next_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Next Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('next_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Next Icon Color',
    });

    this.addControl('table_style_next_btn_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Next Page Button Typographic',
    });

    this.endControlSection();

    this.startControlSection('table_style_page_buttons', {
      tab: TAB_STYLE,
      hideOnEmail: true,
      label: 'Page Count Buttons',
      conditions: {
        'hide_pages_buttons_button!': true,
      },
    });

    this.addControl('count_buttons_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Count Buttons Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('count_button_item_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Count Item Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_count_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Count Text Color',
    });

    this.addControl('table_style_pagination_count_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Count Background Color',
    });

    this.addControl('table_style_pagination_count_item_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Count Item background color',
    });

    this.addControl('table_style_pagination_active_count_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Active Count text color',
    });

    this.addControl('table_style_pagination_active_count_item_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Active Count Item background color',
    });

    this.addControl('table_style_pagination_padding_count', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Count Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('width_count_item', {
      type: CONTROLLER_SLIDER,
      label: 'Item Width',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('height_count_item', {
      type: CONTROLLER_SLIDER,
      label: 'Item Height',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_item_count_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Item Count Typographic',
    });

    this.addControl('table_style_pagination_count_item_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Item Count Border type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('table_style_pagination_count_item_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Item Count Border Width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_count_item_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Item Count Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_count_item_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Item Count Border color',
    });

    this.addControl('table_style_pagination_active_count_item_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Active Item Count Border color',
    });

    this.addControl('pagination_count_item_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Item Count Shadow',
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
    });

    this.addControl('ellipsis_heading', {
      type: CONTROLLER_HEADING,
      label: 'Ellipsis',
      conditions: {
        'is_with_ellipsis': true,
      },
    });

    this.addControl('ellipsis_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Ellipsis Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      conditions: {
        'is_with_ellipsis': true,
      },
    });

    this.addControl('ellipsis_color', {
      type: CONTROLLER_COLOR,
      label: 'Ellipsis Color',
      conditions: {
        'is_with_ellipsis': true,
      },
    });

    this.addControl('ellipsis_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Ellipsis Typographic',
      conditions: {
        'is_with_ellipsis': true,
      },
    });

    this.endControlSection();

    this.startControlSection('table_style_page_input', {
      tab: TAB_STYLE,
      hideOnEmail: true,
      label: 'Page Input',
      conditions: {
        'hide_page_input!': true,
      },
    });

    this.addControl('goto-page_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Input Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('page_input_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Input Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('page_input_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Page Input text color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('page_input_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Page Input background color',
    });

    this.addControl('table_style_page_input_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Page Input Typographic',
    });

    this.addControl('page_input_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Page Input Border type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('page_input_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Input Border width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('page_input_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Input Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('page_input_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Page Input Border Color',
    });

    this.addControl('page_input_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Item Count Shadow',
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
    });

    this.endControlSection();

    this.startControlSection('table_style_pagination_select', {
      tab: TAB_STYLE,
      label: 'Pagination Select',
      conditions: {
        'hide_pagination_select!': true,
        'inner_page_count_options!': ''
      },
    });

    this.addControl('pagination_select_width', {
      type: CONTROLLER_SLIDER,
      label: 'Pagination Select Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 150,
      min: 0,
    });

    this.addControl('pagination_select_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Select Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('pagination_select_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Select Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_select__pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Pagination Select Typographic',
    });

    this.addControl('pagination_select_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Pagination Select Border type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('pagination_select_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Select Border width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('pagination_select_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Select Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('pagination_select_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Pagination Select Border Color',
    });

    this.addControl('pagination_select_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Pagination Select Shadow',
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
    });

    this.addControl('pagination_select_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Pagination Select text color',
    });

    this.addControl('pagination_select_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Pagination Select background color',
    });

    this.endControlSection();

    this.startControlSection('checkbox_icon_style', {
      tab: TAB_STYLE,
      label: 'Checkbox Icons',
      conditions: {
        row_select: true,
      },
    });

    this.addControl('checked_icon_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Checked Icon Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('unchecked_icon_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Unchecked Icon Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('indeterminate_icon_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Indeterminate Icon Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('checked_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Checked Icon color',
    });

    this.addControl('unchecked_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Unchecked Icon color',
    });

    this.addControl('indeterminate_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Indeterminate Icon color',
    });

    this.addControl('checked_size', {
      type: CONTROLLER_SLIDER,
      label: 'Checked Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('unchecked_size', {
      type: CONTROLLER_SLIDER,
      label: 'Unchecked Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('indeterminate_size', {
      type: CONTROLLER_SLIDER,
      label: 'Indeterminate Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('table_style_resize_slider', {
      tab: TAB_STYLE,
      label: 'Resize Slider',
      conditions: {
        resize_columns: true,
      },
    });

    this.addControl('resize_slider_size', {
      type: CONTROLLER_SLIDER,
      label: 'Slider Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('resize_slider_color', {
      type: CONTROLLER_COLOR,
      label: 'Slider Color',
    });

    this.addControl('active_resize_slider_color', {
      type: CONTROLLER_COLOR,
      label: 'Active Slider Color',
    });

    this.endControlSection();

    this.startControlSection('table_style_header', {
      tab: TAB_STYLE,
      label: 'Header'
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
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_header_background', {
      type: CONTROLLER_COLOR,
      label: 'Background',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_header_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_header_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });

    this.addControl('table_style_header_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('table_style_header_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_header_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('header_cell_vertical_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Vertical Alignment',
      options: [
        {
          label: 'Default',
          value: 'inherit',
        },
        {
          label: 'Super',
          value: 'super',
        },
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Text Top',
          value: 'text-top',
        },
        {
          label: 'Baseline',
          value: 'baseline',
        },
        {
          label: 'Middle',
          value: 'middle',
        },
        {
          label: 'Text Bottom',
          value: 'text-bottom',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
        {
          label: 'Sub',
          value: 'sub',
        },
      ],

    });

    this.endControlSection();

    this.startControlSection('table_style_body', {
      tab: TAB_STYLE,
      label: 'Body'
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
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_body_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ],
    });

    this.addControl('table_style_body_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_body_border_color_', {
      type: CONTROLLER_COLOR,
      label: 'Border color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_body_border_background', {
      type: CONTROLLER_COLOR,
      label: 'Background',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_body_border_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_body_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });

    this.addControl('table_link_heading', {
      type: CONTROLLER_HEADING,
      label: 'Links Styles'
    });

    this.addControl('table_link_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
    });



    this.addControl('table_link_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });



    this.endControlSection();


    this.startControlSection('table_style_cell', {
      tab: TAB_STYLE,
      label: 'Cell'
    });

    this.addControl('cell_vertical_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Vertical Alignment',
      options: [
        {
          label: 'Default',
          value: 'inherit',
        },
        {
          label: 'Super',
          value: 'super',
        },
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Text Top',
          value: 'text-top',
        },
        {
          label: 'Baseline',
          value: 'baseline',
        },
        {
          label: 'Middle',
          value: 'middle',
        },
        {
          label: 'Text Bottom',
          value: 'text-bottom',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
        {
          label: 'Sub',
          value: 'sub',
        },
      ],

  });

    this.endControlSection();
// <editor-fold desc='table_style_group'
    /**
     * Стили для заголовка группы START
     */

    this.startControlSection('table_style_group', {
      tab: TAB_STYLE,
      label: 'Group',
      hideOnEmail: true,
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
      units: ['px', '%', 'vh', 'vw'],
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
    });

    this.addControl('table_style_group_border_background', {
      type: CONTROLLER_COLOR,
      label: 'Background',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_group_border_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_group_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });

    this.addControl('table_style_group_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });
    this.addControl('table_style_group_icon_left_space', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Left Spacing',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });
    this.addControl('table_style_group_icon_right_space', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Right Spacing',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });
    this.addControl('table_style_group_icon_top', {
      type: CONTROLLER_SLIDER,
      label: 'Top Translate',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: -100,
    });
    this.addControl('table_style_group_icon_left', {
      type: CONTROLLER_SLIDER,
      label: 'left Translate',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: -100,
    });


    this.addControl('table_style_group_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Icon Color',
    });

    this.endControlSection();
    /**
     * Стили для заголовка группы END
     *
     */
    //</editor-fold>
    // <editor-fold desc='table_style_footer'>
    /**
     * Стили для футера группы START
     */

    this.startControlSection('table_style_footer', {
      tab: TAB_STYLE,
      label: 'Footer',
      hideOnEmail: true,
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
      units: ['px', '%', 'vh', 'vw'],
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
    });

    this.addControl('table_style_footer_border_background', {
      type: CONTROLLER_COLOR,
      label: 'Background',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_footer_border_text_color', {
      type: CONTROLLER_COLOR,
      label: 'Text Color',
      default: {
        color: '',
        colorPickedHex: ''
      },
    });

    this.addControl('table_style_footer_font', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });

    this.endControlSection();
    /**
     * Стили для футера группы END
     *
     */
    //</editor-fold>

    //<editor-fold description=group_style_settings>

    this.startControlSection('group_style_settings', {
      label: 'Groups Subheading',
      hideOnEmail: true,
      tab: TAB_STYLE,
      conditions: {
        table_2_0: true,
      },
    });

    const groupsRepeater = new Repeater();

    groupsRepeater.addControl('padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
    });

    groupsRepeater.addControl('cell_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
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
    });

    groupsRepeater.addControl('bg_color', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
    });

    groupsRepeater.addControl('typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    });

    groupsRepeater.addControl('color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('tables_groups', {
      label: 'Groups',
      type: CONTROLLER_REPEATER,
      fields: groupsRepeater.getControls(),
    });

    this.endControlSection();
    //</editor-fold>


    //<editor-fold description=group_style_settings>

    this.startControlSection('group_subheading_settings', {
      label: 'Groups Subheading Settings',
      hideOnEmail: true,
      conditions: {
        table_2_0: true,
      },
    });

    const groupsSettingsRepeater = new Repeater();

    groupsSettingsRepeater.addControl('name', {
      label: 'Column Name',
      dynamic: false,
    });

    groupsSettingsRepeater.addControl('order', {
      label: 'Order',
      type: CONTROLLER_SELECT,
      options: [
        {
          label: 'ASC',
          value: 'ASC',
        },
        {
          label: 'DESC',
          value: 'DESC',
        },
      ],
      dynamic: false,
    });

    groupsSettingsRepeater.addControl('transition', {
      type: CONTROLLER_SLIDER,
      label: 'Transition',
      units: [],
      max: 1,
      min: 0,
      step: 0.1,
    });

    this.addControl('tables_settings_for_subheading', {
      label: 'Groups',
      type: CONTROLLER_REPEATER,
      fields: groupsSettingsRepeater.getControls(),
    });

    this.endControlSection();
    //</editor-fold>

    advancedTabControllers(this);


    //<editor-fold description=column_responsive_settings>

    this.startControlSection('column_responsive_settings', {
      label: 'Columns Responsive Settings',
      hideOnEmail: true,
      tab: TAB_STYLE,
    });

    this.addControl('columns_order', {
      label: 'Columns Order',
      dynamic: false,
      stateLess: true,
      description: '1, 3, 2'
    });

    this.endControlSection();
    //</editor-fold>


    this.startControlSection('range_slider_columns', {
      tab: TAB_STYLE,
      label: "Range Slider Styled"
    });

    this.addControl('color_range-slider_style', {
      type: CONTROLLER_COLOR,
      label: 'Progress primary',
    });

    this.addControl('color_range-slider_progress', {
      type: CONTROLLER_COLOR,
      label: 'Progress',
    });

    this.addControl('color_range-slider_label-background', {
      type: CONTROLLER_COLOR,
      label: 'label background',
    });

    this.addControl('color_range-slider_label-text', {
      type: CONTROLLER_COLOR,
      label: 'label text',
    });

    this.addControl('color_range-slider_label-text-stages', {
      type: CONTROLLER_COLOR,
      label: 'label steps text',
    });

    this.addControl('color_range-slider_controller-start', {
      type: CONTROLLER_COLOR,
      label: 'Controller start',
    });

    this.addControl('color_range-slider_controller-end', {
      type: CONTROLLER_COLOR,
      label: 'Controller end',
    });

    this.addControl('typographic_range-slider_label-text', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'typographic label',
    });

    this.addControl('typographic_range-slider_label-text-stages', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'typographic label steps',
    });

    this.endControlSection();
  }
}

export default Table;
