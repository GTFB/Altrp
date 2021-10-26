import BaseElement from "./BaseElement";
import Preview from "../../../svgs/sidebar.svg";
import {
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  CONTROLLER_REPEATER,
  CONTROLLER_ELEMENTS,
  CONTROLLER_TEXTAREA
} from '../modules/ControllersManager';
import Repeater from "../Repeater";

class Tree extends BaseElement {
  static getName() {
    return "tree";
  }
  static getTitle() {
    return "Tree";
  }
  static getIconComponent() {
    return Preview;
  }
  static getType() {
    return "widget";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    let repeater = new Repeater();

    repeater.addControl('button_text', {
      type: CONTROLLER_TEXTAREA,
      label: 'Button Text',
      default: 'Click Me'
    });


    this.startControlSection('tree_section', {
      tab: TAB_CONTENT,
      label: 'Tree'
    });

    this.addControl("tree", {
      type: CONTROLLER_REPEATER,
      default: [],
      fields: repeater.getControls(),
    });

    this.endControlSection();

  }
}

export default Tree;
