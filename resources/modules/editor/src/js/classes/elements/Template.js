import BaseElement from "./BaseElement";
import CodeIcon from "../../../svgs/code.svg";
import {
  TAB_CONTENT,
  CONTROLLER_SELECT2
} from '../modules/ControllersManager';
import {advancedTabControllers} from "../../decorators/register-controllers";

class Template extends BaseElement {
  static getName() {
    return "template";
  }

  static getTitle() {
    return "Template";
  }

  static getIconComponent() {
    return CodeIcon;
  }

  static getType() {
    return "widget";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection('content', {
      tab: TAB_CONTENT,
      label: 'Content'
    });

    this.addControl("template", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Template",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?value=guid',
      gotoLink: {
        linkTemplate: '/admin/editor?template_id={id}',
        textTemplate: 'Go to Template',
      },
      nullable: true,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Template;
