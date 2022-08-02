import getResponsiveSetting from '../getResponsiveSetting';
import renderAsset from '../renderAsset';
import getContent from '../getContent';
import objectToStylesString from '../objectToStylesString';

export default function renderInputMultiSelect(settings, device, context) {
  const label_icon = getResponsiveSetting(settings, 'label_icon', device);

  let label: string = '';
  let labelIcon: string = '';

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

  if (label_icon && label_icon.assetType) {
    labelIcon = `<span class="altrp-label-icon">${renderAsset(label_icon)}</span>`;
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

  const placeholder = getResponsiveSetting(settings, 'content_placeholder', device);

  let input: string = `<span class="bp3-popover-wrapper  ">
                       <span aria-haspopup="true" class="bp3-popover-target">
                          <div class="">
                            <div class="bp3-input bp3-tag-input bp3-multi-select">
                              <div class="bp3-tag-input-values">
                                <input class="bp3-input-ghost bp3-multi-select-tag-input-input" placeholder="${
                                  placeholder || ''
                                }">
                              </div>
                            </div>
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
