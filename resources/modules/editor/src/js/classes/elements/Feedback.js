import BaseElement from "./BaseElement";
import IconFeedback from "../../../svgs/feedback.svg";
import {
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS, CONTROLLER_SLIDER, CONTROLLER_SWITCHER, CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT, TAB_STYLE
} from "../modules/ControllersManager";
import {advancedTabControllers} from "../../decorators/register-controllers";


class Feedback extends BaseElement {
  static getTitle() {
    return "Feedback";
  }

  static getName() {
    return "feedback";
  }

  static getType() {
    return "widget";
  }

  static getIconComponent() {
    return IconFeedback;
  }

  static getGroup() {
    return "Advanced";
  }

  _registerControls() {

    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('content_frame', {
      tab: TAB_CONTENT,
      label: 'Frame',
    });

    this.addControl('custom_position', {
      type: CONTROLLER_SWITCHER,
      label: 'custom position',
    });

    this.addControl('custom_position_settings', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Position',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      conditions: {
        'custom_position': true,
      },
    });

    this.endControlSection();

    this.startControlSection('content_frame-style', {
      tab: TAB_STYLE,
      label: 'Frame',
    });

    this.addControl('padding__frame', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_radius-frame', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
    });

    this.endControlSection();

    this.startControlSection('content_btn-frame', {
      tab: TAB_CONTENT,
      label: 'Button Frame',
    });

    this.addControl("frame_text_btn", {
      type: CONTROLLER_TEXT,
      label: "Text",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('content_btn-messenger', {
      tab: TAB_CONTENT,
      label: 'Button Messenger',
    });

    this.addControl("messenger_text_btn", {
      type: CONTROLLER_TEXT,
      label: "Text",
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('content_btn-frame-style', {
      tab: TAB_STYLE,
      label: 'Button Frame',
    });

    this.addControl('padding__btn-frame', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_radius-btn-frame', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('font_typographic-btn', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('font_color-btn', {
        type: CONTROLLER_COLOR,
        label: 'Color',
      }
    );

    this.addControl('background_color-notPressed', {
      type: CONTROLLER_COLOR,
      label: 'Not Pressed Background Color',
    });

    this.addControl('background_color-pressed', {
      type: CONTROLLER_COLOR,
      label: 'Pressed Background Color',
    });

    this.endControlSection();


    this.startControlSection('circle-styles', {
      tab: TAB_STYLE,
      label: 'Circle',
    });

    this.addControl('background_color-circle', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
    });

    this.endControlSection();

    this.startControlSection('messenger-styles', {
      tab: TAB_STYLE,
      label: 'Messenger',
    });

    this.addControl("messenger__width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
    });

    this.addControl('padding__messenger', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_radius-messenger', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('background_color-messenger', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
    });

    this.endControlSection();

    this.startControlSection('requests_comments', {
      tab: TAB_CONTENT,
      label: 'Requests',
    });

    this.addControl("get_messages_url", {
      type: CONTROLLER_TEXT,
      label: "Get comments",
      locked: true,
    });

    this.addControl("post_messages_url", {
      type: CONTROLLER_TEXT,
      label: "Post comment",
      locked: true,
    });

    this.addControl("delete_messages_url", {
      type: CONTROLLER_TEXT,
      label: "Delete comment",
      locked: true,
    });


    this.endControlSection();

    this.startControlSection('messenger-styles-btn', {
      tab: TAB_STYLE,
      label: 'Button Messenger',
    });

    this.addControl('padding__messenger-btn', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_radius-messenger-btn', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('font_typographic-messenger-btn', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl('font_color-messenger-btn', {
        type: CONTROLLER_COLOR,
        label: 'Color',
      }
    );

    this.addControl('background_color-btn-messenger', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
    });

    this.endControlSection();


    advancedTabControllers(this);
  }
}

export default Feedback

