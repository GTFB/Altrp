import BaseElement from "./BaseElement";
import TableIcon from "../../../svgs/post-list.svg";
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
  CONTROLLER_SHADOW,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA,
  CONTROLLER_WYSIWYG, CONTROLLER_QUERY, CONTROLLER_REPEATER, CONTROLLER_FILTERS, CONTROLLER_HEADING, CONTROLLER_SELECT2
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";
import Repeater from "../Repeater";

class Table extends BaseElement {
  static getName() {
    return "posts";
  }
  static getTitle() {
    return "Posts";
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

    this.startControlSection("posts_content_datasource", {
        tab: TAB_CONTENT,
        label: "Data Source"
    });

    this.addControl("choose_datasource", {
      type: CONTROLLER_SELECT,
      label: 'Choose Data Source',
      options:[
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
    });

    this.addControl("posts_datasource", {
      label: 'Path',
      type: CONTROLLER_TEXTAREA,
      conditions: {
        'choose_datasource': 'datasource',
      },
    });

    this.addControl("posts_query_heading", {
      type: CONTROLLER_HEADING,
      label: 'Query',
      conditions: {
        'choose_datasource': 'query',
      },
    });

    this.addControl("posts_query", {
      type: CONTROLLER_QUERY,
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

    });

    this.addControl("posts_card_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      nullable: true,
    });

    this.addControl("posts_card_hover_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Hover Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=card&value=guid',
      nullable: true,
    });

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
    });


    this.addControl('posts_per_page', {
      type: CONTROLLER_NUMBER,
      label: 'Posts per Page',
      default: 3
    });

    this.addControl("posts_rows_distance", {
      type: CONTROLLER_SLIDER,
      label: 'Rows Distance',
      default: {
        size: 20,
        unit: 'px',
      },
      max: 120,
      min: 0
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
    });

    this.endControlSection();

    this.startControlSection("posts_pagination_section", {
      label: "Pagination",
      conditions: {
        'posts_pagination_type!': '',
      },
    });

    this.addControl('posts_prev_text', {
      label: 'Prev Text',
      default: 'Prev Page',
    });

    this.addControl('prev_icon', {
      type: CONTROLLER_MEDIA,
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': 'flex-direction: {{VALUE}};'
      },
    });

    this.addControl('posts_next_text', {
      label: 'Next Text',
      default: 'Next Page',
    });

    this.addControl('next_icon', {
      type: CONTROLLER_MEDIA,
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}': 'flex-direction: {{VALUE}};'
      },
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
      // rules: {
      // },
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-posts{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl("posts_bottom_space", {
      type: CONTROLLER_SLIDER,
      label: 'Bottom Space',
      default: {
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh'
      ],
      max: 50,
      min: 0
    });

    this.addControl("posts_columns_gap", {
      type: CONTROLLER_SLIDER,
      label: 'Columns Gap',
      max: 100,
      min: 0
    });

    this.addControl("posts_rows_gap", {
      type: CONTROLLER_SLIDER,
      label: 'Rows Gap',
      max: 100,
      min: 0
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
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-style: {{VALUE}};',
      // },
    }
    );

    this.addControl('posts_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      default: {
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      // },
    }
    );

    this.addControl('posts_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
      // default: {
      //   color: "rgb(50,168,82)",
      //   colorPickedHex: "#32a852",
      // },
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
      // },
    }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': [
      //     'border-top-left-radius: {{TOP}}{{UNIT}}',
      //     'border-top-right-radius: {{RIGHT}}{{UNIT}}',
      //     'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
      //     'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
      //   ]
      // }
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
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      // },
    });

    this.endControlSection();

    this.startControlSection('posts_background_section', {
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl('posts_background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
      // default: {
      //   color: "rgb(52,59,76)",
      //   colorPickedHex: "#343B4C",
      // },
      // rules: {
      //   '{{ELEMENT}} .altrp-btn{{STATE}}': 'background-color: {{COLOR}};',
      // },
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
      // rules: {
      //   "{{ELEMENT}} .altrp-btn{{STATE}}": "background-image: {{VALUE}}"
      // }
    });

    this.addControl('posts_background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-image: url({{URL}});"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-position: {{VALUE}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-attachment: {{VALUE}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-repeat: {{VALUE}};"
      // }
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
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 1000,
      min: 0,
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
      // }
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
      // rules: {
      //   "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-size: {{VALUE}};"
      // }
    });

    this.endControlSection();

    this.startControlSection("posts_pagination_style_section", {
      label: "Pagination",
      tab: TAB_STYLE,
      conditions: {
        'posts_pagination_type!': '',
      },
    });

    this.addControl('hide_pre_page_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Prev Page Button',
      default: false,
      conditions: { posts_pagination_type: 'pages' },
    });

    this.addControl('hide_pages_buttons_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Pages Buttons',
      default: false,
      conditions: { posts_pagination_type: 'pages' },
    });

    this.addControl('hide_next_page_button', {
      type: CONTROLLER_SWITCHER,
      label: 'Hide Next Page Button',
      default: false,
      conditions: { posts_pagination_type: 'pages' },
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
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} > .altrp-pagination-pages{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('table_style_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      conditions: { posts_pagination_type: 'pages' },
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}, .altrp-pagination-pages__item{{STATE}}, .altrp-pagination__count{{STATE}}, .altrp-pagination__previous{{STATE}}, .altrp-pagination__goto-page{{STATE}}, .altrp-pagination__select-size{{STATE}}': [
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
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('posts_prev_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl("posts_prev_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      rules: {
        "{{ELEMENT}} .altrp-pagination__previous{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('posts_prev_typographic', {
          type: CONTROLLER_TYPOGRAPHIC,
          label: 'Typographic',
          rules: {
            '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': [
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
          rules: {
            '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': 'border-style: {{VALUE}};',
          },
        }
    );

    this.addControl('posts_prev_border_width', {
          type: CONTROLLER_DIMENSIONS,
          label: 'Border Width',
          default: {
            bind: true
          },
          units: [
            'px',
            '%',
            'vh',
          ],
          rules: {
            '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
          },
        }
    );

    this.addControl('posts_prev_border_color', {
          type: CONTROLLER_COLOR,
          label: 'Border Color',
          // default: {
          //   color: "rgb(50,168,82)",
          //   colorPickedHex: "#32a852",
          // },
          rules: {
            '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': 'border-color: {{COLOR}};',
          },
        }
    );

    this.addControl('border_prev_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl('style_prev_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}} svg': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}} img': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('prev_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Prev Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}} svg': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}} img': 'height: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl('prev_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Prev Icon Color',
      rules: {
        '{{ELEMENT}} .altrp-pagination__previous{{STATE}} path': 'fill: {{COLOR}};',
      },
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
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('posts_next_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl("posts_next_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      rules: {
        "{{ELEMENT}} .altrp-pagination__next{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('posts_next_typographic', {
          type: CONTROLLER_TYPOGRAPHIC,
          label: 'Typographic',
          rules: {
            '{{ELEMENT}} .altrp-pagination__next{{STATE}}': [
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
          rules: {
            '{{ELEMENT}} .altrp-pagination__next{{STATE}}': 'border-style: {{VALUE}};',
          },
        }
    );

    this.addControl('posts_next_border_width', {
          type: CONTROLLER_DIMENSIONS,
          label: 'Border Width',
          default: {
            bind: true
          },
          units: [
            'px',
            '%',
            'vh',
          ],
          rules: {
            '{{ELEMENT}} .altrp-pagination__next{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
          },
        }
    );

    this.addControl('posts_next_border_color', {
          type: CONTROLLER_COLOR,
          label: 'Border Color',
          // default: {
          //   color: "rgb(50,168,82)",
          //   colorPickedHex: "#32a852",
          // },
          rules: {
            '{{ELEMENT}} .altrp-pagination__next{{STATE}}': 'border-color: {{COLOR}};',
          },
        }
    );

    this.addControl('border_next_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl('style_next_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}} svg': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
        '{{ELEMENT}} .altrp-pagination__next{{STATE}} img': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('next_icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Next Icon Size',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}} svg': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-pagination__next{{STATE}} img': 'width: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl('next_icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Next Icon Color',
      rules: {
        '{{ELEMENT}} .altrp-pagination__next{{STATE}} path': 'fill: {{COLOR}};',
      },
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
      },
    });

    this.addControl('count_button_item_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Count Item Margin',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
      },
    });

    this.addControl("table_style_pagination_count_text_color", {
      type: CONTROLLER_COLOR,
      label: "Count Text Color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': 'color: {{COLOR}}',
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': 'color: {{COLOR}}'
      }
    });

    this.addControl("table_style_pagination_count_background_color", {
      type: CONTROLLER_COLOR,
      label: "Count Background Color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.addControl("table_style_pagination_count_item_background_color", {
      type: CONTROLLER_COLOR,
      label: "Count Item background color",
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.addControl("table_style_pagination_active_count_text_color", {
      type: CONTROLLER_COLOR,
      label: "Active Count text color",
      rules: {
        '{{ELEMENT}} .active.altrp-pagination-pages__item{{STATE}}': 'color: {{COLOR}}'
      }
    });

    this.addControl("table_style_pagination_active_count_item_background_color", {
      type: CONTROLLER_COLOR,
      label: "Active Count Item background color",
      rules: {
        '{{ELEMENT}} .active.altrp-pagination-pages__item{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.addControl('table_style_pagination_padding_count', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Count Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__count{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ],
      },
    });

    this.addControl('table_style_pagination_padding_count_item', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Item Count Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('table_style_item_count_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Item Count Typographic',
      rules: {
        '{{ELEMENT}} .altrp-pagination .altrp-pagination-pages__item{{STATE}}': [
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
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("table_style_pagination_count_item_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Item Count Border Width",
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      }
    });

    this.addControl('table_style_count_item_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Item Count Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl("table_style_pagination_count_item_border_color", {
      type: CONTROLLER_COLOR,
      label: "Item Count Border color",
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl("table_style_pagination_active_count_item_border_color", {
      type: CONTROLLER_COLOR,
      label: "Active Item Count Border color",
      rules: {
        '{{ELEMENT}} .active.altrp-pagination-pages__item{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('pagination_count_item_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Item Count Shadow',
      rules: {
        '{{ELEMENT}} .altrp-pagination-pages__item{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__ellipsis{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl("ellipsis_color", {
      type: CONTROLLER_COLOR,
      label: "Ellipsis Color",
      conditions: {
        'is_with_ellipsis': true,
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__ellipsis{{STATE}}': 'color: {{COLOR}}'
      }
    });

    this.addControl('ellipsis_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Ellipsis Typographic',
      conditions: {
        'is_with_ellipsis': true,
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__ellipsis{{STATE}}': [
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
      },
    });

    this.addControl('page_input_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Input Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl("page_input_text_color", {
      type: CONTROLLER_COLOR,
      label: "Page Input text color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': 'color: {{COLOR}}'
      }
    });

    this.addControl("page_input_background_color", {
      type: CONTROLLER_COLOR,
      label: "Page Input background color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.addControl('table_style_page_input_pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Page Input Typographic',
      rules: {
        '{{ELEMENT}} .altrp-pagination .altrp-pagination__goto-page{{STATE}}': [
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("page_input_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Page Input Border width",
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      }
    });

    this.addControl('page_input_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Page Input Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl("page_input_border_color", {
      type: CONTROLLER_COLOR,
      label: "Page Input Border Color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('page_input_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Item Count Shadow',
      rules: {
        '{{ELEMENT}} .altrp-pagination__goto-page{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ],
      },
    });

    this.addControl('pagination_select_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Select Padding',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });


    this.addControl('table_style_pagination_select__pagination_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Pagination Select Typographic',
      rules: {
        '{{ELEMENT}} .altrp-pagination .altrp-pagination__select-size{{STATE}}': [
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
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': 'border-style: {{VALUE}};',
      }
    });

    this.addControl("pagination_select_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Pagination Select Border width",
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      }
    });

    this.addControl('pagination_select_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Pagination Select Border Radius',
      default: {
        unit: 'px'
      },
      units: ['px', '%', 'vh', 'vw'],
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl("pagination_select_border_color", {
      type: CONTROLLER_COLOR,
      label: "Pagination Select Border Color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': 'border-color: {{COLOR}};',
      }
    });

    this.addControl('pagination_select_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Pagination Select Shadow',
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    this.addControl("pagination_select_text_color", {
      type: CONTROLLER_COLOR,
      label: "Pagination Select text color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': 'color: {{COLOR}}'
      }
    });

    this.addControl("pagination_select_background_color", {
      type: CONTROLLER_COLOR,
      label: "Pagination Select background color",
      rules: {
        '{{ELEMENT}} .altrp-pagination__select-size .altrp-field-select2__control{{STATE}}': 'background-color: {{COLOR}}'
      }
    });

    this.endControlSection();
    //</editor-fold>

    advancedTabControllers(this);
  }
}

export default Table;
