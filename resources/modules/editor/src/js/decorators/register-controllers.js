
import {
  CONTROLLER_COLOR,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_SELECT,
  TAB_ADVANCED
} from "../classes/modules/ControllersManager";
/**
 * Функция декорирует элемент неободимыми контроллерами
 * @param {BaseElement} element
 * */
export function advancedTabControllers(element) {
  element.startControlSection(
    'advanced_section', {
        tab: TAB_ADVANCED,
        label: 'Advanced',
      }
  );

  element.addControl(
      'element_margin', {
        type: CONTROLLER_DIMENSIONS,
        label: 'Margin',
        units:[
          'px',
          '%',
          'vh',
        ],
        rules: {
          '{{ELEMENT}}': 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        },
      }
  );

  element.addControl(
    'element_padding', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Padding',
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}}': [
          'padding-top: {{TOP}}{{UNIT}};',
          'padding-right: {{RIGHT}}{{UNIT}};',
          'padding-bottom: {{BOTTOM}}{{UNIT}};',
          'padding-left: {{LEFT}}{{UNIT}};',
        ]
      },
    }
  );

  element.endControlSection();

  element.startControlSection(
      'advanced_border', {
        tab: TAB_ADVANCED,
        label: 'Border',
      }
  );

  element.addControl(
    'element_border_type', {
      type: CONTROLLER_SELECT,
      label: 'Border Type',
      units:[
        'px',
        '%',
        'vh',
      ],
      options:[
        {
          'value' : 'none',
          'label' : 'None',
        },
        {
          'value' : 'solid',
          'label' : 'Solid',
        },
        {
          'value' : 'double',
          'label' : 'Double',
        },
        {
          'value' : 'dotted',
          'label' : 'Dotted',
        },
        {
          'value' : 'dashed',
          'label' : 'Dashed',
        },
        {
          'value' : 'groove',
          'label' : 'Groove',
        },
      ],
      rules: {
        '{{ELEMENT}}': 'border-style: {{VALUE}};',
      },
    }
  );

  element.addControl(
    'element_border_width', {
      type: CONTROLLER_DIMENSIONS,
      label: 'Border Width',
      units:[
        'px',
        '%',
        'vh',
      ],
      rules: {
        '{{ELEMENT}}': 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
      },
    }
  );

  element.addControl(
    'element_border_color', {
      type: CONTROLLER_COLOR,
      label: 'Border Color',
      rules: {
        '{{ELEMENT}}': 'border-color: {{VALUE}};',
      },
    }
  );

  element.endControlSection();
}