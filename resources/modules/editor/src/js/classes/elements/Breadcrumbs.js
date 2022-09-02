import BaseElement from './BaseElement';
import NavIcon from '../../../svgs/Breadcrumbs.svg';
import {advancedTabControllers} from '../../decorators/register-controllers';
import {
  CONTROLLER_DIMENSIONS,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_COLOR,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_SHADOW, CONTROLLER_MEDIA,
} from '../modules/ControllersManager';

class Breadcrumbs extends BaseElement {
  static getName() {
    return 'breadcrumbs';
  }

  static getTitle() {
    return 'Breadcrumbs';
  }

  static getIconComponent() {
    return NavIcon;
  }

  static getType() {
    return 'widget';
  }

  static getGroup() {
    return "Basic";
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection('content', {
      label: 'Label',
    })

    this.addControl('collapse', {
      label: 'Collapse From',
      type: CONTROLLER_SELECT,
      options: [
        {
          label: 'Start',
          value: 'start',
        },
        {
          label: 'End',
          value: 'end',
        },
      ],
      stateless: true,
      locked: true,
    });

    this.addControl('delimiter', {
      label: 'Delimiter',
      type: CONTROLLER_MEDIA,
    });

    this.endControlSection();

    this.startControlSection('breadcrumbs', {
      label: 'Breadcrumbs',
      tab: TAB_STYLE,
    });

    this.addControl('height', {
      label: 'Height',
      stateless: true,
      dynamic: false,
    });

    this.endControlSection();

    this.startControlSection('links_section', {
      label: 'Links',
      tab: TAB_STYLE,
    });

    this.addControl('color', {
      label: 'Color',
      type: CONTROLLER_COLOR,
    });

    this.addControl('font', {
      label: 'Font',
      type: CONTROLLER_TYPOGRAPHIC,
    });

    this.endControlSection();

    this.startControlSection('current_section', {
      label: 'Current Item',
      tab: TAB_STYLE,
    });

    this.addControl('current_color', {
      label: 'Color',
      stateless: true,
      type: CONTROLLER_COLOR,
    });

    this.addControl('current_font', {
      label: 'Font',
      stateless: true,
      type: CONTROLLER_TYPOGRAPHIC,
    });

    this.endControlSection();

    this.startControlSection('icons_section', {
      label: 'Icons',
      tab: TAB_STYLE,
    });

    this.addControl('icon_width', {
      label: 'Width',
      stateless: true,
      dynamic: false,
    });

    this.addControl('icon_height', {
      label: 'Height',
      stateless: true,
      dynamic: false,
    });

    this.addControl('icon_ml', {
      label: 'Margin Left',
      stateless: true,
      dynamic: false,
    });

    this.addControl('icon_mr', {
      label: 'Margin Right',
      stateless: true,
      dynamic: false,
    });

    this.addControl('icon_color', {
      label: 'Fill Color',
      type: CONTROLLER_COLOR,
    });

    this.endControlSection();

    this.startControlSection('delimiter_section', {
      label: 'Delimiter',
      tab: TAB_STYLE,
    });

    this.addControl('delimiter_width', {
      label: 'Width',
      stateless: true,
      dynamic: false,
    });

    this.addControl('delimiter_height', {
      label: 'Height',
      stateless: true,
      dynamic: false,
    });

    this.addControl('delimiter_ml', {
      label: 'Margin Left',
      stateless: true,
      dynamic: false,
    });

    this.addControl('delimiter_mr', {
      label: 'Margin Right',
      stateless: true,
      dynamic: false,
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Breadcrumbs;
