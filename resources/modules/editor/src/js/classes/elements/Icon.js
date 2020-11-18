import BaseElement from "./BaseElement";
import IconIcon from '../../../svgs/favorite.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_WYSIWYG,
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED,
  CONTROLLER_MEDIA,
  CONTROLLER_CREATIVE_LINK,
  CONTROLLER_GRADIENT, CONTROLLER_REPEATER, CONTROLLER_HEADING
} from "../modules/ControllersManager";

class Icon extends BaseElement{

  static getName(){
    return'icon';
  }
  static getTitle(){
    return'Icon';
  }

  static getIconComponent(){
    return IconIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('icon_box_content', {
      tab: TAB_CONTENT,
      label: 'Icon box',
    });

    this.addControl('media_icon_box_content', {
      type: CONTROLLER_MEDIA,
      label: 'Choose chevron',
    });

    this.addControl('label_icon_box_content', {
      type: CONTROLLER_TEXT,
      label: 'Title',
      default: "Title"
    });

    this.addControl('switch_link_icon_box_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Title link',
    });

    this.addControl('link_icon_box_content', {
      conditions: {
        'switch_link_icon_box_content': true,
      },
      type: CONTROLLER_LINK,
      default: {
        url: "/",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'Link',
    });

    this.addControl('description_icon_box_content', {
      type: CONTROLLER_TEXTAREA,
      label: 'Description',
      default: 'I am this description'
    });

    this.endControlSection();

    this.startControlSection('additional_options_content', {
      tab: TAB_CONTENT,
      label: 'Addiction Options',
    });

    this.addControl('html_tag_additional_options_content', {
      type: CONTROLLER_SELECT,
      label: 'Title HTML tag',
      default: "h3",
      options:[
        {
          'value' : 'h1',
          'label' : 'H1',
        },
        {
          'value' : 'h2',
          'label' : 'H2',
        },
        {
          'value' : 'h3',
          'label' : 'H3',
        },
        {
          'value' : 'h4',
          'label' : 'H4',
        },
        {
          'value' : 'h5',
          'label' : 'H5',
        },
        {
          'value' : 'h6',
          'label' : 'H6',
        },
        {
          'value' : 'div',
          'label' : 'div',
        },
        {
          'value' : 'span',
          'label' : 'span',
        },
        {
          'value' : 'p',
          'label' : 'p',
        },
      ],
      });

    this.addControl('read_more_button_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Read more',
    });

    this.addControl('indicator_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Indicator',
    });

    this.addControl('badge_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Badge',
    });

    this.addControl('global_link_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Global link',
    });

    this.addControl('global_link_link_additional_options_content', {
      conditions: {
        'global_link_additional_options_content': true,
      },
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'Global link',
    });

    this.addControl('hover_all_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Hover all',
    });

    this.addControl("hover_all_transition_additional_options_content", {
      conditions: {
        'hover_all_additional_options_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Hover all transition',
      default:{
        size: 0,
        unit: 'px',
      },
      step: 0.1,
      max: 1,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}};",
          "padding-right: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection('read_more_content', {
      tab: TAB_CONTENT,
      label: 'Read more',
    });

    this.addControl('text_read_more_content', {
      type: CONTROLLER_TEXT,
      default: "Read more",
      label: 'Text',
    });

    this.addControl('link_read_more_content', {
      type: CONTROLLER_LINK,
      default: {
        url: "/",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'Link',
    });

    this.addControl('icon_read_more_content', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    this.addControl('icon_position_additional_options_content', {
      type: CONTROLLER_SELECT,
      label: 'Icon position',
      default: "right",
      options:[
        {
          'value' : 'right',
          'label' : 'Right',
        },
        {
          'value' : 'left',
          'label' : 'Left',
        },
      ],
      }
    );

    this.addControl("icon_spacing_additional_options_content", {
      type: CONTROLLER_SLIDER,
      label: 'Icon spacing',
      default:{
        size: 5,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-read-more-link .altrp-icon-read-more-icon-right": "margin-left: {{SIZE}}{{UNIT}};",
        "{{ELEMENT}} .altrp-icon-read-more-link .altrp-icon-read-more-icon-left": "margin-right: {{SIZE}}{{UNIT}};"
      }
    });

    this.addControl('show_on_hover_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Show on hover',
    });

    this.addControl("horizontal_offset_additional_options_content", {
      conditions: {
        'show_on_hover_additional_options_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default:{
        size: -50,
        unit: 'px',
      },
      units: [
        "px",
        "%"
      ],
      max: 200,
      min: -200,
    });

    this.addControl("vertical_offset_additional_options_content", {
      conditions: {
        'show_on_hover_additional_options_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset',
      default:{
        size: 0,
        unit: 'px',
      },
      units: [
        "px",
        "%"
      ],
      max: 200,
      min: -200,
    });

    this.endControlSection();

    this.startControlSection('indicator_content', {
      tab: TAB_CONTENT,
      label: 'Indicator',
    });

    this.addControl('icon_indicator_content', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    this.addControl("width_indicator_content", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default:{
        size: 100,
        unit: 'px',
      },
      max: 300,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-indicator{{STATE}}": [
          "width: {{SIZE}}{{UNIT}};",
          "height: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    this.addControl("horizontal_offset_indicator_content", {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default:{
        size: 0,
        unit: 'px',
      },
      units: [
        "px",
        "%"
      ],
      max: 300,
      min: -300,
    });

    this.addControl("vertical_offset_indicator_content", {
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset',
      default:{
        size: -50,
        unit: '%',
      },
      units: [
        "px",
        "%"
      ],
      max: 300,
      min: -300,
    });

    this.addControl("rotate_indicator_content", {
      type: CONTROLLER_SLIDER,
      label: 'rotate',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 360,
      min: -360,
    });

    this.endControlSection();

    this.startControlSection('badge_content', {
      tab: TAB_CONTENT,
      label: 'Badge',
    });

    this.addControl('text_badge_content', {
      type: CONTROLLER_TEXT,
      label: 'Text',
      default: "Badge"
    });

    this.addControl('position_badge_content', {
        type: CONTROLLER_SELECT,
        label: 'Position',
        default: "topLeft",
        options:[
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

    this.addControl("horizontal_offset_badge_content", {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default:{
        size: 0,
        unit: 'px',
      },
      units: [
        "px",
        "%"
      ],
      max: 300,
      min: -300,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}};",
          "padding-right: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    this.addControl("vertical_offset_badge_content", {
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset',
      default:{
        size: 0,
        unit: 'px',
      },
      units: [
        "px",
        "%"
      ],
      max: 300,
      min: -300,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}};",
          "padding-right: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    this.addControl("rotate_badge_content", {
      type: CONTROLLER_SLIDER,
      label: 'Rotate',
      default:{
        size: 0,
        unit: 'px',
      },
      units: [
        "px",
        "%"
      ],
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}};",
          "padding-right: {{SIZE}}{{UNIT};}"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection('position_style', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('icon_position_desktop_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Icon position',
      default: 'column',
      options:[
        {
          icon: 'left',
          value: 'row',
        },
        {
          icon: 'center',
          value: 'column',
        },
        {
          icon: 'right',
          value: 'row-reverse',
        }
      ],
      rules: {
        '{{ELEMENT}} .altrp-icon': "flex-direction: {{VALUE}};",
      },
    });

    this.addControl('icon_position_desktop__horizontal_alignment_position_style', {
      conditions: {
        'icon_position_desktop_position_style': "column",
      },
      type: CONTROLLER_CHOOSE,
      label: 'Horizontal alignment',
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
      rules: {
        '{{ELEMENT}} .altrp-icon-header': "justify-content: {{VALUE}};",
      },
    });

    this.addControl('icon_position_desktop_vertical_alignment_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Vertical alignment',
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
      rules: {
        '{{ELEMENT}} .altrp-icon-header': "align-items: {{VALUE}};",
      },
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
      rules: {
        "{{ELEMENT}} .altrp-icon{{STATE}}": "background-color: {{COLOR}};"
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
        "{{ELEMENT}} .altrp-icon{{STATE}}": "opacity: {{SIZE}}"
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
        "{{ELEMENT}} .altrp-icon{{STATE}}": "background: {{VALUE}}"
      }
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      rules: {
        "{{ELEMENT}} .altrp-icon-background-image{{STATE}}": "background-image: url({{URL}});"
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
        "{{ELEMENT}} .altrp-icon-background-image{{STATE}}": "background-position: {{VALUE}};"
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
        "{{ELEMENT}} .altrp-icon-background-image{{STATE}}": "background-attachment: {{VALUE}};"
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
        "{{ELEMENT}} .altrp-icon-background-image{{STATE}}": "background-repeat: {{VALUE}};"
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
        "{{ELEMENT}} .altrp-icon-background-image{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
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
        "{{ELEMENT}} .altrp-icon-background-image{{STATE}}": "background-size: {{VALUE}};"
      }
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('border_type', {
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
          '{{ELEMENT}} .altrp-icon{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl(
      'border_width', {
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
          '{{ELEMENT}} .altrp-icon{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon{{STATE}}': 'border-color: {{COLOR}};',
        },
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
      rules: {
        '{{ELEMENT}} .altrp-icon{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
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
      rules: {
        '{{ELEMENT}} .altrp-icon{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    this.endControlSection();

    this.startControlSection('icon_or_image_style', {
      tab: TAB_STYLE,
      label: 'Icon/image',
    });

    this.addControl('color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Icon fill color',
        rules: {
          '{{ELEMENT}} .altrp-icon-i{{STATE}} path': 'fill: {{COLOR}};',
        },
      }
    );

    this.addControl('svg_border_color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'stroke color',
      rules: {
        '{{ELEMENT}} .altrp-icon-i{{STATE}} path': 'stroke: {{COLOR}};',
      },
      }
    );

    this.addControl('background_color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        rules: {
          '{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('padding_icon_or_image_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Padding',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}': 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_heading_icon_or_image_style', {
      type: CONTROLLER_HEADING,
      label: 'Border',
    });

    this.addControl('border_type_icon_or_image_style', {
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
          '{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('border_width_icon_or_image_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border width',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        rules: {
          '{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl("border_radius_icon_or_image_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Radius",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
      }
    });

    this.addControl('other_heading_icon_or_image_style', {
      type: CONTROLLER_HEADING,
      label: 'Other',
    });

    this.addControl('box_shadow_other_icon_or_image_style', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
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
        '{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    //тут небольшой костыль
    this.addControl("spacing_other_one_icon_or_image_style", {
      conditions: {
        'icon_position_desktop_position_style': "row",
      },
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-header{{STATE}};": [
          "margin-right: {{SIZE}}{{UNIT}};",
        ]
      }
    });

    this.addControl("spacing_other_two_icon_or_image_style", {
      conditions: {
        'icon_position_desktop_position_style': "column",
      },
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-header{{STATE}};": [
          "margin-bottom: {{SIZE}}{{UNIT}};",
        ]
      }
    });

    this.addControl("spacing_other_three_icon_or_image_style", {
      conditions: {
        'icon_position_desktop_position_style': "row-reverse",
      },
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-header{{STATE}}": [
          "margin-left: {{SIZE}}{{UNIT}};",
        ]
      }
    });

    this.addControl("size_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      max: 300,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-i{{STATE}}": [
          "width: {{SIZE}}{{UNIT}};",
          "height: {{SIZE}}{{UNIT}};"
        ]
      }
    });

    this.addControl("rotate_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Rotate',
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-icon-i{{STATE}}": "transform: rotate({{SIZE}}deg);"
      }
    });

    this.addControl("background_rotate_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Background rotate',
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-icon-i-wrapper{{STATE}}": "transform: rotate({{SIZE}}deg);"
      }
    });

    this.addControl('svg_heading_icon_or_image_style', {
      type: CONTROLLER_HEADING,
      label: 'Svg',
    });

    this.addControl("border_width_svg_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Border width',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("border_dash_svg_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Border dash',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("border_offset_svg_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Border offset',

      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl('continuous_animation_heading_icon_or_image_style', {
      type: CONTROLLER_HEADING,
        label: 'Continuous animation',
    });

    this.addControl('continuous_animation_switcher_icon_or_image_style', {
      type: CONTROLLER_SWITCHER,
      label: 'Switch animation',
    });

    this.addControl('continuous_animation_effect_icon_or_image_style', {
      conditions: {
        'continuous_animation_switcher_icon_or_image_style': true,
      },
        type: CONTROLLER_SELECT,
        label: 'Effect',
        options:[
          {
            'value' : 'pulse',
            'label' : 'Pulse',
          },
          {
            'value' : 'floating',
            'label' : 'Floating',
          },
          {
            'value' : 'tossing',
            'label' : 'Tossing',
          },
          {
            'value' : 'rotating',
            'label' : 'Rotating',
          },
        ],
        rules: {
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('continuous_animation_transform_origin_icon_or_image_style', {
        conditions: {
          'continuous_animation_switcher_icon_or_image_style': true,
          'continuous_animation_effect_icon_or_image_style': 'rotating'
        },
        type: CONTROLLER_SELECT,
        label: 'Transform origin',
        options:[
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
            'value' : 'centerCenter',
            'label' : 'Center center',
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
        rules: {
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('hover_animation_switcher_icon_or_image_style', {
      conditions: {
        'continuous_animation_switcher_icon_or_image_style': true,
      },
      type: CONTROLLER_SWITCHER,
      label: 'Hover animation',
    });

    this.addControl("continuous_animation_duration_icon_or_image_style", {
      conditions: {
        'continuous_animation_switcher_icon_or_image_style': true,
        'hover_animation_switcher_icon_or_image_style': true
      },
      type: CONTROLLER_SLIDER,
      label: 'Duration time',
      step: 0.5,
      max: 50,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection('content_style', {
      tab: TAB_STYLE,
      label: 'Content',
    });

    this.addControl('header_alignment_content_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Header alignment',
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
        '{{ELEMENT}} .altrp-icon-body{{STATE}}': 'justify-content: {{VALUE}};',
      },
    });

    this.addControl('description_alignment_content_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Description alignment',
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
        '{{ELEMENT}} .altrp-icon-footer{{STATE}}': 'justify-content: {{VALUE}};'
      },
    });

    this.addControl('padding_content_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-icon-content{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('title_heading_content_style', {
      type: CONTROLLER_HEADING,
      label: 'Title',
    });

    this.addControl("title_spacing_content_style", {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-body{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('title_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-body-link{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('title_background_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-body{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('title_typographic_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        rules: {
          '{{ELEMENT}} .altrp-icon-body-link{{STATE}}': [
            'font-family: "{{FAMILY}}", sans-serif;',
            'font-size: {{SIZE}}px;',
            'line-height: {{LINEHEIGHT}};',
            'letter-spacing: {{SPACING}}px;',
            'font-weight: {{WEIGHT}};',
            'text-transform: {{TRANSFORM}};',
            'font-style: {{STYLE}};',
            'text-decoration: {{DECORATION}};'
          ],
        },
      }
    );

    this.addControl('description_heading_content_style', {
      type: CONTROLLER_HEADING,
      label: 'Description',
    });

    this.addControl("description_spacing_content_style", {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-icon-footer{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl('description_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-footer-text{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('description_background_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-footer{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('description_typographic_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        rules: {
          '{{ELEMENT}} .altrp-icon-footer-text{{STATE}}': [
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

    this.startControlSection('read_more_style', {
      tab: TAB_STYLE,
      label: 'Read more',
    });

    this.addControl('attention_switch_read_more_style', {
      type: CONTROLLER_SWITCHER,
      label: 'Attention',
    });

    this.addControl('text_color_read_more_style', {
        type: CONTROLLER_COLOR,
        label: 'Text color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('background_color_read_more_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_type_read_more_style', {
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
          '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('border_width_read_more_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true
        },
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color_read_more_style', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_radius_read_more_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl('box_shadow_read_more_style', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
        blur: 0,
        horizontal: 0,
        vertical: 0,
        opacity: 1,
        spread: 1,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
        type: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    this.addControl('padding_read_more_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('typography_read_more_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        rules: {
          '{{ELEMENT}} .altrp-icon-read-more-link{{STATE}}': [
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

    this.startControlSection('indicator_style', {
      tab: TAB_STYLE,
      label: 'Indicator',
    });

    this.addControl("stroke_width_indicator_style", {
      type: CONTROLLER_SLIDER,
      label: 'Stroke width',
      units:[
        'px',
        'em',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("stroke_dash_array_indicator_style", {
      type: CONTROLLER_SLIDER,
      label: 'Stroke dash array',
      units:[
        'px',
        'em',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("stroke_dash_offset_indicator_style", {
      type: CONTROLLER_SLIDER,
      label: 'Stroke dash offset',
      units:[
        'px',
        'em',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl('fill_color_indicator_style', {
        type: CONTROLLER_COLOR,
        label: 'Fill color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-indicator{{STATE}} path': 'fill: {{COLOR}};',
        },
      }
    );

    this.addControl('background_indicator_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-indicator{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('stroke_color_indicator_style', {
        type: CONTROLLER_COLOR,
        label: 'Stroke color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-indicator{{STATE}} path': 'stroke: {{COLOR}};',
        },
      }
    );

    this.endControlSection();

    this.startControlSection('badge_style', {
      tab: TAB_STYLE,
      label: 'badge',
    });

    this.addControl('text_color_badge_style', {
        type: CONTROLLER_COLOR,
        label: 'Text color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-badge{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('background_color_badge_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-icon-badge{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl("border_type_badge_style", {
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
        "{{ELEMENT}} .altrp-icon-badge{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_badge_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-icon-badge{{STATE}}": "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_badge_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      rules: {
        "{{ELEMENT}} .altrp-icon-badge{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_badge_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-icon-badge{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
      }
    });

    this.addControl('box_shadow_badge_style', {
        type: CONTROLLER_SHADOW,
        label: 'Box shadow',
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
          '{{ELEMENT}} .altrp-icon-badge{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
        },
      }
    );

    this.addControl('padding_badge_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-icon-badge{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('typography_badge_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        rules: {
          '{{ELEMENT}} .altrp-icon-badge{{STATE}}': [
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

    advancedTabControllers(this);
  }
}

export default Icon
