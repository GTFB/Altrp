import getResponsiveSetting from '../getResponsiveSetting';
import renderAsset from './../renderAsset';
import objectToStylesString from '../objectToStylesString';

export default function renderInputTextarea(settings, device) {
  const content_readonly = getResponsiveSetting(settings, 'content_readonly', device);
  const label_icon = getResponsiveSetting(settings, 'label_icon', device);
  const content_label_position_type = getResponsiveSetting(
    settings,
    'content_label_position_type',
    device
  );

  let label: string = '';
  let labelIcon: string = '';
  let containerClass: string = '';
  let classLabel: string = '';
  let autocomplete: string = 'off';
  let styleLabel = {};

  switch (content_label_position_type) {
    case 'top':
      styleLabel = {
        marginBottom: settings.label_style_spacing
          ? settings.label_style_spacing.size + settings.label_style_spacing.unit
          : 2 + 'px',
      };
      classLabel = '';
      break;
    case 'bottom':
      styleLabel = {
        marginTop: settings.label_style_spacing
          ? settings.label_style_spacing.size + settings.label_style_spacing.unit
          : 2 + 'px',
      };
      classLabel = '';
      break;
    case 'left':
      styleLabel = {
        marginRight: settings.label_style_spacing
          ? settings.label_style_spacing.size + settings.label_style_spacing.unit
          : 2 + 'px',
      };
      classLabel = 'altrp-field-label-container-left';
      break;
    case 'absolute':
      styleLabel = {
        position: 'absolute',
        zIndex: 2,
      };
      classLabel = '';
      break;
  }

  switch (content_label_position_type) {
    case 'left':
      containerClass = 'display: flex';
      break;
    case 'right':
      containerClass = 'display: flex; flex-direction: row-reverse; justify-content: flex-end;';
      break;
  }

  if (label_icon && label_icon.assetType) {
    labelIcon = `<span class="altrp-label-icon">${renderAsset(label_icon)}</span>`;
  }

  if (settings.content_label) {
    label = `<div class='${
      'altrp-field-label-container ' + classLabel
    }' style='${objectToStylesString(styleLabel)}'>
    <label class='${
      'altrp-field-label' + (settings.content_required ? ' altrp-field-label--required' : '')
    }'>${settings.content_label}</label>
    ${labelIcon}
    </div>`;
  }

  if (settings.content_autocomplete) {
    autocomplete = 'on';
  }

  let altrpTextarea = `<textarea id="${settings.position_css_id || ''}" ${
    content_readonly ? 'readonly' : ''
  } placeholder="${settings.content_placeholder || ''}" class="${
    'bp3-input altrp-field ' + (settings.position_css_classes || '')
  }" autocomplete="${autocomplete}"></textarea>`;

  return `<div class="altrp-field-container " style="${containerClass}">
  ${content_label_position_type === 'top' ? label : ''}
  ${content_label_position_type === 'left' ? label : ''}
  ${content_label_position_type === 'right' ? label : ''}
  ${content_label_position_type === 'absolute' ? label : ''}
  ${altrpTextarea}
  ${content_label_position_type === 'bottom' ? label : ''}
  </div>`;
}
