import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/t-letter.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_NUMBER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SLIDER,
  CONTROLLER_LINK,
  CONTROLLER_TRANSFORM,
  CONTROLLER_CHOOSE,
  CONTROLLER_GRADIENT,
  CONTROLLER_MEDIA, CONTROLLER_SWITCHER, CONTROLLER_HEADING, CONTROLLER_CREATIVE_LINK
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Heading extends BaseElement {
  static getName() {
    return "heading";
  }
  static getTitle() {
    return "Heading";
  }
  static getIconComponent() {
    return HeadingIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("type_section", {
      tab: TAB_CONTENT,
      label: "Heading type",
    });

    this.addControl('type', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      default: 'heading',
      options: [
        {
          value: 'heading',
          label: 'Heading'
        },
        {
          value: 'animating',
          label: 'Animating'
        }
      ]
    });

    this.endControlSection();

    this.startControlSection("text_section", {
      conditions: {
          'type': 'heading',
      },
      tab: TAB_CONTENT,
      label: "Text Section",
    });

    this.addControl("text", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Heading",
    });

    this.addControl('text_sub_switch', {
      type: CONTROLLER_SWITCHER,
      label: 'Sub heading',
      default: false
    });

    this.addControl("text_sub", {
      conditions: {
        'text_sub_switch': true,
      },
      type: CONTROLLER_TEXTAREA,
      label: "Sub text",
      default: "I Am Sub Heading",
    });

    this.endControlSection();

    this.startControlSection('heading_settings', {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_CONTENT,
      label: 'Text Settings',
    });

    this.addControl('heading_settings_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
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
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
      prefixClass: 'altrp-alignment_',
      rules: {
        '{{ELEMENT}} .altrp-heading': 'justify-content: {{VALUE}};',
        '{{ELEMENT}} .altrp-heading-wrapper': 'justify-content: {{VALUE}};',
      },
    });

    this.addControl('sub_heading_settings_alignment', {
      conditions: {
        'text_sub_switch': true,
      },
      type: CONTROLLER_CHOOSE,
      label: 'Sub alignment',
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
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
      prefixClass: 'altrp-alignment_',
      rules: {
        '{{ELEMENT}} .altrp-heading-sub': 'justify-content: {{VALUE}};',
      },
    });

    this.addControl('heading_settings_html_tag', {
      type: CONTROLLER_SELECT,
      label: 'HTML tag',
      default: 'h2',
      options: [
        {
          value: 'h1',
          label: 'h1'
        },
        {
          value: 'h2',
          label: 'h2'
        },
        {
          value: 'h3',
          label: 'h3'
        },
        {
          value: 'h4',
          label: 'h4'
        },
        {
          value: 'h5',
          label: 'h5'
        },
        {
          value: 'h6',
          label: 'h6'
        },
        {
          value: 'p',
          label: 'p'
        },
        {
          value: 'span',
          label: 'span'
        },
        {
          value: 'div',
          label: 'div'
        }
      ]
    });

    this.addControl('sub_heading_settings_html_tag', {
      conditions: {
        'text_sub_switch': true,
      },
      type: CONTROLLER_SELECT,
      label: 'Sub HTML tag',
      default: 'h5',
      options: [
        {
          value: 'h1',
          label: 'h1'
        },
        {
          value: 'h2',
          label: 'h2'
        },
        {
          value: 'h3',
          label: 'h3'
        },
        {
          value: 'h4',
          label: 'h4'
        },
        {
          value: 'h5',
          label: 'h5'
        },
        {
          value: 'h6',
          label: 'h6'
        },
        {
          value: 'p',
          label: 'p'
        },
        {
          value: 'span',
          label: 'span'
        },
        {
          value: 'div',
          label: 'div'
        }
      ]
    });

    this.addControl('sub_heading_settings_position', {
      conditions: {
        'text_sub_switch': true,
      },
      type: CONTROLLER_SELECT,
      label: 'Sub position',
      default: 'bottom',
      options: [
        {
          value: 'bottom',
          label: 'Bottom'
        },
        {
          value: 'top',
          label: 'Top'
        },
        {
          value: 'right',
          label: 'Right'
        },
        {
          value: 'left',
          label: 'Left'
        }
      ]
    });

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        tag: 'Link',
        noFollow: false
      },
      label: 'link',
    });

    // this.addControl('creative_link_link', {
    //   type: CONTROLLER_LINK,
    //   default: {
    //     url: "",
    //     attributes: "",
    //     noFollow: false
    //   },
    //   label: 'for creative link',
    // });

    this.endControlSection();

    this.startControlSection('advanced_heading_content', {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_CONTENT,
      label: 'Advanced heading',
    });

    this.addControl('switch_advanced_heading_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Advanced heading',
    });

    this.addControl('text_advanced_heading_content', {
      conditions: {
        'switch_advanced_heading_content': true,
      },
      type: CONTROLLER_TEXTAREA,
      label: 'Text',
      default: 'Advanced heading'
    });

    this.addControl('alignment_advanced_heading_content', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
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
        }
      ],
      rules: {
        '{{ELEMENT}} .altrp-heading-advanced-wrapper': "text-align: {{VALUE}};",
      },
    });

    this.addControl("horizontal_offset_advanced_heading_content", {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      max: 800,
      min: -800,
      rules: {
        "{{ELEMENT}} .altrp-icon-header{{STATE}};": [
          "margin-bottom: {{SIZE}}{{UNIT}};",
        ]
      }
    });

    this.addControl("vertical_offset_advanced_heading_content", {
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset',
      max: 800,
      min: -800,
      rules: {
        "{{ELEMENT}} .altrp-icon-header{{STATE}};": [
          "margin-bottom: {{SIZE}}{{UNIT}};",
        ]
      }
    });

    this.addControl("rotate_offset_advanced_heading_content", {
      type: CONTROLLER_SLIDER,
      label: 'Rotate',
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-icon-header{{STATE}};": [
          "margin-bottom: {{SIZE}}{{UNIT}};",
        ]
      }
    });

    this.addControl('transform_origin_offset_advanced_heading_content', {
        type: CONTROLLER_SELECT,
        label: 'Rotate origin',
        options:[
          {
            'value' : "default",
            'label' : 'Default',
          },
          {
            'value' : 'topLeft',
            'label' : 'Top left',
          },
          {
            'value' : 'topCenter',
            'label' : 'Top center',
          },
          {
            'value' : 'topRight',
            'label' : 'Top right',
          },
          {
            'value' : 'centerLeft',
            'label' : 'Center left',
          },
          {
            'value' : 'center',
            'label' : 'Center',
          },
          {
            'value' : 'centerRight',
            'label' : 'Center right',
          },
          {
            'value' : 'bottomLeft',
            'label' : 'Bottom left',
          },
          {
            'value' : 'bottomCenter',
            'label' : 'Bottom center',
          },
          {
            'value' : 'bottomRight',
            'label' : 'Bottom right',
          },
        ],
      }
    );

    this.addControl('hide_at_offset_advanced_heading_content', {
        type: CONTROLLER_SELECT,
        label: 'Hide at',
        options:[
          {
            'value' : "never",
            'label' : 'Nothing',
          },
          {
            'value' : 'tablet',
            'label' : 'Tablet and mobile (1025)',
          },
          {
            'value' : 'mobile',
            'label' : 'Mobile (768)',
          },
        ],
        rules: {
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.endControlSection();

    // animating
    this.startControlSection("animating_section", {
      conditions: {
        'type': 'animating',
      },
      tab: TAB_CONTENT,
      label: "Headline",
    });

    this.addControl('style_animating', {
      type: CONTROLLER_SELECT,
      label: 'Style',
      default: 'highlighted',
      options: [
        {
          value: 'highlighted',
          label: 'Highlighted'
        },
        {
          value: 'rotating',
          label: 'Rotating'
        },
      ]
    });

    this.addControl('shape_animating', {
      conditions: {
        'style_animating': 'highlighted',
      },
      type: CONTROLLER_SELECT,
      label: 'Shape',
      default: 'underline',
      options: [
        {
          value: 'circle',
          label: 'Circle'
        },
        {
          value: 'curly',
          label: 'Curly'
        },
        {
          value: 'underline',
          label: 'Underline'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'doubleUnderline',
          label: 'Double underline'
        },
        {
          value: 'underlineZigzag',
          label: 'Underline zigzag'
        },
        {
          value: 'diagonal',
          label: 'Diagonal'
        },
        {
          value: 'strikethrough',
          label: 'Strikethrough'
        },
        {
          value: 'x',
          label: 'X'
        },
      ]
    });

    this.addControl('animation_animating', {
      conditions: {
        'style_animating': 'rotating',
      },
      type: CONTROLLER_SELECT,
      label: 'Animation',
      default: 'typing',
      options: [
        {
          value: 'typing',
          label: 'Typing'
        },
        {
          value: 'clip',
          label: 'Clip'
        },
        {
          value: 'flip',
          label: 'Flip'
        },
        {
          value: 'swirl',
          label: 'Swirl'
        },
        {
          value: 'blinds',
          label: 'Blinds'
        },
        {
          value: 'dropIn',
          label: 'Drop-in'
        },
        {
          value: 'wave',
          label: 'Wave'
        },
        {
          value: 'slide',
          label: 'Slide'
        },
        {
          value: 'Slide',
          label: 'Slide down'
        },
      ]
    });

    this.addControl('text_heading_animating', {
      conditions: {
        'style_animating': 'highlighted',
      },
      type: CONTROLLER_HEADING,
      label: 'Text',
    });

    this.addControl('text_before_animating', {
      type: CONTROLLER_TEXT,
      label: 'Before',
      default: "this website is"
    });

    this.addControl('text_highlighted_animating', {
      conditions: {
        'style_animating': 'highlighted',
      },
      type: CONTROLLER_TEXT,
      label: 'Highlighted',
      default: "Amazing"
    });

    this.addControl('text_rotating_animating', {
      conditions: {
        'style_animating': 'rotating',
      },
      type: CONTROLLER_TEXTAREA,
      label: 'Rotating',
      default: "Amazing~and~supser"
    });

    this.addControl('text_after_animating', {
      type: CONTROLLER_TEXT,
      label: 'After',
    });

    this.addControl('settings_heading_animating', {
      type: CONTROLLER_HEADING,
      label: '-',
    });

    this.addControl('link_animating', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    this.addControl('alignment_animating', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'center',
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
          value: 'stretch',
        }
      ],
      // rules: {
      //   '{{ELEMENT}}.table-resize_true': 'align-items: {{VALUE}};',
      //   '{{ELEMENT}} .altrp-dropbar': 'align-items: {{VALUE}};',
      // },
    });

    this.addControl('html_tag_animating', {
      type: CONTROLLER_SELECT,
      label: 'HTML tag',
      default: 'h2',
      options: [
        {
          value: 'h1',
          label: 'H1'
        },
        {
          value: 'h2',
          label: 'H2'
        },
        {
          value: 'h3',
          label: 'H3'
        },
        {
          value: 'h4',
          label: 'H4'
        },
        {
          value: 'h5',
          label: 'H5'
        },
        {
          value: 'h6',
          label: 'H6'
        },
        {
          value: 'div',
          label: 'div'
        },
        {
          value: 'span',
          label: 'span'
        },
        {
          value: 'p',
          label: 'p'
        },
      ]
    });

    this.endControlSection();

    this.startControlSection('heading_style_font', {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: 'Font',
    });

    this.addControl("heading_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('heading_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        // default:{
        //   lineHeight: 1.5,
        //   spacing: 0,
        //   size: 36,
        //   weight: "normal",
        //   family: "Open Sans",
        //   decoration: ""
        // },
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': [
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

    this.addControl('heading_style_text_shadow', {
        type: CONTROLLER_SHADOW,
        label: 'Shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
        },
        presetColors: [
          '#eaeaea',
          '#9c18a8'
        ],
        rules: {
          '{{ELEMENT}} .altrp-heading{{STATE}}': 'text-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
        },
      }
    );

    this.endControlSection();

    this.startControlSection("style_position", {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl('style_position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      // default:{
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        // unit:'px'
      // },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-heading{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl("style_position_padding", {
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
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "z-index: {{VALUE}}"
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

    this.startControlSection("style_background", {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: "Background"
    });

    this.addControl("style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("style_background_opacity", {
      type: CONTROLLER_SLIDER,
      label: "Opacity",
      // default: {
      //   size: 1
      // },
      max: 1,
      min: 0,
      step: 0.01,
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "opacity: {{SIZE}}"
      }
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '0',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "100",
        angle: "0",
        value: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "background-image: {{VALUE}}"
      }
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      rules: {
        "{{ELEMENT}} .altrp-heading.altrp-background-image{{STATE}}": "background-image: url({{URL}});"
      }
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
      rules: {
        "{{ELEMENT}} .altrp-heading.altrp-background-image{{STATE}}": "background-position: {{VALUE}};"
      }
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
      rules: {
        "{{ELEMENT}} .altrp-heading.altrp-background-image{{STATE}}": "background-attachment: {{VALUE}};"
      }
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
      rules: {
        "{{ELEMENT}} .altrp-heading.altrp-background-image{{STATE}}": "background-repeat: {{VALUE}};"
      }
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
      rules: {
        "{{ELEMENT}} .altrp-heading.altrp-background-image{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
      }
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
      rules: {
        "{{ELEMENT}} .altrp-heading.altrp-background-image{{STATE}}": "background-size: {{VALUE}};"
      }
    });


    this.endControlSection();

    this.startControlSection("style_border", {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("style_border_type", {
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
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("style_border_radius", {
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
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("style_border_text_decoration", {
      type: CONTROLLER_SELECT,
      label: "text decoration",
      default: "none",
      options: [
        {
          value: "none",
          label: "none"
        },
        {
          value: "line-through",
          label: "line through"
        },
        {
          value: "overline",
          label: "overline"
        },
        {
          value: "underline",
          label: "underline"
        },
      ],
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "text-decoration: {{VALUE}};"
      }
    });

    this.endControlSection();

    this.startControlSection('transform_style_font', {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: 'Transform',
    });

    this.addControl("transform_style", {
      type: CONTROLLER_TRANSFORM,
      label: "Transform",
      default: {
        size: 0,
      },
      rules: {
        "{{ELEMENT}} .altrp-heading{{STATE}}": "transform: {{FUNCTION}}({{SIZE}}{{UNIT}})"
      }
    });

    this.endControlSection();

    this.startControlSection('advanced_heading_style', {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: 'Advanced heading',
    });

    this.addControl('main_fill_advanced_heading_style', {
      type: CONTROLLER_SWITCHER,
      label: 'Main heading fill',
    });

    this.addControl('background_color_advanced_heading_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('color_advanced_heading_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('padding_advanced_heading_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('typography_advanced_heading_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': [
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

    this.addControl('text_shadow_advanced_heading_style', {
        type: CONTROLLER_SHADOW,
        label: 'Text shadow',
        default:{
          blur: 0,
          horizontal: 0,
          vertical: 0,
          opacity: 1,
          spread: 1,
          colorRGB: 'rgb(0, 0, 0)',
          color: 'rgb(0, 0, 0)',
          colorPickedHex: '#000000',
          type: "outline"
        },
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': 'text-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
        },
      }
    );

    this.addControl('border_heading_advanced_heading_style', {
      type: CONTROLLER_HEADING,
      label: 'Border',
    });

    this.addControl('border_type_advanced_heading_style', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options:[
          {
            'value' : 'none',
            'label' : 'None',
          },
          {
            'value' : 'solid',
            'label' : 'Solid',
          },
          {
            'value' : 'double',
            'label' : 'Double',
          },
          {
            'value' : 'dotted',
            'label' : 'Dotted',
          },
          {
            'value' : 'dashed',
            'label' : 'Dashed',
          },
          {
            'value' : 'groove',
            'label' : 'Groove',
          },
        ],
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('border_width_advanced_heading_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border width',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color_advanced_heading_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        rules: {
          '{{ELEMENT}} .altrp-heading-advanced{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl("border_radius_advanced_heading_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Radius",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-heading-advanced{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
      }
    });

    // this.addControl('box_shadow_advanced_heading_style', {
    //     type: CONTROLLER_SHADOW,
    //     label: 'Box shadow',
    //     default:{
    //       blur: 0,
    //       horizontal: 0,
    //       vertical: 0,
    //       opacity: 1,
    //       spread: 1,
    //       colorRGB: 'rgb(0, 0, 0)',
    //       color: 'rgb(0, 0, 0)',
    //       colorPickedHex: '#000000',
    //       type: "outline"
    //     },
    //     rules: {
    //       '{{ELEMENT}} .altrp-heading-advanced{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
    //     },
    //   }
    // );

    this.addControl("opacity_advanced_heading_style", {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      max: 1,
      step: 0.05,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-heading-advanced{{STATE}}": "opacity: {{SIZE}};"

      }
    });

    this.endControlSection();

    this.startControlSection('creative_link', {
      conditions: {
        'type': 'heading',
      },
        tab: TAB_STYLE,
        label: 'Creative Link',
      }
    );

    this.addControl('creative_link_controller', {
        type: CONTROLLER_CREATIVE_LINK,
        label: 'Creative Link',
        rules: {
          "{{ELEMENT}} .altrp-link-creative{{STATE}}": "background-color: {{BACKGROUND}}",
          "{{ELEMENT}} .altrp-link-cl-style-1{{STATE}}": "color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-3:after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-4:after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-5-clone{{STATE}}": [
            "color: {{COLOR}};",
            "background-color: {{SECONDCOLOR}};"
          ],
          "{{ELEMENT}} .altrp-link-cl-style-6::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-7::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-7::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-8::before{{STATE}}": "border-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-8::after{{STATE}}": "border-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-9::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-9::after{{STATE}}": "background-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-9-description{{STATE}}": [
            "color: {{THIRDCOLOR}};",
            "background-color: {{FOURTHCOLOR}};"
          ],
          "{{ELEMENT}} .altrp-link-cl-style-10::after{{STATE}}": [
            "background: {{COLOR}};",
            "color: {{SECONDCOLOR}};",
          ],
          "{{ELEMENT}} .altrp-link-cl-style-11::after{{STATE}}": [
            "color: {{COLOR}};",
            "border-bottom-color: {{SECONDCOLOR}};",
          ],
          "{{ELEMENT}} .altrp-link-cl-style-12::after{{STATE}}": "border-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-12::before{{STATE}}": "border-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-13-link:hover .altrp-link-cl-style-13:after": [
            "color: {{COLOR}};",
            "text-shadow: 10px 0 {{COLOR}}, -10px 0 {{COLOR}};",
          ],
          "{{ELEMENT}} .altrp-link-cl-style-14::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-14::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-15::before{{STATE}}": "color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-16::before{{STATE}}": "color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-17::before{{STATE}}": "color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-17::after{{STATE}}": "background-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-18::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-18::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-19::before{{STATE}}": [
            "background-color: {{COLOR}};",
            "color: {{SECONDCOLOR}}"
          ],
          "{{ELEMENT}} .altrp-link-cl-style-20::before{{STATE}}": [
            "background-color: {{SECONDCOLOR}};",
            "color: {{COLOR}}"
          ],
          "{{ELEMENT}} .altrp-link-cl-style-21::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-21::before{{STATE}}": "background-color: {{SECONDCOLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-22::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-23::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-24::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-24::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-25::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-26::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-27::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-27::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-28::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-28::before{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-29::after{{STATE}}": "background-color: {{COLOR}};",
          "{{ELEMENT}} .altrp-link-cl-style-29::before{{STATE}}": "background-color: {{COLOR}};",
        }
    });

    this.endControlSection();

    this.startControlSection('sub_heading', {
      conditions: {
        'type': 'heading',
      },
      tab: TAB_STYLE,
      label: 'Sub heading',
    });

    this.addControl("spacing_sub_heading", {
      type: CONTROLLER_SLIDER,
      label: 'Space heading',
      default: {
        size: 0,
        unit: 'px',
      },
      units: [
        'px',
        '%',
      ],
      max: 1200,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-heading-wrapper-sub-bottom .altrp-heading-sub{{STATE}}": "margin-top: {{SIZE}}{{UNIT}};",
        "{{ELEMENT}} .altrp-heading-wrapper-sub-top .altrp-heading-sub{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}};",
        "{{ELEMENT}} .altrp-heading-wrapper-sub-left .altrp-heading-sub{{STATE}}": "margin-right: {{SIZE}}{{UNIT}};",
        "{{ELEMENT}} .altrp-heading-wrapper-sub-right .altrp-heading-sub{{STATE}}": "margin-left: {{SIZE}}{{UNIT}};",
      }
    });

    this.addControl("width_sub_heading", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: '%',
      },
      units: [
        '%',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-heading-sub{{STATE}}": "width: {{SIZE}}{{UNIT}};",
      }
    });


    this.addControl('bg_sub_heading', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('color_sub_heading', {
        type: CONTROLLER_COLOR,
        label: 'text color',
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('padding_sub_heading', {
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
        '{{ELEMENT}} .altrp-heading-sub{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('typographic_sub_heading', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default: {
          lineHeight: 1,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: 'roboto',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': [
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

    this.addControl('text_shadow_sub_heading', {
      type: CONTROLLER_SHADOW,
      label: 'Text shadow',
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
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': 'text-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
        },
      }
    );

    this.endControlSection();

    //animating styles

    this.startControlSection('shape_animating_style', {
      conditions: {
        'type': 'animating',
        'style_animating': 'highlighted',
      },
      tab: TAB_STYLE,
      label: 'Shape',
    });

    this.addControl('color_shape_animating', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl("width_shape_animating", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 8,
        unit: 'px',
      },
      units: [
        'px',
      ],
      max: 20,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-carousel-slide{{STATE}}": "height: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('bring_to_front_shape_animating', {
      type: CONTROLLER_SWITCHER,
      label: 'Bring to front',
      default: false
    });

    this.addControl('rounded_edges_shape_animating', {
      type: CONTROLLER_SWITCHER,
      label: 'Rounded edges',
      default: false
    });

    this.endControlSection();

    this.startControlSection('headline_animating_style', {
      conditions: {
        'type': 'animating',
      },
      tab: TAB_STYLE,
      label: 'Headline',
    });

    this.addControl('text_color_headline_animating_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('text_headline_animating_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        // default:{
        //   lineHeight: 1,
        //   spacing: 0,
        //   size: 16,
        //   weight: "normal",
        //   family: "Open Sans",
        //   decoration: ""
        // },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': [
            'font-size: {{SIZE}}px;',
            'font-family: {{FAMILY}}',
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

    this.addControl('text_heading_headline_animating_style', {
      type: CONTROLLER_HEADING,
      label: 'Animated text',
    });

    this.addControl('animated_text_color_headline_animating_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        rules: {
          '{{ELEMENT}} .altrp-heading-sub{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('animated_text_headline_animating_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        // default:{
        //   lineHeight: 1,
        //   spacing: 0,
        //   size: 16,
        //   weight: "normal",
        //   family: "Open Sans",
        //   decoration: ""
        // },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': [
            'font-size: {{SIZE}}px;',
            'font-family: {{FAMILY}}',
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

    advancedTabControllers(this);
  }
}

export default Heading;
