import getResponsiveSetting from '../getResponsiveSetting';
import renderAsset from '../renderAsset';
import objectToStylesString from '../objectToStylesString';

export default function renderDivider(settings, device) {
  let style = {};
  let styleSeparator = {};

  let dividerAlignment = getResponsiveSetting(settings, 'divider_alignment', device, 'center');
  switch (dividerAlignment) {
    case 'flex-start':
      styleSeparator = {
        marginRight: 'auto',
      };
      break;
    case 'flex-end':
      styleSeparator = {
        marginLeft: 'auto',
      };
      break;
    case 'center':
      styleSeparator = {
        marginRight: 'auto',
        marginLeft: 'auto',
      };
      break;
  }
  let divider = `<div class="altrp-divider" style="${objectToStylesString(style)}">
  <span class="altrp-divider-separator" style="${objectToStylesString(styleSeparator)}"></span>
  </div>`;

  const dividerImage = getResponsiveSetting(settings, 'divider_image', device);
  const dividerText = getResponsiveSetting(settings, 'divider_text', device);

  if (dividerText || dividerImage?.id) {
    const dividerLabel = `${
      dividerImage?.id ? `<div class="altrp-divider-image">${renderAsset(dividerImage)}</div>` : ''
    }
    ${dividerText ? `<div class='altrp-divider-label'>${dividerText}</div>` : ''}`;
    let labelPositionHtml = '';
    const labelPosition = settings.label_position || 'center';

    if (labelPosition !== 'left') {
      labelPositionHtml = `<span class="altrp-divider-separator divider-separator-left"></span>`;
    } else if (labelPosition !== 'right') {
      labelPositionHtml = `<span class="altrp-divider-separator divider-separator-right"></span>`;
    }

    return `<div class="altrp-divider" style="${objectToStylesString(style)}">
    ${labelPositionHtml}
    <div class="altrp-divider-container-label">
      ${dividerLabel}
      </div>
    ${labelPositionHtml}
    </div>`;
  }

  return divider;
}
