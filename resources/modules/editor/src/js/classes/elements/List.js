import BaseElement from "./BaseElement";
import widgetIcon from '../../../svgs/widget_list.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_TEXT,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  CONTROLLER_REPEATER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED, CONTROLLER_MEDIA, CONTROLLER_SWITCHER, CONTROLLER_LINK
} from "../modules/ControllersManager";
import Repeater from "../Repeater";

class List extends BaseElement{

  static getName(){
    return'list';
  }
  static getTitle(){
    return'List';
  }

  static getIconComponent(){
    return widgetIcon;
  }
  static getType(){
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('meta_data_section', {
      tab: TAB_CONTENT,
      label: 'Meta data',
    });

    this.addControl('layout_meta_data', {
      type: CONTROLLER_CHOOSE,
      label: 'Layout',
      default: 'default',
      options:[
        {
          icon: 'left',
          value: 'default',
        },
        {
          icon: 'in_width',
          value: 'inline',
        },
      ],
    });

    let repeater = new Repeater();

    repeater.addControl("type_repeater", {
      type: CONTROLLER_SELECT,
      label: "Type",
      options: [
        {
          value: "author",
          label: "author"
        },
        {
          value: "date",
          label: "date"
        },
        {
          value: "time",
          label: "time"
        },
        {
          value: "comments",
          label: "comments"
        },
        {
          value: "terms",
          label: "terms"
        },
        {
          value: "custom",
          label: "custom"
        }
      ],
    });

    repeater.addControl('custom_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Custom',
    });

    repeater.addControl('hover_all_switcher_custom_repeater', {
      type: CONTROLLER_SWITCHER,
      label: 'Hover all',
    });

    repeater.addControl('link_custom_repeater', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        openInNew: false,
        noFollow: true
      },
      label: 'link',
    });

    repeater.addControl("icon_select_repeater", {
      type: CONTROLLER_SELECT,
      label: "Icon",
      options: [
        {
          value: "none",
          label: "none"
        },
        {
          value: "custom",
          label: "custom"
        },
      ],
    });

    repeater.addControl('icon_repeater', {
      type: CONTROLLER_MEDIA,
      label: 'Choose icon',
    });

    repeater.addControl('position_relative_switcher_custom_repeater', {
      type: CONTROLLER_SWITCHER,
      label: 'Position relative',
    });

    this.addControl('repeater_meta_data_section', {
      label: 'Elements',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default List
