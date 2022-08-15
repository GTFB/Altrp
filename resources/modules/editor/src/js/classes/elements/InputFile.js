import BaseElement from './BaseElement';
import FromIcon from '../../../svgs/file_add.svg';
import { advancedTabControllers } from '../../decorators/register-controllers';
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_TEXT,
  CONTROLLER_SELECT,
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
import Repeater from '../Repeater';
import { actionsControllers } from '../../decorators/actions-controllers';

class InputFile extends BaseElement {
  static getName() {
    return 'input-file';
  }
  static getTitle() {
    return 'File';
  }
  static getIconComponent() {
    return FromIcon;
  }
  static getType() {
    return 'widget';
  }
  static getGroup() {
    return "Form";
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
      label: 'Accept',
      locked: true,
    });

    this.addControl('placeholder', {
      type: CONTROLLER_TEXT,
      label: 'Placeholder',
    });

    this.addControl('button_text', {
      type: CONTROLLER_TEXT,
      responsive: false,
      label: 'Button Text',
      locked: true,
    });

    this.addControl('required', {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: 'Required'
    });

    this.addControl('multiple', {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: 'Multiple',
      locked: true,
    });

    this.addControl('limit', {
      type: CONTROLLER_NUMBER,
      responsive: false,
      conditions:{
        multiple: true
      },
      label: 'Limit Files'
    });

    this.addControl('readonly', {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: 'Readonly',
      locked: true,
    });

    this.addControl('preview', {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: 'Preview (Only for Image)',
      locked: true,
    });

    this.addControl('preview_placeholder', {
      type: CONTROLLER_MEDIA,
      conditions:{
        preview: true,
      },
      label: 'Preview Placeholder',
      locked: true,
    });

    this.addControl('default_value', {
      type: CONTROLLER_TEXTAREA,
      label: 'Default Value'
    });

    this.endControlSection();

    actionsControllers(this, 'Change Actions', 'change_');

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position'
    });

    this.addControl('width', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      max: 500,
      stateless: true,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      max: 500,
      stateless: true,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
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
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'flex-end',
        },
        {
          icon: 'in_width',
          value: 'stretch',
        }
      ],
    });

    this.addControl('padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      stateless: true,
      units: ['px', '%', 'vh', 'vw'],
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
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('b_height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      max: 500,
      min: 0,
      stateless: true,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('b_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      stateless: true,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('b_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      stateless: true,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('b_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic'
    });

    this.addControl('b_color', {
      type: CONTROLLER_COLOR,
      label: 'Font Color'
    });

    this.addControl('b_bg_color', {
      type: CONTROLLER_COLOR,
      label: 'Background Color'
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

    this.addControl('border_type', {
      type: CONTROLLER_SELECT,
      label: 'Input Border Type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ]
    });

    this.addControl('border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Input Border Width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('border_color', {
      type: CONTROLLER_COLOR,
      label: 'Input Border Color'
    });


    this.addControl('b_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Button Border Type',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'solid',
          label: 'Solid'
        },
        {
          value: 'double',
          label: 'Double'
        },
        {
          value: 'dotted',
          label: 'Dotted'
        },
        {
          value: 'dashed',
          label: 'Dashed'
        },
        {
          value: 'groove',
          label: 'Groove'
        }
      ]
    });

    this.addControl('b_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Button Border Width',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('b_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Button Border Color'
    });

    this.addControl('box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Input Box shadow',
    });
    this.addControl('b_box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Button Box shadow',
    });

    this.addControl('radius', {
      type: CONTROLLER_DIMENSIONS,
      stateless: true,
      label: 'Input Radius',
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('b_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Button Radius',
      stateless: true,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}
export default InputFile;
