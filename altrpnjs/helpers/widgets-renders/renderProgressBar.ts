import getContent from '../getContent';
import getResponsiveSetting from '../getResponsiveSetting';

export default function renderProgressBar(settings, device, context) {
  let value = getContent(settings, context, 'value', device) || '100';
  let stripes = getResponsiveSetting(settings, 'stripes', device, true);
  let animate = getResponsiveSetting(settings, 'animate', device, true);

  if (isNaN(value)) {
    value = '100';
  }

  return `<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="${value}" class="${
    'bp3-progress-bar' + (animate ? '' : ' bp3-no-animation') + (stripes ? '' : ' bp3-no-stripes')
  }" role="progressbar"><div class="bp3-progress-meter" style="${
    'width: ' + value + '%'
  }"></div></div>`;
}
