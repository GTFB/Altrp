import BaseElement from "./BaseElement";
import IconIcon from '../../../svgs/widget_icon.svg';
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
        url: "",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'Link',
    });

    this.addControl('description_icon_box_content', {
      type: CONTROLLER_TEXTAREA,
      label: 'Description',
    });

    this.endControlSection();

    this.startControlSection('additional_options_content', {
      tab: TAB_CONTENT,
      label: 'Addiction Options',
    });

    this.addControl('html_tag_additional_options_content', {
        type: CONTROLLER_SELECT,
        label: 'Title HTML tag',
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
      }
    );

    this.addControl('read_more_button_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Read more button',
    });

    this.addControl('indicator_additional_options_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Indicator',
    });

    this.addControl('Badge_additional_options_content', {
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
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
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
      label: 'Text',
    });

    this.addControl('link_read_more_content', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
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
        label: 'Title HTML tag',
        default: "right",
        options:[
          {
            'value' : 'right',
            'label' : 'Right',
          },
          {
            'value' : 'left',
            'label' : 'left',
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
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
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
      max: 200,
      min: -200,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
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
      max: 200,
      min: -200,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
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
        size: 25,
        unit: 'px',
      },
      max: 300,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
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
      max: 300,
      min: -300,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("vertical_offset_indicator_content", {
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 300,
      min: -300,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("rotate_indicator_content", {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection('badge_content', {
      tab: TAB_CONTENT,
      label: 'Badge',
    });

    this.addControl('text_badge_content', {
      type: CONTROLLER_TEXT,
      label: 'Text',
    });

    this.addControl('position_badge_content', {
        type: CONTROLLER_SELECT,
        label: 'Position',
        default: "topRight",
        options:[
          {
            'value' : 'default',
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
            'value' : 'center',
            'label' : 'Center',
          },
          {
            'value' : 'centerLeft',
            'label' : 'Center left',
          },
          {
            'value' : 'centerRight',
            'label' : 'Center Right',
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
      max: 300,
      min: -300,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
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
      max: 300,
      min: -300,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
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
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.endControlSection();

    this.startControlSection('position_style', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('desktop_heading_position_style', {
      type: CONTROLLER_HEADING,
      label: 'Desktop',
    });

    this.addControl('icon_position_desktop_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Icon position desktop',
      default: 'center',
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

    this.addControl('icon_position_desktop_alignment_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Horizontal alignment',
      default: 'center',
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

    this.addControl('tablet_heading_position_style', {
      type: CONTROLLER_HEADING,
      label: 'Tablet',
    });

    this.addControl('icon_position_tablet_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Icon position tablet',
      default: 'center',
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

    this.addControl('icon_position_tablet_alignment_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Horizontal alignment',
      default: 'center',
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

    this.addControl('mobile_heading_position_style', {
      type: CONTROLLER_HEADING,
      label: 'Mobile',
    });

    this.addControl('icon_position_mobile_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Icon position mobile',
      default: 'center',
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

    this.addControl('icon_position_mobile_alignment_position_style', {
      type: CONTROLLER_CHOOSE,
      label: 'Horizontal alignment',
      default: 'center',
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

    this.endControlSection();

    this.startControlSection('icon_or_image_style', {
      tab: TAB_STYLE,
      label: 'Icon/image',
    });

    this.addControl('color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Icon color',
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'fill: {{COLOR}};',
        },
      }
    );

    this.addControl('svg_border_color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Svg border color',
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'fill {{COLOR}};',
        },
      }
    );

    this.addControl('background_color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Background color',
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'background-color: {{COLOR}};',
        },
      }
    );

    this.addControl('padding_icon_or_image_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Padding',
        default: {
          bind: true
        },
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl('border_width_icon_or_image_style', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border width',
        default: {
          bind: true
        },
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color_icon_or_image_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        rules: {
          '.{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl("border_radius_icon_or_image_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Radius",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        ".{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
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
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    this.addControl('typographic_other_icon_or_image_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 16,
          weight: "normal",
          family: 'roboto',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}': [
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

    this.addControl("spacing_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      default:{
        size: 15,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("size_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      default:{
        size: 25,
        unit: 'px',
      },
      max: 300,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("rotate_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Rotate',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl("background_rotate_other_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Background rotate',
      default:{
        size: 0,
        unit: 'px',
      },
      max: 360,
      min: -360,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl('svg_heading_icon_or_image_style', {
      type: CONTROLLER_HEADING,
      label: 'Svg',
    });

    this.addControl("border_width_svg_icon_or_image_style", {
      type: CONTROLLER_SLIDER,
      label: 'Border width',
      default:{
        size: 0,
        unit: 'px',
      },
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
      default:{
        size: 0,
        unit: 'px',
      },
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
      default:{
        size: 0,
        unit: 'px',
      },
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
      default:{
        size: 0,
        unit: 'px',
      },
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

    this.addControl('alignment_content_style', {
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
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
      rules: {
        '{{ELEMENT}}': 'align-items: {{VALUE}};',
        '{{ELEMENT}} .altrp-dropbar': 'align-items: {{VALUE}};',
      },
    });

    this.addControl('padding_content_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        // top: 20,
        // right: 25,
        // bottom: 20,
        // left: 25,
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
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
      default:{
        size: 10,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('title_background_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('title_typographic_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 24,
          weight: "normal",
          family: 'roboto',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}': [
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

    this.addControl('description_heading_content_style', {
      type: CONTROLLER_HEADING,
      label: 'Description',
    });

    this.addControl("description_spacing_content_style", {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      default:{
        size: 10,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-nav-menu-ul-dropdown-hor-ver-li-link{{STATE}}": [
          "padding-left: {{SIZE}}{{UNIT}}",
          "padding-right: {{SIZE}}{{UNIT}}"
        ]
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('description_background_color_content_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
        },
      }
    );

    this.addControl('description_typographic_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typography',
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 24,
          weight: "normal",
          family: 'roboto',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}': [
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-style: {{VALUE}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_radius_read_more_style', {
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
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
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
        spread: 0,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
        type: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    this.addControl('padding_read_more_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn-icon{{STATE}}': [
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
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 24,
          weight: "normal",
          family: 'roboto',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}': [
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

    this.addControl('media_indicator_style', {
      type: CONTROLLER_MEDIA,
      label: 'Indicator',
    });

    this.addControl("stroke_width_indicator_style", {
      type: CONTROLLER_SLIDER,
      label: 'Stroke width',
      default:{
        size: 0,
        unit: 'px',
      },
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
      default:{
        size: 0,
        unit: 'px',
      },
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
      default:{
        size: 0,
        unit: 'px',
      },
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl('color_indicator_style', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(50,168,82)",
        //   colorPickedHex: "#32a852",
        // },
        rules: {
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
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
          '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
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
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_badge_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_badge_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("border_radius_badge_style", {
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
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
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
        spread: 0,
        colorRGB: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        colorPickedHex: '#000000',
        type: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
        },
      }
    );

    this.addControl('padding_badge_style', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default:{
        // top: 20,
        // right: 25,
        // bottom: 20,
        // left: 25,
        unit:'px',
        bind: true
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
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
        default:{
          lineHeight: 1,
          spacing: 0,
          size: 24,
          weight: "normal",
          family: 'roboto',
          decoration: ""
        },
        rules: {
          '{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}': [
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
