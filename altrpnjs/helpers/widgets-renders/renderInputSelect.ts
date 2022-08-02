import getContent from '../getContent';
import getResponsiveSetting from '../getResponsiveSetting';
import objectToStylesString from '../objectToStylesString';
import renderAsset from '../renderAsset';

export default function renderInputSelect(settings, device, context) {
  const label_icon = getResponsiveSetting(settings, 'label_icon', device);
  const content_options_nullable = getResponsiveSetting(
    settings,
    'content_options_nullable',
    device
  );
  const nulled_option_title = getResponsiveSetting(settings, 'nulled_option_title', device);
  const left_icon = getResponsiveSetting(settings, 'left_icon', device);
  const right_icon = getResponsiveSetting(settings, 'right_icon', device);

  let label: string = '';
  let labelIcon: string = '';
  let rightIcon: string = '';
  let leftIcon: string = '';
  let selectText: string = '';

  let classLabel: string = '';
  let containerClass: string = '';
  let styleLabel = {};
  const content_label_position_type =
    getResponsiveSetting(settings, 'content_label_position_type', device) || 'top';
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

  if (content_options_nullable && nulled_option_title) {
    selectText = `<span class="bp3-button-text">${nulled_option_title}</span>`;
  }

  if (label_icon && label_icon.assetType) {
    labelIcon = `<span class="altrp-label-icon">${renderAsset(label_icon)}</span>`;
  }

  if (right_icon && right_icon.assetType) {
    rightIcon = `<span class="bp3-icon bp3-icon_text-widget bp3-icon_right" >${renderAsset(
      right_icon
    )}</span>`;
  }

  if (left_icon && left_icon.assetType) {
    leftIcon = `<span class="bp3-icon bp3-icon_text-widget bp3-icon_left" >${renderAsset(
      left_icon
    )}</span>`;
  }

  const content_label = getContent(settings, context, 'content_label', device);
  if (content_label) {
    label = `<div class="${
      'altrp-field-label-container ' + classLabel
    }" style="${objectToStylesString(styleLabel)}">
    <label class="${
      'altrp-field-label' + (settings.content_required ? ' altrp-field-label--required' : '')
    }">${content_label}</label>
    ${labelIcon}
    </div>`;
  }

  const content_readonly = getResponsiveSetting(settings, 'content_readonly', device);

  let input: string = `<span class="bp3-popover-wrapper  ">
             <span aria-haspopup="true" class="bp3-popover-target altrp-select-popover">
                <div class="">
                  <button type="button" ${content_readonly ? 'disabled' : ''} class="${
    'bp3-button' + (content_readonly ? ' bp3-disabled' : '')
  }">
                     ${leftIcon}
                     ${selectText}
                     ${
                       rightIcon
                         ? rightIcon
                         : `<span class="bp3-icon bp3-icon-caret-down" icon="caret-down" aria-hidden="true">
                        <svg data-icon="caret-down" width="16" height="16" viewBox="0 0 16 16"><path d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z" fill-rule="evenodd"></path></svg>
                     </span>`
                     }
                  </button>
                </div>
             </span>
             </span>`;

  return `<div class="altrp-field-container " style="${containerClass}">
  ${content_label_position_type === 'top' ? label : ''}
  ${content_label_position_type === 'left' ? label : ''}
  ${content_label_position_type === 'right' ? label : ''}
  ${content_label_position_type === 'absolute' ? label : ''}
  ${input}
  ${content_label_position_type === 'bottom' ? label : ''}
  </div>`;
}
