import BaseElement from "./BaseElement";
import TestIcon from "../../../svgs/accordion.svg";
import { CONTROLLER_DATE, CONTROLLER_REPEATER, CONTROLLER_SELECT, CONTROLLER_TEXT, TAB_CONTENT } from "../modules/ControllersManager";
import Repeater from "../Repeater";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Scheduler extends BaseElement {
  static getTitle() {
    return "Scheduler";
  }

  static getName() {
    return "scheduler";
  }

  static getType() {
    return "widget";
  }

  static getIconComponent() {
    return TestIcon;
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }


    this.startControlSection("web_api_settings", {
      tab: TAB_CONTENT,
      label: "Web API settings",
    });

    
    this.addControl('get_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for get',
    });

    this.addControl('create_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for create',
    });

    this.addControl('update_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for update',
    });

    this.addControl('delete_url', {
      type: CONTROLLER_TEXT,
      label: 'URL for delete requests',
    });

    this.endControlSection();

    this.startControlSection("scheduler_content", {
      tab: TAB_CONTENT,
      label: "Items fields settings",
    });

    let repeater = new Repeater();

    repeater.addControl('label_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Label',
    });

    repeater.addControl('field_name_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Field name',
    });

    repeater.addControl('input_type_repeater', {
      type: CONTROLLER_SELECT,
      label: 'Input type',
      default: 'dxTextBox',
      options: [
        {
          value: 'dxTextBox',
          label: 'Text'
        },
        {
          value: 'dxTextArea',
          label: 'TextArea'
        },
      ]
    });

    this.addControl('repeater_fields_section', {
      label: 'Scheduler fields',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls()
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Scheduler;