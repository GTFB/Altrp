import BaseElement from "./BaseElement";
import IconIcon from '../../../svgs/icon.svg';
import {advancedTabControllers} from "../../decorators/register-controllers";
import {
  CONTROLLER_TEXTAREA,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SELECT2,
  CONTROLLER_SELECT,
  CONTROLLER_TEXT,
  CONTROLLER_LINK,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_WYSIWYG,
  CONTROLLER_COLOR,
  CONTROLLER_SHADOW,
  CONTROLLER_SWITCHER,
  TAB_CONTENT,
  TAB_STYLE,
  TAB_ADVANCED,
  CONTROLLER_MEDIA,
  CONTROLLER_CREATIVE_LINK,
  CONTROLLER_GRADIENT, CONTROLLER_REPEATER, CONTROLLER_HEADING
} from "../modules/ControllersManager";


class Icon extends BaseElement {

  static getName() {
    return 'icon';
  }
  static getTitle() {
    return 'Icon';
  }

  static getIconComponent() {
    return IconIcon;
  }
  static getType() {
    return 'widget';
  }
  static getGroup() {
    return "Basic";
  }
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('content', {
      label: 'Content',
      tab: TAB_CONTENT
    })

    this.addControl('icon', {
      type: CONTROLLER_MEDIA,
      label: 'Icon',
    })

    this.addControl('title_text', {
      type: CONTROLLER_TEXT,
      label: 'Title',
      locked: true,
    })

    this.addControl('description', {
      type: CONTROLLER_TEXT,
      label: 'Description',
      locked: true,
    })

    this.addControl('content_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Content alignment',
      options:[
        {
          label: 'left',
          value: 'left',
        },
        {
          label: 'center',
          value: 'center',
        },
        {
          label: 'right',
          value: 'right',
        },
        {
          label: 'justify',
          value: 'justify',
        }
      ],
    });

    this.addControl('icon_position', {
      type: CONTROLLER_SELECT,
      label: 'Icon position',
      options:[
        {
          label: 'left',
          value: 'row',
        },
        {
          label: 'top',
          value: 'column',
        },
        {
          label: 'right',
          value: 'row-reverse',
        },
        {
          label: 'bottom',
          value: 'column-reverse',
        }
      ],
    });

    this.addControl('icon_vertical_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Icon vertical alignment',
      options:[
        {
          label: 'top',
          value: 'flex-start',
        },
        {
          label: 'center',
          value: 'center',
        },
        {
          label: 'bottom',
          value: 'flex-end',
        },
      ],
    });

    this.addControl('icon_horizontal_alignment', {
      type: CONTROLLER_SELECT,
      label: 'Icon horizontal alignment',
      default: 'center',
      options:[
        {
          label: 'left',
          value: 'flex-start',
        },
        {
          label: 'center',
          value: 'center',
        },
        {
          label: 'right',
          value: 'flex-end',
        },
      ],
    });

    this.endControlSection()

    this.startControlSection('title_styles', {
      label: 'Title',
      tab: TAB_STYLE
    })

    this.addControl('title_tag', {
      label: 'Title tag',
      type: CONTROLLER_SELECT,
      options: [
        {
          label: 'h1',
          value: 'h1'
        },
        {
          label: 'h2',
          value: 'h2'
        },
        {
          label: 'h3',
          value: 'h3'
        },
        {
          label: 'h4',
          value: 'h4'
        },
        {
          label: 'h5',
          value: 'h5'
        },
        {
          label: 'h6',
          value: 'h6'
        },
        {
          label: 'p',
          value: 'p'
        },
        {
          label: 'div',
          value: 'div'
        },
      ],
      locked: true,
    })

    this.addControl('title_typography', {
      label: 'Typography',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('title_color', {
      label: 'Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('title_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    })

    this.addControl('title_margin', {
      label: 'Margin',
      type: CONTROLLER_DIMENSIONS,
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    })

    this.endControlSection()

    this.startControlSection('description_styles', {
      label: 'Description',
      tab: TAB_STYLE,
    })

    this.addControl('description_typography', {
      label: 'Typography',
      type: CONTROLLER_TYPOGRAPHIC
    })

    this.addControl('description_color', {
      label: 'Color',
      type: CONTROLLER_COLOR
    })

    this.addControl('description_padding', {
      label: 'Padding',
      type: CONTROLLER_DIMENSIONS,
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    })

    this.addControl('description_margin', {
      label: 'Margin',
      type: CONTROLLER_DIMENSIONS,
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    })

    this.endControlSection()

    this.startControlSection('icon_styles', {
      label: 'Icon',
      tab: TAB_STYLE,
      locked: true,
    })

    this.addControl('icon_margin', {
      label: 'Margin',
      type: CONTROLLER_DIMENSIONS,
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    })

    this.addControl("icon_height", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 1000,
      min: 0,
    });

    this.addControl("icon_fill", {
      type: CONTROLLER_COLOR,
      label: 'Fill color',
    });

    // this.addControl('icon_padding', {
    //   label: 'Padding',
    //   type: CONTROLLER_DIMENSIONS
    // })

    // this.addControl('icon_opacity', {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Opacity',
    //   step: 0.01,
    //   min: 0,
    //   max: 1,
    // })

    // this.addControl('icon_alignment', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Alignment',
    //   options:[
    //     {
    //       icon: 'left',
    //       value: 'flex-start',
    //     },
    //     {
    //       icon: 'center',
    //       value: 'center',
    //     },
    //     {
    //       icon: 'right',
    //       value: 'flex-end',
    //     }
    //   ],
    // })

    this.endControlSection()

    advancedTabControllers(this);
  }
}

export default Icon
