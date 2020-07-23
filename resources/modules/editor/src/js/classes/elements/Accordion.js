import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/widget_accordion.svg";
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
  CONTROLLER_CHOOSE, CONTROLLER_REPEATER, CONTROLLER_WYSIWYG, CONTROLLER_MEDIA, CONTROLLER_SWITCHER,
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Accordion extends BaseElement {
  static getName() {
    return "accordion";
  }
  static getTitle() {
    return "Accordion";
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

    this.startControlSection("accordion_content", {
      tab: TAB_CONTENT,
      label: "Accordion",
    });

    let repeater = new Repeater();

    repeater.addControl('title_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Title',
    });

    repeater.addControl("content_select_repeater", {
      type: CONTROLLER_SELECT,
      label: "Icon",
      options: [
        {
          value: "custom",
          label: "custom"
        },
        {
          value: "template",
          label: "template"
        },
      ],
    });

    repeater.addControl("wysiwyg_repeater", {
      type: CONTROLLER_TEXTAREA,
      label: "Text",
      default: "I Am Advanced Text"
    });

    this.addControl('repeater_accordion_content', {
      label: 'Accordion items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
    });

    this.addControl("title_html_tag_accordion_content", {
      type: CONTROLLER_SELECT,
      label: "Title HTML tag",
      default: "div",
      options: [
        {
          value: "h1",
          label: "h1"
        },
        {
          value: "h2",
          label: "h2"
        },
        {
          value: "h3",
          label: "h3"
        },
        {
          value: "h4",
          label: "h4"
        },
        {
          value: "h5",
          label: "h5"
        },
        {
          value: "h6",
          label: "h6"
        },
        {
          value: "span",
          label: "span"
        },
        {
          value: "div",
          label: "div"
        },
        {
          value: "p",
          label: "p"
        },

      ],
    });

    this.addControl('icon_accordion_content', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    });

    this.addControl('active_icon_accordion_content', {
      type: CONTROLLER_MEDIA,
      label: 'Active icon',
    });

    this.endControlSection();

    this.startControlSection("additional_content", {
      tab: TAB_CONTENT,
      label: "Additional",
    });

    this.addControl('multiple_additional_content', {
      type: CONTROLLER_SWITCHER,
      default: false,
      label: 'Multiple open',
    });

    this.addControl("active_item_additional_content", {
      type: CONTROLLER_NUMBER,
      label: "Acitve item no",
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Accordion;
