import BaseElement from "./BaseElement";
import ButtonIcon from '../../../svgs/dropbar.svg';
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
import Button from "./Button";

class Dropbar extends BaseElement {

  static getName() {
    return 'dropbar';
  }
  static getTitle() {
    return 'Dropbar';
  }

  static getIconComponent() {
    return ButtonIcon;
  }
  static getType() {
    return 'widget';
  }
  static getGroup() {
    return "Advanced";
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
      label: 'Button Text',
      responsive: false,
      default: `Show dropdown`,
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

    this.addControl('button_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Choose Icon',
      locked: true,
    });

    this.addControl('button_icon_position', {
      type: CONTROLLER_SELECT,
      label: 'Icon Position',
      options: [
        {
          value: 'row',
          label: 'Right'
        },
        {
          value: 'row-reverse',
          label: 'Left'
        },
        {
          value: 'column',
          label: 'Bottom'
        },
        {
          value: 'column-reverse',
          label: 'Top'
        },
      ],
    });

    this.endControlSection();

    this.startControlSection('dropbar_section', {
      tab: TAB_CONTENT,
      label: 'Dropbar content',
    });

    this.addControl('type_dropbar_section', {
      type: CONTROLLER_SELECT,
      label: 'Type',
      default: 'text',
      options: [
        {
          'value': 'text',
          'label': 'Text',
        },
        {
          'value': 'card',
          'label': 'Card',
        },
      ],
      locked: true,
    });

    this.addControl("content_dropbar_section", {
      conditions: {
        'type_dropbar_section': "text",
      },
      type: CONTROLLER_WYSIWYG,
      label: "Content",
      default: "I Am Text in dropbar",
      locked: true,
    });

    this.addControl("template_dropbar_section", {
      conditions: {
        'type_dropbar_section': "card",
      },
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
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('dropbar_options_section', {
      tab: TAB_CONTENT,
      label: 'Dropbar options',
    });

    this.addControl("position_dropbar_options", {
      type: CONTROLLER_SELECT,
      label: "Position",
      default: "bottom-start",
      options: [
        {
          value: "bottom-start",
          label: "Bottom left"
        },
        {
          value: "bottom",
          label: "Bottom center"
        },
        {
          value: "bottom-end",
          label: "Bottom right"
        },
        {
          value: "top-start",
          label: "Top left"
        },
        {
          value: "top",
          label: "Top center"
        },
        {
          value: "top-end",
          label: "Top right"
        },
        {
          value: "left-start",
          label: "Left top"
        },
        {
          value: "left",
          label: "Left center"
        },
        {
          value: "left-end",
          label: "Left bottom"
        },
        {
          value: "right-start",
          label: "Right top"
        },
        {
          value: "right",
          label: "Right center"
        },
        {
          value: "right-end",
          label: "Right bottom"
        },
      ],
      locked: true,
    });

    this.addControl("mode_dropbar_options", {
      type: CONTROLLER_SELECT,
      label: "Mode",
      default: "click",
      options: [
        {
          value: "click",
          label: "Click"
        },
        {
          value: "hover",
          label: "Hover"
        }
      ],
      locked: true,
    });

    this.addControl("show_delay_dropbar_options", {
      type: CONTROLLER_SLIDER,
      label: 'Dropbar show delay',
      default: {
        unit: 'ms',
      },
      units: [
        'ms'
      ],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl("hide_delay_dropbar_options", {
      type: CONTROLLER_SLIDER,
      label: 'Dropbar hide delay',
      default: {
        unit: 'ms',
      },
      units: [
        'ms'
      ],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl("offset_dropbar_options", {
      type: CONTROLLER_SLIDER,
      label: 'Dropbar offset',
      default: {
        size: 15,
        unit: 'px',
      },
      max: 100,
      min: -100,
      locked: true,
    });

    this.endControlSection();

    actionsControllers(this);

    this.startControlSection("form_section", {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: "Form Settings"
    });

    this.addControl('form_id', {
      label: 'Form ID',
      placeholder: 'Form ID'
    });

    this.addControl('form_actions', {
      type: CONTROLLER_SELECT2,
      label: 'Form Actions',
      options: [
        {
          value: 'null',
          label: 'Null',
        },
        {
          value: 'add_new',
          label: 'Add New',
        },
        {
          value: 'delete',
          label: 'Delete',
        },
        {
          value: 'edit',
          label: 'Edit',
        },
        {
          value: 'login',
          label: 'Login',
        },
        {
          value: 'logout',
          label: 'Logout',
        },
        {
          value: 'email',
          label: 'Email',
        },
      ],
    });

    this.addControl('form_confirm', {
      type: CONTROLLER_TEXTAREA,
      label: 'Confirm Submit Form Text',
      default: '',
      locked: true,
    });

    this.addControl('email_subject', {
      conditions: {
        'form_actions': 'email',
      },
      type: CONTROLLER_TEXTAREA,
      label: 'Subject',
      default: '',
    });

    this.addControl('text_after', {
      type: CONTROLLER_TEXTAREA,
      label: 'Text After Sending',
      default: '',
      locked: true,
    });

    this.addControl('choose_model', {
      conditions: {
        'form_actions': 'add_new',
      },
      label: 'Choose Model',
      responsive: false,
      type: CONTROLLER_SELECT,
      resource: '/admin/ajax/models_options?with_names=true',
    });

    this.addControl('redirect_after', {
      label: 'Redirect After',
      locked: true,
    });

    this.addControl('redirect_to_prev_page', {
      type: CONTROLLER_SWITCHER,
      label: 'Redirect To Prev Page',
      locked: true,
    });

    this.addControl('close_popups', {
      type: CONTROLLER_SWITCHER,
      label: 'Close all Popups',
    });

    this.endControlSection();

    this.startControlSection('other_actions', {
      hideOnEmail: true,
      tab: TAB_CONTENT,
      label: 'Other Actions',
    });

    this.addControl('other_action_type', {
      type: CONTROLLER_SELECT2,
      label: 'Actions',
      isMulti: true,
      options: [
        {
          label: 'Print Elements',
          value: 'print_elements',
        },
      ],
      locked: true,
    });

    this.addControl('print_elements_ids', {
      label: 'IDs',
      dynamic: false,
      conditions: {
        'other_action_type': 'print_elements'
      },
      locked: true,
    });

    this.endControlSection();

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        // top: 20,
        // right: 25,
        // bottom: 20,
        // left: 25,
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('position_z_index', {
      hideOnEmail: true,
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes',
      default: '',
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
        secondPoint: "100",
        angle: "0",
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
        units: ['px', '%', 'vh', 'vw'],
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
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('style_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
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

    this.addControl('icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        unit: 'px',
        bind: true
      },
      units: ['px', '%', 'vh', 'vw'],
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

    this.addControl('icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Size',
      default: {
      },
      units: ['px', '%', 'vh', 'vw'],
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

    this.startControlSection("dropbar_content_style", {
      tab: TAB_STYLE,
      label: "Dropbar",
    });

    this.addControl("padding_dropbar_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("width_dropbar_options-content", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: 'px',
      },
      units: ['px', '%', 'vh', 'vw'],
      max: 1000,
      min: 0,
      locked: true,
    });

    this.addControl("background_dropbar_content_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl("text_color_dropbar_content_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "",
        colorPickedHex: "",
      },
    });

    this.addControl('typographic_text_dropbar_content_style', {
        type: CONTROLLER_TYPOGRAPHIC,
        label: 'Typographic',
      }
    );

    this.addControl("border_style_dropbar_content_style", {
      type: CONTROLLER_SELECT,
      label: "Border type",
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "solid",
          label: "Solid"
        },
        {
          value: "double",
          label: "Double"
        },
        {
          value: "dotted",
          label: "Dotted"
        },
        {
          value: "dashed",
          label: "Dashed"
        },
        {
          value: "groove",
          label: "Groove"
        }
      ],
    });

    this.addControl("border_width_dropbar_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl("border_color_dropbar_content_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "",
        colorPickedHex: ""
      },
    });

    this.addControl("border_radius_dropbar_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        unit: "px"
      },
      units: ['px', '%', 'vh', 'vw'],
    });

    this.addControl('box_shadow_dropbar_content_style', {
        type: CONTROLLER_SHADOW,
        label: 'Box shadow',
      }
    );

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Dropbar
