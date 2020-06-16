import BaseElement from "./BaseElement";
import HeadingIcon from "../../../svgs/widget_heading.svg";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_SWITCHER,
  CONTROLLER_COLOR,
  TAB_ADVANCED,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_SLIDER,
  TAB_CONTENT,
  CONTROLLER_LINK,
  TAB_STYLE, CONTROLLER_CHOOSE,
  CONTROLLER_NUMBER
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Heading extends BaseElement {
  static getName() {
    return "heading";
  }
  static getTitle() {
    return "Heading";
  }
  static getIconComponent() {
    return HeadingIcon;
  }
  static getType() {
    return "widget";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }
    this.startControlSection("text_section", {
      tab: TAB_CONTENT,
      label: "Text Section",
    });

    this.addControl("text", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Heading",
    });

    this.endControlSection();

    this.startControlSection('text_settings', {
      tab: TAB_CONTENT,
      label: 'Text Settings',
    });

    this.addControl('text_settings_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 1,
      options:[
        {
          icon: 'add',
          value: 'add',
        }
      ],
    });


    this.addControl('text_settings_html_tag', {
      type: CONTROLLER_SELECT,
      label: 'html tag',
      default: 'p',
      options: [
        {
          value: 'p',
          label: 'default'
        },
        {
          value: 'h1',
          label: 'h1'
        },
        {
          value: 'h2',
          label: 'h2'
        },
        {
          value: 'h3',
          label: 'h3'
        },
        {
          value: 'h4',
          label: 'h4'
        },
        {
          value: 'h5',
          label: 'h5'
        },
        {
          value: 'h6',
          label: 'h6'
        }
      ]
    });

    this.addControl('text_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false
      },
      label: 'link',
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Heading;
