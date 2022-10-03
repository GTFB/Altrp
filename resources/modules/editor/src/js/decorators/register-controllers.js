
import {
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SHADOW,
  CONTROLLER_GROUP,
  CONTROLLER_CSSEDITOR,
  TAB_ADVANCED,
  CONTROLLER_SWITCHER, CONTROLLER_SELECT2, CONTROLLER_HEADING, CONTROLLER_REPEATER,
  CONTROLLER_TEXT, CONTROLLER_NUMBER,
  CONTROLLER_TYPOGRAPHIC, CONTROLLER_TEXTAREA, CONTROLLER_CHOOSE
} from "../classes/modules/ControllersManager";
import Repeater from "../classes/Repeater";
import { CONDITIONS_OPTIONS } from "../../../../front-app/src/js/helpers";
import {actionsControllers} from "./actions-controllers";
/**
 * Функция декорирует элемент неободимыми контроллерами
 * @param {BaseElement} element
 * */
export function advancedTabControllers(element) {

  element.startControlSection(
    'advanced', {
    tab: TAB_ADVANCED,
    label: 'Advanced',
  }
  );

  element.addControl('css_class', {
    label: 'CSS Class',
    responsive: false,
  });

  element.addControl('advanced_element_id', {
    label: 'CSS ID',
    responsive: false,
  });


  element.addControl('react_element', {
    label: 'Dynamic Element',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    locked: true,
    stateless: true,
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
  });

  element.addControl('advanced_opacity', {
    type: CONTROLLER_SLIDER,
    label: "Opacity",
    max: 1,
    min: 0,
    step: 0.01,
  });

  // element.addControl('advanced_tooltip', {
  //   type: CONTROLLER_TEXT,
  //   label: "Tooltip"
  // });

  element.endControlSection();
  /*
  element.startControlSection(
    'scrolling_effects', {
      tab: TAB_ADVANCED,
      label: 'Scrolling Effects',
    }
  );

  element.addControl('vertical_scroll', {
    label: 'Vertical Scroll',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        options: [
          {
            value: 'up',
            label: 'Up',
          },
          {
            value: 'down',
            label: 'Down',
          },
        ]
      },
      {
        controlId: 'speed',
        label : 'Speed',
        type: CONTROLLER_SLIDER,
        default: {
          size: 4
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport_top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 0
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport_bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 100
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('horizontal_scroll', {
    label: 'Horizontal Scroll',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        options: [
          {
            value: 'up',
            label: 'Up',
          },
          {
            value: 'down',
            label: 'Down',
          },
        ]
      },
      {
        controlId: 'speed',
        label : 'Speed',
        type: CONTROLLER_SLIDER,
        default: {
          size: 4
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport_top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 0
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport_bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 100
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('transparency', {
    label: 'Transparency',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        options: [
          {
            value: 'out-in',
            label: 'Fade In',
          },
          {
            value: 'in-out',
            label: 'Fade Out',
          },
          {
            value: 'in-out-in',
            label: 'Fade Out In',
          },
          {
            value: 'out-in-out',
            label: 'Fade In Out',
          },
        ]
      },
      {
        controlId: 'level',
        label : 'Level',
        type: CONTROLLER_SLIDER,
        default: {
          size: 10
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport_top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 20
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport_bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 80
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('blur', {
    label: 'Blur',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        options: [
          {
            value: 'out-in',
            label: 'Fade In',
          },
          {
            value: 'in-out',
            label: 'Fade Out',
          },
          {
            value: 'in-out-in',
            label: 'Fade Out In',
          },
          {
            value: 'out-in-out',
            label: 'Fade In Out',
          },
        ]
      },
      {
        controlId: 'level',
        label : 'Level',
        type: CONTROLLER_SLIDER,
        default: {
          size: 10
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport_top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 20
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport_bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 80
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.endControlSection();
*/

  if (element.getType() !== 'section') {

    // element.startControlSection(
    //   'element_size', {
    //   tab: TAB_ADVANCED,
    //   label: 'Size',
    // }
    // );
    //
    // element.addControl('custom_width', {
    //   label: 'Width',
    // });
    //
    // element.endControlSection();

    element.startControlSection(
      'element_positioning', {
      tab: TAB_ADVANCED,
      label: 'Positioning (container)',
    }
    );

    element.addControl("positioning_padding", {
      type: CONTROLLER_DIMENSIONS,
      label: "Padding",
      units: ["px", "%", "vh", "vw"],
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
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
    });


    // element.addControl('custom_width', {
    //   type: CONTROLLER_SWITCHER,
    //   label: 'Custom Width',
    // });


    if (element.getType() !== "column") {
      element.addControl('positioning_width_type', {
        type: CONTROLLER_SELECT,
        label: 'Width',
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
      });

      element.addControl('positioning_custom_width', {
        type: CONTROLLER_SLIDER,
        label: 'Custom width',
        default: {
          unit: '%'
        },
        units: [
          'px',
          '%',
          'vh',
          'vw',
        ],
        max: 1000,
        min: 0,
        conditions: {
          'positioning_width_type': 'custom',
        }
      });
    }

    // if (element.getType() === 'widget') {
    //   element.addControl('positioning_vertical_align', {
    //     type: CONTROLLER_CHOOSE,
    //     label: 'Vertical Align',
    //     options: [
    //       {
    //         icon: 'block_top',
    //         value: 'flex-start',
    //       },
    //       {
    //         icon: 'block_horiz',
    //         value: 'center',
    //       },
    //       {
    //         icon: 'block_bottom',
    //         value: 'flex-end',
    //       },
    //     ],
    //   });
    // }

    if (element.getType() === "column") {
      element.addControl('positioning_position_type', {
        type: CONTROLLER_SELECT,
        label: 'Position',
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
      });
    }

    // element.addControl('positioning_horizontal_orientation', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Horizontal Align',
    //   options: [
    //     {
    //       icon: 'block_left',
    //       value: 'left',
    //     },
    //     {
    //       icon: 'block_right',
    //       value: 'right',
    //     }
    //   ],
    // });

    element.addControl('positioning_horizontal_offset', {
      type: CONTROLLER_SLIDER,
      label: 'offset X',
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
      max: 1000,
      min: -1000,
    }
    );

    // element.addControl('positioning_vertical_orientation', {
    //   type: CONTROLLER_CHOOSE,
    //   label: 'Vertical align',
    //   options: [
    //     {
    //       icon: 'block_top',
    //       value: 'left',
    //     },
    //     {
    //       icon: 'block_bottom',
    //       value: 'right',
    //     }
    //   ],
    // });

    element.addControl('positioning_vertical_offset', {
      type: CONTROLLER_SLIDER,
      label: 'offset Y',
      units: [
        'px',
        '%',
        'vh',
        'vw',
      ],
      max: 1000,
      min: -1000,
    }
    );
    element.endControlSection();

  }

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
      'conditional_display_choose': 'auth',
    },
    options_resource: '/admin/ajax/role_options?value=name',
    isMulti: true,
    responsive: false,
    prefetch_options: true,
    isClearable: true,
  });

  // element.addControl('conditional_permissions', {
  //   type: CONTROLLER_SELECT2,
  //   label: 'Allowed for Permissions',
  //   conditions: {
  //     'conditional_display_choose': 'auth',
  //   },
  //   options_resource: '/admin/ajax/permissions_options?value=name',
  //   isMulti: true,
  //   responsive: false,
  //   prefetch_options: true,
  //   isClearable: true,
  // });

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
    options: CONDITIONS_OPTIONS,
  });

  modelRepeater.addControl('conditional_other_condition_value', {
    responsive: false,
  });

  element.addControl('conditions', {
    label: 'Conditions',
    type: CONTROLLER_REPEATER,
    fields: modelRepeater.getControls(),
    default: [],
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

  element.addControl('disabled_enable', {
    type: CONTROLLER_SWITCHER,
    label: 'Enable',
    responsive: false,
  });

  element.addControl('conditional_disabled_choose', {
    type: CONTROLLER_SELECT,
    label: 'Authorize Condition',
    responsive: false,
    conditions: {
      'disabled_enable': true,
    },
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
      'disabled_enable': true,
      'conditional_disabled_choose': 'auth',
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
      'disabled_enable': true,
      'conditional_disabled_choose': 'auth',
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
    conditions: {
      'disabled_enable': true,
    },
    responsive: false,
  });

  element.addControl('disabled_conditional_other_display', {
    type: CONTROLLER_SELECT,
    label: 'Disabled on',
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
      'disabled_enable': true,
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
      'disabled_enable': true,
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

  element.addControl('active_enable', {
    type: CONTROLLER_SWITCHER,
    label: 'Enable',
    responsive: false,
  });

  element.addControl('conditional_active_choose', {
    type: CONTROLLER_SELECT,
    label: 'Authorize Condition',
    responsive: false,
    conditions: {
      'active_enable': true,
    },
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
      'active_enable': true,
      'conditional_active_choose': 'auth',
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
      'active_enable': true,
      'conditional_active_choose': 'auth',
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
    conditions: {
      'active_enable': true,
    },
    responsive: false,
  });

  element.addControl('active_conditional_other_display', {
    type: CONTROLLER_SELECT,
    label: 'Active on',
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
      'active_enable': true,
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
      'active_enable': true,
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
    responsive: false,
  });

  element.addControl('hide_on_desktop', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Desktop',
    responsive: false,
  });

  element.addControl('hide_on_laptop', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Laptop',
    responsive: false,
  });

  element.addControl('hide_on_tablet', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Tablet',
    responsive: false,
  });

  element.addControl('hide_on_big_phone', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Big-Phone',
    responsive: false,
  });

  element.addControl('hide_on_small_phone', {
    type: CONTROLLER_SWITCHER,
    label: 'Hide On Mobile',
    responsive: false,
  });

  element.endControlSection();

  element.startControlSection('tooltip', {
    tab: TAB_ADVANCED,
    label: 'Tooltip',
  });

  element.addControl('tooltip_enable', {
    type: CONTROLLER_SWITCHER,
    responsive: false,
    label: 'Enable',
  });

  element.addControl('tooltip_show_type', {
    type: CONTROLLER_SELECT,
    label: 'Show type',
    default: 'never',
    options: [
      {
        value: 'never',
        label: 'Never',
      },
      {
        value: 'hover',
        label: 'Hover',
      },
      {
        value: 'click',
        label: 'Click',
      },
      {
        value: 'always',
        label: 'Always',
      },
    ],
  });

  element.addControl('tooltip_text', {
    type: CONTROLLER_TEXTAREA,
    label: 'Content',
  });

  element.addControl('tooltip_position', {
    type: CONTROLLER_SELECT,
    label: 'Position',
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

  element.addControl('tooltip_minimal', {
    type: CONTROLLER_SWITCHER,
    label: 'Minimal',
  });

  element.addControl('tooltip_position_padding', {
    type: CONTROLLER_DIMENSIONS,
    label: 'Padding',
    units: ['px', '%', 'vh', 'vw'],
  });

  element.addControl('tooltip_horizontal_offset', {
    type: CONTROLLER_SLIDER,
    label: 'offset x',
    units: ['px'],
    max: 1000,
    min: -1000,
  });

  element.addControl('tooltip_vertical_offset', {
    type: CONTROLLER_SLIDER,
    label: 'offset y',
    units: ['px'],
    max: 1000,
    min: -1000,
  });

  element.addControl('tooltip_font_typographic', {
    type: CONTROLLER_TYPOGRAPHIC,
    label: 'Typographic',
  }
  );

  element.addControl('tooltip_font_color', {
    type: CONTROLLER_COLOR,
    label: 'Color',
  }
  );

  element.addControl('tooltip_background_color', {
    type: CONTROLLER_COLOR,
    label: 'Background Color',
  });

  element.addControl('tooltip_border_radius', {
    type: CONTROLLER_DIMENSIONS,
    label: 'Border Radius',
    units: ['px', '%', 'vh', 'vw'],
  });

  // element.addControl('arrow_size', {
  //   type: CONTROLLER_SLIDER,
  //   label: 'Arrow Size',
  //   units: ['px', '%'],
  //   max: 50,
  //   min: 0,
  // });

  element.addControl('tooltip_background_shadow', {
    type: CONTROLLER_SHADOW,
    label: 'Shadow',
  });

  element.endControlSection();

  element.startControlSection('mouse-effects', {
    tab: TAB_ADVANCED,
    label: 'Mouse Effects',
  });

  element.addControl('mouse-effects:enable', {
    type: CONTROLLER_SWITCHER,
    label: 'Enable',
    responsive: false,
  })

  element.addControl('mouse-effects:track', {
    label: 'Mouse Track',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        options: [
          {
            value: 'opposite',
            label: 'Opposite',
          },
          {
            value: 'direct',
            label: 'Direct',
          },
        ]
      },
      {
        controlId: 'speed',
        label : 'Speed',
        type: CONTROLLER_SLIDER,
        default: {
          size: 1
        },
        max: 10,
        min: 0,
        step: 0.1
      },
    ],
  })

  element.addControl('mouse-effects:tilt', {
    label: 'Tilt',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        options: [
          {
            value: 'opposite',
            label: 'Opposite',
          },
          {
            value: 'direct',
            label: 'Direct',
          },
        ]
      },
      {
        controlId: 'speed',
        label : 'Speed',
        type: CONTROLLER_SLIDER,
        default: {
          size: 1
        },
        max: 10,
        min: 0,
        step: 0.1
      },
    ],
  })

  element.endControlSection();

  element.startControlSection(
    'entrance_animation', {
      tab: TAB_ADVANCED,
      label: 'Entrance Animation',
    }
  );

  element.addControl('en_an', {
    label: 'Entrance Animation',
    type: CONTROLLER_SELECT2,
    isClearable: true,
    //<editor-fold description="Entrance Animation Options" defaultstate="collapsed">
    options:[
      {
        label: 'Fading',
        options: [
          {
            label: 'Fade In',
            value: 'fadeIn'
          },
          {
            label: 'Fade In Down',
            value: 'fadeInDown'
          },
          {
            label: 'Fade In Left',
            value: 'fadeInLeft'
          },
          {
            label: 'Fade In Right',
            value: 'fadeInRight'
          },
          {
            label: 'Fade In Up',
            value: 'fadeUp'
          },
        ]
      },
      {
        label: 'Zooming',
        options: [
          {
            label: 'Zoom In',
            value: 'zoomIn'
          },
          {
            label: 'Zoom In Down',
            value: 'zoomInDown'
          },
          {
            label: 'Zoom In Left',
            value: 'zoomInLeft'
          },
          {
            label: 'Zoom In Right',
            value: 'zoomInRight'
          },
          {
            label: 'Zoom In Up',
            value: 'zoomInUp'
          },
        ],
      },
      {
        label: 'Bouncing',
        options: [
          {
            label: 'Bounce In',
            value: 'bounceIn'
          },
          {
            label: 'Bounce In Down',
            value: 'bounceDown'
          },
          {
            label: 'Bounce In Left',
            value: 'bounceInLeft'
          },
          {
            label: 'Bounce In Right',
            value: 'bounceInRight'
          },
          {
            label: 'Bounce In Up',
            value: 'bounceInUp'
          },
        ],
      },
      {
        label: 'Sliding',
        options: [
          {
            label: 'Slide In Down',
            value: 'slideInDown'
          },
          {
            label: 'Slide In Left',
            value: 'slideInLeft'
          },
          {
            label: 'Slide In Right',
            value: 'slideInRight'
          },
          {
            label: 'Slide In Up',
            value: 'slideInUp'
          },
        ],
      },
      {
        label: 'Rotating',
        options: [
          {
            label: 'Rotate In',
            value: 'rotateIn'
          },
          {
            label: 'Rotate In Down Left',
            value: 'rotateInDownLeft'
          },
          {
            label: 'Rotate In Down Right',
            value: 'RotateInDownRight'
          },
          {
            label: 'Rotate In Up Left',
            value: 'RotateInUpLeft'
          },
          {
            label: 'Rotate In Up Right',
            value: 'RotateInUpRight'
          },
        ],
      },
      {
        label: 'Attention Seekers',
        options: [
          {
            label: 'Bounce',
            value: 'bounce',
          },
          {
            label: 'Flash',
            value: 'flash',
          },
          {
            label: 'Pulse',
            value: 'pulse',
          },
          {
            label: 'Rubber Band',
            value: 'rubberBand',
          },
          {
            label: 'Shake',
            value: 'shake',
          },
          {
            label: 'Head Shake',
            value: 'headShake',
          },
          {
            label: 'Wobble',
            value: 'wobble',
          },
          {
            label: 'Jello',
            value: 'jello',
          },
        ],
      },
      {
        label: 'Light Speed',
        options:[
          {
            label: 'Light Speed In',
            value: 'lsi',
          }
        ],
      },
      {
        label: 'Special',
        options:[
          {
            label: 'Roll In',
            value: 'roll_in',
          }
        ],
      },
    ],
    //</editor-fold>
  })

  element.addControl('en_a_duration', {
    label: 'Animation Duration (ms)',
    type: CONTROLLER_SLIDER,
    units: ['ms'],
    max: 1000,
    min: 0,
  })
  element.addControl('en_a_delay', {
    label: 'Animation Delay (ms)',
    type: CONTROLLER_SLIDER,
    units: ['ms'],
    max: 1000,
    min: 0,
  })

  element.addControl('en_a_switcher', {
    type: CONTROLLER_SWITCHER,
    label: 'Overflow hidden container',
    default: true,
    responsive: false,
  });

  element.endControlSection();

  element.startControlSection('scroll-effects', {
    tab: TAB_ADVANCED,
    label: 'Scroll Effects',
  });

  element.addControl('scroll-effects:enable', {
    type: CONTROLLER_SWITCHER,
    label: 'Enable',
    responsive: false,
  })

  element.addControl('scroll-effects:vertical', {
    label: 'Vertical Scroll',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        default: 'down',
        options: [
          {
            value: 'up',
            label: 'Up',
          },
          {
            value: 'down',
            label: 'Down',
          },
        ]
      },
      {
        controlId: 'speed',
        label : 'Speed',
        type: CONTROLLER_SLIDER,
        default: {
          size: 4
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport-bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 0
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport-top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 100
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('scroll-effects:horizontal', {
    label: 'Horizontal Scroll',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        default: 'to-right',
        options: [
          {
            value: 'to-left',
            label: 'To Left',
          },
          {
            value: 'to-right',
            label: 'To Right',
          },
        ]
      },
      {
        controlId: 'speed',
        label : 'Speed',
        type: CONTROLLER_SLIDER,
        default: {
          size: 4
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport-bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 0
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport-top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 100
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('scroll-effects:transparency', {
    label: 'Transparency',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        default: 'out-in',
        options: [
          {
            value: 'out-in',
            label: 'Fade In',
          },
          {
            value: 'in-out',
            label: 'Fade Out',
          },
          {
            value: 'in-out-in',
            label: 'Fade Out In',
          },
          {
            value: 'out-in-out',
            label: 'Fade In Out',
          },
        ]
      },
      {
        controlId: 'level',
        label : 'Level',
        type: CONTROLLER_SLIDER,
        default: {
          size: 5.8
        },
        max: 10,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport-bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 0
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport-top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 61
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('scroll-effects:blur', {
    label: 'Blur',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        default: 'out-in',
        options: [
          {
            value: 'out-in',
            label: 'Fade In',
          },
          {
            value: 'in-out',
            label: 'Fade Out',
          },
          {
            value: 'in-out-in',
            label: 'Fade Out In',
          },
          {
            value: 'out-in-out',
            label: 'Fade In Out',
          },
        ]
      },
      {
        controlId: 'level',
        label : 'Level',
        type: CONTROLLER_SLIDER,
        default: {
          size: 5.8
        },
        max: 7,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport-bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 20
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport-top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 80
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('scroll-effects:rotate', {
    label: 'Rotate',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        default: 'to-left',
        options: [
          {
            value: 'to-left',
            label: 'To Left',
          },
          {
            value: 'to-right',
            label: 'To Right',
          },
        ]
      },
      {
        controlId: 'level',
        label : 'Level',
        type: CONTROLLER_SLIDER,
        default: {
          size: 1
        },
        max: 7,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport-bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 0
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport-top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 100
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('scroll-effects:scale', {
    label: 'Scale',
    type: CONTROLLER_GROUP,
    fields: [
      {
        controlId: 'direction',
        label : 'Direction',
        type: CONTROLLER_SELECT,
        default: 'out-in',
        options: [
          {
            value: 'out-in',
            label: 'Scale Up',
          },
          {
            value: 'in-out',
            label: 'Scale Down',
          },
          {
            value: 'in-out-in',
            label: 'Scale Down Up',
          },
          {
            value: 'out-in-out',
            label: 'Scale Up Down',
          },
        ]
      },
      {
        controlId: 'level',
        label : 'Level',
        type: CONTROLLER_SLIDER,
        default: {
          size: 4
        },
        max: 7,
        min: 0,
        step: 0.1
      },
      {
        controlId: 'viewport-bottom',
        label : 'Viewport Bottom',
        type: CONTROLLER_SLIDER,
        default: {
          size: 20
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
      {
        controlId: 'viewport-top',
        label : 'Viewport Top',
        type: CONTROLLER_SLIDER,
        default: {
          size: 80
        },
        units: ['%'],
        max: 100,
        min: 0,
        step: 1
      },
    ],
  })

  element.addControl('scroll-effects:x-anchor', {
    type: CONTROLLER_CHOOSE,
    dynamic: false,
    label: 'X Anchor Point',
    options: [
      {
        icon: 'block_left',
        value: 'left',
      },
      {
        icon: 'block_vertically',
        value: 'center',
      },
      {
        icon: 'block_right',
        value: 'right',
      },
    ],
  });

  element.addControl('scroll-effects:y-anchor', {
    type: CONTROLLER_CHOOSE,
    dynamic: false,
    label: 'Y Anchor Point',
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

  element.endControlSection();

  element.startControlSection('skeleton', {
    tab: TAB_ADVANCED,
    label: 'Skeleton Settings',
  });

  element.addControl('skeleton:enable', {
    type: CONTROLLER_SWITCHER,
    label: 'Skeleton Enable',
    responsive: false
  })

  element.addControl('skeleton:preview', {
    type: CONTROLLER_SWITCHER,
    label: 'Preview Enable',
    responsive: false
  })

  element.addControl('skeleton:width', {
    label: "Width",
    dynamic: false,
    description: 'E. g.: <code>100px or calc(100% - 10px)</code>'
  });

  element.addControl('skeleton:height', {
    label: "Height",
    dynamic: false,
    description: 'E. g.: <code>100px or calc(100% - 10px)</code>'
  });

  element.addControl('skeleton:radius', {
    label: "Radius",
    type: CONTROLLER_DIMENSIONS,
  });

  element.addControl('skeleton:columns', {
    label: "Columns",
    type: CONTROLLER_NUMBER,
  });

  element.addControl('skeleton:rows', {
    label: "Rows",
    type: CONTROLLER_NUMBER,
  });

  element.addControl('skeleton:gap', {
    label: "Gap",
    type: CONTROLLER_TEXT,
    description: 'E. g.: <code>100px or calc(100% - 10px)</code>. <a href="https://developer.mozilla.org/ru/docs/Web/CSS/gap" target="_blank">Docs</a>'
  });

  element.addControl('skeleton:shimmer', {
    type: CONTROLLER_SWITCHER,
    default: true,
    label: 'Skeleton Shimmer',
  })

  element.addControl('skeleton:shimmer_size', {
    label: 'Shimmer Size',
    description: 'E. g.: <code>100px or calc(100% - 10px)</code>'
  })

  element.addControl('skeleton:shimmer_end_position', {
    label: 'Shimmer End Position',
    description: 'E. g.: <code>100px or calc(100% - 10px)</code>'
  })

  element.addControl('skeleton:speed', {
    type: CONTROLLER_SLIDER,
    label: 'Shimmer Speed',
    units: ['ms'],
    max: 5000,
    min: 0,
    default: {
      unit: 'ms',
      size: 2000
    }
  })

  element.addControl('skeleton:primary_color', {
    label: "Primary Color",
    type: CONTROLLER_COLOR,
  });
  //
  // element.addControl('skeleton:secondary_color', {
  //   label: "Secondary Color",
  //   type: CONTROLLER_COLOR,
  // });

  element.addControl('skeleton:fade_speed', {
    type: CONTROLLER_SLIDER,
    label: 'Fade Speed',
    units: ['ms'],
    max: 5000,
    min: 0,
    default: {
      unit: 'ms',
      size: 0
    }
  })

  element.addControl('skeleton_pending_path', {
    type: CONTROLLER_TEXTAREA,
    label: 'Skeleton Pending Path',
    responsive: false,
    description: 'Like: <code>altrpdata.data</code>'
  })

  element.endControlSection();

  element.startControlSection('hover-transition', {
    tab: TAB_ADVANCED,
    label: 'Hover Transform',
  });


  element.addControl('hover-transition:enable', {
    type: CONTROLLER_SWITCHER,
    label: 'Enable',
  })

  element.addControl('hover-transition:rotate', {
    type: CONTROLLER_SLIDER,
    label: 'Rotate',
    units: ['deg'],
    dynamic: false,
    min: -360,
    max: 360,
    responsive: false,
  })

  element.addControl('hover-transition:scale-x', {
    type: CONTROLLER_TEXT,
    label: 'Scale X',
    dynamic: false,
    responsive: false,
  })


  element.addControl('hover-transition:scale-y', {
    type: CONTROLLER_TEXT,
    label: 'Scale Y',
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:offset-x', {
    type: CONTROLLER_TEXT,
    label: 'Offset X',
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:offset-y', {
    type: CONTROLLER_TEXT,
    label: 'Offset Y',
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:skew-x', {
    type: CONTROLLER_TEXT,
    label: 'Skew X',
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:skew-y', {
    type: CONTROLLER_TEXT,
    label: 'Skew Y',
    dynamic: false,
    responsive: false,
  })


  element.addControl('hover-transition:flip-x', {
    type: CONTROLLER_SWITCHER,
    label: 'Flip Horizontal',
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:flip-y', {
    type: CONTROLLER_SWITCHER,
    label: 'Flip Vertical',
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:duration', {
    type: CONTROLLER_SLIDER,
    label: 'Duration',
    units: ['ms'],
    default: {
      unit: 'ms',
      size: '300'
    },
    min: 0,
    max: 10000,
    dynamic: false,
    responsive: false,
  })

  element.addControl('hover-transition:x-anchor', {
    type: CONTROLLER_CHOOSE,
    dynamic: false,
    label: 'X Anchor Point',
    options: [
      {
        icon: 'block_left',
        value: 'left',
      },
      {
        icon: 'block_vertically',
        value: 'center',
      },
      {
        icon: 'block_right',
        value: 'right',
      },
    ],
  });

  element.addControl('hover-transition:y-anchor', {
    type: CONTROLLER_CHOOSE,
    dynamic: false,
    label: 'Y Anchor Point',
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

  element.endControlSection();

  element.startControlSection('sticky_section', {
    label: 'Sticky',
    tab: TAB_ADVANCED,
  })

  element.addControl('sticky', {
    type: CONTROLLER_SELECT,
    label: 'Sticky Type',
    options:()=>{
      const stickyOptions = [
        {
          label: 'None',
          value: '',
        },
        {
          label: 'Top',
          value: 'top',
        },
        // {
        //   label: 'Bottom',
        //   value: 'bottom',
        // },
      ]
      if(element.getType() === 'widget'){
        stickyOptions.push({
          label: 'Top in Column',
          value: 'column_top',
        })
      }
      return stickyOptions
    },
  })

  element.addControl('st_spacing', {
    type: CONTROLLER_NUMBER,
    label: 'Spacing'
  })

  element.endControlSection();

  actionsControllers(element, 'Wrapper Click Actions', 'wrapper_click_', TAB_ADVANCED);

  actionsControllers(element, 'Appearance of Top of Element Actions', 'wrapper_appearT_', TAB_ADVANCED);

  actionsControllers(element, 'Appearance of Bottom of Element Actions', 'wrapper_appearB_', TAB_ADVANCED);

}
window.advancedTabControllers = advancedTabControllers
