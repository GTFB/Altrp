import objectToStylesString from '../objectToStylesString';
import getResponsiveSetting from '../getResponsiveSetting';
import renderAsset from '../renderAsset';
import moment from 'moment';

const AltrpFieldContainer = (settings, child) => {
  const { content_label_position_type, className } = settings;

  return `
    <div
      style="
        ${content_label_position_type == 'left' ? 'display: flex;' : ''}
        ${
          content_label_position_type == 'right'
            ? 'display:flex;flex-direction:row-reverse;justify-content:flex-end;'
            : ''
        }
      "
      class="${className}"
    >
      ${child}
    </div>
  `;
};

export default function renderInputDate(settings, device) {
  let label = '';
  let classLabel = '';
  let styleLabel = {};

  const label_icon = getResponsiveSetting(settings, 'label_icon', device);

  const content_label_position_type = getResponsiveSetting(
    settings,
    'content_label_position_type',
    device
  );

  const label_style_spacing = getResponsiveSetting(settings, 'label_style_spacing', device);

  const labelSpacing = label_style_spacing
    ? label_style_spacing.size + label_style_spacing.unit
    : '2px';

  switch (content_label_position_type) {
    case 'top':
      styleLabel = {
        marginBottom: labelSpacing,
      };
      classLabel = '';
      break;
    case 'bottom':
      styleLabel = {
        marginTop: labelSpacing,
      };
      classLabel = '';
      break;
    case 'left':
      styleLabel = {
        marginRight: labelSpacing,
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

  const content_label = getResponsiveSetting(settings, 'content_label', device);
  const content_required = getResponsiveSetting(settings, 'content_required', device);

  if (content_label) {
    label = `
        <div class="altrp-field-label-container ${classLabel}" style="${objectToStylesString(
      styleLabel
    )}">
          <label class="altrp-field-label ${content_required}">
            ${content_label}
          </label>
          ${
            label_icon &&
            label_icon.type &&
            `
            <span class="altrp-label-icon">
              ${renderAsset(label_icon)}
            </span>
          `
          }
        </div>
      `;
  } else {
    label = '';
  }

  const defaultValue = getResponsiveSetting(settings, 'content_default_value', device) || '';
  const locale = getResponsiveSetting(settings, 'content_locale', device, 'en');

  let value: any = moment().locale(locale).toDate();
  const format = getResponsiveSetting(settings, 'content_format', device) || 'YYYY-MM-DD';

  if (defaultValue) {
    value = moment(defaultValue, format);
  } else {
    value = moment();
  }

  value = value.isValid() ? value.format(format) : '';

  const input = `
      <div class="altrp-input-wrapper">
        <span class="bp3-popover-wrapper altrp-date-picker">
          <span aria-haspopup="true" class="bp3-popover-target">
            <div class="bp3-input-group">
              <input type="text" autocomplete="off" class="bp3-input" value="${value}">
            </div>
          </span>
        </span>
      </div>
    `;

  return AltrpFieldContainer(
    {
      className: 'altrp-field-container altrp-date-field-container ',
      content_label_position_type,
    },
    `
      ${content_label_position_type !== 'bottom' ? label : ''}
      ${input}
      ${content_label_position_type === 'bottom' ? label : ''}
    `
  );
}
