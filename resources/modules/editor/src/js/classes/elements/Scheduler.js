import BaseElement from "./BaseElement";
import TestIcon from "../../../svgs/accordion.svg";
import { CONTROLLER_DATE, CONTROLLER_REPEATER, CONTROLLER_TEXT, TAB_CONTENT } from "../modules/ControllersManager";
import Repeater from "../Repeater";

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

    this.startControlSection("scheduler_content", {
      tab: TAB_CONTENT,
      label: "Scheduler",
    });

    let repeater = new Repeater();

    repeater.addControl('title_repeater', {
      type: CONTROLLER_TEXT,
      label: 'Title',
    });

    this.addControl('repeater_meta_data_section', {
      label: 'Scheduler items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default: [
        {
          title_repeater: "Title #1",
        },
        {
          title_repeater: "Title #2",
        },
        {
          title_repeater: "Title #3",
        }
      ]
    });

    this.endControlSection();
  }
}

export default Scheduler;