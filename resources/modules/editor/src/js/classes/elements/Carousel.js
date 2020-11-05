import BaseElement from "./BaseElement";
import WidgetIcon from '../../../svgs/slider-push.svg';
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_HEADING,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_REPEATER,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED, CONTROLLER_MEDIA, CONTROLLER_SWITCHER
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class Carousel extends BaseElement {

  static getName() {
    return 'carousel';
  }
  static getTitle() {
    return 'Carousel';
  }

  static getIconComponent() {
    return WidgetIcon;
  }
  static getType() {
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('slides_content', {
      tab: TAB_CONTENT,
      label: 'Slides',
    });

    this.addControl('skin_slides_content', {
      type: CONTROLLER_SELECT,
      label: 'Skin',
      default: 'solid',
      options: [
        {
          value: 'carousel',
          label: 'carousel'
        },
        {
          value: 'coverflow',
          label: 'coverflow'
        },
      ]
    });

    let repeater = new Repeater();

    repeater.addControl('image_slides_repeater', {
      type: CONTROLLER_MEDIA,
      label: 'image',
    });

    repeater.addControl('link_to_slides_repeater', {
      type: CONTROLLER_SELECT,
      label: 'Link to',
      default: 'none',
      options: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'mediaFile',
          label: 'media file'
        },
        {
          value: 'customURL',
          label: 'custom URL'
        },
      ]
    });

    repeater.addControl('custom_url_slides_repeater', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    repeater.addControl('overlay_text_repeater', {
      type: CONTROLLER_TEXT,
      label: '(Overlay) text',
    });

    this.addControl('slides_repeater', {
      label: 'Tab Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
      ]
    });

    this.addControl('lightbox_slides_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Lightbox',
      default: false
    });

    this.addControl('per_view_slides_content', {
      type: CONTROLLER_SELECT,
      label: 'Slides per view',
      default: 1,
      options: [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 7,
          label: '7'
        },
        {
          value: 8,
          label: '8'
        },
        {
          value: 9,
          label: '9'
        },
        {
          value: 10,
          label: '10'
        },
      ]
    });

    this.addControl('to_scroll_slides_content', {
      type: CONTROLLER_SELECT,
      label: 'Slides to scroll',
      default: 1,
      options: [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 7,
          label: '7'
        },
        {
          value: 8,
          label: '8'
        },
        {
          value: 9,
          label: '9'
        },
        {
          value: 10,
          label: '10'
        },
      ]
    });

    this.addControl('per_row_slides_content', {
      type: CONTROLLER_SELECT,
      label: 'Rows',
      default: 1,
      options: [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 5,
          label: '5'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 7,
          label: '7'
        },
        {
          value: 8,
          label: '8'
        },
        {
          value: 9,
          label: '9'
        },
        {
          value: 10,
          label: '10'
        },
      ]
    });

    this.addControl("height_slides_content", {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      default: {
        size: 220,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-carousel-slide{{STATE}}": "height: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("width_slides_content", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 100,
        unit: '%',
      },
      units: [
        'px',
        '%',
      ],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .slick-list{{STATE}}": "width: {{SIZE}}{{UNIT}}"
      }
    });

    this.endControlSection();

    this.startControlSection('navigation_content', {
      tab: TAB_CONTENT,
      label: 'Navigation',
    });

    this.addControl('arrows_navigation_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Arrows',
      default: false
    });

    this.addControl('arrows_position_navigation_content', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_SELECT,
      label: 'Arrows position',
      default: 'center',
      options: [
        {
          value: 'topLeft',
          label: 'top left'
        },
        {
          value: 'top',
          label: 'top center'
        },
        {
          value: 'topRight',
          label: 'top right'
        },
        {
          value: 'center',
          label: 'center'
        },
        {
          value: 'bottomLeft',
          label: 'bottom left'
        },
        {
          value: 'bottom',
          label: 'bottom center'
        },
        {
          value: 'bottomRight',
          label: 'bottom right'
        },
      ]
    });

    this.addControl('dots_navigation_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Dots',
      default: true
    });

    this.addControl('dots_position_navigation_content', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SELECT,
      label: 'Arrows position',
      default: 'bottom',
      options: [
        {
          value: 'topLeft',
          label: 'top left'
        },
        {
          value: 'top',
          label: 'top center'
        },
        {
          value: 'topRight',
          label: 'top right'
        },
        {
          value: 'bottomLeft',
          label: 'bottom left'
        },
        {
          value: 'bottom',
          label: 'bottom center'
        },
        {
          value: 'bottomRight',
          label: 'bottom right'
        },
      ]
    });

    this.endControlSection();

    this.startControlSection('additional_content', {
      tab: TAB_CONTENT,
      label: 'Additional options',
    });

    this.addControl('transition_duration_additional_content', {
      type: CONTROLLER_NUMBER,
      label: "Transition duration",
      default: 500,
    });

    this.addControl('autoplay_additional_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Autoplay',
      default: false
    });

    this.addControl('transition_autoplay_duration_additional_content', {
      conditions: {
        'autoplay_additional_content': true,
      },
      type: CONTROLLER_NUMBER,
      label: "Transition duration autoplay",
      default: 2000,
    });

    this.addControl('infinite_loop_additional_content', {
      type: CONTROLLER_SWITCHER,
      label: 'infinite',
      default: true
    });

    this.addControl('pause_on_interaction_loop_additional_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Pause on interaction',
      default: true
    });

    this.addControl('overlay_heading_additional_content', {
      type: CONTROLLER_HEADING,
      label: 'Overlay',
    });

    this.addControl('overlay_select_heading_additional_content', {
      type: CONTROLLER_SELECT,
      label: 'Overlay',
      default: 'none',
      options: [
        {
          'value': 'none',
          'label': 'none',
        },
        {
          'value': 'text',
          'label': 'text',
        },
        {
          'value': 'icon',
          'label': 'icon',
        },
      ],
    }
    );

    this.addControl('overlay_animation_text_heading_additional_content', {
      type: CONTROLLER_SELECT,
      label: 'Animation',
      default: 'fade',
      options: [
        {
          'value': 'none',
          'label': 'none',
        },
        {
          'value': 'fade',
          'label': 'fade',
        },
        {
          'value': 'scaleUp',
          'label': 'scale up',
        },
        {
          'value': 'scaleDown',
          'label': 'scale down',
        },
        {
          'value': 'slideTop',
          'label': 'slide top',
        },
        {
          'value': 'slideBottom',
          'label': 'slide bottom',
        },
        {
          'value': 'slideLeft',
          'label': 'slide left',
        },
        {
          'value': 'slideRight',
          'label': 'slide right',
        },
        {
          'value': 'slideTopSmall',
          'label': 'slide top small',
        },
        {
          'value': 'slideBottomSmall',
          'label': 'slide bottom small',
        },
        {
          'value': 'slideLeftSmall',
          'label': 'slide left small',
        },
        {
          'value': 'slideRightSmall',
          'label': 'slide right small',
        },
        {
          'value': 'slideTopMedium',
          'label': 'slide top medium',
        },
        {
          'value': 'slideBottomMedium',
          'label': 'slide bottom medium',
        },
        {
          'value': 'slideLeftMedium',
          'label': 'slide left medium',
        },
        {
          'value': 'slideRightMedium',
          'label': 'slide right medium',
        },
      ],
    }
    );

    this.addControl('image_heading_additional_content', {
      type: CONTROLLER_HEADING,
      label: 'Image',
    });

    this.addControl('image_fit_additional_content', {
      type: CONTROLLER_SELECT,
      label: 'Image fit',
      default: 'cover',
      options: [
        {
          'value': 'cover',
          'label': 'cover',
        },
        {
          'value': 'contain',
          'label': 'contain',
        },
        {
          'value': 'auto',
          'label': 'auto',
        },
      ],
      rules: {
        '{{ELEMENT}} .altrp-carousel-slide-img{{STATE}}': 'background-size: {{VALUE}};',
      },
    }
    );

    this.endControlSection();

    this.startControlSection('slides_style', {
      tab: TAB_STYLE,
      label: 'Slides',
    });

    this.addControl('space_between_slides_style', {
      type: CONTROLLER_SLIDER,
      label: 'Space between',
      default: {
        size: 15,
        unit: 'px',
      },
      max: 50,
      min: 0,
      rules: {
        '{{ELEMENT}} .slick-slide{{STATE}}': 'padding: 0 {{SIZE}}{{UNIT}}',
        '{{ELEMENT}} .altrp-carousel-dots{{STATE}}': [
          'padding-left: {{SIZE}}{{UNIT}}',
          'padding-right: {{SIZE}}{{UNIT}}',
        ],
      },
    });

    this.addControl("background_slides_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-carousel-slide{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("border_width_slides_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-carousel-slide-img{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_slides_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-carousel-slide-img{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    this.addControl("padding_slides_style", {
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
        "{{ELEMENT}} .altrp-carousel-slide{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

    this.addControl("border_radius_slides_style", {
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
        "{{ELEMENT}} .altrp-carousel-slide{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
      }
    });

    this.endControlSection();

    this.startControlSection('navigation_style', {
      tab: TAB_STYLE,
      label: 'Navigation',
    });

    this.addControl('arrows_heading_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_HEADING,
      label: 'Arrows'
    })

    this.addControl('arrows_size_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Arrows size',
      default: {
        size: 50,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-carousel-arrow svg{{STATE}}': [
          'width: {{SIZE}}{{UNIT}}',
          'height: {{SIZE}}{{UNIT}}',
        ],
      },
    });

    this.addControl("arrows_background_navigation_style", {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-carousel-arrow{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("arrows_color_navigation_style", {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_COLOR,
      label: "Arrows color",
      default: {
        color: "",
        colorPickedHex: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-carousel-arrow{{STATE}} svg path": "stroke: {{COLOR}};"
      }
    });

    this.addControl('padding_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-carousel-arrow{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('border_radius_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-carousel-arrow{{STATE}}': 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    });

    this.addControl('horizontal_offset_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
        'arrows_position_navigation_content': 'center'
      },
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default: {
        size: 0,
        unit: 'px',
      },
      max: 400,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-carousel-arrow-prev{{STATE}}': 'left: {{SIZE}}{{UNIT}}',
        '{{ELEMENT}} .altrp-carousel-arrow-next{{STATE}}': 'right: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl('vertical_no_center_offset_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset (no center)',
      default: {
        size: 0,
        unit: 'px',
      },
      max: 200,
      min: -200,
      rules: {
        '{{ELEMENT}} .altrp-carousel-arrows-container{{STATE}}': 'transform: translateY({{SIZE}}{{UNIT}})',
      },
    });

    // this.addControl('horizontal_no_center_offset_arrows_navigation_style', {
    //   conditions: {
    //     'arrows_navigation_content' : true,
    //   },
    //   type: CONTROLLER_SLIDER,
    //   label: 'Horizontal offset (no center)',
    //   default:{
    //     size: 0,
    //     unit: 'px',
    //   },
    //   max: 200,
    //   min: -200,
    //   rules: {
    //     '{{ELEMENT}} .altrp-carousel-arrows-container{{STATE}}': 'transform: translateX({{SIZE}}{{UNIT}})',
    //   },
    // });

    this.addControl('dots_heading_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_HEADING,
      label: 'Dots'
    })

    this.addControl('dots_size_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Dots size',
      default: {
        size: 10,
        unit: 'px',
      },
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-carousel-paging{{STATE}}': [
          'width: {{SIZE}}{{UNIT}}',
          'height: {{SIZE}}{{UNIT}}',
        ],
        '{{ELEMENT}} .altrp-carousel-dots li{{STATE}}': 'margin-left: calc({{SIZE}}{{UNIT}} * 0.5)',
      },
    });

    this.addControl('background_color_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_COLOR,
      label: 'Dots color',
      default: {
        color: "rgb(164,164,164)",
        colorPickedHex: "#a4a4a4",
      },
      rules: {
        '{{ELEMENT}} .altrp-carousel-paging{{STATE}}': 'background-color: {{COLOR}};',
      },
    });

    this.addControl('background_color_active_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_COLOR,
      label: 'Active dots color',
      default: {
        color: "rgb(19,106,237)",
        colorPickedHex: "#136aed",
      },
      rules: {
        '{{ELEMENT}} .altrp-carousel-dots .slick-active .altrp-carousel-paging{{STATE}}': 'background-color: {{COLOR}};',
      },
    });

    this.addControl('horizontal_offset_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default: {
        size: 0,
        unit: 'px',
      },
      max: 200,
      min: -200,
      rules: {
        '{{ELEMENT}} .altrp-carousel-dots{{STATE}}': 'left: {{SIZE}}{{UNIT}}',
      },
    });

    this.addControl('vertical_no_center_offset_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset (no center)',
      default: {
        size: 0,
        unit: 'px',
      },
      max: 200,
      min: -200,
      rules: {
        '{{ELEMENT}} .altrp-carousel-dots{{STATE}}': 'transform: translateY({{SIZE}}{{UNIT}})',
      },
    });

    this.endControlSection();

    this.startControlSection('overlay_style', {
      tab: TAB_STYLE,
      label: 'Overlay',
    });

    this.addControl('background_color_overlay', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
      default: {
        color: "rgb(255, 255, 255)",
        colorPickedHex: "#FFFFFF",
      },
      rules: {
        '{{ELEMENT}} .altrp-carousel-slide-overlay{{STATE}}': 'background-color: {{COLOR}};',
      },
    }
    );

    this.addControl("font_color_overlay", {
      type: CONTROLLER_COLOR,
      label: "text color",
      default: {
        color: "rgb(0, 0, 0)",
        colorPickedHex: "#000000",
      },
      rules: {
        "{{ELEMENT}} .altrp-carousel-slide-overlay-text{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('typographic_overlay', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1.5,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: '"roboto"',
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-carousel-slide-overlay-text{{STATE}}': [
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

    // this.startControlSection('lightbox_style', {
    //   tab: TAB_STYLE,
    //   label: 'Lightbox',
    // });

    // this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Carousel
