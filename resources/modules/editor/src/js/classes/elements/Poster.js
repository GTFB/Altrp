import BaseElement from './BaseElement';
import FromIcon from '../../../svgs/form.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
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
  TAB_STYLE, CONTROLLER_CHOOSE, CONTROLLER_MEDIA, CONTROLLER_REPEATER, CONTROLLER_SHADOW
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class Poster extends BaseElement{
  static getName(){
    return 'poster';
  }
  static getTitle(){
    return'Poster';
  }
  static getIconComponent(){
    return FromIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('type_content', {
      tab: TAB_CONTENT,
      label: 'Type',
    });

    this.addControl(
      'skin_type', {
        type: CONTROLLER_SELECT,
        label: 'Skin',
        options:[
          {
            'value' : 'default',
            'label' : 'default',
          },
          {
            'value' : 'vast',
            'label' : 'vast',
          },
          {
            'value' : 'postActiveFilters',
            'label' : 'posts active filters',
          },
          {
            'value' : 'postsFilterElement',
            'label' : 'posts filter element',
          },
          {
            'value' : 'postsOrderingElement',
            'label' : 'posts ordering element',
          }
        ],
      }
    );

    this.endControlSection();

    this.startControlSection('content_content', {
      tab: TAB_CONTENT,
      label: 'Content (active filters)',
    });

    this.addControl('widget_id_content', {
      type: CONTROLLER_TEXT,
      label: 'Widget ID',
    });

    this.endControlSection();

    this.startControlSection('item_settings_content', {
      tab: TAB_CONTENT,
      label: 'Items settings',
    });

    this.addControl('show_title_item_settings', {
      type: CONTROLLER_SWITCHER,
      label: 'Show title',
    });

    this.addControl('after_title_text_item_settings', {
      conditions: {
        'show_title_item_settings': true,
      },
      type: CONTROLLER_TEXT,
      label: "After title text"
    });

    this.addControl('alignment_item_settings', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'center',
      options:[
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
        }
      ],
    });

    this.addControl('icon_item_settings', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    this.addControl('title_for_search_item_settings', {
      type: CONTROLLER_TEXT,
      label: 'Title for search item',
    });

    this.endControlSection();

    this.startControlSection('filter_element_content_content', {
      tab: TAB_CONTENT,
      label: 'Content (filter element)',
    });

    this.addControl('heading_filter_element_content', {
      type: CONTROLLER_TEXT,
      label: 'Heading',
    });

    this.addControl('toggle_icon_filter_element_content', {
      type: CONTROLLER_MEDIA,
      label: 'Toggle icon',
    });

    //тут должен быть он https://prnt.sc/tiwcmo

    this.addControl('taxonomy_filter_element_content', {
      type: CONTROLLER_SELECT,
      label: 'Taxonomy',
      default: null,
      options:[
        {
          'value' : 'none',
          'label' : 'none',
        },
        {
          'value' : 'categories',
          'label' : 'categories',
        },
        {
          'value' : 'tags',
          'label' : 'tags',
        },
        {
          'value' : 'navigationMenus',
          'label' : 'navigation menus',
        },
        {
          'value' : 'linkCategories',
          'label' : 'link categories',
        },
        {
          'value' : 'formats',
          'label' : 'formats',
        },
        {
          'value' : 'type',
          'label' : 'type',
        },
        {
          'value' : 'categories2',
          'label' : 'categories 2',
        },
        {
          'value' : 'fontTypes',
          'label' : 'font types',
        },
      ],
      }
    );

    // а тут вот это https://prnt.sc/tj1vix

    this.addControl('always_open_filter_element_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Always open',
    });

    this.addControl('expand_default_filter_element_content', {
        type: CONTROLLER_SELECT,
        label: 'Expand default',
        default: null,
        options:[
          {
            'value' : 'none',
            'label' : 'none',
          },
          {
            'value' : 'all',
            'label' : 'all',
          },
        ],
      }
    );

    this.addControl('show_count_filter_element_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Show count on hierarchical items',
    });

    this.addControl('number_of_digits_for_count_filter_element_content', {
      conditions: {
        'show_count_filter_element_content': true,
      },
      type: CONTROLLER_NUMBER,
      label: 'Number of digits for count',
      default: null,

    });

    this.addControl('count_template_filter_element_content', {
      conditions: {
        'show_count_filter_element_content': true,
      },
      type: CONTROLLER_TEXT,
      label: 'Count template',
      default: "( %s )",

    });

    this.addControl('checkbox_icon_filter_element_content', {
      type: CONTROLLER_MEDIA,
      label: 'Checkbox icon',
    });

    this.addControl('toggle_menu_icon_filter_element_content', {
      type: CONTROLLER_MEDIA,
      label: 'Toggle menu icon',
    });

    this.addControl('inline_filter_element_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Inline',
    });

    this.addControl('widget_id_filter_element_content', {
      type: CONTROLLER_TEXT,
      label: 'Widget ID',
    });

    this.endControlSection();

    this.startControlSection('posts_ordering_element_layout_content', {
      tab: TAB_CONTENT,
      label: 'Layout (ordering element)',
    });

    this.addControl('type_posts_ordering_element_layout', {
        type: CONTROLLER_SELECT,
        label: 'Layout type',
        default: "SelectMenu",
        options:[
          {
            'value' : 'SelectMenu',
            'label' : 'select menu',
          },
          {
            'value' : 'buttons',
            'label' : 'buttons',
          },
        ],
      }
    );

    this.addControl('alignment_posts_ordering_element_layout', {
      conditions: {
        'type_posts_ordering_element_layout': "buttons",
      },
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'left',
      options:[
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
        }
      ],
    });

    this.endControlSection();

    this.startControlSection('posts_ordering_element_content_content', {
      tab: TAB_CONTENT,
      label: 'Content (ordering element)',
    });

    this.addControl('widget_id_posts_ordering_element_content', {
      type: CONTROLLER_TEXT,
      label: 'Widget ID',
    });

    let repeater = new Repeater();

    repeater.addControl('direction_items_posts_ordering_element_content', {
      type: CONTROLLER_CHOOSE,
      label: 'Sorting direction',
      default: 'left',
      options:[
        {
          icon: 'block_top',
          value: 'top',
        },
        {
          icon: 'block_bottom',
          value: 'bottom',
        }
      ],
    });

    repeater.addControl('field_items_posts_ordering_element_content', {
        type: CONTROLLER_SELECT,
        label: 'Sorting field',
        default: "Title",
        options:[
          {
            'value' : 'id',
            'label' : 'ID',
          },
          {
            'value' : 'authorId',
            'label' : 'author ID',
          },
          {
            'value' : 'title',
            'label' : 'title',
          },
          {
            'value' : 'postSlug',
            'label' : 'post slug',
          },
          {
            'value' : 'postDate',
            'label' : 'post date',
          },
          {
            'value' : 'modificationDate',
            'label' : 'modification date',
          },
          {
            'value' : 'random',
            'label' : 'random',
          },
          {
            'value' : 'commentCount',
            'label' : 'comment count',
          },
        ],
      }
    );

    repeater.addControl('title_items_posts_ordering_element_content',{
      type: CONTROLLER_TEXT,
      label: 'title',
    });

    repeater.addControl('icon_items_posts_ordering_element_content', {
      type: CONTROLLER_MEDIA,
      label: 'Icon for button element',
    });

    repeater.addControl('show_items_posts_ordering_element_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Show Always',
    });

    repeater.addControl('icon_position_items_posts_ordering_element_content', {
        type: CONTROLLER_SELECT,
        label: 'Icon position',
        default: "after",
        options:[
          {
            'value' : 'after',
            'label' : 'after',
          },
          {
            'value' : 'before',
            'label' : 'before',
          },
        ],
      }
    );

    this.addControl('items_posts_ordering_element_content', {
      label: 'Tab Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
    });

    this.endControlSection();

    this.startControlSection('item_style_active_filters_style', {
      tab: TAB_STYLE,
      label: 'Item style (active filters)',
    });

    this.addControl("margin_item_style_active_filters", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("padding_item_style_active_filters_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    //тут должно быт оно https://prnt.sc/tj8rx5

    this.addControl("background_item_style_active_filters_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "background-color: {{COLOR}};"
      }
    });

    this.addControl("color_item_style_active_filters_style", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_item_style_active_filters_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};",
        ]
      }
    });

    this.addControl("icon_color_item_style_active_filters_style", {
      type: CONTROLLER_COLOR,
      label: "Icon color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "fill: {{COLOR}};"
      }
    });

    this.addControl("icon_size_item_style_active_filters_style", {
      type: CONTROLLER_SLIDER,
      label: 'Icon size',
      default:{
        size: null,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("icon_spacing_item_style_active_filters_style", {
      type: CONTROLLER_SLIDER,
      label: 'Icon Spacing',
      default:{
        size: null,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('typographic_item_style_active_filters_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 14,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-tab-btn': [
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

    this.endControlSection();

    this.startControlSection('filter_filter_element_style', {
      tab: TAB_STYLE,
      label: 'Filter (filter element)',
    });

    this.addControl("padding_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Filters padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("background_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "background",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "background-color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection('hierarchical_items_filter_element_style', {
      tab: TAB_STYLE,
      label: 'Hierarchical items (filter element)',
    });

    this.addControl("list_padding_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "List padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("border_type_hierarchical_items_filter_element_style", {
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
        "{{ELEMENT}} .altrp-tab-content": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("sub_list_padding_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Sib list padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("border_type_sub_hierarchical_items_filter_element_style", {
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
        "{{ELEMENT}} .altrp-tab-content": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_sub_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_sub_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("margin_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("link_padding_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Link padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl('typographic_hierarchical_items_filter_element_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 14,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-tab-content div': [
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

    // а тут вот это https://prnt.sc/tj991w

    this.addControl("link_color_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Link color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("background_color_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_type_link_hierarchical_items_filter_element_style", {
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
        "{{ELEMENT}} .altrp-tab-content": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_link_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_link_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl('box_shadow_link_hierarchical_items_filter_element_style', {
        type: CONTROLLER_SHADOW,
        label: 'Box shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          spread: 0,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
          type: ""
        },
        presetColors: [
          '#eaeaea',
          '#9c18a8'
        ],
        rules: {
          '{{ELEMENT}} .altrp-btn': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
        },
      }
    );

    this.addControl("border_radius_link_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content":
          "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl('size_toggle_hierarchical_items_filter_element_style', {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default:{
        size: null,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-btn': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl("padding_toggle_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    // https://prnt.sc/tj9cig

    this.addControl("color_toggle_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_type_toggle_hierarchical_items_filter_element_style", {
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
        "{{ELEMENT}} .altrp-tab-content": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_toggle_hierarchical_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_toggle_hierarchical_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection('tags_items_filter_element_style', {
      tab: TAB_STYLE,
      label: 'Tags items (filter element)',
    });

    this.addControl("margin_toggle_tags_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Checkbox margin",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("padding_tags_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Items padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl('typographic_tags_items_filter_element_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 14,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-tab-content div': [
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

    // https://prnt.sc/tj9gxn

    this.addControl("box_color_tags_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Box color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_color_tags_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("icon_color_tags_items_filter_element_style", {
      type: CONTROLLER_COLOR,
      label: "Icon color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_tags_items_filter_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};",
        ]
      }
    });

    this.endControlSection();

    this.startControlSection('buttons_ordering_element_style', {
      tab: TAB_STYLE,
      label: 'Buttons Style (ordering element)',
    });

    this.addControl("margin_buttons_ordering_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Margin",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "margin-top: {{TOP}}{{UNIT}};",
          "margin-right: {{RIGHT}}{{UNIT}};",
          "margin-bottom: {{BOTTOM}}{{UNIT}};",
          "margin-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("padding_buttons_ordering_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("size_buttons_ordering_element_style", {
      type: CONTROLLER_SLIDER,
      label: "Size",
      default: {
        unit: "px"
      },
      max: 100,
      min: 0,
    });

    this.addControl("icon_spacing_buttons_ordering_element_style", {
      type: CONTROLLER_SLIDER,
      label: "Icon spacing",
      default: {
        unit: "px"
      },
      max: 100,
      min: 0,
    });

    this.addControl('typographic_buttons_ordering_element_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1.5,
          spacing: 0,
          size: 14,
          weight: "normal",
          family: '"roboto"',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-tab-btn': [
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

    // https://prnt.sc/tj9kgu

    this.addControl("background_color_buttons_ordering_element_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("color_buttons_ordering_element_style", {
      type: CONTROLLER_COLOR,
      label: "color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("icon_color_buttons_ordering_element_style", {
      type: CONTROLLER_COLOR,
      label: "Icon color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_buttons_ordering_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": [
          "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};",
        ]
      }
    });

    this.addControl("border_type_buttons_ordering_element_style", {
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
        "{{ELEMENT}} .altrp-tab-content": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_buttons_ordering_element_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_buttons_ordering_element_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn": "border-color: {{COLOR}};"
      }
    });

    this.addControl("transition_duration_buttons_ordering_element_style", {
      type: CONTROLLER_SLIDER,
      label: "transition duration",
      default: {
        unit: "px"
      },
      max: 100,
      min: 0,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default Poster;
