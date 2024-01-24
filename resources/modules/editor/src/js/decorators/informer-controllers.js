import Repeater from "../classes/Repeater";
import {
  CONTROLLER_COLOR,
  CONTROLLER_REPEATER, CONTROLLER_SLIDER,
  CONTROLLER_TEXTAREA,
  CONTROLLER_TYPOGRAPHIC, TAB_ADVANCED
} from "../classes/modules/ControllersManager";

/**
 * @param {BaseElement} element - элемент
 */

export default function informerControllers(element){

  element.startControlSection('informer', {
    tab: TAB_ADVANCED,
    hideOnEmail: true,
    label: 'Informers Settings'
  });

  let informersRepeater = new Repeater();

  informersRepeater.addControl('c', {
    label: 'Content',
    type: CONTROLLER_TEXTAREA,
  })
  informersRepeater.addControl('cd', {
    label: 'condition',
    type: CONTROLLER_TEXTAREA,
  })


  informersRepeater.addControl('br', {
    label: 'Borders',
    type: CONTROLLER_SLIDER,
    units: [
      'px',
      '%',
      'em',
      'rem',
      'vw',
      'vh',
    ],
    responsive: true,

  })
  informersRepeater.addControl('bl', {
    label: 'Blur',
    type: CONTROLLER_SLIDER,
    units: [
      'px',
      '%',
      'em',
      'rem',
      'vw',
      'vh',
    ],
    responsive: true,

  })

  informersRepeater.addControl('tt', {
    label: 'Typographic',
    type: CONTROLLER_TYPOGRAPHIC,
    responsive: true,

  })
  informersRepeater.addControl('tc', {
    label: 'Color',
    type: CONTROLLER_COLOR,
  })

  informersRepeater.addControl('bc', {
    label: 'Background',
    type: CONTROLLER_COLOR,
  })

  informersRepeater.addControl('r', {
    label: 'Right',
    responsive: true,
  })
  informersRepeater.addControl('t', {
    label: 'Top',
    responsive: true,
  })

  informersRepeater.addControl('l', {
    label: 'Left',
    responsive: true,
  })
  informersRepeater.addControl('b', {
    label: 'Bottom',
    responsive: true,
  })

  element.addControl('informers', {
    label: 'Informers Items',
    type: CONTROLLER_REPEATER,
    responsive: false,
    stateless: true,
    fields: informersRepeater.getControls(),
    locked: true,
  });

  element.endControlSection()
}
