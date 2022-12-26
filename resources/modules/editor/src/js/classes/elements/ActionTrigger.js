import BaseElement from "./BaseElement";
import WidgetIcon from "../../../svgs/trigger.svg";
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
  CONTROLLER_CHOOSE, CONTROLLER_REPEATER, CONTROLLER_MEDIA, CONTROLLER_SWITCHER, TAB_ADVANCED, CONTROLLER_SELECT2,
} from "../modules/ControllersManager";
import {actionsControllers} from "../../decorators/actions-controllers";

class ActionTrigger extends BaseElement {
  static getName() {
    return "action-trigger";
  }

  static getTitle() {
    return "Action Trigger";
  }

  static getIconComponent() {
    return WidgetIcon;
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

    this.startControlSection('trigger', {
      label: 'Trigger Settings'
    })

    this.addControl('type', {
      type: CONTROLLER_SELECT2,
      label: 'Trigger Type',
      options: [
        {
          label: 'Interval',
          value: 'interval'
        },
        {
          label: 'Timeout',
          value: 'timeout'
        },
        {
          label: 'Document Event',
          value: 'event'
        },
      ],
      locked: true,
    })

    this.addControl('event', {
      label: 'Event Name',
      conditions: {
        type: ['event']
      },
      locked: true,
    })
    this.addControl('prevent', {
      label: 'Prevent Default Event Behavior',
      type: CONTROLLER_SWITCHER,
      conditions: {
        type: ['event']
      },
      locked: true,
    })

    this.addControl('stop_event', {
      label: 'Stop Event Propagation',
      type: CONTROLLER_SWITCHER,
      conditions: {
        type: ['event']
      },
      locked: true,
    })

    this.addControl('timeout', {
      type: CONTROLLER_NUMBER,
      label: 'Timeout (ms)',
      conditions: {
        type: ['interval', 'timeout']
      },
      locked: true,
    })
    this.addControl('interval', {
      type: CONTROLLER_NUMBER,
      label: 'Interval (ms)',
      conditions: {
        type: 'interval'
      },
      locked: true,
    })

    actionsControllers(this, 'Actions', 'trigger_',);

    this.endControlSection()
  }
}

export default ActionTrigger;
