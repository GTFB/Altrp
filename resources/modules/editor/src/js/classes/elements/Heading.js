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
  TAB_STYLE,
  CONTROLLER_LINK,
  CONTROLLER_CHOOSE,
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

    this.startControlSection('heading_settings', {
      tab: TAB_CONTENT,
      label: 'Text Settings',
    });

    this.addControl('heading_settings_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Choose Content',
      default: 'left',
      options:[
        {
          icon: 'left',
          value: 'left',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'right',
        },
        {
          icon: 'in_width',
          value: 'justify',
        }
      ],
      rules: {
            '{{ELEMENT}}': 'text-align: {{VALUE}};',
      },
    });

    this.addControl('heading_settings_html_tag', {
      type: CONTROLLER_SELECT,
      label: 'Html tag',
      default: 'h1',
      options: [
        {
          value: 'h1',
          label: 'default'
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

    this.startControlSection('heading_style_font', {
      tab: TAB_STYLE,
      label: 'Font',
    });
    
    this.addControl("heading_style_color", {
      type: CONTROLLER_COLOR,
      label: "Color",
      default: {
        color: "",
        colorPickedHex: "#000",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-heading": "color: {{COLOR}};"
      }
    });
    
    this.addControl("heading_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-heading": "background-color: {{COLOR}};"
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Heading;
