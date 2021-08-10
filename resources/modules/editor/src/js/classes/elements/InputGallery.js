import BaseElement from './BaseElement';
import FromIcon from '../../../svgs/form-horizontal.svg';
import { advancedTabControllers } from '../../decorators/register-controllers';
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_TEXT,
  CONTROLLER_SWITCHER,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_NUMBER,
  CONTROLLER_SLIDER,
  CONTROLLER_COLOR,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_CHOOSE,
  CONTROLLER_SHADOW,
  CONTROLLER_MEDIA, CONTROLLER_GRADIENT
} from '../modules/ControllersManager';
import { actionsControllers } from '../../decorators/actions-controllers';

class InputGallery extends BaseElement {
  static getName() {
    return 'input-gallery';
  }
  static getTitle() {
    return 'Input Gallery';
  }
  static getIconComponent() {
    return FromIcon;
  }
  static getType() {
    return 'widget';
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return;
    }

    this.startControlSection('section', {
      tab: TAB_CONTENT,
      label: 'Content'
    });

    this.addControl('form_id', {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: 'Form ID'
    });

    this.addControl('field_id', {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: 'Field ID (Column Name)'
    });

    this.addControl('accept', {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: 'Accept'
    });

    this.addControl('required', {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: 'Required'
    });


    this.addControl('limit', {
      type: CONTROLLER_NUMBER,
      responsive: false,
      label: 'Limit Files'
    });

    this.addControl('placeholder', {
      type: CONTROLLER_MEDIA,
      label: 'Add New Placeholder'
    });

    this.addControl('default_value', {
      type: CONTROLLER_TEXTAREA,
      label: 'Default Value'
    });

    this.endControlSection();

    actionsControllers(this, 'Change Actions', 'change_');

    this.startControlSection('gallery', {
      label: 'Gallery'
    });

    this.addControl('alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      stateless: true,
      options: [
        {
          icon: 'left',
          value: 'flex-start',
        },
        {
          icon: 'right',
          value: 'flex-end',
        },
      ],
    });

    this.addControl('columns', {
      type: CONTROLLER_NUMBER,
      label: 'Columns',
    })

    this.endControlSection()

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Items'
    });

    this.addControl('height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      max: 500,
      stateless: true,
      min: 0,
      units: ['px', 'vw']
    });

    this.addControl('v_gap', {
      type: CONTROLLER_SLIDER,
      label: 'Vertical Gap',
      max: 50,
      stateless: true,
      min: 0,
      units: ['px', 'vw', '%']
    });

    this.addControl('h_gap', {
      type: CONTROLLER_SLIDER,
      label: 'Horizontal Gap',
      max: 50,
      stateless: true,
      min: 0,
      units: ['px', 'vw', '%']
    });

    this.addControl('padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      stateless: true,
      units: ['px', '%', 'vh']
    });

    this.endControlSection();

    this.startControlSection('font_style_section', {
      tab: TAB_STYLE,
      label: 'Font'
    });

    this.addControl('typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic'
    });

    this.addControl('color', {
      type: CONTROLLER_COLOR,
      label: 'Font Color',
    });

    this.endControlSection();

    this.startControlSection('button', {
      tab: TAB_STYLE,
      label: 'Button'
    });

    this.addControl('b_width', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      max: 500,
      min: 0,
      stateless: true,
      units: ['px', '%', 'vw']
    });

    this.addControl('b_height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      max: 500,
      min: 0,
      stateless: true,
      units: ['px', 'vw']
    });

    this.addControl('b_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      stateless: true,
      units: ['px', '%', 'vh']
    });

    this.addControl('b_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      stateless: true,
      units: ['px', '%', 'vh']
    });

    this.addControl('b_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic'
    });

    this.addControl('b_color', {
      type: CONTROLLER_COLOR,
      label: 'Font Color'
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl('background', {
      type: CONTROLLER_COLOR,
      label: 'Background Color'
    });

    this.addControl('b_background', {
      type: CONTROLLER_GRADIENT,
      label: 'Button Background Gradient'
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Box shadow',
    });
    this.addControl('b_box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Button Box shadow',
    });

    this.addControl('radius', {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: 'Radius',
      units: ['px', '%', 'vh']
    });

    this.addControl('b_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Button Radius',
      stateless: true,
      units: ['px', '%', 'vh']
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default InputGallery;
