import BaseElement from "./BaseElement";
import ImageIcon from '../../../svgs/image.svg';
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_MEDIA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SLIDER,
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
  CONTROLLER_FILTERS,
  CONTROLLER_CHOOSE,
  CONTROLLER_COLOR,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_LINK,
  CONTROLLER_SWITCHER,
  CONTROLLER_CREATIVE_HOVER,
  CONTROLLER_GRADIENT
} from "../modules/ControllersManager";

class Image extends BaseElement {
  static getName() {
    return 'image';
  }
  static getTitle() {
    return 'Image';
  }

  static getIconComponent() {
    return ImageIcon;
  }
  static getType() {
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('content_media', {
      type: CONTROLLER_MEDIA,
      label: 'Image',
    });

    this.addControl('content_path', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      responsive: false,
      label: 'Path',
    });


    this.addControl('default_url', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      responsive: false,
      label: 'Default Image URL',
    });

    this.addControl('lightbox_switch', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Lightbox',
      default: false
    });

    this.addControl('cursor_pointer', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Cursor pointer',
      default: false
    });


    this.addControl('lazyload_disable', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Lazyload Disable',
      default: false
    });

    this.endControlSection();

    this.startControlSection("link", {
      tab: TAB_CONTENT,
      label: "Link"
    });

    this.addControl('image_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false,
        tag: 'Link'
      },
      label: 'Link',
    });

    this.endControlSection();

    this.startControlSection('style_section', {
      tab: TAB_STYLE,
      label: ''
    });

    this.endControlSection();

    this.startControlSection('size_section', {
      tab: TAB_STYLE,
      label: 'Size',
    });

    this.addControl('image_fit_size', {
          type: CONTROLLER_SELECT,
          label: 'Image fit',
          // default: "cover",
          options: [
            {
              'value': 'fill',
              'label': 'Fill',
            },
            {
              'value': 'contain',
              'label': 'Contain',
            },
            {
              'value': 'cover',
              'label': 'Cover',
            },
            {
              'value': 'none',
              'label': 'None',
            },
            {
              'value': 'scale-down',
              'label': 'Scale down',
            }
          ],
          // rules: {
          //   '{{ELEMENT}} .altrp-image{{STATE}}': 'object-fit: {{VALUE}};',
          // },
        }
    );

    // this.addControl('aspect_ratio_off', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Aspect Ratio Off',
    //   default: true,
    //   prefixClass: 'aspect-ratio-off_'
    // });


    this.addControl('aspect_ratio_size', {
          type: CONTROLLER_SELECT,
          label: 'Aspect Ratio',
          default: '0',
          options: [
            {
              'value': '0',
              'label': 'None',
            },
            {
              'value': '100',
              'label': '1:1',
            },
            {
              'value': '56.25',
              'label': '16:9',
            },
            {
              'value': '75',
              'label': '4:3',
            },
            {
              'value': '133.33',
              'label': '3:4',
            },
            {
              'value': '177.78',
              'label': '9:16',
            },
            {
              'value': 'custom',
              'label': 'Custom',
            },
          ],
        }
    );

    this.addControl('custom_aspect', {
      label: 'Aspect Ratio Value',
      dynamic: false,
      conditions: {
        'aspect_ratio_size': 'custom',
      },
    });

    this.addControl('height_size', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      units: [
        'px',
        'vh',
      ],
      max: 1000,
      min: 0,
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'height: {{SIZE}}{{UNIT}}',
      // },
    });

    this.addControl('width_size', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 100,
        unit: '%',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'width: {{SIZE}}{{UNIT}}',
      // },
    });

    this.endControlSection();

    this.startControlSection('position_style_section', {
      tab: TAB_STYLE,
      label: 'Position'
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': [
      //     'margin-top: {{TOP}}{{UNIT}};',
      //     'margin-right: {{RIGHT}}{{UNIT}};',
      //     'margin-bottom: {{BOTTOM}}{{UNIT}};',
      //     'margin-left: {{LEFT}}{{UNIT}};'
      //   ]
      // },
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': [
      //     'padding-top: {{TOP}}{{UNIT}};',
      //     'padding-right: {{RIGHT}}{{UNIT}};',
      //     'padding-bottom: {{BOTTOM}}{{UNIT}};',
      //     'padding-left: {{LEFT}}{{UNIT}};'
      //   ]
      // },
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
      default: 0,
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'z-index: {{VALUE}}'
      // }
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes'
    });

    this.endControlSection();

    this.startControlSection('overlay_section', {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Overlay',
    });

    this.addControl('opacity_overlay', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      // default:{
      //   size: 1,
      // },
      max: 1,
      min: 0,
      step: 0.01,
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'opacity: {{SIZE}}',
      // },
    });

    this.endControlSection();

    this.startControlSection('image_style_section', {
      tab: TAB_STYLE,
      label: 'Image'
    });

    this.addControl('image_style_text_shadow', {
      hideOnEmail: true,
      type: CONTROLLER_FILTERS,
      label: 'filters',
      default: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hue: 0,
      },
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': [
      //     'filter: blur({{BLUR}}px)  brightness({{BRIGHTNESS}}%) contrast({{CONTRAST}}%) saturate({{SATURATE}}%) hue-rotate({{HUE}}deg);'
      //   ],
      // },
    });
    this.addControl('image_style_alignment', {
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
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-image-container{{STATE}}': 'justify-content: {{VALUE}};',
      // },
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl("background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      // rules: {
      //   "{{ELEMENT}} .altrp-image{{STATE}}": "background-color: {{COLOR}};"
      // }
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
      //   "{{ELEMENT}} .altrp-image{{STATE}}": "background-image: {{VALUE}}",
      // }
    });


    this.addControl('background_image', {
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

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      units: [
        'px',
        '%',
        'vh',
      ],
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
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'border-style: {{VALUE}};',
      // },
    }
    );

    this.addControl('border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      units: [
        'px',
        '%',
        'vh',
      ],
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': `border-top-width: {{TOP}}{{UNIT}};
      //       border-right-width: {{RIGHT}}{{UNIT}};
      //       border-bottom-width: {{BOTTOM}}{{UNIT}};
      //       border-left-width: {{LEFT}}{{UNIT}};`,
      // },
    }
    );

    this.addControl('border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
      // default: {
      //   color: "rgb(50,168,82)",
      //   colorPickedHex: "#32a852",
      // },
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'border-color: {{COLOR}};',
      // },
    }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default: {
        // size: 0,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': 'border-radius: {{SIZE}}{{UNIT}}',
      // },
    });

    this.endControlSection();

    this.startControlSection('creative_hover_section', {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Creative Hover'
    });

    this.addControl('creative_hover_controller', {
      type: CONTROLLER_CREATIVE_HOVER,
      label: 'Creative Hover',
      // rules: {
      //   '{{ELEMENT}} .altrp-image{{STATE}}': [
      //     'transition-duration: {{SIZE}}s;',
      //     'animation-duration: {{SIZE}}s'
      //   ],
      // },
    }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Image
