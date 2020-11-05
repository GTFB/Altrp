import BaseElement from "./BaseElement";
import TabsIcon from "../../../svgs/tabs.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_HEADING,
  CONTROLLER_MEDIA,
  CONTROLLER_TEXT,
  CONTROLLER_REPEATER,
  CONTROLLER_SLIDER,
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT,
  CONTROLLER_LINK,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER,
  CONTROLLER_WYSIWYG, CONTROLLER_SHADOW
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Tabs extends BaseElement {
  static getName() {
    return "tabs";
  }
  static getTitle() {
    return "Tabs";
  }
  static getIconComponent() {
    return TabsIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("type_content", {
      tab: TAB_CONTENT,
      label: "Type"
    });

    this.addControl("type_type", {
      type: CONTROLLER_SELECT,
      label: "Type",
      default: "tabs",
      options: [
        {
          value: "tabs",
          label: "tabs"
        },
        {
          value: "switcher",
          label: "switcher"
        }
      ],
    });

    this.endControlSection();

    this.startControlSection("tabs_content", {
      tab: TAB_CONTENT,
      label: "Tabs"
    });

    this.addControl("layout_tabs", {
      type: CONTROLLER_SELECT,
      label: "Layout",
      default: "top",
      options: [
        {
          value: "top",
          label: "top"
        },
        {
          value: "bottom",
          label: "bottom"
        },
        {
          value: "left",
          label: "left"
        },
        {
          value: "right",
          label: "right"
        }
      ],
    });

    let repeater = new Repeater();

    repeater.addControl('title_and_content_items', {
      type: CONTROLLER_TEXT,
      label: 'Title & content',
      default: 'tab'
    });

    repeater.addControl('id_items', {
      type: CONTROLLER_TEXT,
      label: 'ID for default activation',
    });

    repeater.addControl('icon_items', {
      type: CONTROLLER_MEDIA,
      label: 'icon',
    });

    repeater.addControl("wysiwyg_items", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "text"
    });

    repeater.addControl("card_template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?value=guid',
      nullable: true,
    });

    this.addControl('items_tabs', {
      label: 'Tab Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
        { title_and_content_items: "tab #1", wysiwyg_items: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
        { title_and_content_items: "tab #2", wysiwyg_items: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." }
      ]
    });

    this.addControl('alignment_tabs', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'flex-start',
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
          value: 'space-between',
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-tab-btn-container{{STATE}}': 'justify-content: {{VALUE}};',
      },
    });

    this.addControl("spacing_column_tabs", {
      type: CONTROLLER_SLIDER,
      label: "Tab spacing",
      default: {
        size: 10,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tab-btn-column{{STATE}}": "margin-right: {{SIZE}}{{UNIT}}",
        "{{ELEMENT}} .altrp-tab-btn-row{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("spacing_content_tabs", {
      type: CONTROLLER_SLIDER,
      label: "Content spacing",
      default: {
        size: 10,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tab-btn-top{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}}",
        "{{ELEMENT}} .altrp-tab-btn-bottom{{STATE}}": "margin-top: {{SIZE}}{{UNIT}}",
        "{{ELEMENT}} .altrp-tab-btn-left{{STATE}}": "margin-right: {{SIZE}}{{UNIT}}",
        "{{ELEMENT}} .altrp-tab-btn-right{{STATE}}": "margin-left: {{SIZE}}{{UNIT}}"
      }
    });

    this.endControlSection();

    this.startControlSection("section_one_content", {
      tab: TAB_CONTENT,
      label: "Section 1"
    });

    this.addControl('title_section_one', {
      type: CONTROLLER_TEXT,
      label: 'Title',
      default: 'Section 1'
    });

    this.addControl('type_section_one', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      default: "text",
      options: [
        {
          'value': 'image',
          'label': 'image',
        },
        {
          'value': 'text',
          'label': 'text editor',
        },
      ],
    }
    );

    this.addControl("wysiwyg_section_one", {
      // conditions: {
      //   'type_section_one': 'text',
      // },
      type: CONTROLLER_WYSIWYG,
      label: "Text editor",
    });

    this.addControl('media_section_one', {
      conditions: {
        'type_section_one': 'image',
      },
      type: CONTROLLER_MEDIA,
      label: 'Choose image',
    });

    this.endControlSection();

    this.startControlSection("section_two_content", {
      tab: TAB_CONTENT,
      label: "Section 2"
    });

    this.addControl('title_section_two', {
      type: CONTROLLER_TEXT,
      label: 'Title',
      default: 'Section 2'
    });

    this.addControl('type_section_two', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      default: "text",
      options: [
        {
          'value': 'image',
          'label': 'image',
        },
        {
          'value': 'text',
          'label': 'text editor',
        },
      ],
    }
    );

    this.addControl("wysiwyg_section_two", {
      // conditions: {
      //   'type_section_two': 'text',
      // },
      type: CONTROLLER_WYSIWYG,
      label: "Text editor",
    });

    this.addControl('media_section_two', {
      conditions: {
        'type_section_two': 'image',
      },
      type: CONTROLLER_MEDIA,
      label: 'Choose image',
    });

    this.endControlSection();

    this.startControlSection("tab_style", {
      tab: TAB_STYLE,
      label: "Tab"
    });

    this.addControl("background_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Background tabs",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn-container{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("background_type_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Background buttons",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("background_text_color_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('box_shadow_tab_style', {
      type: CONTROLLER_SHADOW,
      label: 'Box shadow',
      default: {
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
        '{{ELEMENT}} .altrp-tab-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    }
    );

    this.addControl("padding_tab_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 10,
        right: 15,
        bottom: 10,
        left: 15,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("border_type_tab_style", {
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
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_tab_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_tab_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_tab_style", {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default: {
        size: 0,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tab-btn{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('typographic_tab_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 14,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-tab-btn{{STATE}}': [
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

    this.endControlSection();

    this.startControlSection("content_style", {
      tab: TAB_STYLE,
      label: "Content"
    });

    this.addControl("background_content_style", {
      type: CONTROLLER_COLOR,
      label: "Background",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("text_color_content_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content div{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl("padding_content_style", {
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
        "{{ELEMENT}} .altrp-tab-content{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("border_type_content_style", {
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
        "{{ELEMENT}} .altrp-tab-content{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-tab-content{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_content_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-tab-content{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_content_style", {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default: {
        size: 0,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tab-content{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('typographic_content_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.4,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-tab-content div{{STATE}}': [
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

    this.endControlSection();

    this.startControlSection("icon_style", {
      tab: TAB_STYLE,
      label: "Icon"
    });

    this.addControl('alignment_icon_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'left',
      options: [
        {
          icon: 'block_left',
          value: 'left',
        },
        {
          icon: 'block_right',
          value: 'right',
        },
      ],
    });

    this.addControl("color_icon_style", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-tab-btn-icon{{STATE}} svg path": "fill: {{COLOR}};"
      }
    });

    this.addControl("spacing_icon_style", {
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      default: {
        size: 8,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection("switch_button_style", {
      tab: TAB_STYLE,
      label: "Switch button"
    });

    this.addControl("box_around_color_after_switch_button_style", {
      type: CONTROLLER_COLOR,
      label: "Box around color after",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher_off": "background: {{COLOR}};"
      }
    });

    this.addControl("box_around_color_before_switch_button_style", {
      type: CONTROLLER_COLOR,
      label: "Box around color before",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher_on": "background: {{COLOR}};"
      }
    });

    this.addControl("switch_after_color_switch_button_style", {
      type: CONTROLLER_COLOR,
      label: "Switch color after",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher__caret": "background: {{COLOR}};"
      }
    });

    this.addControl("switch_before_color_switch_button_style", {
      type: CONTROLLER_COLOR,
      label: "Switch color before",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher_on .altrp-tabs-switcher__caret": "background: {{COLOR}};"
      }
    });

    // https://prnt.sc/tk4s77

    this.addControl("size_switch_button_style", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default: {
        size: '16',
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher-container": "font-size: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("spacing_switch_button_style", {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      default: {
        size: null,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher": [
          "margin-left: {{SIZE}}{{UNIT}}",
          "margin-right: {{SIZE}}{{UNIT}}",
        ]
      }
    });

    this.addControl("margin_bottom_switch_button_style", {
      type: CONTROLLER_SLIDER,
      label: 'Margin bottom',
      default: {
        size: null,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher-container": "margin-bottom: {{SIZE}}{{UNIT}}",
      }
    });

    this.addControl('border_radius_box_switch_button_style', {
      type: CONTROLLER_SLIDER,
      label: 'Box around border radius',
      default: {
        size: 100,
        unit: 'vh',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-tabs-switcher': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl('border_radius_switch_switch_button_style', {
      type: CONTROLLER_SLIDER,
      label: 'Switch border radius',
      default: {
        size: 100,
        unit: 'vh',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-tabs-switcher__caret': 'border-radius: {{SIZE}}{{UNIT}}',
      },
    });
    this.endControlSection();

    this.startControlSection("section_one_style", {
      tab: TAB_STYLE,
      label: "Section 1"
    });

    this.addControl('heading_title_section_one_style', {
      type: CONTROLLER_HEADING,
      label: 'Title',
    });

    this.addControl('typographic_title_section_one_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.4,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-tabs-switcher-label-section-one': [
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

    this.addControl("color_title_section_one_style", {
      type: CONTROLLER_COLOR,
      label: "Switch color before",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher-label-section-one": "color: {{COLOR}};"
      }
    });

    this.addControl('heading_content_section_one_style', {
      type: CONTROLLER_HEADING,
      label: 'Content',
    });

    this.addControl('typographic_content_section_one_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.4,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-tabs-switcher-section-one-text p': [
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

    this.addControl("color_content_section_one_style", {
      type: CONTROLLER_COLOR,
      label: "Switch color before",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher-section-one-text": "color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection("section_two_style", {
      tab: TAB_STYLE,
      label: "Section 2"
    });

    this.addControl('heading_title_section_two_style', {
      type: CONTROLLER_HEADING,
      label: 'Title',
    });

    this.addControl('typographic_title_section_two_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.4,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-tabs-switcher-label-section-two': [
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

    this.addControl("color_title_section_two_style", {
      type: CONTROLLER_COLOR,
      label: "Switch color before",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher-label-section-two": "color: {{COLOR}};"
      }
    });

    this.addControl('heading_content_section_two_style', {
      type: CONTROLLER_HEADING,
      label: 'Content',
    });

    this.addControl('typographic_content_section_two_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.4,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: "Open Sans",
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-tabs-switcher-section-two-text p': [
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

    this.addControl("color_content_section_two_style", {
      type: CONTROLLER_COLOR,
      label: "Switch color before",
      default: {
        color: "",
        colorPickedHex: "",
      },
      rules: {
        "{{ELEMENT}} .altrp-tabs-switcher-section-two-text": "color: {{COLOR}};"
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Tabs;
