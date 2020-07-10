
import {
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SHADOW,
  CONTROLLER_CHOOSE,
  CONTROLLER_CSSEDITOR,
  TAB_ADVANCED
} from "../classes/modules/ControllersManager";
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
    'element_positioning', {
      tab: TAB_ADVANCED,
      label: 'Positioning',
    }
  );

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
    default:{
      size: "100%",
      unit:'px'
    },
    units:[
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
    }
  );

  element.addControl('positioning_vertical_align', {
    type: CONTROLLER_CHOOSE,
    label: 'Vertical Align',
    default: 'flex-start',
    options:[
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
    options:[
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
      default:{
        size: "0",
        unit:'px'
      },
      units:[
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
    options:[
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
      default:{
        size: "0",
        unit:'px'
      },
      units:[
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