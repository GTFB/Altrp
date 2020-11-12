import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/accordion.svg";
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
  CONTROLLER_CHOOSE, CONTROLLER_REPEATER, CONTROLLER_WYSIWYG, CONTROLLER_MEDIA, CONTROLLER_SWITCHER, CONTROLLER_SELECT2,
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Offcanvas extends BaseElement {
  static getName() {
    return "offcanvas";
  }
  static getTitle() {
    return "Offcanvas";
  }
  static getIconComponent() {
    return WidgetIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection('offcanvas_section', {
      label: 'Offcanvas',
    });

    this.addControl("source_offcanvas", {
      type: CONTROLLER_SELECT,
      label: "Select source",
      default: "sidebar",
      options: [
        {
          value: "sidebar",
          label: "Sidebar"
        },
        {
          value: "template",
          label: "Template"
        }
      ],
    });

    this.addControl("sidebar_offcanvas", {
      conditions: {
        'source_offcanvas': "sidebar",
      },
      type: CONTROLLER_SELECT,
      label: "Select source",
      default: "sidebar",
      options: [
        {
          value: "sidebar",
          label: "Sidebar"
        },
        {
          value: "template",
          label: "Template"
        }
      ],
    });

    this.addControl("template_offcanvas", {
      conditions: {
        'source_offcanvas': "template",
      },
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?value=guid',
      nullable: true,
    });

    this.addControl("width_offcanvas", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 300,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 1200,
      min: 0,
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-vertical{{STATE}}': 'width: {{SIZE}}{{UNIT}};',
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-horizontal{{STATE}}': 'height: {{SIZE}}{{UNIT}};'
      },
    });

    this.addControl('content_before_offcanvas', {
      type: CONTROLLER_SWITCHER,
      label: 'Custom content before',
    });

    this.addControl('content_after_offcanvas', {
      type: CONTROLLER_SWITCHER,
      label: 'Custom content after',
    });

    this.addControl('overlay_offcanvas', {
      type: CONTROLLER_SWITCHER,
      label: 'Overlay',
    });

    this.addControl('close_offcanvas', {
      type: CONTROLLER_SWITCHER,
      label: 'Close button',
    });

    this.addControl('close_cursor_offcanvas', {
      type: CONTROLLER_SWITCHER,
      label: 'Close cursor',
    });

    this.addControl("direction_offcanvas", {
      type: CONTROLLER_SELECT,
      label: "Content box direction",
      default: "left",
      options: [
        {
          value: "left",
          label: "Left"
        },
        {
          value: "right",
          label: "Right"
        },
        {
          value: "top",
          label: "Top"
        },
        {
          value: "bottom",
          label: "Bottom"
        },
        {
          value: "topLeft",
          label: "Top left"
        },
        {
          value: "topRight",
          label: "Top right"
        },
        {
          value: "bottomLeft",
          label: "Bottom Left"
        },
        {
          value: "bottomRight",
          label: "Bottom right"
        },
      ],
    });

    this.addControl("animations_offcanvas", {
      type: CONTROLLER_SELECT,
      label: "Animations",
      default: "slide",
      options: [
        {
          value: "slide",
          label: "Slide"
        },
        {
          value: "push",
          label: "Push"
        },
        {
          value: "reveal",
          label: "Reveal"
        },
        {
          value: "none",
          label: "none"
        }
      ],
    });

    this.addControl('overflow_visible_offcanvas', {
      type: CONTROLLER_SWITCHER,
      label: 'Offcanvas overflow visible',
    });

    this.endControlSection();

    this.startControlSection('offcanvas_custom_content_before_section', {
      label: 'Custom content before',
    });

    this.addControl("offcanvas_custom_content_before", {
      type: CONTROLLER_WYSIWYG,
      label: "Custom content before (offcanvas)",
      default: "This is your custom content for before of your offcanvas.",
    });

    this.endControlSection();

    this.startControlSection('offcanvas_custom_content_after_section', {
      label: 'Custom content after (offcanvas)',
    });

    this.addControl("offcanvas_custom_content_after", {
      type: CONTROLLER_WYSIWYG,
      label: "Custom content after",
      default: "This is your custom content for after of your offcanvas.",
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Offcanvas;
