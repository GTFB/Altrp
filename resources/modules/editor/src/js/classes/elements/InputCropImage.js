import BaseElement from './BaseElement';
import FromIcon from '../../../svgs/image_crop.svg';
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

class InputCropImage extends BaseElement {
  static getName() {
    return 'input-crop-image';
  }

  static getTitle() {
    return 'Crop Image';
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
      locked: true,
      responsive: false,
      label: 'Form ID'
    });

    this.addControl('field_id', {
      type: CONTROLLER_TEXT,
      locked: true,
      responsive: false,
      label: 'Field ID (Column Name)'
    });

    this.addControl('text', {
      type: CONTROLLER_TEXT,
      label: 'Text',
      locked: true,
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
    });

    this.addControl('required', {
      type: CONTROLLER_SWITCHER,
      responsive: false,
      label: 'Required',
      locked: true,
    });

    this.endControlSection();

    actionsControllers(this, 'Change Actions', 'change_');

    this.startControlSection('background_image_style', {
      tab: TAB_STYLE,
      label: 'Background'
    })

    this.addControl('background_position', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "top left",
          label: "top left"
        },
        {
          value: "top",
          label: "top"
        },
        {
          value: "top right",
          label: "top right"
        },
        {
          value: "right",
          label: "right"
        },
        {
          value: "bottom right",
          label: "bottom right"
        },
        {
          value: "bottom",
          label: "bottom"
        },
        {
          value: "bottom left",
          label: "bottom left"
        },
        {
          value: "left",
          label: "left"
        },
        {
          value: "center",
          label: "center"
        }
      ],
      label: 'Background Position',
    });

    this.addControl('background_attachment', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "scroll",
          label: "scroll"
        },
        {
          value: "fixed",
          label: "fixed"
        },
        {
          value: "local",
          label: "local"
        }
      ],
      label: 'Background Attachment',
    });

    this.addControl('background_repeat', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "repeat",
          label: "repeat"
        },
        {
          value: "repeat-x",
          label: "repeat-x"
        },
        {
          value: "repeat-y",
          label: "repeat-y"
        },
        {
          value: "space",
          label: "space"
        },
        {
          value: "round",
          label: "round"
        },
        {
          value: "no-repeat",
          label: "no-repeat"
        }
      ],
      label: 'Background Repeat',
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      conditions: {
        'background_size': [''],
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
    });

    this.addControl('background_size', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "unset",
          label: "unset"
        },
        {
          value: "cover",
          label: "cover"
        },
        {
          value: "contain",
          label: "contain"
        },
        {
          value: "",
          label: "set width"
        },
      ],
      label: 'Background Size',
    });

    this.endControlSection()

    this.startControlSection('Text', {
      tab: TAB_STYLE,
      label: 'Text'
    });

    this.addControl('text_typographic', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic'
    })

    this.addControl('text_color', {
      type: CONTROLLER_COLOR,
      label: 'Color'
    })

    this.addControl('text_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      units: ['px', '%', 'vh', 'vw'],
    })

    this.endControlSection()

    this.startControlSection('size_section', {
      tab: TAB_STYLE,
      label: 'Size'
    });

    this.addControl('width', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      max: 1000,
      stateless: true,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('height', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      max: 1000,
      stateless: true,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.endControlSection();

    this.startControlSection('crop_size_section', {
      tab: TAB_STYLE,
      label: 'Crop Size'
    });

    this.addControl('crop_width', {
      type: CONTROLLER_SLIDER,
      label: 'Crop Width',
      max: 1500,
      stateless: true,
      min: 0,
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('crop_height', {
      type: CONTROLLER_SLIDER,
      label: 'Crop Height',
      max: 1500,
      stateless: true,
      min: 0,
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

    advancedTabControllers(this);
  }
}
export default InputCropImage;
