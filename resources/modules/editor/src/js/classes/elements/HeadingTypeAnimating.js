import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/text.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_SLIDER,
  CONTROLLER_LINK,
  CONTROLLER_CHOOSE,
  CONTROLLER_SWITCHER,
  CONTROLLER_HEADING,
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class HeadingTypeAnimating extends BaseElement {
  static getName() {
    return "heading-type-animating";
  }
  static getTitle() {
    return "Animated Heading";
  }
  static getIconComponent() {
    return HeadingIcon;
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

    this.startControlSection("animating_section", {
      tab: TAB_CONTENT,
      label: "Headline",
    });

    this.addControl('style_animating', {
      type: CONTROLLER_SELECT,
      label: 'Style',
      default: 'highlighted',
      options: [
        {
          value: 'highlighted',
          label: 'Highlighted'
        },
        {
          value: 'rotating',
          label: 'Rotating'
        },
      ],
      locked: true,
    });

    this.addControl('shape_animating', {
      conditions: {
        'style_animating': 'highlighted',
      },
      type: CONTROLLER_SELECT,
      label: 'Shape',
      default: 'underline',
      options: [
        {
          value: 'circle',
          label: 'Circle'
        },
        {
          value: 'curly',
          label: 'Curly'
        },
        {
          value: 'underline',
          label: 'Underline'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'doubleUnderline',
          label: 'Double underline'
        },
        {
          value: 'underlineZigzag',
          label: 'Underline zigzag'
        },
        {
          value: 'diagonal',
          label: 'Diagonal'
        },
        {
          value: 'strikethrough',
          label: 'Strikethrough'
        },
        {
          value: 'x',
          label: 'X'
        },
      ]
    });

    this.addControl('animation_animating', {
      conditions: {
        'style_animating': 'rotating',
      },
      type: CONTROLLER_SELECT,
      label: 'Animation',
      default: 'typing',
      options: [
        {
          value: 'typing',
          label: 'Typing'
        },
        {
          value: 'clip',
          label: 'Clip'
        },
        {
          value: 'flip',
          label: 'Flip'
        },
        {
          value: 'swirl',
          label: 'Swirl'
        },
        {
          value: 'blinds',
          label: 'Blinds'
        },
        {
          value: 'dropIn',
          label: 'Drop-in'
        },
        {
          value: 'wave',
          label: 'Wave'
        },
        {
          value: 'slide',
          label: 'Slide'
        },
        {
          value: 'slideDown',
          label: 'Slide down'
        },
      ],
      locked: true,
    });

    this.addControl('text_heading_animating', {
      conditions: {
        'style_animating': 'highlighted',
      },
      type: CONTROLLER_HEADING,
      label: 'Text',
    });

    this.addControl('text_before_animating', {
      type: CONTROLLER_TEXT,
      label: 'Before',
      default: "this website is",
      locked: true,
    });

    this.addControl('text_highlighted_animating', {
      conditions: {
        'style_animating': 'highlighted',
      },
      type: CONTROLLER_TEXT,
      label: 'Highlighted',
      default: "Amazing",
      locked: true,
    });

    this.addControl('text_rotating_animating', {
      conditions: {
        'style_animating': 'rotating',
      },
      type: CONTROLLER_TEXTAREA,
      label: 'Rotating',
      default: "Amazing\nBigger\nFaster",
      locked: true,
    });

    this.addControl('text_after_animating', {
      type: CONTROLLER_TEXT,
      label: 'After',
      locked: true,
    });

    this.addControl('settings_heading_animating', {
      type: CONTROLLER_HEADING,
      label: '-',
    });

    this.addControl('link_animating', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    this.addControl('alignment_animating', {
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
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
    });

    this.addControl('html_tag_animating', {
      type: CONTROLLER_SELECT,
      label: 'HTML tag',
      default: 'h2',
      options: [
        {
          value: 'h1',
          label: 'H1'
        },
        {
          value: 'h2',
          label: 'H2'
        },
        {
          value: 'h3',
          label: 'H3'
        },
        {
          value: 'h4',
          label: 'H4'
        },
        {
          value: 'h5',
          label: 'H5'
        },
        {
          value: 'h6',
          label: 'H6'
        },
        {
          value: 'div',
          label: 'div'
        },
        {
          value: 'span',
          label: 'span'
        },
        {
          value: 'p',
          label: 'p'
        },
      ],
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('shape_animating_style', {
      conditions: {
        'style_animating': 'highlighted',
      },
      tab: TAB_STYLE,
      label: 'Shape',
    });

    this.addControl('color_shape_animating', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    }
    );

    this.addControl("width_shape_animating", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      max: 20,
      min: 0,
    });

    this.addControl('bring_to_front_shape_animating', {
      type: CONTROLLER_SWITCHER,
      label: 'Bring to front',
      default: false,
      locked: true,
    });

    this.addControl('rounded_edges_shape_animating', {
      type: CONTROLLER_SWITCHER,
      label: 'Rounded edges',
      default: false,
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('headline_animating_style', {
      tab: TAB_STYLE,
      label: 'Headline',
    });

    this.addControl('text_color_headline_animating_style', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    }
    );

    this.addControl('text_headline_animating_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    }
    );

    this.addControl('text_heading_headline_animating_style', {
      type: CONTROLLER_HEADING,
      label: 'Animated text',
    });

    this.addControl('animated_text_color_headline_animating_style', {
      type: CONTROLLER_COLOR,
      label: 'Color',
    }
    );

    this.addControl('animated_text_headline_animating_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
    }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default HeadingTypeAnimating;
