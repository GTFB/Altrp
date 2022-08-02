import getResponsiveSetting from '../getResponsiveSetting';
import renderAsset from './../renderAsset';
import AltrpInput from './components/AltrpInput';
import objectToStylesString from '../objectToStylesString';

export default function renderInputTextAutocomplete(settings, device) {
  const content_readonly = getResponsiveSetting(settings, 'content_readonly', device);
  const label_icon = getResponsiveSetting(settings, 'label_icon', device);
  const form_id = getResponsiveSetting(settings, 'form_id', device);
  const field_id = getResponsiveSetting(settings, 'field_id', device);
  const content_label_position_type =
    getResponsiveSetting(settings, 'content_label_position_type', device) || 'top';
  const label_icon_position = getResponsiveSetting(settings, 'label_icon_position', device);
  const label_style_spacing = getResponsiveSetting(settings, 'label_style_spacing', device);

  let classLabel: string = '';
  let containerClass: string = '';
  let showPassword: boolean = false;
  let styleLabel = {};
  let label: string = '';
  let labelIcon: string = '';

  const getName = (): string => {
    return `${form_id}[${field_id}]`;
  };

  switch (content_label_position_type) {
    case 'top':
      styleLabel = {
        marginBottom: label_style_spacing
          ? label_style_spacing?.size + label_style_spacing?.unit
          : 2 + 'px',
      };
      classLabel = '';
      break;
    case 'bottom':
      styleLabel = {
        marginTop: label_style_spacing
          ? label_style_spacing?.size + label_style_spacing?.unit
          : 2 + 'px',
      };
      classLabel = '';
      break;
    case 'left':
      styleLabel = {
        marginRight: label_style_spacing
          ? label_style_spacing?.size + label_style_spacing?.unit
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

  if (label_icon && label_icon.type) {
    labelIcon = `<span class="altrp-label-icon">${renderAsset(label_icon)}</span>`;
  }

  if (settings.content_label || label_icon) {
    label = `<div class='${
      'altrp-field-label-container ' + classLabel
    }' style='${objectToStylesString(styleLabel)}'>
    <label for='${getName()}' style='${
      'display: flex, flex-direction: ' + label_icon_position
    }' class='${
      'altrp-field-label altrp-field-label_text-widget' +
      (settings.content_required ? ' altrp-field-label--required' : '')
    }'>${settings.content_label}</label>
    ${labelIcon}
    </div>`;
  }

  let altrpInput = AltrpInput({
    type:
      settings.content_type === 'password'
        ? showPassword
          ? 'text'
          : 'password'
        : settings.content_type,
    placeholder: settings.content_placeholder,
    getName: () => getName(),
    readOnly: content_readonly,
    widgetView: 'popoverOn',
  });

  let input = `<div class="altrp-input-wrapper altrp-input-wrapper_autocomplete">${altrpInput}</div>`;

  return `<div class="altrp-field-container " style="${containerClass}">
  ${content_label_position_type === 'top' ? label : ''}
  ${content_label_position_type === 'left' ? label : ''}
  ${content_label_position_type === 'right' ? label : ''}
  ${content_label_position_type === 'absolute' ? label : ''}
  ${input}
  ${content_label_position_type === 'bottom' ? label : ''}
  </div>`;
}
