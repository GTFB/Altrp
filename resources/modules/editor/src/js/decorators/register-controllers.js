
import {
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SHADOW,
  CONTROLLER_CHOOSE,
  CONTROLLER_CSSEDITOR,
  TAB_ADVANCED,
  CONTROLLER_SWITCHER, CONTROLLER_SELECT2, CONTROLLER_HEADING, CONTROLLER_REPEATER,
  CONTROLLER_TEXT, CONTROLLER_NUMBER,
  CONTROLLER_TYPOGRAPHIC
} from "../classes/modules/ControllersManager";
import Repeater from "../classes/Repeater";
import {CONDITIONS_OPTIONS} from "../../../../front-app/src/js/helpers";
/**
 * Функция декорирует элемент неободимыми контроллерами
 * @param {BaseElement} element
 * */
export function advancedTabControllers(element) {
  // element.startControlSection(
  //   'element_position', {
  //     tab: TAB_ADVANCED,
  //     label: 'Position',
  //   }
  // );

  // element.startControlSection(
  //   'element_sizes', {
  //     tab: TAB_ADVANCED,
  //     label: 'Sizes',
  //   }
  // );

  // element.addControl(
  //   'element_sizes_width', {
  //     type: CONTROLLER_SLIDER,
  //     label: 'width',
  //     default:{
  //       size: "100%",
  //       unit:'px'
  //     },
  //     units:[
  //       'px',
  //       '%',
  //       'vh',
  //     ],
  //     max: 1920,
  //     min: 0,
  //     rules: {
  //       '{{ELEMENT}}.altrp-element': 'width: {{SIZE}}{{UNIT}};',
  //     },
  //   }
  // );

  // element.addControl(
  //   'element_sizes_height', {
  //     type: CONTROLLER_SLIDER,
  //     label: 'height',
  //     default:{
  //       size: "100%",
  //       unit:'px'
  //     },
  //     units:[
  //       'px',
  //       '%',
  //       'vh',
  //     ],
  //     max: 1080,
  //     min: 0,
  //     rules: {
  //       '{{ELEMENT}}': 'height: {{SIZE}}{{UNIT}};',
  //     },
  //   }
  // );

  // element.endControlSection();

  element.startControlSection(
      'advanced', {
        tab: TAB_ADVANCED,
        label: 'Advanced',
      }
  );

  element.addControl('advanced_element_id',{
    label: 'CSS ID',

  });

  // element.addControl('hide_on_trigger', {
  //   type: CONTROLLER_TEXT,
  //   label: 'Hide on Trigger'
  // });

  element.addControl('default_hidden', {
    type: CONTROLLER_SWITCHER,
    label: 'Default Hidden',
    default: false,
  });

  element.addControl('z_index', {
    type: CONTROLLER_NUMBER,
    label: 'Z-index',
    rules: {
      '{{ELEMENT}}': 'z-index: {{VALUE}};'
    },
  });

  element.addControl('advanced_opacity', {
    type: CONTROLLER_SLIDER,
    label: "Opacity",
    max: 1,
    min: 0,
    step: 0.01,
    rules: {
      "{{ELEMENT}}{{STATE}}": "opacity: {{SIZE}}"
    }
  });

  element.addControl('advanced_tooltip', {
    type: CONTROLLER_TEXT,
    label: "Tooltip"
  });

  element.endControlSection();

  if(element.getType() !== 'section') {

    element.startControlSection(
        'element_positioning', {
          tab: TAB_ADVANCED,
          label: 'Positioning',
        }
    );

    element.addControl("positioning_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}}": [
          "padding-top: {{TOP}}{{UNIT}};",
          "padding-right: {{RIGHT}}{{UNIT}}",
          "padding-bottom: {{BOTTOM}}{{UNIT}}",
          "padding-left: {{LEFT}}{{UNIT}}"
        ]
      }
    });

    element.addControl('positioning_margin', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Margin',
      // default:{
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 0,
      //   unit:'px'
      // },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}}': [
          'margin-top: {{TOP}}{{UNIT}}',
          'margin-right: {{RIGHT}}{{UNIT}}',
          'margin-bottom: {{BOTTOM}}{{UNIT}}',
          'margin-left: {{LEFT}}{{UNIT}}'
        ]
      },
    });

    element.addControl('positioning_width_type', {
      type: CONTROLLER_SELECT,
      label: 'Width',
      default: 'default',
      options: [
        {
          value: 'default',
          label: 'default'
        },
        {
          value: '100%',
          label: 'full width(100%)'
        },
        {
          value: 'auto',
          label: 'inline(auto)'
        },
        {
          value: 'custom',
          label: 'custom'
        }
      ],
      rules: {
        '{{ELEMENT}}.altrp-element': 'width: {{VALUE}};',
      },
    });

    element.addControl('positioning_custom_width', {
      type: CONTROLLER_SLIDER,
      label: 'Custom width',
      default: {
        size: "100%",
        unit: 'px'
      },
      units: [
        'px',
        '%',
        'vh',
      ],
      max: 1000,
      min: 0,
      rules: {
        'div{{ELEMENT}}.altrp-element': 'width: {{SIZE}}{{UNIT}};',
      },
      condition: {
        'positioning_width_type': 'custom',
      }
    });

    if (element.getType() === 'widget') {
      element.addControl('positioning_vertical_align', {
        type: CONTROLLER_CHOOSE,
        label: 'Vertical Align',
        default: 'flex-start',
        options: [
          {
            icon: 'block_top',
            value: 'flex-start',
          },
          {
            icon: 'block_horiz',
            value: 'center',
          },
          {
            icon: 'block_bottom',
            value: 'flex-end',
          },
        ],
        rules: {
          '{{ELEMENT}}': 'align-self: {{VALUE}};',
        },
      });
    }

    element.addControl('positioning_position_type', {
      type: CONTROLLER_SELECT,
      label: 'Position',
      default: 'relative',
      options: [
        {
          value: 'relative',
          label: 'default'
        },
        {
          value: 'static',
          label: 'static'
        },
        {
          value: 'absolute',
          label: 'absolute'
        },
        {
          value: 'fixed',
          label: 'fixed'
        }
      ],
      rules: {
        '{{ELEMENT}}': 'position: {{VALUE}} !important;',
      },
    });

    element.addControl('positioning_horizontal_orientation', {
      type: CONTROLLER_CHOOSE,
      label: 'Horizontal Align',
      default: 'flex-start',
      options: [
        {
          icon: 'block_left',
          value: 'left',
        },
        {
          icon: 'block_right',
          value: 'right',
        }
      ],
    });

    element.addControl('positioning_horizontal_offset', {
          type: CONTROLLER_SLIDER,
          label: 'offset',
          default: {
            size: "0",
            unit: 'px'
          },
          units: [
            'px',
            '%',
            'vh',
          ],
          max: 1000,
          min: -1000,
          rules: {
            '{{ELEMENT}}': 'left: {{SIZE}}{{UNIT}};',
          },
        }
    );

    element.addControl('positioning_vertical_orientation', {
      type: CONTROLLER_CHOOSE,
      label: 'Vertical align',
      default: 'flex-start',
      options: [
        {
          icon: 'block_top',
          value: 'left',
        },
        {
          icon: 'block_bottom',
          value: 'right',
        }
      ],
    });

    element.addControl('positioning_vertical_offset', {
          type: CONTROLLER_SLIDER,
          label: 'offset',
          default: {
            size: "0",
            unit: 'px'
          },
          units: [
            'px',
            '%',
            'vh',
          ],
          max: 1000,
          min: -1000,
          rules: {
            '{{ELEMENT}}': 'bottom: {{SIZE}}{{UNIT}};',
          },
        }
    );
    element.endControlSection();

    element.startControlSection(
        'element_css', {
          tab: TAB_ADVANCED,
          label: 'CSS editor',
        }
    );

    element.addControl(
        'element_css_editor', {
          type: CONTROLLER_CSSEDITOR,
        }
    );

    element.endControlSection();
  }

  element.startControlSection(
    'conditional_display', {
      tab: TAB_ADVANCED,
      label: 'Conditional Display',
    }
  );

  element.addControl('conditional_display_choose', {
    type: CONTROLLER_SELECT,
    label: 'Authorize Condition',
    responsive: false,
    options: [
      {
        label: 'all',
        value: '',
      },
      {
        value: 'guest',
        label: 'Guest Only',
      },
      {
        value: 'auth',
        label: 'Authorized Only',
      },
    ],
  });

  element.addControl('conditional_roles', {
    type: CONTROLLER_SELECT2,
    label: 'Allowed for Roles',
    conditions: {
      'conditional_display_choose' : 'auth',
    },
    options_resource: '/admin/ajax/role_options?value=name',
    isMulti: true,
    responsive: false,
    prefetch_options: true,
    isClearable: true,
  });

  element.addControl('conditional_permissions', {
    type: CONTROLLER_SELECT2,
    label: 'Allowed for Permissions',
    conditions: {
      'conditional_display_choose' : 'auth',
    },
    options_resource: '/admin/ajax/permissions_options?value=name',
    isMulti: true,
    responsive: false,
    prefetch_options: true,
    isClearable: true,
  });

  element.addControl('conditional_other', {
    type: CONTROLLER_SWITCHER,
    responsive: false,
    label: 'Other Conditions',
    default: false,
  });

  element.addControl('conditional_ignore_in_forms', {
    type: CONTROLLER_SWITCHER,
    responsive: false,
    label: 'Ignore in Forms',
    default: false,
  });

  element.addControl('conditional_other_display', {
    type: CONTROLLER_SELECT,
    label: 'Display on',
    responsive: false,
    options: [
      {
        label: 'All Conditions Met',
        value: 'AND',
      },
      {
        label: 'Any Condition Met',
        value: 'OR',
      },
    ],
    default: 'AND',
    conditions: {
      'conditional_other': true,
    },
  });

  const modelRepeater = new Repeater();

  modelRepeater.addControl('conditional_model_field', {
    responsive: false,
    label: 'Path',
  });

  modelRepeater.addControl('conditional_other_operator', {
    type: CONTROLLER_SELECT,
    responsive: false,
    default: 'empty',
    options:  CONDITIONS_OPTIONS,
  });

  modelRepeater.addControl('conditional_other_condition_value', {
    responsive: false,
  });

  element.addControl('conditions', {
    label: 'Conditions',
    type: CONTROLLER_REPEATER,
    fields: modelRepeater.getControls(),
    default: [
    ],
    conditions: {
      'conditional_other': true,
    },
  });

  element.endControlSection();
  //<editor-fold description=conditional_disabled>
  element.startControlSection(
    'conditional_disabled', {
      tab: TAB_ADVANCED,
      label: 'Conditional Disabled',
    }
  );

  element.addControl('conditional_disabled_head', {
    type: CONTROLLER_HEADING,
    label: 'Disabled for ...',
  });

  element.addControl('conditional_disabled_choose', {
    type: CONTROLLER_SELECT,
    label: 'Authorize Condition',
    responsive: false,
    options: [
      {
        label: 'all',
        value: '',
      },
      {
        value: 'guest',
        label: 'Guest Only',
      },
      {
        value: 'auth',
        label: 'Authorized Only',
      },
    ],
  });

  element.addControl('conditional_disabled_roles', {
    type: CONTROLLER_SELECT2,
    label: 'User has Roles',
    conditions: {
      'conditional_disabled_choose' : 'auth',
    },
    options_resource: '/admin/ajax/role_options?value=name',
    isMulti: true,
    prefetch_options: true,
    responsive: false,
    isClearable: true,
  });

  element.addControl('conditional_disabled_permissions', {
    type: CONTROLLER_SELECT2,
    label: 'User has Permissions',
    conditions: {
      'conditional_disabled_choose' : 'auth',
    },
    options_resource: '/admin/ajax/permissions_options?value=name',
    isMulti: true,
    prefetch_options: true,
    responsive: false,
    isClearable: true,
  });

  element.addControl('disabled_conditional_other', {
    type: CONTROLLER_SWITCHER,
    label: 'Other Conditions',
    responsive: false,
    default: false,
  });

  element.addControl('disabled_conditional_other_display', {
    type: CONTROLLER_SELECT,
    label: 'Display on',
    responsive: false,
    options: [
      {
        label: 'All Conditions Met',
        value: 'AND',
      },
      {
        label: 'Any Condition Met',
        value: 'OR',
      },
    ],
    default: 'AND',
    conditions: {
      'disabled_conditional_other': true,
    },
  });

  const disabledModelRepeater = new Repeater();

  disabledModelRepeater.addControl('conditional_model_field', {
    responsive: false,
    label: 'Path',
  });

  disabledModelRepeater.addControl('conditional_other_operator', {
    type: CONTROLLER_SELECT,
    responsive: false,
    default: 'empty',
    options: CONDITIONS_OPTIONS,
  });

  disabledModelRepeater.addControl('conditional_other_condition_value', {
    responsive: false,
  });

  element.addControl('disabled_conditions', {
    label: 'Conditions',
    type: CONTROLLER_REPEATER,
    responsive: false,
    fields: disabledModelRepeater.getControls(),
    default: [
    ],
    conditions: {
      'disabled_conditional_other': true,
    },
  });

  element.endControlSection();
  //</editor-fold>
  //<editor-fold description=conditional_active>
  element.startControlSection(
    'conditional_active', {
      tab: TAB_ADVANCED,
      label: 'Conditional Active',
    }
  );

  element.addControl('conditional_active_head', {
    type: CONTROLLER_HEADING,
    label: 'Active when ...',
  });

  element.addControl('conditional_active_choose', {
    type: CONTROLLER_SELECT,
    label: 'Authorize Condition',
    responsive: false,
    options: [
      {
        label: 'all',
        value: '',
      },
      {
        value: 'guest',
        label: 'Guest Only',
      },
      {
        value: 'auth',
        label: 'Authorized Only',
      },
    ],
  });

  element.addControl('conditional_active_roles', {
    type: CONTROLLER_SELECT2,
    label: 'User has Roles',
    conditions: {
      'conditional_active_choose' : 'auth',
    },
    options_resource: '/admin/ajax/role_options?value=name',
    isMulti: true,
    prefetch_options: true,
    responsive: false,
    isClearable: true,
  });

  element.addControl('conditional_active_permissions', {
    type: CONTROLLER_SELECT2,
    label: 'User has Permissions',
    conditions: {
      'conditional_active_choose' : 'auth',
    },
    options_resource: '/admin/ajax/permissions_options?value=name',
    isMulti: true,
    prefetch_options: true,
    responsive: false,
    isClearable: true,
  });

  element.addControl('active_conditional_other', {
    type: CONTROLLER_SWITCHER,
    label: 'Other Conditions',
    responsive: false,
    default: false,
  });

  element.addControl('active_conditional_other_display', {
    type: CONTROLLER_SELECT,
    label: 'Display on',
    responsive: false,
    options: [
      {
        label: 'All Conditions Met',
        value: 'AND',
      },
      {
        label: 'Any Condition Met',
        value: 'OR',
      },
    ],
    default: 'AND',
    conditions: {
      'active_conditional_other': true,
    },
  });

  const activeModelRepeater = new Repeater();

  activeModelRepeater.addControl('conditional_model_field', {
    responsive: false,
    label: 'Path',
  });

  activeModelRepeater.addControl('conditional_other_operator', {
    type: CONTROLLER_SELECT,
    responsive: false,
    default: 'empty',
    options: CONDITIONS_OPTIONS,
  });

  activeModelRepeater.addControl('conditional_other_condition_value', {
    responsive: false,
  });

  element.addControl('active_conditions', {
    label: 'Conditions',
    type: CONTROLLER_REPEATER,
    responsive: false,
    fields: activeModelRepeater.getControls(),
    default: [
    ],
    conditions: {
      'active_conditional_other': true,
    },
  });

  element.endControlSection();
  //</editor-fold>

  element.startControlSection(
    'responsive_display', {
    tab: TAB_ADVANCED,
    label: 'Responsive',
  }
  );

  element.addControl('hide_on_wide_screen', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Wide Screen',
  });

  element.addControl('hide_on_desktop', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Desktop',
  });

  element.addControl('hide_on_laptop', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Laptop',
  });

  element.addControl('hide_on_tablet', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Tablet',
  });

  element.addControl('hide_on_big_phone', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Big-Phone',
  });

  element.addControl('hide_on_small_phone', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Mobile',
  });

  element.endControlSection();

  element.startControlSection('tooltip', {
    tab: TAB_ADVANCED,
    label: 'Tooltip',
  });

  element.addControl('tooltip_text', {
    type: CONTROLLER_TEXT,
    label: 'Content',
  });

  element.addControl('tooltip_position', {
    type: CONTROLLER_SELECT,
    label: 'Position',
    default: 'top',
    options: [
      {
        label: 'top',
        value: 'top',
      },
      {
        value: 'bottom',
        label: 'bottom',
      },
      {
        value: 'left',
        label: 'left',
      },
      {
        value: 'right',
        label: 'right',
      },
    ],
  });

  element.addControl('tooltip_position_padding', {
    type: CONTROLLER_DIMENSIONS,
    label: 'Padding',
    units: ['px', '%', 'vh', 'vw'],
    rules: {
      '{{ELEMENT}} > .altrp-tooltip{{STATE}}': [
        'padding-top: {{TOP}}{{UNIT}};',
        'padding-right: {{RIGHT}}{{UNIT}};',
        'padding-bottom: {{BOTTOM}}{{UNIT}};',
        'padding-left: {{LEFT}}{{UNIT}};'
      ]
    },
  });

  element.addControl('tooltip_horizontal_offset', {
    type: CONTROLLER_SLIDER,
    label: 'offset x',
    units: ['px', '%', 'vh', 'vw'],
    max: 1000,
    min: -1000,
    rules: {
      '{{ELEMENT}} > .altrp-tooltip': 'left: {{SIZE}}{{UNIT}};',
    },
  });

  element.addControl('tooltip_vertical_offset', {
    type: CONTROLLER_SLIDER,
    label: 'offset y',
    units: ['px', '%', 'vh', 'vw'],
    max: 1000,
    min: -1000,
    rules: {
      '{{ELEMENT}} > .altrp-tooltip': 'bottom: {{SIZE}}{{UNIT}};',
    },
  });

  element.addControl('tooltip_font_typographic', {
    type: CONTROLLER_TYPOGRAPHIC,
    label: 'Typographic',
    rules: {
      '{{ELEMENT}} > .altrp-tooltip{{STATE}}': [
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

  element.addControl('tooltip_font_color', {
    type: CONTROLLER_COLOR,
    label: 'Color',
    rules: {
      '{{ELEMENT}} > .altrp-tooltip{{STATE}}': 'color: {{COLOR}};',
    },
  }
  );

  element.addControl('tooltip_background_color', {
    type: CONTROLLER_COLOR,
    label: 'Background Color',
    rules: {
      '{{ELEMENT}} > .altrp-tooltip{{STATE}}': [
        'border-color: transparent transparent {{COLOR}}',
        'background-color: {{COLOR}}'
      ]
    }
  });

  element.addControl('tooltip_border_radius', {
    type: CONTROLLER_DIMENSIONS,
    label: 'Border Radius',
    default: {
      unit: 'px'
    },
    units: ['px', '%', 'vh', 'vw'],
    rules: {
      '{{ELEMENT}} > .altrp-tooltip{{STATE}}': [
        'border-top-left-radius: {{TOP}}{{UNIT}}',
        'border-top-right-radius: {{RIGHT}}{{UNIT}}',
        'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}',
        'border-bottom-left-radius: {{LEFT}}{{UNIT}}'
      ]
    }
  });

  element.addControl('arrow_size', {
    type: CONTROLLER_SLIDER,
    label: 'Arrow Size',
    units: ['px', '%'],
    max: 50,
    min: 0,
    rules: {
      '{{ELEMENT}} > .altrp-tooltip::after': 'border-width: {{SIZE}}{{UNIT}};',

      '{{ELEMENT}} > .altrp-tooltip--top': 'bottom: calc(100% + {{SIZE}}{{UNIT}});',
      '{{ELEMENT}} > .altrp-tooltip--bottom': 'top: calc(100% + {{SIZE}}{{UNIT}});',
      '{{ELEMENT}} > .altrp-tooltip--right': 'left: calc(100% + {{SIZE}}{{UNIT}});',
      '{{ELEMENT}} > .altrp-tooltip--left': 'right: calc(100% + {{SIZE}}{{UNIT}});',

      '{{ELEMENT}} > .altrp-tooltip--top::after': 'margin-left: -{{SIZE}}{{UNIT}};',
      '{{ELEMENT}} > .altrp-tooltip--bottom::after': 'margin-left: -{{SIZE}}{{UNIT}};',
      '{{ELEMENT}} > .altrp-tooltip--right::after': 'margin-top: -{{SIZE}}{{UNIT}};',
      '{{ELEMENT}} > .altrp-tooltip--left::after': 'margin-top: -{{SIZE}}{{UNIT}};',

    },
  });

  element.addControl('tooltip_background_shadow', {
    type: CONTROLLER_SHADOW,
    label: 'Shadow',
    presetColors: [
      '#eaeaea',
      '#9c18a8'
    ],
    rules: {
      '{{ELEMENT}} > .altrp-tooltip{{STATE}}': 'box-shadow: {{TYPE}} {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{SPREAD}}px {{COLOR}};',
    },
  });

  element.endControlSection();
}
