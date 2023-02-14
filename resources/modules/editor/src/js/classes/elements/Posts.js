import BaseElement from "./BaseElement";
import TableIcon from "../../../svgs/post-list.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_TYPOGRAPHIC,
  TAB_STYLE,
  CONTROLLER_NUMBER,
  CONTROLLER_SHADOW,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA,
  CONTROLLER_HEADING, CONTROLLER_SELECT2
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Table extends BaseElement {
  static getName() {
    return "posts";
  }
  static getTitle() {
    return "Cards";
  }
  static getIconComponent() {
    return TableIcon;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Advanced";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("posts_content_datasource", {
      tab: TAB_CONTENT,
      label: "Data Source"
    });

    this.addControl("choose_datasource", {
      type: CONTROLLER_SELECT,
      label: 'Choose Data Source',
      options:[
        {
          label: 'From Page Data Source',
          value: 'datasource'
        },
      ],
      default: 'datasource',
      locked: true,
    });

    this.addControl("posts_datasource", {
      label: 'Path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'choose_datasource': 'datasource',
      },
      locked: true,
    });

    this.addControl("posts_query_heading", {
      type: CONTROLLER_HEADING,
      label: 'Query',
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.endControlSection();

    this.startControlSection("posts_layout", {
      tab: TAB_CONTENT,
      label: "Layout"
    });

    this.addControl("posts_columns", {
      type: CONTROLLER_SELECT,
      label: "Columns",
      options:[
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        },
      ],
      default: 3,
      locked: true,
    });

    this.addControl('switch_overflow_hidden_template', {
      type: CONTROLLER_SWITCHER,
      locked: true,
      label: "Delete Overflow Hidden"
    });

    this.addControl("posts_card_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
      locked: true,
    });

    this.addControl("posts_card_hover_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Hover Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
      locked: true,
    });
    this.addControl("load-html-cards", {
      label: 'Loading Raw Html for Cards',
      type: CONTROLLER_SWITCHER,
      responsive: false,
      locked: true,
    })
    this.addControl("posts_transition_type", {
      type: CONTROLLER_SELECT,
      label: "Select Transition Type",
      options: [
        {
          label: 'Left to Right',
          value: 'left'
        },
        {
          label: 'Right to Left',
          value: 'right'
        },
        {
          label: 'Top to Bottom',
          value: 'top'
        },
        {
          label: 'Bottom to Top',
          value: 'bottom'
        },
        {
          label: 'Fade In',
          value: 'fade'
        },
        {
          label: 'Zoom',
          value: 'zoom'
        }
      ],
      default: 'left',
      locked: true,
    });


    this.addControl('posts_per_page', {
      type: CONTROLLER_NUMBER,
      label: 'Posts per Page',
      default: 3,
    });

    this.addControl("posts_rows_distance", {
      type: CONTROLLER_SLIDER,
      label: 'Rows Distance',
      default: {
        size: 20,
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 120,
      min: 0,
      locked: true,
    });


    this.addControl('posts_pagination_type', {
      type: CONTROLLER_SELECT,
      label: 'Pagination Type',
      options: [
        {
          value: '',
          label: 'None',
        },
        {
          value: 'prev_next',
          label: 'Prev/Next',
        },
        {
          value: 'pages',
          label: 'Pages',
        }
      ],
      default: 'prev_next',
      locked: true,
    });

    this.endControlSection();

    this.startControlSection("posts_page_settings", {
      label: "Pages",
      conditions: {
        'posts_pagination_type': 'pages',
      },
    });

    this.addControl('first_last_buttons_count', {
      type: CONTROLLER_NUMBER,
      label: 'First-Last Buttons Count',
    });

    this.addControl('middle_buttons_count', {
      type: CONTROLLER_NUMBER,
      label: 'Middle Buttons Count',
    });

    this.addControl('is_with_ellipsis', {
      type: CONTROLLER_SWITCHER,
      label: 'Show Ellipsis',
      default: true
    });

    this.addControl('hide_pre_page_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Prev Page Button',
      default: false
    });

    this.addControl('hide_next_page_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Next Page Button',
      default: false
    });

    this.endControlSection();

    this.startControlSection("posts_pagination_section", {
      label: "Pagination",
      conditions: {
        'posts_pagination_type!': '',
      },
    });

    this.addControl('query_sync', {
      label: 'Sync With Query String',
      type: CONTROLLER_SWITCHER,
      responsive: false,
      locked: true,
    });


    this.addControl('query_update', {
      label: 'Reset `page` and `pageSize` Params on Query String Updates',
      type: CONTROLLER_SWITCHER,
      responsive: false,
      conditions: {
        query_sync: true,
      },
      locked: true,
    });

    this.addControl('query_max_page', {
      label: 'Path to Page Size',
      responsive: false,
      conditions: {
        query_sync: true,
      },
      locked: true,
    });

    this.addControl('prev_text', {
      label: 'Prev Text',
      default: 'Prev Page',
      locked: true,
    });

    this.addControl('prev_icon', {
      type: CONTROLLER_MEDIA,
      locked: true,
      label: 'Prev Page Icon',
    });

    this.addControl('prev_icon_position', {
      type: CONTROLLER_SELECT,
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

    this.addControl('next_text', {
      label: 'Next Text',
      default: 'Next Page',
      locked: true,
    });

    this.addControl('next_icon', {
      type: CONTROLLER_MEDIA,
      locked: true,
      label: 'Next Page Icon',
    });

    this.addControl('next_icon_position', {
      type: CONTROLLER_SELECT,
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

    this.endControlSection();

    this.startControlSection("posts_layout_styles", {
      tab: TAB_STYLE,
      label: "Layout"
    });

    this.addControl('posts_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Content Alignment',
      default: 'top',
      options: [
        {
          label: 'top',
          value: 'flex-start',
        },
        {
          label: 'bottom',
          value: 'flex-end',
        }
      ],
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("posts_bottom_space", {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Space',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 50,
      min: 0
    });

    this.addControl("posts_columns_gap", {
      label: 'Columns Gap',
      locked: true,
    });

    this.addControl("posts_rows_gap", {
      label: 'Rows Gap',
      max: 100,
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('posts_border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('posts_border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options: [
          {
            'value': 'none',
            'label': 'None',
          },
          {
            'value': 'solid',
            'label': 'Solid',
          },
          {
            'value': 'double',
            'label': 'Double',
          },
          {
            'value': 'dotted',
            'label': 'Dotted',
          },
          {
            'value': 'dashed',
            'label': 'Dashed',
          },
          {
            'value': 'groove',
            'label': 'Groove',
          },
        ],
      }
    );

    this.addControl('posts_border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true
        },
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('posts_border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('style_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
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

    this.endControlSection();

    this.startControlSection('posts_background_section', {
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl('posts_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '100',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "0",
        angle: "0",
        value: ""
      },
    });

    this.addControl('posts_background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
    });

    this.addControl('background_position', {
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
      label: 'Background Position',
      default: 'top left',
    });

    this.addControl('background_attachment', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "scroll",
          label: "scroll"
        },
        {
          value: "fixed",
          label: "fixed"
        },
        {
          value: "local",
          label: "local"
        }
      ],
      label: 'Background Attachment',
      default: 'scroll',
    });

    this.addControl('background_repeat', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "repeat",
          label: "repeat"
        },
        {
          value: "repeat-x",
          label: "repeat-x"
        },
        {
          value: "repeat-y",
          label: "repeat-y"
        },
        {
          value: "space",
          label: "space"
        },
        {
          value: "round",
          label: "round"
        },
        {
          value: "no-repeat",
          label: "no-repeat"
        }
      ],
      label: 'Background Repeat',
      default: 'repeat',
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 100,
        unit: 'px',
      },
      conditions: {
        'background_size': [''],
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
    });

    this.addControl('background_size', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "unset",
          label: "unset"
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
          value: "",
          label: "set width"
        },
      ],
      label: 'Background Size',
      default: 'unset',
    });

    this.endControlSection();

    this.startControlSection("posts_pagination_style_section", {
      label: "Pagination",
      tab: TAB_STYLE,
      conditions: {
        'posts_pagination_type!': '',
      },
    });

    this.addControl('hide_page_input', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Page Input',
      default: false,
      conditions: { posts_pagination_type: 'pages' },
    });

    this.addControl('hide_pagination_select', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Pagination Select',
      default: false,
      conditions: { posts_pagination_type: 'pages' },
    });

    this.addControl('posts_pagination_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Wrapper Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('table_style_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      conditions: { posts_pagination_type: 'pages' },
    });

    this.endControlSection();
    //<editor-fold desc="posts_prev_style_section">

    this.startControlSection("posts_prev_style_section", {
      label: "Prev Button",
      tab: TAB_STYLE,
      conditions: {
        'posts_pagination_type!': '',
      },
    });

    this.addControl('posts_prev_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('posts_prev_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("posts_prev_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
    });

    this.addControl('posts_prev_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('posts_prev_border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options: [
          {
            'value': 'none',
            'label': 'None',
          },
          {
            'value': 'solid',
            'label': 'Solid',
          },
          {
            'value': 'double',
            'label': 'Double',
          },
          {
            'value': 'dotted',
            'label': 'Dotted',
          },
          {
            'value': 'dashed',
            'label': 'Dashed',
          },
          {
            'value': 'groove',
            'label': 'Groove',
          },
        ],
      }
    );

    this.addControl('posts_prev_border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true
        },
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('posts_prev_border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('border_prev_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('style_prev_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
      },
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

    this.endControlSection();
    //</editor-fold>

    //<editor-fold desc="posts_next_style_section">

    this.startControlSection("posts_next_style_section", {
      label: "Next Button",
      tab: TAB_STYLE,
      conditions: {
        'posts_pagination_type!': '',
      },
    });

    this.addControl('posts_next_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('posts_next_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("posts_next_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
    });

    this.addControl('posts_next_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('posts_next_border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options: [
          {
            'value': 'none',
            'label': 'None',
          },
          {
            'value': 'solid',
            'label': 'Solid',
          },
          {
            'value': 'double',
            'label': 'Double',
          },
          {
            'value': 'dotted',
            'label': 'Dotted',
          },
          {
            'value': 'dashed',
            'label': 'Dashed',
          },
          {
            'value': 'groove',
            'label': 'Groove',
          },
        ],
      }
    );

    this.addControl('posts_next_border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true
        },
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('posts_next_border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('border_next_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('style_next_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
      },
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

    this.endControlSection();

    this.startControlSection("table_style_page_buttons", {
      tab: TAB_STYLE,
      label: "Page Count Buttons",
      conditions: {
        'hide_pages_buttons_button!': true,
        posts_pagination_type: 'pages'
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

    this.addControl("table_style_pagination_count_text_color", {
      type: CONTROLLER_COLOR,
      label: "Count Text Color",
    });

    this.addControl("table_style_pagination_count_background_color", {
      type: CONTROLLER_COLOR,
      label: "Count Background Color",
    });

    this.addControl("table_style_pagination_count_item_background_color", {
      type: CONTROLLER_COLOR,
      label: "Count Item background color",
    });

    this.addControl("table_style_pagination_active_count_text_color", {
      type: CONTROLLER_COLOR,
      label: "Active Count text color",
    });

    this.addControl("table_style_pagination_active_count_item_background_color", {
      type: CONTROLLER_COLOR,
      label: "Active Count Item background color",
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

    this.addControl("table_style_pagination_count_item_border_type", {
      type: CONTROLLER_SELECT,
      label: "Item Count Border type",
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

    this.addControl("table_style_pagination_count_item_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Item Count Border Width",
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

    this.addControl("table_style_pagination_count_item_border_color", {
      type: CONTROLLER_COLOR,
      label: "Item Count Border color",
    });

    this.addControl("table_style_pagination_active_count_item_border_color", {
      type: CONTROLLER_COLOR,
      label: "Active Item Count Border color",
    });

    this.addControl('pagination_count_item_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Item Count Shadow',
    });

    this.addControl("ellipsis_heading", {
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

    this.addControl("ellipsis_color", {
      type: CONTROLLER_COLOR,
      label: "Ellipsis Color",
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

    this.startControlSection("table_style_page_input", {
      tab: TAB_STYLE,
      label: "Page Input",
      conditions: {
        'hide_page_input!': true,
        posts_pagination_type: 'pages'
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

    this.addControl("page_input_text_color", {
      type: CONTROLLER_COLOR,
      label: "Page Input text color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("page_input_background_color", {
      type: CONTROLLER_COLOR,
      label: "Page Input background color",
    });

    this.addControl('table_style_page_input_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Page Input Typographic',
    });

    this.addControl("page_input_border_type", {
      type: CONTROLLER_SELECT,
      label: "Page Input Border type",
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

    this.addControl("page_input_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Page Input Border width",
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

    this.addControl("page_input_border_color", {
      type: CONTROLLER_COLOR,
      label: "Page Input Border Color",
    });

    this.addControl('page_input_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Item Count Shadow',
    });

    this.endControlSection();

    this.startControlSection("table_style_pagination_select", {
      tab: TAB_STYLE,
      label: "Pagination Select",
      conditions: {
        'hide_pagination_select!': true,
        'inner_page_count_options!': '',
        posts_pagination_type: 'pages'
      },
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

    this.addControl("pagination_select_border_type", {
      type: CONTROLLER_SELECT,
      label: "Pagination Select Border type",
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

    this.addControl("pagination_select_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Pagination Select Border width",
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

    this.addControl("pagination_select_border_color", {
      type: CONTROLLER_COLOR,
      label: "Pagination Select Border Color",
    });

    this.addControl('pagination_select_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Pagination Select Shadow',
    });

    this.addControl("pagination_select_text_color", {
      type: CONTROLLER_COLOR,
      label: "Pagination Select text color",
    });

    this.addControl("pagination_select_background_color", {
      type: CONTROLLER_COLOR,
      label: "Pagination Select background color",
    });

    this.endControlSection();
    //</editor-fold>

    advancedTabControllers(this);
  }
}

export default Table;
