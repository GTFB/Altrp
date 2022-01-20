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

class Tour extends BaseElement {
      static getName() {
            return "tour";
      }
      static getTitle() {
            return "Tour";
      }
      static getIconComponent() {
            return Preview;
      }
      static getType() {
            return "widget";
      }

      static getGroup() {
        return "Basic";
      }

      _registerControls() {
            if (this.controllersRegistered) {
                  return;
            }

            let repeater = new Repeater();


            repeater.addControl(
                  'element',
                  {
                        label: 'Element ID',
                        dynamic: false,
                        type: CONTROLLER_ELEMENTS
                  }
            );
            repeater.addControl(
                  'text',
                  {
                        label: 'Text',
                        dynamic: false,
                        type: CONTROLLER_TEXTAREA
                  }
            );

            this.startControlSection('tutorial', {
                  tab: TAB_CONTENT,
                  label: 'Tutorial Visible'
            });
            this.addControl('showTutorial', {
                  type: CONTROLLER_SWITCHER,
                  label: "Show tutorial on page loading?",
                  default: true,
            });
            this.endControlSection();

            this.startControlSection('tutorial-steps', {
                  tab: TAB_CONTENT,
                  label: 'Tutorial Steps'
            });
            this.addControl("steps", {
                  type: CONTROLLER_REPEATER,
                  default: [],
                  fields: repeater.getControls(),
            });
            this.endControlSection();

      }
}

export default Tour;
