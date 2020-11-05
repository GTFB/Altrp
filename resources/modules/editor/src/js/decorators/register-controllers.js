
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
  CONTROLLER_TEXT
} from "../classes/modules/ControllersManager";
import Repeater from "../classes/Repeater";
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

  element.addControl('hide_on_trigger', {
    type: CONTROLLER_TEXT,
    label: 'Hide on Trigger'
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
      // default: {
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 0,
      //   unit: "px"
      // },
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
          label: 'default'
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
        '{{ELEMENT}}': 'position: {{VALUE}};',
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
    responsive:false,
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
    prefetch_options: true,
    isClearable: true,
  });

  element.addControl('conditional_other', {
    type: CONTROLLER_SWITCHER,
    label: 'Other Conditions',
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
    label: 'Model Field',
  });

  modelRepeater.addControl('conditional_other_operator', {
    type: CONTROLLER_SELECT,
    responsive: false,
    default: 'empty',
    options: [
      {
        value: 'empty',
        label: 'Empty',
      },
      {
        value: 'not_empty',
        label: 'Not Empty',
      },
      {
        value: '==',
        label: 'Equals',
      },
      {
        value: '<>',
        label: 'Not Equals',
      },
      {
        value: 'between',
        label: 'Between',
      },
      {
        value: '>',
        label: '>',
      },
      {
        value: '>=',
        label: '>=',
      },
      {
        value: '<',
        label: '<',
      },
      {
        value: '<=',
        label: '<=',
      },
    ]
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
    responsive:false,
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
    isClearable: true,
  });

  element.addControl('disabled_conditional_other', {
    type: CONTROLLER_SWITCHER,
    label: 'Other Conditions',
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
    label: 'Model Field',
  });

  disabledModelRepeater.addControl('conditional_other_operator', {
    type: CONTROLLER_SELECT,
    responsive: false,
    default: 'empty',
    options: [
      {
        value: 'empty',
        label: 'Empty',
      },
      {
        value: 'not_empty',
        label: 'Not Empty',
      },
      {
        value: '==',
        label: 'Equals',
      },
      {
        value: '<>',
        label: 'Not Equals',
      },
      {
        value: 'between',
        label: 'Between',
      },
      {
        value: '>',
        label: '>',
      },
      {
        value: '>=',
        label: '>=',
      },
      {
        value: '<',
        label: '<',
      },
      {
        value: '<=',
        label: '<=',
      },
    ]
  });

  disabledModelRepeater.addControl('conditional_other_condition_value', {
    responsive: false,
  });

  element.addControl('disabled_conditions', {
    label: 'Conditions',
    type: CONTROLLER_REPEATER,
    fields: disabledModelRepeater.getControls(),
    default: [
    ],
    conditions: {
      'disabled_conditional_other': true,
    },
  });

  element.endControlSection();

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
}
