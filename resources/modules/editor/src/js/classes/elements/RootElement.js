import BaseElement from "./BaseElement";
import {
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_SWITCHER,
  CONTROLLER_TEXT,
  CONTROLLER_TEXTAREA,
  CONTROLLER_SELECT,
  CONTROLLER_CHOOSE,
  CONTROLLER_SLIDER,
  CONTROLLER_SELECT2,
  CONTROLLER_LINK,
  CONTROLLER_COLOR,
  CONTROLLER_BUTTON,
  CONTROLLER_HEADING,
  CONTROLLER_CSSEDITOR,
  CONTROLLER_TYPOGRAPHIC,
  CONTROLLER_FILTERS,
  CONTROLLER_GRADIENT,
  TAB_ADVANCED,
  TAB_CONTENT,
  TAB_STYLE,
  CONTROLLER_SHADOW,
  CONTROLLER_MEDIA, CONTROLLER_REPEATER, CONTROLLER_WYSIWYG,
} from "../modules/ControllersManager";
  import Repeater from "../Repeater";
  import SaveImportModule from "../modules/SaveImportModule";
  import {actionsControllers} from "../../decorators/actions-controllers";
  import {getTemplateDataStorage, getTemplateType} from "../../helpers";
import {getCurrentElement} from "../../store/store";

class RootElement extends BaseElement {
  constructor() {
    super();
  }

  static getName() {
    return 'root-element';
  }

  static getTitle() {
    return 'Page';
  }

  static getType() {
    return 'root-element';
  }

  _registerControls() {
    if (this.controllersRegistered) {
      return
    }
/*
    this.addControl( 'test_repeater', {
      label: 'test Items',
      type: CONTROLLER_REPEATER,
      fields: repeater.getControls(),
      default : [{
        text: 'Item 1',
      }, {
        text: 'Item 2',
      },],
  } );
*/
    // this.startControlSection('preview_section',{
    //   label: 'Preview Settings',
    // });
    //
    // this.addControl('choose_page', {
    //   type: CONTROLLER_SELECT2,
    //   label: 'Choose Page',
    //   options_resource: '/admin/ajax/pages_options',
    // });

    // this.addControl('preview_heading', {
    //   label: 'Model Settings',
    //   type: CONTROLLER_HEADING
    // });

    // this.addControl('preview_model', {
    //   type: CONTROLLER_SELECT,
    //   resource: '/admin/ajax/models_options?with_names=1&not_plural=1',
    //   nullable: true,
    // });
    // this.addControl('preview_model_instance', {
    //   type: CONTROLLER_SELECT2,
    //   options_resource: '/ajax/models/{{preview_model}}_options',
    //   conditions:{
    //     'preview_model!': [null, '', undefined],
    //   },
    //   nullable: true,
    // });
    //
    // this.endContropreview_model_instance', {
    //   type: CONTROLLER_SELECT2,
    //   options_resource: '/ajax/models/{{preview_model}}_options',
    //   conditions:{
    //     'preview_model!': [null, '', undefined],
    //   },
    //   nullable: true,
    // });
    //
    // this.endControlSection();

    // this.startControlSection('default_displaying', {
    //   label: 'Default Displaying',
    // });
    //
    // this.addControl('hidden_elements_triggers', {
    //   type: CONTROLLER_TEXTAREA,
    //   dynamic: false,
    //   label: 'Hidden Elements Triggers',
    //   description: 'Input triggers, commas separated'
    // });
    //
    // this.endControlSection();

    this.startControlSection('content', {
      label: 'Content',
    });

    this.addControl('__template_name', {
      label: 'Template Name',
      responsive: false,
      dynamic: false,
    })

    this.endControlSection();

    this.startControlSection('popup_section', {
      label: 'Popup',
      conditionsCallback: ()=>{
        return getTemplateType() === 'popup'
      }
    });

    this.addControl("type_popup", {
      type: CONTROLLER_SELECT,
      label: "Type",
      options: [
        {
          value: "popup",
          label: "Popup"
        },
        {
          value: "offcanvas",
          label: "Offcanvas"
        }
      ],
    });

    this.endControlSection();

    this.startControlSection('popup_layout_section',{
      label: 'Popup layout',
      conditionsCallback: ()=>{
        return getTemplateType() === 'popup'
      },
    });

    this.addControl('heading_position_popup_layout', {
      type: CONTROLLER_HEADING,
      label: "Position"
    });

    this.addControl('horizontal_position_popup_layout', {
      type: CONTROLLER_CHOOSE,
      label: 'Horizontal',
      options: [
        {
          icon: 'left',
          value: 'left',
        },
        {
          icon: 'center',
          value: 'center',
        },
        {
          icon: 'right',
          value: 'right',
        },
      ],
    });

    this.addControl('vertical_position_popup_layout', {
      type: CONTROLLER_CHOOSE,
      label: 'Vertical',
      options: [
        {
          icon: 'block_top',
          value: 'top',
        },
        {
          icon: 'block_horiz',
          value: 'center',
        },
        {
          icon: 'block_bottom',
          value: 'bottom',
        },
      ],
    });

    this.addControl("width_popup_layout", {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      units: [
        'px',
        '%',
        'vw'
      ],
      max: 1200,
      min: 0,
      rules: {
        '.{{ID}}-app-popup .popup-window{{STATE}}': 'width: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl("height_popup_layout", {
      type: CONTROLLER_SELECT,
      label: "Height",
      options: [
        {
          value: "fitToContent",
          label: "Fit to content"
        },
        {
          value: "fitToScreen",
          label: "Fit to screen"
        },
        {
          value: "custom",
          label: "Custom"
        }
      ],
    });

    this.addControl("height_custom_popup_layout", {
      conditions: {
        'height_popup_layout': 'custom',
      },
      type: CONTROLLER_SLIDER,
      label: 'Custom height',
      units: [
        'px',
        '%',
        'vh'
      ],
      max: 1000,
      min: 0,
      rules: {
        '.{{ID}}-app-popup.app-popup-height-custom .popup-window{{STATE}}': 'height: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl("content_height_custom_popup_layout", {
      type: CONTROLLER_SLIDER,
      label: 'Custom content height',
      units: [
        'px',
        '%',
        'vh'
      ],
      max: 10000,
      min: 0,
      rules: {
        '.{{ID}}-app-popup.app-popup-height-custom .popup-window{{STATE}} .popup-content': 'height: {{SIZE}}{{UNIT}};',
      },
    });

    this.addControl("content_position_popup_layout", {
      type: CONTROLLER_SELECT,
      label: "Content Position",
      options: [
        {
          value: "flex-start",
          label: "Top"
        },
        {
          value: "center",
          label: "center"
        },
        {
          value: "flex-end",
          label: "bottom"
        }
      ],
    });

    this.addControl('popup_pa', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Popup Padding',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
    });

    this.addControl('popup_border', {
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

    this.addControl('popup_border_width', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Width',
        units: [
          'px',
          '%',
          'vh',
        ],
      }
    );

    this.addControl('popup_border_color', {
        type: CONTROLLER_COLOR,
        label: 'Border Color',
      }
    );

    this.addControl('popup_radius', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Border Radius',
        units: [
          'px',
          '%',
          'vh',
        ],
      }
    );

    this.addControl('layout_bg', {
      type: CONTROLLER_COLOR,
      label: "Layout Background",
    });

    this.addControl('popup_bg', {
      type: CONTROLLER_COLOR,
      label: "Popup Background",
    });

    this.addControl('heading_close_popup_layout', {
      type: CONTROLLER_HEADING,
      label: "Close",
    });

    this.addControl('overlay_close_popup_layout', {
      type: CONTROLLER_SWITCHER,
      label: 'Overlay',
    });

    this.addControl('switcher_close_button_popup_layout', {
      type: CONTROLLER_SWITCHER,
      label: 'Custom close button',
    });

    this.addControl("popup_close_icon", {
      type: CONTROLLER_MEDIA,
      conditions: {
        'switcher_close_button_popup_layout': true,
      },

      label: 'Close icon'
    });

    // this.addControl('icon_close_button_popup_layout', {
    //   conditions: {
    //     'switcher_close_button_popup_layout': true,
    //   },
    //   type: CONTROLLER_MEDIA,
    //   label: 'Icon',
    // });

    // this.addControl('position_close_button_popup_layout', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'alignment',
    //   options: [
    //     {
    //       icon: 'left',
    //       value: 'left',
    //     },
    //     {
    //       icon: 'right',
    //       value: 'right',
    //     },
    //   ],
    // });

    this.endControlSection();

    this.startControlSection('popup_close_icon_section', {

      conditionsCallback: ()=>{
        return getTemplateType() === 'popup'
      },
      label: 'Close Button',
    });

    this.addControl('close_context', {
      type: CONTROLLER_SELECT,
      label: 'Close Button Position Context',
      options: [
        {
          label: 'Popup',
          value: 'popup',
        },
        {
          label: 'Window',
          value: 'window',
        },
      ],
    });

    this.addControl('close_right', {
      type: CONTROLLER_SLIDER,
      label: 'Right',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: -100,
    });

    this.addControl('close_top', {
      type: CONTROLLER_SLIDER,
      label: 'Top',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: -100,
    });

    this.addControl('popup_close_icon_width_size', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
    });

    this.addControl('popup_close_icon_height_size', {
      type: CONTROLLER_SLIDER,
      label: 'Height',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
    });

    this.addControl('close_pa', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Button Padding',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
    });


    this.endControlSection();

    // this.startControlSection('button_styles', {
    //   label: 'Close Button',
    //   tab: TAB_STYLE,
    // });
    //
    // this.addControl("close_c", {
    //   type: CONTROLLER_COLOR,
    //   label: "Button Background Color",
    // });
    //
    // this.addControl("icon_fill", {
    //   type: CONTROLLER_COLOR,
    //   label: "Icon Fill",
    // });
    //
    // this.endControlSection();

    this.startControlSection('transitions', {
      label: 'Transitions',

    });

    this.addControl("half", {
      type: CONTROLLER_SWITCHER,
      label: "Half Top Sticky",
      conditionsCallback: ()=>{
        return altrpEditor.modules?.templateDataStorage?.type === 'header'

      }
    });


    this.addControl("animations_offcanvas", {
      type: CONTROLLER_SELECT,
      label: "Animations",
      options: [
        {
          value: "",
          label: "none"
        },
        {
          value: "slide",
          label: "Slide"
        },
        {
          value: "push",
          label: "Push"
        },
      ],
    });


    this.addControl("s_direction", {
      type: CONTROLLER_SELECT,
      label: "Popup Slide Direction",
      options: [
        {
          value: "left",
          label: "Left"
        },
        {
          value: "top",
          label: "Top"
        },
        {
          value: "right",
          label: "Right"
        },
        {
          value: "bottom",
          label: "Bottom"
        },
      ],
      conditionsCallback: ()=>{
        return getCurrentElement().getResponsiveSetting('type_popup') === 'popup' &&
          getCurrentElement().getResponsiveSetting('animations_offcanvas') === 'slide'
      },
    });

    this.addControl("time", {
      type: CONTROLLER_SLIDER,
      label: 'Transition Time',
      units: ["ms"],
      max: 1000,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('content_section', {
      tab: TAB_STYLE,
      label: 'Page Styles',
    });

    this.addControl("section_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      rules: {
        "{{THEME}} body{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl('background_image', {
      type: CONTROLLER_MEDIA,
      label: 'Background Image',
      rules: {
        "{{THEME}} body{{STATE}}": "background-image: url({{URL}});"
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
      rules: {
        "{{THEME}} body{{STATE}}": "background-position: {{VALUE}};"
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
      rules: {
        "{{THEME}} body{{STATE}}": "background-attachment: {{VALUE}};"
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
      rules: {
        "{{THEME}} body{{STATE}}": "background-repeat: {{VALUE}};"
      }
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
        'vw',
      ],
      max: 1000,
      min: 0,
      rules: {
        "{{THEME}} body{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
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
      rules: {
        "{{THEME}} body{{STATE}}": "background-size: {{VALUE}};"
      }
    });

    this.addControl('gradient', {
      type: CONTROLLER_GRADIENT,
      label: 'Gradient',
      rules: {
        "{{THEME}} body{{STATE}}": "background-image: {{VALUE}}"
      }
    });

    this.addControl('position_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{THEME}} body{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ],
        '.altrp-section.altrp-section--full-width, .altrp-section.altrp-section--boxed': 'width: calc(100vw - {{RIGHT}}{{UNIT}} - {{LEFT}}{{UNIT}})'
      },
    });


    this.endControlSection();

    // this.startControlSection('heading_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Heading Defaults',
    // });
    //
    // this.addControl("heading_h1_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "H1 Color",
    //   rules: {
    //     "h1.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_h2_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "H2 Color",
    //   rules: {
    //     "h2.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_h3_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "H3 Color",
    //   rules: {
    //     "h3.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_h4_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "H4 Color",
    //   rules: {
    //     "h4.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_h5_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "H5 Color",
    //   rules: {
    //     "h5.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_h6_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "H6 Color",
    //   rules: {
    //     "h6.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_p_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "P Color",
    //   rules: {
    //     "p.altrp-heading{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl('heading_h1_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'H1 Typographic',
    //   rules: {
    //     'h1.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    //
    // this.addControl('heading_h2_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'H2 Typographic',
    //
    //   rules: {
    //     'h2.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    // this.addControl('heading_h3_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'H3 Typographic',
    //
    //   rules: {
    //     'h3.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    // this.addControl('heading_h4_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'H4 Typographic',
    //
    //   rules: {
    //     'h4.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    // this.addControl('heading_h5_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'H5 Typographic',
    //
    //   rules: {
    //     'h5.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    // this.addControl('heading_h6_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'H6 Typographic',
    //
    //   rules: {
    //     'h6.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    // this.addControl('heading_p_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'P Typographic',
    //
    //   rules: {
    //     'p.altrp-heading{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    //
    // this.addControl('heading_default_margin', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Margin',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-heading{{STATE}}': [
    //       'margin-top: {{TOP}}{{UNIT}};',
    //       'margin-right: {{RIGHT}}{{UNIT}};',
    //       'margin-bottom: {{BOTTOM}}{{UNIT}};',
    //       'margin-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl("heading_default_padding", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Padding",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     "div .altrp-heading{{STATE}}": [
    //       "padding-top: {{TOP}}{{UNIT}};",
    //       "padding-right: {{RIGHT}}{{UNIT}};",
    //       "padding-bottom: {{BOTTOM}}{{UNIT}};",
    //       "padding-left: {{LEFT}}{{UNIT}};"
    //     ]
    //   }
    // });
    //
    // this.addControl("heading_default_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Background color",
    //   rules: {
    //     ".altrp-heading{{STATE}}": "background-color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("heading_default_opacity", {
    //   type: CONTROLLER_SLIDER,
    //   label: "Opacity",
    //   max: 1,
    //   min: 0,
    //   step: 0.01,
    //   rules: {
    //     ".altrp-heading{{STATE}}": "opacity: {{SIZE}}"
    //   }
    // });
    //
    // this.addControl('heading_default_background_image', {
    //   type: CONTROLLER_MEDIA,
    //   label: 'Background Image',
    //   rules: {
    //     ".altrp-heading{{STATE}}": "background-image: url({{URL}});"
    //   }
    // });
    //
    // this.addControl('heading_default_background_position', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "top left",
    //       label: "top left"
    //     },
    //     {
    //       value: "top",
    //       label: "top"
    //     },
    //     {
    //       value: "top right",
    //       label: "top right"
    //     },
    //     {
    //       value: "right",
    //       label: "right"
    //     },
    //     {
    //       value: "bottom right",
    //       label: "bottom right"
    //     },
    //     {
    //       value: "bottom",
    //       label: "bottom"
    //     },
    //     {
    //       value: "bottom left",
    //       label: "bottom left"
    //     },
    //     {
    //       value: "left",
    //       label: "left"
    //     },
    //     {
    //       value: "center",
    //       label: "center"
    //     }
    //   ],
    //   label: 'Background Position',
    //   rules: {
    //     "div .altrp-heading{{STATE}}": "background-position: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('heading_default_background_attachment', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "scroll",
    //       label: "scroll"
    //     },
    //     {
    //       value: "fixed",
    //       label: "fixed"
    //     },
    //     {
    //       value: "local",
    //       label: "local"
    //     }
    //   ],
    //   label: 'Background Attachment',
    //   rules: {
    //     "div .altrp-heading{{STATE}}": "background-attachment: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('heading_default_background_repeat', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "repeat",
    //       label: "repeat"
    //     },
    //     {
    //       value: "repeat-x",
    //       label: "repeat-x"
    //     },
    //     {
    //       value: "repeat-y",
    //       label: "repeat-y"
    //     },
    //     {
    //       value: "space",
    //       label: "space"
    //     },
    //     {
    //       value: "round",
    //       label: "round"
    //     },
    //     {
    //       value: "no-repeat",
    //       label: "no-repeat"
    //     }
    //   ],
    //   label: 'Background Repeat',
    //   rules: {
    //     "div .altrp-heading{{STATE}}": "background-repeat: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl("heading_default_background_image_width", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Width',
    //   conditions: {
    //     'background_size': [''],
    //   },
    //   units: [
    //     'px',
    //     '%',
    //     'vw',
    //   ],
    //   max: 1000,
    //   min: 0,
    //   rules: {
    //     ".altrp-heading{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
    //   }
    // });
    //
    // this.addControl('heading_default_background_size', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "unset",
    //       label: "unset"
    //     },
    //     {
    //       value: "cover",
    //       label: "cover"
    //     },
    //     {
    //       value: "contain",
    //       label: "contain"
    //     },
    //     {
    //       value: "",
    //       label: "set width"
    //     },
    //   ],
    //   label: 'Background Size',
    //   rules: {
    //     ".altrp-heading{{STATE}}": "background-size: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('heading_default_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   isMulti: true,
    //   options: [
    //     { label: 'color', value: 'color' },
    //     { label: 'font-size', value: 'font-size' },
    //     { label: 'margin', value: 'margin' },
    //     { label: 'padding', value: 'padding' },
    //     { label: 'background-color', value: 'background-color' },
    //     { label: 'opacity', value: 'opacity' },
    //   ],
    //   rules: {
    //     ".altrp-heading": "transition-property: {{VALUE}};"
    //   },
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("heading_default_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-heading": "transition-duration: {{SIZE}}s;"
    //   }
    // });
    //
    // this.addControl('heading_default_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    //   rules: {
    //     ".altrp-heading": "transition-timing-function: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl("heading_default_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-heading": "transition-delay: {{SIZE}}s;"
    //   }
    // });
    //
    // this.endControlSection();

    // this.startControlSection('button_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Button Defaults',
    // });
    //
    // this.addControl('button_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-btn{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('button_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Typographic',
    //   rules: {
    //     'div .altrp-btn{{STATE}}': [
    //       'font-size: {{SIZE}}px;',
    //       'font-family: {{FAMILY}}',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    //
    // this.addControl('button_font_color', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Color',
    //   rules: {
    //     'div .altrp-btn{{STATE}}': 'color: {{COLOR}};',
    //   },
    // });
    //
    // this.addControl('button_border_type', {
    //   type: CONTROLLER_SELECT,
    //   label: 'Border Type',
    //   options: [
    //     {
    //       'value': 'none',
    //       'label': 'None',
    //     },
    //     {
    //       'value': 'solid',
    //       'label': 'Solid',
    //     },
    //     {
    //       'value': 'double',
    //       'label': 'Double',
    //     },
    //     {
    //       'value': 'dotted',
    //       'label': 'Dotted',
    //     },
    //     {
    //       'value': 'dashed',
    //       'label': 'Dashed',
    //     },
    //     {
    //       'value': 'groove',
    //       'label': 'Groove',
    //     },
    //   ],
    //   rules: {
    //     '.altrp-btn{{STATE}}': 'border-style: {{VALUE}};',
    //   },
    // }
    // );
    //
    // this.addControl('button_border_width', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Border Width',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-btn{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //   },
    // }
    // );
    //
    // this.addControl('button_border_color', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Border Color',
    // }
    // );
    //
    // this.addControl('button_default_border_radius', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Radius',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-btn{{STATE}}': [
    //       'border-top-left-radius: {{TOP}}{{UNIT}}',
    //       'border-top-right-radius: {{RIGHT}}{{UNIT}}',
    //       'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
    //       'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
    //     ]
    //   }
    // });
    //
    // this.addControl('button_box_shadow', {
    //   type: CONTROLLER_SHADOW,
    //   label: 'Shadow',
    // });
    //
    // this.addControl('button_background_color', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Background color',
    //   rules: {
    //     'div .altrp-btn{{STATE}}': 'background-color: {{COLOR}};',
    //   },
    // });
    //
    // this.addControl('button_background_image', {
    //   type: CONTROLLER_MEDIA,
    //   label: 'Background Image',
    //   rules: {
    //     ".altrp-btn{{STATE}}": "background-image: url({{URL}});"
    //   }
    // });
    //
    // this.addControl('button_gradient', {
    //   type: CONTROLLER_GRADIENT,
    //   label: 'Gradient',
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "background-image: {{VALUE}}"
    //   }
    // });
    //
    // this.addControl('button_background_position', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "top left",
    //       label: "top left"
    //     },
    //     {
    //       value: "top",
    //       label: "top"
    //     },
    //     {
    //       value: "top right",
    //       label: "top right"
    //     },
    //     {
    //       value: "right",
    //       label: "right"
    //     },
    //     {
    //       value: "bottom right",
    //       label: "bottom right"
    //     },
    //     {
    //       value: "bottom",
    //       label: "bottom"
    //     },
    //     {
    //       value: "bottom left",
    //       label: "bottom left"
    //     },
    //     {
    //       value: "left",
    //       label: "left"
    //     },
    //     {
    //       value: "center",
    //       label: "center"
    //     }
    //   ],
    //   label: 'Background Position',
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "background-position: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('button_background_attachment', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "scroll",
    //       label: "scroll"
    //     },
    //     {
    //       value: "fixed",
    //       label: "fixed"
    //     },
    //     {
    //       value: "local",
    //       label: "local"
    //     }
    //   ],
    //   label: 'Background Attachment',
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "background-attachment: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('button_background_repeat', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "repeat",
    //       label: "repeat"
    //     },
    //     {
    //       value: "repeat-x",
    //       label: "repeat-x"
    //     },
    //     {
    //       value: "repeat-y",
    //       label: "repeat-y"
    //     },
    //     {
    //       value: "space",
    //       label: "space"
    //     },
    //     {
    //       value: "round",
    //       label: "round"
    //     },
    //     {
    //       value: "no-repeat",
    //       label: "no-repeat"
    //     }
    //   ],
    //   label: 'Background Repeat',
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "background-repeat: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl("button_background_image_width", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Width',
    //   conditions: {
    //     'button_background_size': [''],
    //   },
    //   units: [
    //     'px',
    //     '%',
    //     'vw',
    //   ],
    //   max: 1000,
    //   min: 0,
    //   rules: {
    //     ".altrp-btn{{STATE}}": "background-size: {{SIZE}}{{UNIT}};"
    //   }
    // });
    //
    // this.addControl('button_background_size', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "unset",
    //       label: "unset"
    //     },
    //     {
    //       value: "cover",
    //       label: "cover"
    //     },
    //     {
    //       value: "contain",
    //       label: "contain"
    //     },
    //     {
    //       value: "",
    //       label: "set width"
    //     },
    //   ],
    //   label: 'Background Size',
    //   rules: {
    //     ".altrp-btn{{STATE}}": "background-size: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('button_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   rules: {
    //     ".altrp-btn{{STATE}}": "transition-property: {{VALUE}};"
    //   },
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("button_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "transition-duration: {{SIZE}}s;"
    //   }
    // });
    //
    // this.addControl('button_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "transition-timing-function: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl("button_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     "div .altrp-btn{{STATE}}": "transition-delay: {{SIZE}}s;"
    //   }
    // });
    //
    // this.endControlSection();

    // this.startControlSection('list_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'List Defaults',
    // });
    //
    // this.addControl('list_default_margin', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Margin',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-list{{STATE}}': [
    //       'margin-top: {{TOP}}{{UNIT}};',
    //       'margin-right: {{RIGHT}}{{UNIT}};',
    //       'margin-bottom: {{BOTTOM}}{{UNIT}};',
    //       'margin-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('list_default_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-list{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('alignment_list_default', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Alignment',
    //   options: [
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
    //   rules: {
    //     'div .altrp-list-ul-inline{{STATE}}': 'justify-content: {{VALUE}};',
    //     'div .altrp-list-ul-default .altrp-list-li{{STATE}}': 'justify-content: {{VALUE}};'
    //   },
    // });
    //
    // this.addControl("indent_list_text_default", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Indent',
    //   max: 50,
    //   min: 0,
    //   rules: {
    //     ".altrp-list-label{{STATE}}": "margin-left: {{SIZE}}{{UNIT}}"
    //   }
    // });
    //
    // this.addControl("color_list_text_default", {
    //   type: CONTROLLER_COLOR,
    //   label: "Text color",
    //   rules: {
    //     ".altrp-list-label{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("background_color_list_text_default", {
    //   type: CONTROLLER_COLOR,
    //   label: "Background color",
    //   rules: {
    //     ".altrp-list-label{{STATE}}": "background-color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl('padding_list_text_default', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Text Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-list-label{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('typographic_list_text_default', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Typographic',
    //   rules: {
    //     '.altrp-list-label{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // }
    // );
    //
    // this.addControl("link_decoration_text_default", {
    //   type: CONTROLLER_SELECT,
    //   label: "Text decoration",
    //   options: [
    //     {
    //       value: "none",
    //       label: "none"
    //     },
    //     {
    //       value: "underline",
    //       label: "underline"
    //     },
    //     {
    //       value: "overline",
    //       label: "overline"
    //     },
    //     {
    //       value: "line-through",
    //       label: "line-through"
    //     },
    //   ],
    //   rules: {
    //     "div .altrp-list-li-link{{STATE}}": "text-decoration: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl('list_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   rules: {
    //     ".altrp-list-label": "transition-property: {{VALUE}};",
    //     ".altrp-list": "transition-property: {{VALUE}};"
    //   },
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("list_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-list-label": "transition-duration: {{SIZE}}s;",
    //     ".altrp-list": "transition-duration: {{SIZE}}s;",
    //     ".altrp-list-icon": "transition-delay: {{SIZE}}s;"
    //   }
    // });
    //
    // this.addControl('list_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    //   rules: {
    //     ".altrp-list-label": "transition-timing-function: {{VALUE}};",
    //     ".altrp-list": "transition-timing-function: {{VALUE}};",
    //     ".altrp-list-icon": "transition-delay: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl("list_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-list-label": "transition-delay: {{SIZE}}s;",
    //     ".altrp-list": "transition-delay: {{SIZE}}s;",
    //     ".altrp-list-icon": "transition-delay: {{SIZE}}s;"
    //   }
    // });
    //
    // this.endControlSection();

    // this.startControlSection('text_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Text Defaults',
    // });
    //
    // this.addControl("text_style_position_padding", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Padding",
    //   units: ["px", "%", "vh"],
    // });
    //
    // this.addControl('text_style_position_margin', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Margin',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    // });
    //
    // this.addControl("text_style_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Background color",
    // });
    //
    // this.addControl("text_style_background_opacity", {
    //   type: CONTROLLER_SLIDER,
    //   label: "Opacity",
    //   max: 1,
    //   min: 0,
    //   step: 0.01,
    // });
    //
    // this.addControl('text_style_font_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Typographic',
    // }
    // );
    //
    // this.addControl("text_style_font_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Color",
    // });
    //
    // this.addControl("text_style_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Border type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    // });
    //
    // this.addControl("text_style_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Border width",
    //   units: ["px", "%", "vh"],
    // });
    //
    // this.addControl("text_style_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Border color",
    // });
    //
    // this.addControl('text_default_border_radius', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Radius',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //
    // });
    //
    // this.addControl('text_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("text_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    // });
    //
    // this.addControl('text_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    // });
    //
    // this.addControl("text_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    // });
    //
    //
    // this.endControlSection();

    // this.startControlSection('image_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Image Defaults',
    // });
    //
    // this.addControl('image_default_margin', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Margin',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-image{{STATE}}': [
    //       'margin-top: {{TOP}}{{UNIT}};',
    //       'margin-right: {{RIGHT}}{{UNIT}};',
    //       'margin-bottom: {{BOTTOM}}{{UNIT}};',
    //       'margin-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('image_default_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-image-container{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('image_default_opacity', {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Opacity',
    //   max: 1,
    //   min: 0,
    //   step: 0.01,
    //   rules: {
    //     '.altrp-image{{STATE}}': 'opacity: {{SIZE}}',
    //   },
    // });
    //
    // this.addControl('image_default_fit_size', {
    //   type: CONTROLLER_SELECT,
    //   label: 'Image fit',
    //   options: [
    //     {
    //       'value': 'fill',
    //       'label': 'Fill',
    //     },
    //     {
    //       'value': 'contain',
    //       'label': 'Contain',
    //     },
    //     {
    //       'value': 'cover',
    //       'label': 'Cover',
    //     },
    //     {
    //       'value': 'none',
    //       'label': 'None',
    //     },
    //     {
    //       'value': 'scale-down',
    //       'label': 'Scale down',
    //     }
    //   ],
    //   rules: {
    //     'div .altrp-image{{STATE}}': 'object-fit: {{VALUE}};',
    //   },
    // }
    // );
    //
    // this.addControl('image_default_border_type', {
    //   type: CONTROLLER_SELECT,
    //   label: 'Border Type',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   options: [
    //     {
    //       'value': 'none',
    //       'label': 'None',
    //     },
    //     {
    //       'value': 'solid',
    //       'label': 'Solid',
    //     },
    //     {
    //       'value': 'double',
    //       'label': 'Double',
    //     },
    //     {
    //       'value': 'dotted',
    //       'label': 'Dotted',
    //     },
    //     {
    //       'value': 'dashed',
    //       'label': 'Dashed',
    //     },
    //     {
    //       'value': 'groove',
    //       'label': 'Groove',
    //     },
    //   ],
    //   rules: {
    //     '.altrp-image{{STATE}}': 'border-style: {{VALUE}};',
    //   },
    // }
    // );
    //
    // this.addControl('image_default_border_width', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Border Width',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-image{{STATE}}': `border-top-width: {{TOP}}{{UNIT}};
    //       border-right-width: {{RIGHT}}{{UNIT}};
    //       border-bottom-width: {{BOTTOM}}{{UNIT}};
    //       border-left-width: {{LEFT}}{{UNIT}};`,
    //   },
    // }
    // );
    //
    // this.addControl('image_default_border_color', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Border Color',
    //   rules: {
    //     'div .altrp-image{{STATE}}': 'border-color: {{COLOR}};',
    //   },
    // }
    // );
    //
    // this.addControl('image_default_border_radius', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Radius',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-image{{STATE}}': [
    //       'border-top-left-radius: {{TOP}}{{UNIT}}',
    //       'border-top-right-radius: {{RIGHT}}{{UNIT}}',
    //       'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
    //       'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
    //     ]
    //   }
    // });
    //
    // this.addControl('image_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   rules: {
    //     ".altrp-image": "transition-property: {{VALUE}};",
    //     ".altrp-image-container": "transition-property: {{VALUE}};",
    //   },
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("image_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-image": "transition-duration: {{SIZE}}s;",
    //     ".altrp-image-container": "transition-duration: {{SIZE}}s;",
    //   }
    // });
    //
    // this.addControl('image_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    //   rules: {
    //     ".altrp-image": "transition-timing-function: {{VALUE}};",
    //     ".altrp-image-container": "transition-timing-function: {{VALUE}};",
    //   }
    // });
    //
    // this.addControl("image_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-image": "transition-delay: {{SIZE}}s;",
    //     ".altrp-image-container": "transition-delay: {{SIZE}}s;",
    //   }
    // });
    //
    //
    // this.endControlSection();

    // this.startControlSection('input_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Input Defaults',
    // });
    //
    // this.addControl("label_default_font_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Label Font Color",
    //   rules: {
    //     ".altrp-field-label{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl('label_default_font_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Label Typographic',
    //   rules: {
    //     'div .altrp-field-label{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // }
    // );
    //
    // this.addControl('field_default_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Field Typographic',
    //   rules: {
    //     'div .altrp-field-select2__single-value{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px;',
    //       'font-weight: {{WEIGHT}};',
    //       'text-transform: {{TRANSFORM}};',
    //       'font-style: {{STYLE}};',
    //       'text-decoration: {{DECORATION}};'
    //     ],
    //     'div .altrp-field{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px;',
    //       'font-weight: {{WEIGHT}};',
    //       'text-transform: {{TRANSFORM}};',
    //       'font-style: {{STYLE}};',
    //       'text-decoration: {{DECORATION}};'
    //     ]
    //   },
    // });
    //
    // this.addControl("field_default_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Field Font Color",
    //   rules: {
    //     '.altrp-field-select2__single-value{{STATE}}': 'color : {{COLOR}};',
    //     '.altrp-field{{STATE}}': 'color : {{COLOR}};'
    //   }
    // });
    //
    // this.addControl('placeholder_and_value_alignment_default', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Alignment, value',
    //   options: [
    //     {
    //       icon: 'left',
    //       value: 'left',
    //     },
    //     {
    //       icon: 'center',
    //       value: 'center',
    //     },
    //     {
    //       icon: 'right',
    //       value: 'right',
    //     }
    //   ],
    //   rules: {
    //     'div .altrp-field{{STATE}}': 'text-align: {{VALUE}};',
    //     'div .altrp-field-select2__control{{STATE}}': 'text-align: {{VALUE}};'
    //   },
    // });
    //
    // this.addControl('field_default_margin', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Margin',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-field-container{{STATE}}': [
    //       'margin-top: {{TOP}}{{UNIT}};',
    //       'margin-right: {{RIGHT}}{{UNIT}};',
    //       'margin-bottom: {{BOTTOM}}{{UNIT}};',
    //       'margin-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl('field_default_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'div .altrp-field{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ],
    //     'div .altrp-field-select2__control{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl("placeholder_default_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "PLaceholder Font Color",
    //   rules: {
    //     ".altrp-field::placeholder{{STATE}}": "color: {{COLOR}};",
    //     ".altrp-field-select2__placeholder{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl('placeholder_default_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Placeholder Typographic',
    //   rules: {
    //     'div .altrp-field::placeholder{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //     'div .altrp-field-select2__placeholder{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // }
    // );
    //
    // this.addControl('input_default_background_color', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Background Color',
    //   rules: {
    //     '.altrp-field{{STATE}}': 'background-color: {{COLOR}};',
    //     '.altrp-field-select2__control{{STATE}}': 'background-color: {{COLOR}};',
    //   },
    // }
    // );
    //
    // this.addControl('input_default_border_type', {
    //   type: CONTROLLER_SELECT,
    //   label: 'Border Type',
    //   options: [
    //     {
    //       'value': 'none',
    //       'label': 'None',
    //     },
    //     {
    //       'value': 'solid',
    //       'label': 'Solid',
    //     },
    //     {
    //       'value': 'double',
    //       'label': 'Double',
    //     },
    //     {
    //       'value': 'dotted',
    //       'label': 'Dotted',
    //     },
    //     {
    //       'value': 'dashed',
    //       'label': 'Dashed',
    //     },
    //     {
    //       'value': 'groove',
    //       'label': 'Groove',
    //     },
    //   ],
    //   rules: {
    //     'div .altrp-field{{STATE}}': 'border-style: {{VALUE}};',
    //     'div .altrp-field-select2__control{{STATE}}': 'border-style: {{VALUE}};'
    //
    //   },
    // }
    // );
    //
    // this.addControl('input_default_border_width', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Border Width',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-field{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //     '.altrp-field-select2__control{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};'
    //   },
    // }
    // );
    //
    // this.addControl('input_default_border_color', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Border Color',
    //   rules: {
    //     '.altrp-field{{STATE}}': 'border-color: {{COLOR}};',
    //     '.altrp-field-select2__control{{STATE}}': 'border-color: {{COLOR}};'
    //   },
    // }
    // );
    //
    // this.addControl('input_default_border_radius', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Radius',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-field{{STATE}}': [
    //       'border-top-left-radius: {{TOP}}{{UNIT}}',
    //       'border-top-right-radius: {{RIGHT}}{{UNIT}}',
    //       'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
    //       'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
    //     ],
    //     '.altrp-field-select2__control{{STATE}}': [
    //       'border-top-left-radius: {{TOP}}{{UNIT}}',
    //       'border-top-right-radius: {{RIGHT}}{{UNIT}}',
    //       'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
    //       'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
    //     ]
    //   }
    // });
    //
    // this.addControl('input_default_box_shadow', {
    //   type: CONTROLLER_SHADOW,
    //   label: 'Box shadow',
    //   rules: {
    //     '.altrp-field{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
    //     '.altrp-field-select2__control{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};'
    //   },
    // });
    //
    // this.addControl('input_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   rules: {
    //     ".altrp-field": "transition-property: {{VALUE}};",
    //     ".altrp-field-label": "transition-property: {{VALUE}};",
    //     ".altrp-field-select2__control": "transition-property: {{VALUE}};",
    //     ".altrp-field-select2__single-value": "transition-property: {{VALUE}};",
    //   },
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("input_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-field": "transition-duration: {{SIZE}}s;",
    //     ".altrp-field-label": "transition-duration: {{SIZE}}s;",
    //     ".altrp-field-select2__control": "transition-duration: {{SIZE}}s;",
    //     ".altrp-field-select2__single-value": "transition-duration: {{SIZE}}s;",
    //   }
    // });
    //
    // this.addControl('input_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    //   rules: {
    //     ".altrp-field": "transition-timing-function: {{VALUE}};",
    //     ".altrp-field-label": "transition-timing-function: {{VALUE}};",
    //     ".altrp-field-select2__control": "transition-timing-function: {{VALUE}};",
    //     ".altrp-field-select2__single-value": "transition-timing-function: {{VALUE}};",
    //   }
    // });
    //
    // this.addControl("input_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-field": "transition-delay: {{SIZE}}s;",
    //     ".altrp-field-label": "transition-delay: {{SIZE}}s;",
    //     ".altrp-field-select2__control": "transition-delay: {{SIZE}}s;",
    //     ".altrp-field-select2__single-value": "transition-delay: {{SIZE}}s;",
    //   }
    // });
    //
    //
    // this.endControlSection();

    // this.startControlSection('table_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Table Defaults',
    // });
    //
    // this.addControl('table_default_header_alignment', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Header alignment',
    //   options: [
    //     {
    //       icon: 'left',
    //       value: 'left',
    //     },
    //     {
    //       icon: 'center',
    //       value: 'center',
    //     },
    //     {
    //       icon: 'right',
    //       value: 'right',
    //     },
    //   ],
    //   rules: {
    //     'tr .altrp-table-th{{STATE}}': 'text-align: {{VALUE}}',
    //   },
    // });
    //
    // this.addControl('table_default_body_alignment', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Body alignment',
    //   options: [
    //     {
    //       icon: 'left',
    //       value: 'left',
    //     },
    //     {
    //       icon: 'center',
    //       value: 'center',
    //     },
    //     {
    //       icon: 'right',
    //       value: 'right',
    //     },
    //   ],
    //   rules: {
    //     'tr .altrp-table-td{{STATE}}': 'text-align: {{VALUE}}',
    //   },
    // });
    //
    // this.addControl("table_default_stripe_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Stripe Color",
    //   rules: {
    //     'tbody .altrp-table-tbody--striped tr:nth-child(2n)': 'background-color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_default_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Table Border Type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     '.altrp-table{{STATE}}': 'border-style: {{VALUE}} !important'
    //   }
    // });
    //
    // this.addControl("table_default_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Table Border Width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     'div .altrp-table{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}}  {{BOTTOM}}{{UNIT}}  {{LEFT}}{{UNIT}} !important'
    //   }
    // });
    //
    // this.addControl("table_default_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Table Border Color",
    //   rules: {
    //     'div .altrp-table{{STATE}}': 'border-color: {{COLOR}} !important'
    //   }
    // });
    //
    // this.addControl("table_default_header_background", {
    //   type: CONTROLLER_COLOR,
    //   label: "Header Background",
    //   rules: {
    //     '.altrp-table-head{{STATE}}': 'background: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_default_header_text_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Header Text color",
    //   rules: {
    //     '.altrp-table-th{{STATE}}': 'color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl('table_default_header_font', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Header Typographic',
    //   rules: {
    //     'tr .altrp-table-th{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    //
    // this.addControl("table_default_header_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Header Border type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     '.altrp-table-th{{STATE}}': 'border-style: {{VALUE}};',
    //   }
    // });
    //
    // this.addControl("table_default_header_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Header Border width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     '.altrp-table-th{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //   }
    // });
    //
    // this.addControl("table_default_header_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Header Border color",
    //   rules: {
    //     '.altrp-table-th{{STATE}}': 'border-color: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl('table_default_header_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Header Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'tr .altrp-table-th{{STATE}}, .altrp-table-tr>.altrp-table-th{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ],
    //   },
    // });
    //
    // this.addControl("table_default_body_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Body Border type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     '.altrp-table-td{{STATE}}': 'border-style: {{VALUE}};',
    //   }
    // });
    //
    // this.addControl("table_default_body_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Body Border width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     '.altrp-table-td{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //   }
    // });
    //
    // this.addControl("table_default_body_border_color_", {
    //   type: CONTROLLER_COLOR,
    //   label: "Body Border color",
    //   rules: {
    //     '.altrp-table-td{{STATE}}': 'border-color: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl('table_default_body_cell_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Cell padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     'tr .altrp-table-td{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ],
    //   },
    // });
    //
    // this.addControl("table_default_body_border_background", {
    //   type: CONTROLLER_COLOR,
    //   label: "Body Background",
    //   rules: {
    //     '.altrp-table-tbody .altrp-table-background{{STATE}}': 'background: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl("table_default_body_border_text_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Body Text color",
    //   rules: {
    //     '.altrp-table-td{{STATE}}': 'color: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl('table_default_body_font', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Body Typographic',
    //   rules: {
    //     '.altrp-table-td{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // });
    //
    // this.addControl("table_default_body_links_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "links_color",
    //   rules: {
    //   }
    // });
    //
    // this.addControl('table_transition_property', {
    //   type: CONTROLLER_TEXTAREA,
    //   label: 'Transition Property',
    //   rules: {
    //     ".altrp-table-th": "transition-property: {{VALUE}};",
    //     ".altrp-table-td": "transition-property: {{VALUE}};",
    //     ".altrp-table": "transition-property: {{VALUE}};",
    //     ".altrp-table-head": "transition-property: {{VALUE}};",
    //     ".altrp-table-background": "transition-property: {{VALUE}};",
    //   },
    //   description: 'Input properties, commas separated'
    // });
    //
    // this.addControl("table_transition_duration", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Duration',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-table-th": "transition-duration: {{SIZE}}s;",
    //     ".altrp-table-td": "transition-duration: {{SIZE}}s;",
    //     ".altrp-table": "transition-duration: {{SIZE}}s;",
    //     ".altrp-table-head": "transition-duration: {{SIZE}}s;",
    //     ".altrp-table-background": "transition-duration: {{SIZE}}s;",
    //   }
    // });
    //
    // this.addControl('table_transition_timing', {
    //   type: CONTROLLER_SELECT,
    //   options: [
    //     {
    //       value: "linear",
    //       label: "linear"
    //     },
    //     {
    //       value: "ease",
    //       label: "ease"
    //     },
    //     {
    //       value: "ease-in",
    //       label: "ease-in"
    //     },
    //     {
    //       value: "ease-out",
    //       label: "ease-out"
    //     },
    //     {
    //       value: "ease-in-out",
    //       label: "ease-in-out"
    //     }
    //   ],
    //   label: 'Transition Timing Function',
    //   rules: {
    //     ".altrp-table-th": "transition-timing-function: {{VALUE}};",
    //     ".altrp-table-td": "transition-timing-function: {{VALUE}};",
    //     ".altrp-table": "transition-timing-function: {{VALUE}};",
    //     ".altrp-table-head": "transition-timing-function: {{VALUE}};",
    //     ".altrp-table-background": "transition-timing-function: {{VALUE}};",
    //   }
    // });
    //
    // this.addControl("table_transition_delay", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Transition Delay',
    //   units: [],
    //   max: 5,
    //   min: 0,
    //   step: 0.1,
    //   rules: {
    //     ".altrp-table-th": "transition-delay: {{SIZE}}s;",
    //     ".altrp-table-td": "transition-delay: {{SIZE}}s;",
    //     ".altrp-table": "transition-delay: {{SIZE}}s;",
    //     ".altrp-table-head": "transition-delay: {{SIZE}}s;",
    //     ".altrp-table-background": "transition-delay: {{SIZE}}s;",
    //   }
    // });
    //
    // this.addControl("table_style_pagination_buttons_text_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Buttons text color",
    //   rules: {
    //     '.altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_style_pagination_buttons_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Buttons background color",
    //   rules: {
    //     '.altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'background-color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl('table_style_pagination_padding_buttons', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Pagination buttons Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ],
    //   },
    // });
    //
    // this.addControl("table_style_pagination_count_text_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Count text color",
    //   rules: {
    //     '.altrp-pagination__count{{STATE}}': 'color: {{COLOR}}',
    //     '.altrp-pagination-pages__item{{STATE}}': 'color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_style_pagination_count_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Count background color",
    //   rules: {
    //     '.altrp-pagination__count{{STATE}}': 'background-color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_style_pagination_count_item_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Count Item background color",
    //   rules: {
    //     '.altrp-pagination-pages__item{{STATE}}': 'background-color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_style_pagination_active_count_text_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Active Count text color",
    //   rules: {
    //     '.active.altrp-pagination-pages__item{{STATE}}': 'color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("table_style_pagination_active_count_item_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Active Count Item background color",
    //   rules: {
    //     '.active.altrp-pagination-pages__item{{STATE}}': 'background-color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl('table_style_pagination_padding_count', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Pagination count Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-pagination__count{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ],
    //   },
    // });
    //
    // this.addControl('table_style_pagination_padding_count_item', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Pagination Item Count Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-pagination-pages__item{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl(
    //   'table_style_pagination_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Pagination Typographic',
    //   rules: {
    //     '.altrp-pagination__next{{STATE}}, .altrp-pagination-pages__item{{STATE}}, .altrp-pagination__count{{STATE}}, .altrp-pagination__previous{{STATE}}': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // }
    // );
    //
    // this.addControl("table_style_pagination_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Pagination Border type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     '.altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'border-style: {{VALUE}};',
    //   }
    // });
    //
    // this.addControl("table_style_pagination_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Pagination Border width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     '.altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //   }
    // });
    //
    // this.addControl("table_style_pagination_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Border color",
    //   rules: {
    //     '.altrp-pagination__previous{{STATE}}, .altrp-pagination__next{{STATE}}': 'border-color: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl("table_style_pagination_count_item_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Pagination Item Count Border type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     '.altrp-pagination-pages__item{{STATE}}': 'border-style: {{VALUE}};',
    //   }
    // });
    //
    // this.addControl("table_style_pagination_count_item_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Pagination Item Count Border width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     '.altrp-pagination-pages__item{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //   }
    // });
    //
    // this.addControl("table_style_pagination_count_item_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Item Count Border color",
    //   rules: {
    //     '.altrp-pagination-pages__item{{STATE}}': 'border-color: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl("table_style_pagination_active_count_item_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Pagination Active Item Count Border color",
    //   rules: {
    //     '.active.altrp-pagination-pages__item{{STATE}}': 'border-color: {{COLOR}};',
    //   }
    // });
    //
    // this.addControl('table_style_pagination_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Pagination Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-pagination{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ],
    //   },
    // });
    //
    // // Filters
    //
    // this.addControl("filter_style_table_text_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Filter Text Color",
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': 'color: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl("filter_style_table_background_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Filter Background Color",
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': 'background: {{COLOR}}'
    //   }
    // });
    //
    // this.addControl('filter_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Filter Input Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    // this.addControl('label_padding', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Filter Label Padding',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.altrp-table-th .altrp-label{{STATE}}': [
    //       'padding-top: {{TOP}}{{UNIT}};',
    //       'padding-right: {{RIGHT}}{{UNIT}};',
    //       'padding-bottom: {{BOTTOM}}{{UNIT}};',
    //       'padding-left: {{LEFT}}{{UNIT}};'
    //     ]
    //   },
    // });
    //
    // this.addControl(
    //   'filter_style_typographic', {
    //   type: CONTROLLER_TYPOGRAPHIC,
    //   label: 'Filter Typographic',
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': [
    //       'font-family: "{{FAMILY}}", sans-serif;',
    //       'font-size: {{SIZE}}px;',
    //       'line-height: {{LINEHEIGHT}};',
    //       'letter-spacing: {{SPACING}}px',
    //       'font-weight: {{WEIGHT}}',
    //       'text-transform: {{TRANSFORM}}',
    //       'font-style: {{STYLE}}',
    //       'text-decoration: {{DECORATION}}'
    //     ],
    //   },
    // }
    // );
    //
    // this.addControl("filter_style_table_border_type", {
    //   type: CONTROLLER_SELECT,
    //   label: "Filter Border Type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': 'border-style: {{VALUE}} !important'
    //   }
    // });
    //
    // this.addControl("filter_style_table_border_width", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Filter Border Width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}}  {{BOTTOM}}{{UNIT}}  {{LEFT}}{{UNIT}} !important'
    //   }
    // });
    //
    // this.addControl("filter_style_table_border_color", {
    //   type: CONTROLLER_COLOR,
    //   label: "Filter Border Color",
    //   rules: {
    //     '.altrp-label_text>.altrp-field{{STATE}}, .altrp-label_min_max .altrp-field{{STATE}}, .altrp-table__filter-select{{STATE}}>.altrp-field-select2__control, .altrp-label_slider>.altrp-btn': 'border-color: {{COLOR}} !important'
    //   }
    // });
    //
    // this.endControlSection();

    // this.startControlSection('tabs_defaults', {
    //   tab: TAB_STYLE,
    //   label: 'Tabs Defaults',
    // });
    //
    // this.addControl('defaults_alignment_tabs', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Alignment',
    //   options: [
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
    //     },
    //     {
    //       icon: 'in_width',
    //       value: 'space-between',
    //     },
    //   ],
    //   rules: {
    //     '.altrp-tab-btn-container{{STATE}}': 'justify-content: {{VALUE}};',
    //   },
    // });
    //
    // this.addControl("defaults_spacing_column_tabs", {
    //   type: CONTROLLER_SLIDER,
    //   label: "Tab spacing",
    //   units: ["px", "%", "vh"],
    //   max: 100,
    //   min: 0,
    //   rules: {
    //     ".altrp-tab-btn-column{{STATE}}": "margin-right: {{SIZE}}{{UNIT}}",
    //     ".altrp-tab-btn-row{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}}"
    //   }
    // });
    //
    // this.addControl("defaults_spacing_content_tabs", {
    //   type: CONTROLLER_SLIDER,
    //   label: "Content spacing",
    //   units: ["px", "%", "vh"],
    //   max: 100,
    //   min: 0,
    //   rules: {
    //     ".altrp-tab-btn-top{{STATE}}": "margin-bottom: {{SIZE}}{{UNIT}}",
    //     ".altrp-tab-btn-bottom{{STATE}}": "margin-top: {{SIZE}}{{UNIT}}",
    //     ".altrp-tab-btn-left{{STATE}}": "margin-right: {{SIZE}}{{UNIT}}",
    //     ".altrp-tab-btn-right{{STATE}}": "margin-left: {{SIZE}}{{UNIT}}"
    //   }
    // });
    //
    // this.addControl("defaults_background_tab_style", {
    //   type: CONTROLLER_COLOR,
    //   label: "Background tabs",
    //   rules: {
    //     ".altrp-tab-btn-container{{STATE}}": "background-color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("defaults_background_type_tab_style", {
    //   type: CONTROLLER_COLOR,
    //   label: "Background buttons",
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}": "background-color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("defaults_background_text_color_tab_style", {
    //   type: CONTROLLER_COLOR,
    //   label: "Text color",
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}": "color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl('defaults_box_shadow_tab_style', {
    //   type: CONTROLLER_SHADOW,
    //   label: 'Box shadow',
    //   rules: {
    //     '.altrp-tab-btn{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
    //   },
    // });
    //
    // this.addControl("defaults_padding_tab_style", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Padding",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}": [
    //       "padding-top: {{TOP}}{{UNIT}};",
    //       "padding-right: {{RIGHT}}{{UNIT}};",
    //       "padding-bottom: {{BOTTOM}}{{UNIT}};",
    //       "padding-left: {{LEFT}}{{UNIT}};"
    //     ]
    //   }
    // });
    //
    // this.addControl("defaults_border_type_tab_style", {
    //   type: CONTROLLER_SELECT,
    //   label: "Border type",
    //   units: ["px", "%", "vh"],
    //   options: [
    //     {
    //       value: "none",
    //       label: "None"
    //     },
    //     {
    //       value: "solid",
    //       label: "Solid"
    //     },
    //     {
    //       value: "double",
    //       label: "Double"
    //     },
    //     {
    //       value: "dotted",
    //       label: "Dotted"
    //     },
    //     {
    //       value: "dashed",
    //       label: "Dashed"
    //     },
    //     {
    //       value: "groove",
    //       label: "Groove"
    //     }
    //   ],
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}": "border-style: {{VALUE}};"
    //   }
    // });
    //
    // this.addControl("defaults_border_width_tab_style", {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: "Border width",
    //   units: ["px", "%", "vh"],
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}":
    //       "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
    //   }
    // });
    //
    // this.addControl("defaults_border_color_tab_style", {
    //   type: CONTROLLER_COLOR,
    //   label: "Border color",
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}": "border-color: {{COLOR}};"
    //   }
    // });
    //
    // this.addControl("defaults_border_radius_tab_style", {
    //   type: CONTROLLER_SLIDER,
    //   label: 'Border radius',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   max: 100,
    //   min: 0,
    //   rules: {
    //     ".altrp-tab-btn{{STATE}}": "border-radius: {{SIZE}}{{UNIT}}"
    //   }
    // });
    //
    // this.endControlSection();

    //offcanvas style
    this.startControlSection('offcanvas_style', {
      tab: TAB_STYLE,
      label: 'Offcanvas',
      conditions: {
        "type_popup": "offcanvas"
      }
    });

    this.addControl("background_offcanvas", {
      type: CONTROLLER_COLOR,
      label: "Background color",
      rules: {
        ".{{ID}}-altrp-offcanvas .altrp-offcanvas{{STATE}}": "background-color: {{COLOR}};"
      }
    });

    this.addControl('shadow_offcanvas', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
      },
    });

    this.addControl('padding_offcanvas', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.addControl('close_heading_offcanvas', {
      type: CONTROLLER_HEADING,
      label: 'Close button',
    });

    this.addControl("top_close_offcanvas", {
      type: CONTROLLER_SLIDER,
      label: 'Top position',
      max: 100,
      min: 0,
      rules: {
        ".{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}}": "top: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("left_close_offcanvas", {
      type: CONTROLLER_SLIDER,
      label: 'Left position',
      max: 100,
      min: 0,
      rules: {
        ".{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}}": "left: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("right_close_offcanvas", {
      type: CONTROLLER_SLIDER,
      label: 'Right position',
      max: 100,
      min: 0,
      rules: {
        ".{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}}": "right: {{SIZE}}{{UNIT}}"
      }
    });

    this.addControl("size_close_offcanvas", {
      type: CONTROLLER_SLIDER,
      label: 'Size',
      max: 100,
      min: 0,
      rules: {
        ".{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}} .altrp-offcanvas-button-icon": [
          "width: {{SIZE}}{{UNIT}}",
          "height: {{SIZE}}{{UNIT}}"
        ]
      }
    });

    this.addControl('background_close_offcanvas', {
      type: CONTROLLER_COLOR,
      label: 'Background color',
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}}': 'background-color: {{COLOR}};',
      },
    });

    this.addControl('fill_close_offcanvas', {
      type: CONTROLLER_COLOR,
      label: 'Fill color',
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}} .altrp-offcanvas-button-icon path': 'fill: {{COLOR}};',
      },
    });

    this.addControl('stroke_close_offcanvas', {
      type: CONTROLLER_COLOR,
      label: 'Stroke color',
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}} .altrp-offcanvas-button-icon path': 'stroke: {{COLOR}};',
      },
    });

    this.addControl('border_radius_close_offcanvas', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Radius',
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}}': [
          'border-top-left-radius: {{TOP}}{{UNIT}}',
          'border-top-right-radius: {{RIGHT}}{{UNIT}}',
          'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
          'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
        ]
      }
    });

    this.addControl('padding_close_offcanvas', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units: [
        'px',
        '%',
        'vh',
      ],
      rules: {
        '.{{ID}}-altrp-offcanvas .altrp-offcanvas-button{{STATE}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};'
        ]
      },
    });

    this.endControlSection();

    actionsControllers(this, 'Page Load Actions', 'page_load_');
    /**
     * импорт/сохранение глобальных настроек
     */
    // popup style
    // this.startControlSection('popup_style', {
    //   tab: TAB_STYLE,
    //   label: 'Popup',
    // });
    //
    // this.addControl('background_popup_style', {
    //   type: CONTROLLER_COLOR,
    //   label: 'Background color',
    //   rules: {
    //     '.{{ID}}-app-popup .popup-window{{STATE}}': 'background-color: {{COLOR}};',
    //   },
    // });
    //
    // this.addControl('gradient_popup_style', {
    //   type: CONTROLLER_GRADIENT,
    //   label: 'Gradient',
    //   rules: {
    //     ".{{ID}}-app-popup .popup-window{{STATE}}": "background-image: {{VALUE}}"
    //   }
    // });
    //
    // this.addControl('border_type_popup_style', {
    //     type: CONTROLLER_SELECT,
    //     label: 'Border Type',
    //     options: [
    //       {
    //         'value': 'none',
    //         'label': 'None',
    //       },
    //       {
    //         'value': 'solid',
    //         'label': 'Solid',
    //       },
    //       {
    //         'value': 'double',
    //         'label': 'Double',
    //       },
    //       {
    //         'value': 'dotted',
    //         'label': 'Dotted',
    //       },
    //       {
    //         'value': 'dashed',
    //         'label': 'Dashed',
    //       },
    //       {
    //         'value': 'groove',
    //         'label': 'Groove',
    //       },
    //     ],
    //     rules: {
    //       '.{{ID}}-app-popup .popup-window{{STATE}}': 'border-style: {{VALUE}};',
    //     },
    //   }
    // );
    //
    // this.addControl('border_width_popup_style', {
    //     type: CONTROLLER_DIMENSIONS,
    //     label: 'Border Width',
    //     units: [
    //       'px',
    //       '%',
    //       'vh',
    //     ],
    //     rules: {
    //       '.{{ID}}-app-popup .popup-window{{STATE}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
    //     },
    //   }
    // );
    //
    // this.addControl('border_color_popup_style', {
    //     type: CONTROLLER_COLOR,
    //     label: 'Border Color',
    //     rules: {
    //       '.{{ID}}-app-popup .popup-window{{STATE}}': 'border-color: {{COLOR}};',
    //     },
    //   }
    // );
    //
    // this.addControl('border_radius_popup_style', {
    //   type: CONTROLLER_DIMENSIONS,
    //   label: 'Border Radius',
    //   units: [
    //     'px',
    //     '%',
    //     'vh',
    //   ],
    //   rules: {
    //     '.{{ID}}-app-popup .popup-window{{STATE}}': [
    //       'border-top-left-radius: {{TOP}}{{UNIT}}',
    //       'border-top-right-radius: {{RIGHT}}{{UNIT}}',
    //       'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
    //       'border-bottom-left-radius:  {{LEFT}}{{UNIT}}'
    //     ]
    //   }
    // });
    //
    // this.addControl('box_shadow_popup_style', {
    //   type: CONTROLLER_SHADOW,
    //   label: 'Shadow',
    //   rules: {
    //     '.{{ID}}-app-popup .popup-window{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
    //   },
    // });
    //
    // this.endControlSection();

    this.startControlSection('popup_close_button_style', {
      conditions: {
        'switcher_close_button_popup_layout': true,
      },
      tab: TAB_STYLE,
      label: 'Custom Close',
    });

    this.addControl('popup_close_button_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl("popup_close_button_border_type", {
      type: CONTROLLER_SELECT,
      label: "Border type",
      units: ["px", "%", "vh"],
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

    this.addControl("popup_close_button_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border width",
      units: ["px", "%", "vh"],
    });

    this.addControl("popup_close_button_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border color",
    });

    this.addControl('popup_close_button_border_radius', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Radius',
      units: [
        'px',
        '%',
        'vh',
      ],
    });

    this.addControl("popup_close_button_background_color", {
      type: CONTROLLER_COLOR,
      label: "Background color",
    });

    this.addControl('popup_close_button_box_shadow', {
      type: CONTROLLER_SHADOW,
      label: 'Shadow',
    });

    this.addControl('popup_close_button_height_size', {
      type: CONTROLLER_SLIDER,
      label: 'height',
      default: {
        size: 25,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
    });

    this.addControl('popup_close_button_width_size', {
      type: CONTROLLER_SLIDER,
      label: 'width',
      default: {
        size: 25,
        unit: 'px',
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
    });

    this.endControlSection();

    // this.startControlSection('import_settings', {
    //   tab: TAB_ADVANCED,
    //   label: 'Import Settings',
    // });
    //
    //
    // this.addControl('settings_choose', {
    //   type: CONTROLLER_SELECT2,
    //   label: 'Choose Settings',
    //   options_resource: '/admin/ajax/global_styles_options',
    // });
    //
    // this.addControl('settings_choose_button', {
    //   type: CONTROLLER_BUTTON,
    //   buttonText: 'Import',
    //   onClick: async () => {
    //     if(saveImportModule){
    //       let res = await saveImportModule.importGlobalSettings();
    //       if(! res.success){
    //         alert(res.message);
    //       }
    //     }
    //   },
    // });
    //
    // this.addControl('settings_heading', {
    //   type: CONTROLLER_HEADING,
    //   label: 'Save Current Settings',
    // });
    //
    // this.addControl('settings_save_title', {
    //   type: CONTROLLER_TEXT,
    //   dynamic: false,
    //   responsive: false,
    //   label: 'Save as ... (Global Style Title)',
    // });
    //
    // this.addControl('settings_save_button', {
    //   type: CONTROLLER_BUTTON,
    //   buttonText: 'Save',
    //   onClick: async () => {
    //     if(saveImportModule){
    //       let res = await saveImportModule.saveRootElementSettings();
    //       if(! res.success){
    //         alert(res.message);
    //       }
    //     }
    //   },
    // });
    //
    // this.endControlSection();

    this.startControlSection('positioning', {
      tab: TAB_ADVANCED,
      label: 'Positioning',
    });

    this.addControl('positioning_custom_top', {
      type: CONTROLLER_SLIDER,
      label: 'Custom top',
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
    });

    this.endControlSection();

    this.startControlSection('font_size_global', {
      tab: TAB_ADVANCED,
      label: 'Setting the font size for a page',
    });

    this.addControl('font_size_settings_global', {
      type: CONTROLLER_SLIDER,
      label: 'Font Size',
      units: [
        'px',
        'vw',
        'vh',
      ],
      max: 400,
      min: 0,
      // default: {
      //   size: '14',
      //   unit: 'px'
      // },
      rules: {
        "html{{STATE}}": "font-size: {{SIZE}}{{UNIT}};"
      }
    });

    this.endControlSection();
  }



  appendNewSection(newSection) {
    if (newSection.getType() !== 'section') {
      throw 'Only Section can be a Child of Template';
    }
    this.appendChild(newSection);
  }

  /**
   * css селектор для корневого элемента
   * @return {string}
   */
  getSelector(){
    return `.altrp-template-root${this.getId()}`;
  }

  /**
   * Задать настройки
   * для корневого элемента проверим настройки моделей для предпросмотра
   * @param settings
   */
  setSettings(settings){
    super.setSettings(settings);
    if(this.settings.choose_page){
      this.addModelInfo({
        modelName: 'page',
        modelId: this.settings.choose_page
      })
    }
  }
}

export default RootElement;
