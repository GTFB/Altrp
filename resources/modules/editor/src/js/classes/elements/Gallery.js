import BaseElement from "./BaseElement";
import GalleryIcon from "../../../svgs/widget_gallery.svg";
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
  CONTROLLER_WYSIWYG, CONTROLLER_SHADOW, CONTROLLER_FILTERS
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
      label: 'Choose icon',
    });

    this.addControl('repeater_simple_settings', {
      label: 'Images',
      type: CONTROLLER_REPEATER,
      fields: simpleRepeater.getControls(),
      default: [
      ]
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
    });

    this.addControl('columns_grid_settings', {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_NUMBER,
      label: 'Columns',
      default: 3,
    });

    this.addControl("spacing_grid_settings", {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_SLIDER,
      label: "Spacing",
      units:[
        'px',
      ],
      default: { size: 0, unit: "px"},
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
    });

    this.addControl('aspect_ratio_grid_settings', {
      conditions: {
        'layout_settings': 'grid',
      },
      type: CONTROLLER_SELECT,
      label: 'Aspect ratio',
      default: '1to1',
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
      label: "Height",
      units:[
        'px',
      ],
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
      units:[
        'px',
      ],
      max: 100,
      min: 0,
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
        rules: {
          '{{ELEMENT}} .altrp-gallery-img{{STATE}}': 'border-style: {{VALUE}};',
        },
      }
    );

    this.addControl(
      'border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border width',
        default: {
          bind: true
        },
        units: [
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}} .altrp-gallery-img{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border color',
        rules: {
          '{{ELEMENT}} .altrp-gallery-img{{STATE}}': 'border-color: {{COLOR}};',
        },
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
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
        '{{ELEMENT}} .altrp-gallery-img{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    // this.addControl('filters', {
    //   type: CONTROLLER_FILTERS,
    //   label: 'Filters',
    //   default: {
    //     blur: 0,
    //     brightness: 100,
    //     contrast: 100,
    //     saturate: 100,
    //     hue: 0,
    //   },
    //   rules: {
    //     '{{ELEMENT}} .altrp-gallery-img{{STATE}}': [
    //       'filter: blur({{BLUR}}px)  brightness({{BRIGHTNESS}}%) contrast({{CONTRAST}}%) saturate({{SATURATE}}%) hue-rotate({{HUE}}deg);'
    //     ],
    //   },
    // });

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
      }
    );

    this.addControl('image_transition', {
      type: CONTROLLER_SLIDER,
      label: 'Animation duration (ms)',
      default: {
        size: 800,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 3000,
      min: 0,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Gallery;
