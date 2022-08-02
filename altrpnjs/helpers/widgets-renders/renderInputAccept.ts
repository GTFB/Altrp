import getResponsiveSetting from '../getResponsiveSetting';
import objectToStylesString from '../objectToStylesString';
import renderAsset from '../renderAsset';
import getContent from '../getContent';

const AltrpFieldContainer = (settings, child) => {
  const { content_label_position_type, className } = settings;

  return `
    <div
      style="${content_label_position_type == 'left' ? 'display: flex;' : ''} ${
    content_label_position_type == 'right'
      ? 'display:flex;flex-direction:row-reverse;justify-content:flex-end;'
      : ''
  }"
      class="${className}"
    >
      ${child}
    </div>
  `;
};

export default function renderInputAccept(settings, device, context) {
  let label = ``;
  // const isMultiple = getResponsiveSetting(settings, 'select2_multiple', device)
  const label_icon = getResponsiveSetting(settings, 'label_icon', device);

  let value = getContent(settings, context, 'content_default_value', device) || '';

  /**
   * Пока динамический контент загружается (Еесли это динамический контент),
   * нужно вывести пустую строку
   */
  if (value && value.dynamic) {
    value = '';
  }

  let classLabel = '';
  let styleLabel = {};

  const content_label_position_type = getResponsiveSetting(
    settings,
    'content_label_position_type',
    device
  );
  const label_style_spacing = getResponsiveSetting(settings, 'label_style_spacing', device);

  const spacing = label_style_spacing ? label_style_spacing.size + label_style_spacing.unit : '2px';

  switch (content_label_position_type) {
    case 'top':
      styleLabel = {
        marginBottom: spacing,
      };
      break;
    case 'bottom':
      styleLabel = {
        marginTop: spacing,
      };
      break;
    case 'left':
      styleLabel = {
        marginRight: spacing,
      };
      classLabel = 'altrp-field-label-container-left';
      break;
    case 'absolute':
      styleLabel = {
        position: 'absolute',
        zIndex: 2,
      };
      break;
  }

  const content_required = getResponsiveSetting(settings, 'content_required', device);
  const content_label = getResponsiveSetting(settings, 'content_label', device);
  const labelIcon =
    label_icon &&
    label_icon.assetType &&
    `
      <span className="altrp-label-icon">
        ${renderAsset(label_icon)}
      </span>
    `;

  if (content_label) {
    label = `
        <div class="altrp-field-label-container ${classLabel}" style="${objectToStylesString(
      styleLabel
    )}">
          <label class="altrp-field-label ${content_required ? 'altrp-field-label--required' : ''}">
            ${content_label}
          </label>
          ${labelIcon ? labelIcon : ''}
        </div>
      `;
  } else {
    label = ``;
  }

  let trueValue = getResponsiveSetting(settings, 'accept_checked', device) || true;
  let falseValue = getResponsiveSetting(settings, 'accept_unchecked', device) || false;

  if (value === trueValue) {
    value = true;
  } else if (value === falseValue) {
    value = false;
  }
  const input = `
      <div class="altrp-field-option ${value ? 'active' : ''}">
        <span class="altrp-field-option-span">
          <input
            type="checkbox"
            class="altrp-field-option__input ${value ? 'active' : ''}"
            ${value ? 'checked' : ''}
          />
        </span>
      </div>
    `;

  return AltrpFieldContainer(
    {
      content_label_position_type,
      className: 'altrp-field-container ',
    },
    `
        ${content_label_position_type !== 'bottom' ? label : ''}
        ${input}
        ${content_label_position_type === 'bottom' ? label : ''}
    `
  );
}
