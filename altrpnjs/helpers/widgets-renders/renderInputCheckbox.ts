import getContent from '../getContent';
import _ from 'lodash';
import getResponsiveSetting from '../getResponsiveSetting';
import objectToStylesString from '../objectToStylesString';
import renderAsset from '../renderAsset';

export default function renderInputCheckbox(settings, device, context) {
  const label_icon = getResponsiveSetting(settings, 'label_icon', device);
  const content_label_position_type = getResponsiveSetting(
    settings,
    'content_label_position_type',
    device
  );
  const content_options = getResponsiveSetting(settings, 'content_options', device);

  const valueMustArray = () => {
    return true;
  };

  const extractPathFromString = (string = '') => {
    let path = '';
    if (_.isString(string)) {
      path = _.get(string.match(/{{([\s\S]+?)(?=}})/g), '0', '').replace('{{', '');
    }
    return path;
  };

  const parseOptionsFromSettings = (string) => {
    if (!string) {
      return [];
    }
    let options = string.split('\n');
    let path = extractPathFromString(string);
    let _optionsFromData = _.get(context, path, device);
    if (_.isArray(_optionsFromData)) {
      return _optionsFromData;
    }
    options = options.map((option) => {
      let value = option.split('|')[0];
      value = value.trim();
      let valuePath = extractPathFromString(value);
      if (valuePath) {
        value = _.get(context, valuePath, device);
      }
      let label = option.split('|')[1] || value || '';
      !_.isString(label) && (label = '');
      label = label.trim();
      let labelPath = extractPathFromString(label);
      if (labelPath) {
        label = _.get(context, labelPath, device);
      }
      return {
        value,
        label,
      };
    });
    return options;
  };

  let options = parseOptionsFromSettings(content_options);

  let value =
    getContent(settings, context, 'content_default_value', device) || (valueMustArray() ? [] : '');
  if (valueMustArray() && !_.isArray(value)) {
    value = [];
  }
  let label: string = '';

  if (value && value.dynamic) {
    value = '';
  }
  let classLabel: string = '';
  let containerClass: string = '';
  let styleLabel = {};
  let labelIcon: string = '';

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
    label = `<div class="${
      'altrp-field-label-container ' + classLabel
    }" style=${objectToStylesString(styleLabel)}>
    <label class="${
      'altrp-field-label' + (settings.content_required ? ' altrp-field-label--required' : '')
    }">${settings.content_label}</label>
    ${labelIcon}
    </div>`;
  }

  const altrpCompare = (leftValue = '', rightValue = '', operator = 'empty') => {
    switch (operator) {
      case 'empty': {
        return _.isEmpty(leftValue);
      }
      case 'not_empty': {
        return !_.isEmpty(leftValue);
      }
      case 'null': {
        return !leftValue;
      }
      case 'not_null': {
        return !!leftValue;
      }
      case '==': {
        if (!leftValue && !rightValue) {
          return true;
        }
        if (!(_.isObject(leftValue) || _.isObject(rightValue))) {
          return leftValue == rightValue;
        } else {
          return _.isEqual(leftValue, rightValue);
        }
      }
      case '===': {
        return _.isEqual(leftValue, rightValue);
      }
      case '<>': {
        return !_.isEqual(leftValue, rightValue);
      }
      case '>': {
        return Number(leftValue) > Number(rightValue);
      }
      case '>=': {
        return Number(leftValue) >= Number(rightValue);
      }
      case '<': {
        return Number(leftValue) < Number(rightValue);
      }
      case '<=': {
        return Number(leftValue) <= Number(rightValue);
      }
      case 'in': {
        if (_.isString(rightValue)) {
          return rightValue.indexOf(leftValue) !== -1;
        }
        if (!_.isArray(rightValue)) {
          return false;
        }
        let result = false;
        // @ts-ignore
        rightValue.forEach((item) => {
          if (!result) {
            result = altrpCompare(leftValue, item, '==');
          }
        });
        return result;
      }
      case 'not_in': {
        return !altrpCompare(leftValue, rightValue, 'in');
      }
      case 'contain': {
        if (_.isString(leftValue)) {
          return leftValue.indexOf(rightValue) !== -1;
        }
        if (!_.isArray(leftValue)) {
          return false;
        }
        let result = false;
        // @ts-ignore
        leftValue.forEach((item) => {
          if (!result) {
            result = altrpCompare(rightValue, item, 'contain');
          }
        });
        return result;
      }
      case 'not_contain': {
        return !altrpCompare(leftValue, rightValue, 'contain');
      }
    }
  };

  const renderRepeatedInput = () => {
    const fieldName = Math.random().toString(36).substr(2, 9);
    const formID = Math.random().toString(36).substr(2, 9);

    return `<div class="altrp-field-subgroup">
      ${options
        .map((option, idx) => {
          let checked = false;

          value = _.isArray(value) ? value : value ? [value] : [];
          checked = altrpCompare(option.value, value, 'in');

          return `<div class="${'altrp-field-option' + (checked ? ' active' : '')}" key="${
            fieldName + '-' + idx
          }"><span class="altrp-field-option-span"><label class="${
            'bp3-control bp3-checkbox bp3-inline altrp-field-checkbox' + (checked ? ' active' : '')
          }"><input checked="${checked}" name="${formID + '-' + fieldName}" id="${
            formID + '-' + fieldName + '-' + idx
          }" type="checkbox"><span class="bp3-control-indicator"></span></label></span><label class="altrp-field-option__label">${
            option.label
          }</label></div>`;
        })
        .join(' ')}
      </div>`;
  };

  let input = renderRepeatedInput();

  return `<div class="altrp-field-container " style="${containerClass}">
  ${content_label_position_type === 'top' ? label : ''}
  ${content_label_position_type === 'left' ? label : ''}
  ${content_label_position_type === 'right' ? label : ''}
  ${content_label_position_type === 'absolute' ? label : ''}
  ${input}
  ${content_label_position_type === 'bottom' ? label : ''}
  </div>`;
}
