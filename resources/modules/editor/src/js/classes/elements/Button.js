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
  _registerControls() {
    if (this.controllersRegistered) {
      return
    }

    this.startControlSection('button_type_section', {
      tab: TAB_CONTENT,
      label: 'Button type',
    });

    this.addControl('link_button_type', {
      type: CONTROLLER_SELECT,
      label: 'Link type',
      default: 'none',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'dropbar',
          label: 'Dropbar'
        },
        {
          value: 'offcanvas',
          label: 'Offcanvas'
        },
      ],
    });

    // this.addControl('popup_trigger_type', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Popup trigger',
    // });
    //
    // this.addControl("popup_id", {
    //   type: CONTROLLER_SELECT2,
    //   prefetch_options: true,
    //   label: "Popup ID",
    //   isClearable: true,
    //   options_resource: '/admin/ajax/templates/options?template_type=popup&value=guid',
    //   nullable: true,
    //   conditions: {
    //     'popup_trigger_type': true,
    //   },
    // });
    //
    // this.addControl('hide_elements_trigger', {
    //   type: CONTROLLER_TEXT,
    //   label: 'Hide Elements Trigger'
    // });

    this.endControlSection();

    this.startControlSection('content_section', {
      tab: TAB_CONTENT,
      label: 'Content',
    });

    this.addControl('button_text', {
      type: CONTROLLER_TEXTAREA,
      label: 'Button Text',
      default: 'Click Me'
    });

    this.addControl('button_alignment', {
      type: CONTROLLER_CHOOSE,
      label: 'Alignment',
      default: 'center',
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
      rules: {
        '{{ELEMENT}}': 'align-items: {{VALUE}};',
        '{{ELEMENT}} .altrp-dropbar': 'align-items: {{VALUE}};',
      },
    });

    this.addControl('button_icon', {
      type: CONTROLLER_MEDIA,
      label: 'Choose Icon',
    });

    this.addControl('button_icon_position', {
      type: CONTROLLER_SELECT,
      label: 'Icon Position',
      default: 'default',
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
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'flex-direction: {{VALUE}};'
      },
    });

    this.endControlSection();

    this.startControlSection("link", {
      tab: TAB_CONTENT,
      label: "Link"
    });

    this.addControl('link_link', {
      type: CONTROLLER_LINK,
      default: {
        url: "",
        attributes: "",
        noFollow: false,
        tag: 'Link'
      },
      label: 'Link',
    });

    this.endControlSection();
    /**
     * Список произвольных действия для кнопки START
     */
    this.startControlSection("actions_section", {
      tab: TAB_CONTENT,
      label: "Actions"
    });

    let actionsRepeater = new Repeater();

    actionsRepeater.addControl('type', {
      label: 'Type',
      type: CONTROLLER_SELECT,
      nullable: true,
      responsive: false,
      options: [
        {
          value: 'form',
          label: 'Form',
        },
        {
          value: 'toggle_element',
          label: 'Toggle Elements',
        },
        {
          value: 'toggle_popup',
          label: 'Toggle Popup',
        },
        {
          value: 'toggle_offcanvas',
          label: 'Toggle Offcanvas',
        },
        {
          value: 'print_page',
          label: 'Print Page',
        },
        {
          value: 'print_elements',
          label: 'Print Elements',
        },
        {
          value: 'scroll_to_element',
          label: 'Scroll to Element',
        },
        {
          value: 'scroll_to_top',
          label: 'Scroll to Top',
        },
        {
          value: 'scroll_to_bottom',
          label: 'Scroll to Bottom',
        },
        {
          value: 'redirect',
          label: 'Redirect',
        },
        {
          value: 'trigger',
          label: 'Trigger Action',
        },
        {
          value: 'page_to_pdf',
          label: 'Page to PDF',
        },
        {
          value: 'elements_to_pdf',
          label: 'Elements to PDF',
        },
        {
          value: 'data_to_csv',
          label: 'Data Convert to CSV',
        },
        {
          value: 'table_to_csv',
          label: 'Table to CSV',
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
          value: 'set_data',
          label: 'Set Data',
        },
      ],
    });

    actionsRepeater.addControl('action', {
      type: CONTROLLER_TEXT,
      dynamic: false,
      label: 'Add action name',
      conditions: {
        type: [
          'trigger'
        ],
      },
    });

    actionsRepeater.addControl('form_method', {
      label: 'Method',
      type: CONTROLLER_SELECT,
      responsive: false,
      nullable: true,
      options: [
        {
          value: 'GET',
          label: 'Get',
        },
        {
          value: 'PUT',
          label: 'Put',
        },
        {
          value: 'POST',
          label: 'Post',
        },
        {
          value: 'DELETE',
          label: 'Delete',
        },
      ],
      conditions: {
        type: 'form',
      },
    });

    actionsRepeater.addControl('form_id', {
      label: 'Form ID',
      dynamic: false,
      conditions: {
        type: [
          'form',
          'login',
        ],
      },
    });

    actionsRepeater.addControl('name', {
      label: 'Name',
      dynamic: false,
      conditions: {
        type: [
          'page_to_pdf',
          'elements_to_pdf',
          'data_to_csv',
          'table_to_csv',
        ],
      },
    });

    actionsRepeater.addControl('form_url', {
      label: 'URL',
      responsive: false,
      dynamic: false,
      description: '/ajax/models/tests/{{id}}',
      conditions: {
        type: [
          'form',
          'redirect',
        ],
      },
    });

    actionsRepeater.addControl('back', {
      label: 'Back',
      type: CONTROLLER_SWITCHER,
      responsive: false,
      dynamic: false,
      conditions: {
        type: [
          'redirect',
        ],
      },
    });

    actionsRepeater.addControl('elements_ids', {
      label: 'Elements',
      responsive: false,
      dynamic: false,
      description: 'element_id1, element_id12',
      conditions: {
        type: [
          'toggle_element',
          'print_elements',
          'elements_to_pdf',
        ],
      },
    });

    actionsRepeater.addControl('element_id', {
      label: 'Element',
      responsive: false,
      dynamic: false,
      description: 'element_id1',
      conditions: {
        type: [
          'scroll_to_element',
          'trigger',
          'table_to_csv',
          'toggle_offcanvas'
        ],
      },
    });

    actionsRepeater.addControl('path', {
      label: 'Path',
      responsive: false,
      dynamic: false,
      description: 'altrpdata.alias',
      conditions: {
        type: [
          'data_to_csv',
          'set_data',
        ],
      },
    });
    actionsRepeater.addControl('set_type', {
      label: 'Set Type',
      type: CONTROLLER_SELECT,
      responsive: false,
      nullable: true,
      options: [
        {
          label: 'Toggle',
          value: 'toggle',
        },
        {
          label: 'Set',
          value: 'set',
        },
        {
          label: 'Toggle/Set',
          value: 'toggle_set',
        },
      ],
      conditions: {
        type: 'set_data',
      },
    });

    actionsRepeater.addControl('value', {
      label: 'Value',
      type: CONTROLLER_TEXTAREA,
      responsive: false,
      dynamic: false,
      conditions: {
        type: [
          'set_data',
        ],
        set_type: [
          'set',
          'toggle_set',
        ],
      },
    });

    actionsRepeater.addControl("popup_id", {
      type: CONTROLLER_SELECT2,
      prefetch_options: true,
      label: "Popup ID",
      isClearable: true,
      options_resource: '/admin/ajax/templates/options?template_type=popup&value=guid',
      nullable: true,
      conditions: {
        type: [
          'toggle_popup',
        ],
      },
    });

    actionsRepeater.addControl('confirm', {
      type: CONTROLLER_TEXTAREA,
      dynamic: false,
      label: 'Confirm Text',
    });

    actionsRepeater.addControl('alert', {
      type: CONTROLLER_TEXTAREA,
      dynamic: false,
      label: 'Success',
    });

    actionsRepeater.addControl('reject', {
      type: CONTROLLER_TEXTAREA,
      dynamic: false,
      label: 'Reject',
    });

    this.addControl('actions', {
      label: 'Actions',
      type: CONTROLLER_REPEATER,
      fields: actionsRepeater.getControls(),
    });

    this.endControlSection();
    /**
     * Список произвольных действия для кнопки END
     */
    this.startControlSection("form_section", {
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
    });

    this.addControl('redirect_to_prev_page', {
      type: CONTROLLER_SWITCHER,
      label: 'Redirect To Prev Page',
    });

    this.addControl('close_popups', {
      type: CONTROLLER_SWITCHER,
      label: 'Close all Popups',
    });

    this.endControlSection();

    this.startControlSection('dropbar_section', {
      tab: TAB_CONTENT,
      label: 'Dropbar content',
    });

    this.addControl("content_dropbar_section", {
      type: CONTROLLER_WYSIWYG,
      label: "Content",
      default: "I Am Text in dropbar"
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
    });

    this.addControl("width_dropbar_options", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        unit: 'px',
      },
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-dropbar-container{{STATE}}": "width: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("show_delay_dropbar_options", {
      type: CONTROLLER_SLIDER,
      label: 'Dropbar show delay',
      default: {
        size: 0,
        unit: 's',
      },
      max: 1000,
      min: 0,
    });

    this.addControl("hide_delay_dropbar_options", {
      type: CONTROLLER_SLIDER,
      label: 'Dropbar hide delay',
      default: {
        size: 0,
        unit: 's',
      },
      max: 1000,
      min: 0,
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
    });

    this.endControlSection();
    //<editor-fold desc="other_actions_on">
    this.startControlSection('other_actions', {
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

    });

    this.addControl('print_elements_ids', {
      label: 'IDs',
      dynamic: false,
      conditions: {
        'other_action_type': 'print_elements'
      },
    });

    this.endControlSection();
    //</editor-fold>

    this.startControlSection('position_section', {
      tab: TAB_STYLE,
      label: 'Position',
    });

    this.addControl('position_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
          'margin-top: {{TOP}}{{UNIT}};',
          'margin-right: {{RIGHT}}{{UNIT}};',
          'margin-bottom: {{BOTTOM}}{{UNIT}};',
          'margin-left: {{LEFT}}{{UNIT}};'
        ]
      },
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
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('position_z_index', {
      type: CONTROLLER_NUMBER,
      label: 'Z-index',
      default: 0,
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'z-index: {{VALUE}}'
      }
    });

    this.addControl('position_css_id', {
      type: CONTROLLER_TEXT,
      label: 'CSS ID'
    });

    this.addControl('position_css_classes', {
      type: CONTROLLER_TEXT,
      label: 'CSS Classes',
      default: ''
    });

    this.addControl('position_opacity', {
      type: CONTROLLER_SLIDER,
      label: 'Opacity',
      step: 0.01,
      min: 0,
      max: 1,
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'opacity: {{SIZE}};'
      },
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
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
          'font-size: {{SIZE}}px;',
          'font-family: {{FAMILY}}',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
    }
    );

    this.addControl('font_color', {
      type: CONTROLLER_COLOR,
      label: 'Color',
      // default: {
      //   color: "rgb(255,255,255)",
      //   colorPickedHex: "#FFF",
      // },
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'color: {{COLOR}};',
      },
    }
    );

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
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-style: {{VALUE}};',
      },
    }
    );

    this.addControl(
      'border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      default: {
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    }
    );

    this.addControl('border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
      // default: {
      //   color: "rgb(50,168,82)",
      //   colorPickedHex: "#32a852",
      // },
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'border-color: {{COLOR}};',
      },
    }
    );

    this.addControl('border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      default: {
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl('style_background_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      default: {
        // blur: 0,
        // horizontal: 0,
        // vertical: 0,
        // opacity: 1,
        // spread: 0,
        // colorRGB: 'rgb(0, 0, 0)',
        // color: 'rgb(0, 0, 0)',
        // colorPickedHex: '#000000',
        // type: ""
      },
      presetColors: [
        '#eaeaea',
        '#9c18a8'
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
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
      rules: {
        '{{ELEMENT}} .altrp-btn{{STATE}}': 'background-color: {{COLOR}};',
      },
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      default: {
        isWithGradient: false,
        firstColor: "rgba(97,206,112,1)",
        firstPoint: '100',
        secondColor: "rgba(242,41,91,1)",
        secondPoint: "0",
        angle: "0",
        value: ""
      },
      rules: {
        "{{ELEMENT}} .altrp-btn{{STATE}}": "background-image: {{VALUE}}"
      }
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      default: { url: "" },
      rules: {
        "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-image: url({{URL}});"
      }
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
      default: 'top left',
      rules: {
        "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-position: {{VALUE}};"
      }
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
      default: 'scroll',
      rules: {
        "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-attachment: {{VALUE}};"
      }
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
      default: 'repeat',
      rules: {
        "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-repeat: {{VALUE}};"
      }
    });

    this.addControl("background_image_width", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      default: {
        size: 100,
        unit: 'px',
      },
      conditions: {
        'background_size': [''],
      },
      units: [
        'px',
        '%',
        'vw',
      ],
      max: 1000,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
      }
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
      default: 'unset',
      rules: {
        "{{ELEMENT}} .altrp-background-image{{STATE}}": "background-size: {{VALUE}};"
      }
    });

    this.endControlSection();

    this.startControlSection("icon_style", {
      tab: TAB_STYLE,
      label: "Icon"
    });

    this.addControl('icon_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px',
        bind: true
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}} .altrp-btn-icon{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('icon_color', {
      type: CONTROLLER_COLOR,
      label: 'Icon color',
      default: {
        color: "rgb(255,255,255)",
        colorPickedHex: "#ffffff",
      },
      rules: {
        '{{ELEMENT}} .altrp-btn-icon path{{STATE}}': 'fill: {{COLOR}};',
      },
    });

    this.addControl('icon_color_background', {
      type: CONTROLLER_COLOR,
      label: 'Background Color',
      rules: {
        '{{ELEMENT}} .altrp-btn-icon svg{{STATE}}': 'background: {{COLOR}};',
      },
    }
    );

    this.addControl('icon_size', {
      type: CONTROLLER_SLIDER,
      label: 'Icon Size',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        '{{ELEMENT}} .altrp-btn-icon{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-btn-icon svg{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
        '{{ELEMENT}} .altrp-btn-icon img{{STATE}}': 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
      },
    });

    this.endControlSection();

    this.startControlSection(
      'creative_link', {
      tab: TAB_STYLE,
      label: 'Creative Link',
    }
    );

    this.addControl('creative_link_controller', {
      type: CONTROLLER_CREATIVE_LINK,
      label: 'Creative Link',
      rules: {
        '{{ELEMENT}} .altrp-btn:after{{STATE}}': [
          'transition-duration: {{SIZE}}s;',
          'height: {{LINEHEIGHT}}px;',
          'color: {{COLOR}};',
          'background: {{BACKGROUND}};',
        ],
        '{{ELEMENT}} .altrp-btn:before{{STATE}}': [
          'transition-duration: {{SIZE}}s;',
          'height: {{LINEHEIGHT}}px;',
          'color: {{COLOR}};',
          'background: {{BACKGROUND}};',
        ],
      },
    }
    );

    this.endControlSection();

    this.startControlSection("dropbar_content_style", {
      tab: TAB_STYLE,
      label: "Dropbar"
    });

    this.addControl("background_dropbar_content_style", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      default: {
        color: "rgb(52,59,76)",
        colorPickedHex: "#343B4C",
      },
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl("text_color_dropbar_content_style", {
      type: CONTROLLER_COLOR,
      label: "Text color",
      default: {
        color: "rgb(255,255,255)",
        colorPickedHex: "#FFFFFF",
      },
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}": "color: {{COLOR}};"
      }
    });

    this.addControl('typographic_text_dropbar_content_style', {
      type: CONTROLLER_TYPOGRAPHIC,
      label: 'Typographic',
      default: {
        lineHeight: 1,
        spacing: 0,
        size: 16,
        weight: "normal",
        family: 'roboto',
        decoration: ""
      },
      rules: {
        '{{ELEMENT}} .altrp-dropbar-btn-content{{STATE}}': [
          'font-family: "{{FAMILY}}", sans-serif;',
          'font-size: {{SIZE}}px;',
          'line-height: {{LINEHEIGHT}};',
          'letter-spacing: {{SPACING}}px',
          'font-weight: {{WEIGHT}}',
          'text-transform: {{TRANSFORM}}',
          'font-style: {{STYLE}}',
          'text-decoration: {{DECORATION}}'
        ],
      },
    }
    );

    this.addControl("padding_dropbar_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      default: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}};",
          "padding-bottom: {{BOTTOM}}{{UNIT}};",
          "padding-left: {{LEFT}}{{UNIT}};"
        ]
      }
    });

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
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "border-style: {{VALUE}};"
      }
    });

    this.addControl("border_width_dropbar_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("border_color_dropbar_content_style", {
      type: CONTROLLER_COLOR,
      label: "Border color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "border-color: {{COLOR}};"
      }
    });

    // this.addControl('box_shadow_dropbar_content_style', {
    //   type: CONTROLLER_SHADOW,
    //   label: 'Box shadow',
    //   default:{
    //     blur: 0,
    //     horizontal: 0,
    //     vertical: 0,
    //     opacity: 1,
    //     spread: 0,
    //     colorRGB: 'rgb(0, 0, 0)',
    //     color: 'rgb(0, 0, 0)',
    //     colorPickedHex: '#000000',
    //     type: ""
    //     },
    //     rules: {
    //       '{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
    //     },
    //   }
    // );

    this.addControl("border_radius_dropbar_content_style", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border radius",
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: "px"
      },
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-dropbar-btn-containter{{STATE}}": "border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}",
      }
    });


    this.endControlSection();

    this.startControlSection('button_advanced_tooltip', {
      tab: TAB_ADVANCED,
      label: 'Tooltip'
    });

    this.addControl('button_advanced_tooltip_font', {
      type: CONTROLLER_SELECT2,
      label: 'Font',
      placeholder: 'Lato',
      default: '"Lato"',
      options: [
        {
          value: '"Roboto"',
          label: 'Roboto'
        },
        {
          value: '"Lato"',
          label: 'Lato'
        },
      ],
      rules: {
        '{{ELEMENT}}': 'font-family: {{VALUE}}'
      }
    });

    this.endControlSection();

    advancedTabControllers(this);
  }
}

export default Button
