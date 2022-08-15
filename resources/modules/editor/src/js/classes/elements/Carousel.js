import BaseElement from "./BaseElement";
import WidgetIcon from '../../../svgs/carousel.svg';
import { advancedTabControllers } from "../../decorators/register-controllers";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_HEADING,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_REPEATER,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_MEDIA,
  CONTROLLER_SWITCHER
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
  static getGroup() {
    return "Advanced";
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

    repeater.addControl('switch_slides_repeater', {
      type: CONTROLLER_SWITCHER,
      label: 'Image or card',
      locked: true,
    });

    repeater.addControl('image_slides_repeater', {
      conditions: {
        'switch_slides_repeater': false,
      },
      type: CONTROLLER_MEDIA,
      label: 'image',
    });

    repeater.addControl("card_slides_repeater", {
      conditions: {
        'switch_slides_repeater': true,
      },
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Card",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?value=guid',
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
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

    this.addControl('slides_item_source', {
      label: 'Carousel Items',
      type: CONTROLLER_SELECT,
      options: [
        {
          label: 'Custom',
          value: 'custom',
        },
        {
          label: 'Path',
          value: 'path',
        },
      ],
      default: 'custom',
      locked: true,
    });

    this.addControl('slides_repeater', {
      label: 'Carousel Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
      ],
      conditions: {
        'slides_item_source': 'custom',
      },
      locked: true,
    });

    this.addControl('slides_path', {
      label: 'Path to Items',
      type: CONTROLLER_TEXT,
      responsive: false,
      conditions: {
        'slides_item_source': 'path',
      },
      locked: true,
    });

    this.addControl('lightbox_slides_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Lightbox',
      default: false,
      locked: true,
    });

    this.addControl('lightbox_s_click', {
      type: CONTROLLER_SWITCHER,
      label: 'Single Click for Lightbox',
      conditions:{
        'lightbox_slides_content' : true,
      },
      locked: true,
    });

    this.addControl('img_content', {
      type: CONTROLLER_SWITCHER,
      label: '<img/> Tag',
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
      ],
      locked: true,
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
      ],
      locked: true,
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
      ],
      locked: true,
    });

    this.addControl("height_slides_content", {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
    });

    this.addControl("width_slides_content", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: '%',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('navigation_content', {
      tab: TAB_CONTENT,
      label: 'Navigation',
    });

    this.addControl('arrows_navigation_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Arrows',
      default: false,
      locked: true,
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
      ],
      locked: true,
    });

    this.addControl('dots_navigation_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Dots',
      default: true,
      locked: true,
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
      ],
      locked: true,
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
      locked: true,
    });

    this.addControl('autoplay_additional_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Autoplay',
      default: false,
      locked: true,
    });

    this.addControl('transition_autoplay_duration_additional_content', {
      conditions: {
        'autoplay_additional_content': true,
      },
      type: CONTROLLER_NUMBER,
      label: "Transition duration autoplay",
      default: 2000,
      locked: true,
    });

    this.addControl('infinite_loop_additional_content', {
      type: CONTROLLER_SWITCHER,
      label: 'infinite',
      default: true,
      locked: true,
    });

    this.addControl('pause_on_interaction_loop_additional_content', {
      type: CONTROLLER_SWITCHER,
      label: 'Pause on interaction',
      default: true,
      locked: true,
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
      locked: true,
    });

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
      }
    );

    this.endControlSection();
    //<editor-fold description=synchronize_section>
    this.startControlSection('synchronize_section', {
      label: 'Synchronize',
    });

    this.addControl('synchronized_id', {
      label: 'Another Carousel IDs',
      dynamic: false,
    });

    this.endControlSection();
    //</editor-fold>

    this.startControlSection('slides_style', {
      tab: TAB_STYLE,
      label: 'Slides',
    });

    this.addControl('space_between_slides_style', {
      type: CONTROLLER_SLIDER,
      label: 'Space between',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 50,
      min: 0,
    });

    this.addControl("background_slides_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("border_type_slide", {
      type: CONTROLLER_SELECT,
      label: "Border Type",
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

    this.addControl("border_width_slides_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("border_color_slides_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("padding_slides_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("border_radius_slides_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
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
      label: 'Arrows',
      locked: true,
    })

    this.addControl('arrows_size_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Arrows size',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
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
    });

    this.addControl('padding_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_radius_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_DIMENSIONS,
      label: 'Border radius',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('horizontal_offset_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
        'arrows_position_navigation_content': 'center'
      },
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 400,
      min: 0,
    });

    this.addControl('vertical_no_center_offset_arrows_navigation_style', {
      conditions: {
        'arrows_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset (no center)',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 200,
      min: -200,
    });


    this.addControl('dots_heading_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_HEADING,
      label: 'Dots',
      locked: true,
    })

    this.addControl('dots_size_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Dots size',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 100,
      min: 0,
    });

    this.addControl('background_color_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_COLOR,
      label: 'Dots color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('background_color_active_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_COLOR,
      label: 'Active dot color',
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('horizontal_offset_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Horizontal offset',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 200,
      min: -200,
    });

    this.addControl('vertical_no_center_offset_dots_navigation_style', {
      conditions: {
        'dots_navigation_content': true,
      },
      type: CONTROLLER_SLIDER,
      label: 'Vertical offset (no center)',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 200,
      min: -200,
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
          color: "",
          colorPickedHex: "",
        },
      }
    );

    this.addControl("font_color_overlay", {
      type: CONTROLLER_COLOR,
      label: "text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('typographic_overlay', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Carousel
