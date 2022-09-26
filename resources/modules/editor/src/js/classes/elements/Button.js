import BaseElement from "./BaseElement";
import ButtonIcon from '../../../svgs/button.svg';
import { advancedTabControllers } from "../../decorators/register-controllers";
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
  CONTROLLER_GRADIENT, CONTROLLER_REPEATER
} from "../modules/ControllersManager";
import Repeater from "../Repeater";
import {actionsControllers} from "../../decorators/actions-controllers";
import {getTemplateDataStorage} from "../../helpers";

class Button extends BaseElement {

  static getName() {
    return 'button';
  }
  static getTitle() {
    return 'Button';
  }

  static getIconComponent() {
    return ButtonIcon;
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

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('button_text', {
      type: CONTROLLER_TEXTAREA,
      responsive: false,
      label: 'Button Text',
      default: 'Click Me',
      locked: true,
    });

    this.addControl('button_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
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

    this.addControl('content_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Content Alignment',
      options: [
        {
          icon: 'block_left',
          value: 'flex-start',
        },
        {
          icon: 'block_vertically',
          value: 'center',
        },
        {
          icon: 'block_right',
          value: 'flex-end',
        },
      ],
    });

    this.addControl('button_icon_right', {
      type: CONTROLLER_MEDIA,
      label: 'Right Icon',
      locked: true,
    });

    this.addControl('button_icon_left', {
      type: CONTROLLER_MEDIA,
      label: 'Left Icon',
      locked: true,
    });

    this.addControl('button_icon_top', {
      type: CONTROLLER_MEDIA,
      label: 'Top Icon',
      locked: true,
    });

    this.addControl('button_icon_bottom', {
      type: CONTROLLER_MEDIA,
      label: 'Bottom Icon',
      locked: true,
    });

    // this.addControl('button_icon_position', {
    //   type: CONTROLLER_SELECT,
    //   label: 'Icon Position',
    //   options: [
    //     {
    //       value: 'row',
    //       label: 'Right'
    //     },
    //     {
    //       value: 'row-reverse',
    //       label: 'Left'
    //     },
    //     {
    //       value: 'column',
    //       label: 'Bottom'
    //     },
    //     {
    //       value: 'column-reverse',
    //       label: 'Top'
    //     },
    //   ],
    // });

    this.endControlSection();

    this.startControlSection("link", {
      tab: TAB_CONTENT,
      label: "Link"
    });

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      responsive:false,
      default: {
        url: "",
        attributes: "",
        noFollow: false,
        tag: 'Link'
      },
      label: 'Link',
      locked: true,
    });

    this.endControlSection();

    actionsControllers(this);

    //</editor-fold>

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position (content)',
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
    });

    this.addControl("position_css_id", {
      type: CONTROLLER_TEXT,
      label: "CSS ID",
      locked: true,
    });

    this.addControl("position_css_classes", {
      type: CONTROLLER_TEXT,
      label: "CSS Classes",
      locked: true,
    });


    this.addControl('position_opacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      step: 0.01,
      min: 0,
      max: 1,
    });

    this.endControlSection();

    this.startControlSection('background_section', {
      tab: TAB_STYLE,
      label: 'Background'
    });

    this.addControl('background_color', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
      // default: {
      //   color: "rgb(52,59,76)",
      //   colorPickedHex: "#343B4C",
      // },
    });

    this.addControl('gradient', {
      hideOnEmail: true,
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '0',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "90",
        angle: "260",
        value: ""
      },
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      locked: true,
    });

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

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      conditions: {
        'background_size': [''],
      },
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
      max: 1000,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('border_section', {
      tab: TAB_STYLE,
      label: 'Border'
    });

    this.addControl('border_type', {
        type: CONTROLLER_SELECT,
        label: 'Border Type',
        options: [
          {
            'value': 'none',
            'label': 'None',
          },
          {
            'value': 'solid',
            'label': 'Solid',
          },
          {
            'value': 'double',
            'label': 'Double',
          },
          {
            'value': 'dotted',
            'label': 'Dotted',
          },
          {
            'value': 'dashed',
            'label': 'Dashed',
          },
          {
            'value': 'groove',
            'label': 'Groove',
          },
        ],
      }
    );

    this.addControl('border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        default: {
          bind: true,
        },
        units: [
          'px',
          '%',
          'vh',
          'vw'
        ],
      }
    );

    this.addControl('border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px',
        bind: true,
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('style_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Box Shadow',
    });

    this.addControl('button_style_border_gradient_custom', {
      type: CONTROLLER_SWITCHER,
      label: "Border Gradient",
    });

    this.addControl("button_style_gradient_text", {
      type: CONTROLLER_TEXTAREA,
      label: "linear-gradient",
      default: '',
      description: "Example:<br>linear-gradient(90deg,#0068e1,#a161ee) <a style='margin-top: 10px; color: #007bff; display: block' href='https://www.colorzilla.com/gradient-editor/' target='_blank'>--> CSS Gradient Generator</a>"
    });


    this.endControlSection();

    this.startControlSection('font_section', {
      tab: TAB_STYLE,
      label: 'Font',
    });

    this.addControl('font_typographic', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
        // default:{
        //   lineHeight: 1,
        //   spacing: 0,
        //   size: 16,
        //   weight: "normal",
        //   family: "Open Sans",
        //   decoration: ""
        // },
      }
    );

    this.addControl('font_color', {
        type: CONTROLLER_COLOR,
        label: 'Color',
        // default: {
        //   color: "rgb(255,255,255)",
        //   colorPickedHex: "#FFF",
        // },
      }
    );

    this.endControlSection();

    this.startControlSection("icon_style", {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: "Icon"
    });

    this.addControl('icon_padding_right', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding for icon right',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_padding_left', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding for icon left',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_padding_top', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding for icon top',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_padding_bottom', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding for icon bottom',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_margin_right', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin for icon right',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_margin_left', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin for icon left',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_margin_top', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin for icon top',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_margin_bottom', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin for icon bottom',
      default: {
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
    });

    this.addControl('icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Icon color fill',
    });

    this.addControl('icon_color_stroke', {
      type: CONTROLLER_COLOR,
      label: 'Icon color stroke',
    });

    this.addControl('icon_color_background', {
        type: CONTROLLER_COLOR,
        label: 'Background Color',
      }
    );

    this.addControl('icon_size_right', {
      type: CONTROLLER_SLIDER,
      label: 'Icon right size',
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.addControl('icon_size_left', {
      type: CONTROLLER_SLIDER,
      label: 'Icon left size',
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.addControl('icon_size_top', {
      type: CONTROLLER_SLIDER,
      label: 'Icon top size',
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.addControl('icon_size_bottom', {
      type: CONTROLLER_SLIDER,
      label: 'Icon bottom size',
      units: [
        'px',
        '%',
        'vh',
        'vw'
      ],
      max: 100,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection("btn_transition", {
      hideOnEmail: true,
      tab: TAB_STYLE,
      label: "Transition"
    });

    this.addControl('button_transition_property', {
      type: CONTROLLER_TEXTAREA,
      label: 'Transition Property',
      description: 'Input properties, commas separated'
    });

    this.addControl("button_transition_duration", {
      type: CONTROLLER_SLIDER,
      label: 'Transition Duration',
      units: [],
      max: 5,
      min: 0,
      step: 0.1,
    });

    this.addControl('button_transition_timing', {
      type: CONTROLLER_SELECT,
      options: [
        {
          value: "linear",
          label: "linear"
        },
        {
          value: "ease",
          label: "ease"
        },
        {
          value: "ease-in",
          label: "ease-in"
        },
        {
          value: "ease-out",
          label: "ease-out"
        },
        {
          value: "ease-in-out",
          label: "ease-in-out"
        }
      ],
      label: 'Transition Timing Function',
    });

    this.addControl("button_transition_delay", {
      type: CONTROLLER_SLIDER,
      label: 'Transition Delay',
      units: [],
      max: 5,
      min: 0,
      step: 0.1,
    });

    this.endControlSection();

    this.startControlSection(
      'creative_link', {
        hideOnEmail: true,
        tab: TAB_STYLE,
        label: 'Creative Link',
      }
    );


    this.endControlSection();

    // this.startControlSection('button_advanced_tooltip', {
    //   tab: TAB_ADVANCED,
    //   label: 'Tooltip'
    // });
    //
    // this.addControl('button_advanced_tooltip_font', {
    //   type: CONTROLLER_SELECT2,
    //   label: 'Font',
    //   placeholder: 'Lato',
    //   default: '"Lato"',
    //   options: [
    //     {
    //       value: '"Roboto"',
    //       label: 'Roboto'
    //     },
    //     {
    //       value: '"Lato"',
    //       label: 'Lato'
    //     },
    //   ],
    // });
    //
    // this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Button
