import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/widget_heading.svg";
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
    this.startControlSection("text_section", {
      tab: TAB_CONTENT,
      label: "Text Section",
    });

    this.addControl("text", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Heading",
    });

    this.endControlSection();

    this.startControlSection('heading_settings', {
      tab: TAB_CONTENT,
      label: 'Text Settings',
    });

    this.addControl('heading_settings_alignment', {
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
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
      rules: {
            '{{ELEMENT}} .altrp-heading': 'justify-content: {{VALUE}};',
      },
    });

    this.addControl('heading_settings_html_tag', {
      type: CONTROLLER_SELECT,
      label: 'HTML tag',
      default: 'p',
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

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    this.addControl('creative_link_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'for creative link',
    });

    this.endControlSection();

    this.startControlSection('advanced_heading_content', {
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

    this.startControlSection('heading_style_font', {
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
      tab: TAB_STYLE,
      label: "Position"
    });

    this.addControl('style_position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default:{
        // top: 5,
        // right: 0,
        // bottom: 5,
        // left: 0,
        unit:'px'
      },
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
        tab: TAB_STYLE,
        label: 'Creative Link',
      }
    );

    this.addControl('creative_link_controller', {
        type: CONTROLLER_CREATIVE_LINK,
        label: 'Creative Link',
        rules: {
          '{{ELEMENT}} .altrp-btn:after{{STATE}}': [
            'transition-duration: {{SIZE}}s;',
            'height: {{LINEHEIGHT}}px;',
            'color: {{COLOR}};',
            'background: {{BACKGROUND}};',
          ],
          '{{ELEMENT}} .altrp-btn:before{{STATE}}': [
            'transition-duration: {{SIZE}}s;',
            'height: {{LINEHEIGHT}}px;',
            'color: {{COLOR}};',
            'background: {{BACKGROUND}};',
          ],
        },
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Heading;
