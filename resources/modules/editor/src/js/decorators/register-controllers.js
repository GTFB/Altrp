
import {
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  CONTROLLER_SHADOW,
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