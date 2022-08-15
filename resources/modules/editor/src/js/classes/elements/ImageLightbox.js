import BaseElement from "./BaseElement";
import ImageIcon from '../../../svgs/lightbox.svg';
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

class ImageLightbox extends BaseElement {
  static getName() {
    return 'image-lightbox';
  }
  static getTitle() {
    return 'Image Lightbox';
  }

  static getIconComponent() {
    return ImageIcon;
  }
  static getType() {
    return 'widget';
  }
  static getGroup() {
    return "Advanced";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('l_id', {
      label: 'Lightbox ID',
      responsive: false,
      locked: true,
    });

    this.addControl('content_media', {
      type: CONTROLLER_MEDIA,
      label: 'Image',
      locked: true,
    });

    this.addControl('content_path', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      responsive: false,
      label: 'Path',
      locked: true,
    });


    this.addControl('default_url', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      responsive: false,
      label: 'Default Image URL',
      locked: true,
    });

    this.addControl('lightbox_switch', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Lightbox',
    });

    this.addControl('cursor_pointer', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Cursor pointer',
      locked: true,
    });


    this.addControl('lazyload_disable', {
      hideOnEmail: true,
      type: CONTROLLER_SWITCHER,
      label: 'Lazyload Disable',
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
      }
    );



    this.addControl('aspect_ratio_size', {
        type: CONTROLLER_SELECT,
        label: 'Aspect Ratio',
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
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl('width_size', {
      type: CONTROLLER_SLIDER,
      label: 'Width',

      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('position_style_section', {
      tab: TAB_STYLE,
      label: 'Position'
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',

      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',

      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
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

      max: 1,
      min: 0,
      step: 0.01,
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

    });
    this.addControl('image_style_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
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
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: 'Background',
    });

    this.addControl("background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",

    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',

    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      locked: true,
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
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      conditions: {
        'background_size': [''],
      },
      units: ['px', '%', 'vh', 'vw'],
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
      }
    );

    this.addControl('border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
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
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default ImageLightbox
