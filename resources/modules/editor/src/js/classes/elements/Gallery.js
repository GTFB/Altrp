import BaseElement from "./BaseElement";
import GalleryIcon from "../../../svgs/gallery.svg";
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
  CONTROLLER_WYSIWYG, CONTROLLER_SHADOW, CONTROLLER_FILTERS, CONTROLLER_GRADIENT
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import {advancedTabControllers} from "../../decorators/register-controllers";

class Gallery extends BaseElement {
  static getName() {
    return "gallery";
  }
  static getTitle() {
    return "Gallery";
  }
  static getIconComponent() {
    return GalleryIcon;
  }
  static getType() {
    return "widget";
  }
  static getGroup() {
    return "Advanced";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection("settings_content", {
      tab: TAB_CONTENT,
      label: "Settings"
    });

    this.addControl("type_settings", {
      type: CONTROLLER_SELECT,
      label: "Type",
      default: "single",
      options: [
        {
          value: "single",
          label: "Single"
        },
        {
          value: "multiple",
          label: "Multiple"
        }
      ],
    });

    let simpleRepeater = new Repeater();

    simpleRepeater.addControl('simple_media_settings', {
      type: CONTROLLER_MEDIA,
      label: 'Choose image',
    });

    simpleRepeater.addControl('simple_title_media_settings', {
      type: CONTROLLER_TEXT,
      label: 'Title',
      default: 'Title'
    });

    simpleRepeater.addControl('simple_description_media_settings', {
      type: CONTROLLER_TEXTAREA,
      label: 'Description',
      default: "Description"
    });
    this.addControl('repeater_simple_settings', {
      label: 'Images',
      type: CONTROLLER_REPEATER,
      fields: simpleRepeater.getControls(),
      default: [
      ],
      locked: true,
    });

    this.addControl('path', {
      label: 'Path',
      locked: true,
    });

    this.addControl("order_by_settings", {
      type: CONTROLLER_SELECT,
      label: "Order by",
      default: "default",
      options: [
        {
          value: "default",
          label: "Default"
        },
        {
          value: "random",
          label: "Random"
        }
      ],
      locked: true,
    });

    this.addControl('lazy_load_settings', {
      type: CONTROLLER_SWITCHER,
      label: 'Lazy load',
    });

    this.addControl('layout_settings', {
      type: CONTROLLER_SELECT,
      label: 'Layout',
      default: 'grid',
      options: [
        {
          value: 'grid',
          label: 'Grid'
        },
        {
          value: 'justified',
          label: 'Justified'
        },
        {
          value: 'masonry',
          label: 'masonry'
        },
      ],
      locked: true,
    });

    this.addControl('columns_grid_settings', {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_NUMBER,
      label: 'Columns',
    });

    this.addControl("spacing_grid_settings", {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      units: ['px', '%', 'vh', 'vw'],
      default: {unit: "px"},
      max: 100,
      min: 0,
    });

    this.addControl('link_type_grid_settings', {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_SELECT,
      label: 'Link',
      default: 'none',
      options: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'media',
          label: 'Media file'
        },
        {
          value: 'custom',
          label: 'Custom URL'
        }
      ],
      locked: true,
    });

    this.addControl('aspect_ratio_grid_settings', {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_SELECT,
      label: 'Aspect ratio',
      options: [
        {
          value: '1to1',
          label: '1:1'
        },
        {
          value: '3to2',
          label: '3:2'
        },
        {
          value: '4to3',
          label: '4:3'
        },
        {
          value: '9to16',
          label: '9:16'
        },
        {
          value: '16to9',
          label: '16:9'
        },
        {
          value: '21to9',
          label: '21:9'
        },
      ],
    });

    this.addControl("height_justified_settings", {
      conditions: {
        'layout_settings': 'justified',
      },
      type: CONTROLLER_SLIDER,
      label: "Row height",
      units: ['px', '%', 'vh', 'vw'],
      default: { size: "220", unit: "px"},
      max: 500,
      min: 50,
    });

    this.addControl("spacing_justified_settings", {
      conditions: {
        'layout_settings': 'justified',
      },
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('overlay', {
      tab: TAB_CONTENT,
      label: 'Overlay',
    });

    this.addControl('overlay_switcher', {
      type: CONTROLLER_SWITCHER,
      label: 'Overlay',
      locked: true,
    });

    this.addControl('overlay_background', {
      conditions: {
        'overlay_switcher': true,
      },
      default: false,
      type: CONTROLLER_SWITCHER,
      label: 'Background',
    });

    this.addControl('overlay_title_and_description', {
      conditions: {
        'overlay_switcher': true,
      },
      type: CONTROLLER_SELECT,
      label: 'Title and description',
      default: 'none',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'title',
          'label': 'Title',
        },
        {
          'value': 'titleAndDescription',
          'label': 'Title and description',
        },
      ],
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('image_style_section', {
      tab: TAB_STYLE,
      label: 'Image',
    });

    this.addControl('border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border type',
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

    this.addControl(
      'border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border width',
        default: {
          bind: true
        },
        units: ['px', '%', 'vh', 'vw'],
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border color',
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });


    this.addControl('image_hover_animation', {
      type: CONTROLLER_SELECT,
      label: 'Hover animation',
      options: [
        {
          'value': 'none',
          'label': 'None',
        },
        {
          'value': 'zoomIn',
          'label': 'Zoom in',
        },
        {
          'value': 'zoomOut',
          'label': 'Zoom out',
        },
        {
          'value': 'moveLeft',
          'label': 'Move left',
        },
        {
          'value': 'moveRight',
          'label': 'Move Right',
        },
        {
          'value': 'moveUp',
          'label': 'Move Up',
        },
        {
          'value': 'moveDown',
          'label': 'Move down',
        },
      ],
      locked: true,
    });

    this.addControl('image_transition', {
      type: CONTROLLER_SLIDER,
      label: 'Animation duration (ms)',
      default: {
        size: 800,
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 3000,
      min: 0,
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('overlay_style_section', {
      tab: TAB_STYLE,
      label: 'Overlay',
    });

    this.addControl('overlay_background_color', {
      conditions: {
        'overlay_background': true,
      },
      type: CONTROLLER_COLOR,
      label: 'Background color',
      // default: {
      //   color: "rgb(52,59,76)",
      //   colorPickedHex: "#343B4C",
      // },
    });

    this.addControl('overlay_background_gradient', {
      conditions: {
        'overlay_background': true,
      },
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

    this.addControl('blend_mode', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "initial",
          label: "None"
        },
        {
          value: "multiply",
          label: "Multiply"
        },
        {
          value: "screen",
          label: "Screen"
        },
        {
          value: "overlay",
          label: "Overlay"
        },
        {
          value: "darken",
          label: "Darken"
        },
        {
          value: "lighten",
          label: "Lighten"
        },
        {
          value: "color-dodge",
          label: "Color dodge"
        },
        {
          value: "color-burn",
          label: "Color burn"
        },
        {
          value: "hard-light",
          label: "Hard light"
        },
        {
          value: "soft-light",
          label: "Soft light"
        },
        {
          value: "difference",
          label: "Difference"
        },
        {
          value: "exclusion",
          label: "Exclusion"
        },
        {
          value: "hue",
          label: "Hue"
        },
        {
          value: "saturation",
          label: "Saturation"
        },
        {
          value: "color",
          label: "Color"
        },
        {
          value: "luminosity",
          label: "Luminosity"
        }
      ],
      label: 'Blend mode'
    });

    this.addControl('hover_animation_overlay', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "slideInRight",
          label: "Slide in right"
        },
        {
          value: "slideInLeft",
          label: "Slide in left"
        },
        {
          value: "slideInUp",
          label: "Slide in up"
        },
        {
          value: "slideInDown",
          label: "Slide in down"
        },
        {
          value: "zoomIn",
          label: "Zoom in"
        },
        {
          value: "zoomOut",
          label: "Zoom out"
        },
        {
          value: "fadeIn",
          label: "FadeIn"
        },
      ],
      label: 'Hover animation',
      default: 'none',
      locked: true,
    });

    this.addControl('overlay_transition', {
      type: CONTROLLER_SLIDER,
      label: 'Animation duration (ms)',
      default: {
        size: 800,
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 3000,
      min: 0,
      locked: true,
    });

    this.addControl('overlay_content', {
      type: CONTROLLER_HEADING,
      label: 'Content',
    });

    this.addControl('overlay_content_alignment', {
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

    this.addControl('overlay_content_vertical', {
      type: CONTROLLER_CHOOSE,
      label: 'Vertical Alignment',
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

    this.addControl('overlay_content_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },

      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('overlay_title_label', {
      type: CONTROLLER_HEADING,
      label: 'Title',
    });

    this.addControl('overlay_title_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('overlay_title_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('overlay_title_spacing', {
      type: CONTROLLER_SLIDER,
      label: 'Spacing',
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('overlay_description_label', {
      type: CONTROLLER_HEADING,
      label: 'Description',
    });

    this.addControl('overlay_description_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    });

    this.addControl('overlay_description_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );
    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Gallery;
