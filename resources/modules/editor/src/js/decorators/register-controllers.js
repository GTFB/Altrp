
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
  element.startControlSection(
    'element_position', {
      tab: TAB_ADVANCED,
      label: 'Position',
    }
  );
  
  element.addControl(
    'element_position_type', {
      type: CONTROLLER_SELECT,
      label: 'type',
      options:[
        {
          'value' : 'static',
          'label' : 'default',
        },
        {
          'value' : 'relative',
          'label' : 'relative'
        },
        {
          'value' : 'absolute',
          'label' : 'absolute'
        },
        {
          'value' : 'fixed',
          'label' : 'fixed'
        },
        {
          'value' : 'inherit',
          'label' : 'inherit'
        }
      ],
      rules: {
        '{{ELEMENT}}': 'position: {{VALUE}};',
      },
    }
  );
  
  element.addControl(
    'element_position_top_bottom_right_left', {
      type: CONTROLLER_DIMENSIONS,
      label: 'position',
      default: {
        bind: true,
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}}': [ 
          'top: {{TOP}}{{UNIT}};',
          'right: {{RIGHT}}{{UNIT}};',
          'bottom: {{BOTTOM}}{{UNIT}};',
          'left: {{LEFT}}{{UNIT}};'
        ]
      },
    }
  );

  element.endControlSection();

  element.startControlSection(
    'element_sizes', {
      tab: TAB_ADVANCED,
      label: 'Sizes',
    }
  );
  
  element.addControl(
    'element_sizes_width', {
      type: CONTROLLER_SLIDER,
      label: 'width',
      default:{
        size: "100%",
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 1920,
      min: 0,
      rules: {
        '{{ELEMENT}}.altrp-element': 'width: {{SIZE}}{{UNIT}};',
      },
    }
  );

  element.addControl(
    'element_sizes_height', {
      type: CONTROLLER_SLIDER,
      label: 'height',
      default:{
        size: "100%",
        unit:'px'
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 1080,
      min: 0,
      rules: {
        '{{ELEMENT}}': 'height: {{SIZE}}{{UNIT}};',
      },
    }
  );

  element.endControlSection();

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
        value: 'full',
        label: 'full width(100%)'
      },
      {
        value: 'inline',
        label: 'inline(auto)'
      },
      {
        value: 'custom',
        label: 'custom'
      }
    ]
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
        '{{ELEMENT}}': 'width: {{SIZE}}{{UNIT}};',
      },
    }
  );

  element.addControl('positioning_vertical_align', {
    type: CONTROLLER_CHOOSE,
    label: 'Vertical Align',
    default: 'flex-start',
    options:[
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
    ],
    rules: {
          '{{ELEMENT}}': 'align-self: {{VALUE}};',
    },
  });

  element.addControl('positioning_position_type', {
    type: CONTROLLER_SELECT,
    label: 'Position',
    default: 'static',
    options: [
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
        icon: 'left',
        value: 'left',
      },
      {
        icon: 'right',
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
        icon: 'left',
        value: 'left',
      },
      {
        icon: 'right',
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
      default: {
        value: null
      }
    }
  );

  element.endControlSection();

}