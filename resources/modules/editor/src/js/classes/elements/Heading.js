import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/text.svg";
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
  static getGroup() {
    return "Basic";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("type_section", {
      hideOnEmail: true,
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
      default: "I Am Advanced Text",
    });

    this.addControl('text_sub_switch', {
      hideOnEmail: true,
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
    });

    this.addControl('heading_settings_html_tag', {
      hideOnEmail: true,
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
      hideOnEmail: true,
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
    });

    this.addControl("horizontal_offset_advanced_heading_content", {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      max: 800,
      min: -800,
    });

    this.addControl("vertical_offset_advanced_heading_content", {
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset',
      max: 800,
      min: -800,
    });

    this.addControl("rotate_offset_advanced_heading_content", {
      type: CONTROLLER_SLIDER,
      label: 'Rotate',
      max: 360,
      min: -360,
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
          value: 'slideDown',
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
      default: "Amazing\nBigger\nFaster"
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
    });

    this.addControl('heading_style_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
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
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: "Z-index",
      default: 0,
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
    });

    this.addControl('background_image', {
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
      units: [
        'px',
        '%',
        'vw',
      ],
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
    });

    this.addControl("style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
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
    });

    this.endControlSection();

    this.startControlSection('transform_style_font', {
      conditions: {
        'type': 'heading',
      },
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Transform',
    });

    this.addControl("transform_style", {
      type: CONTROLLER_TRANSFORM,
      label: "Transform",
      default: {
        size: 0,
      },
    });

    this.endControlSection();

    this.startControlSection('advanced_heading_style', {
      conditions: {
        'type': 'heading',
      },
      hideOnEmail: true,
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

      }
    );

    this.addControl('color_advanced_heading_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',

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
    });

    this.addControl('typography_advanced_heading_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
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
      }
    );

    this.addControl('border_color_advanced_heading_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
      }
    );

    this.addControl("border_radius_advanced_heading_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Radius",
      units: ["px", "%", "vh"],
    });


    this.addControl("opacity_advanced_heading_style", {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      max: 1,
      step: 0.05,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('creative_link', {
      conditions: {
        'type': 'heading',
      },
      hideOnEmail: true,
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
      hideOnEmail: true,
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
    });


    this.addControl('bg_sub_heading', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
      }
    );

    this.addControl('color_sub_heading', {
        type: CONTROLLER_COLOR,
        label: 'text color',
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
      }
    );

    this.addControl("width_shape_animating", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 8,
        unit: '',
      },
      max: 20,
      min: 0,
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
      }
    );

    this.addControl('text_headline_animating_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('text_heading_headline_animating_style', {
      type: CONTROLLER_HEADING,
      label: 'Animated text',
    });

    this.addControl('animated_text_color_headline_animating_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
      }
    );

    this.addControl('animated_text_headline_animating_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Heading;
