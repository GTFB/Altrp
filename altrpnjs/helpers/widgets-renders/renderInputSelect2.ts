import * as _ from 'lodash'
import getResponsiveSetting from '../getResponsiveSetting'
import objectToStylesString from "../objectToStylesString";
import renderAsset from "../renderAsset";
import moment from 'moment'

export default function renderInputSelect2(settings, device) {
  let label: string = "";
  // const form_id = getResponsiveSetting(settings, 'form_id', device) || []
  // const field_id = getResponsiveSetting(settings, 'field_id', device) || []

  const {
    // content_readonly,
    label_icon
  } = settings;

  let value = getResponsiveSetting(settings, "content_default_value", device) || [];

  // const getName = (): string => {
  //   return `${form_id}[${field_id}]`;
  // }

  let classLabel = "";
  let styleLabel = {};
  const content_label_position_type = getResponsiveSetting(settings, "content_label_position_type", device) || 'top';
  switch (content_label_position_type) {
    case "top":
      styleLabel = {
        marginBottom: settings.label_style_spacing
          ? settings.label_style_spacing.size +
          settings.label_style_spacing.unit
          : 2 + "px"
      }
      classLabel = "";
      break;
    case "bottom":
      styleLabel = {
        marginTop: settings.label_style_spacing
          ? settings.label_style_spacing.size +
          settings.label_style_spacing.unit
          : 2 + "px"
      }
      classLabel = "";
      break;
    case "left":
      styleLabel = {
        marginRight: settings.label_style_spacing
          ? settings.label_style_spacing.size +
          settings.label_style_spacing.unit
          : 2 + "px"
      };
      classLabel = "altrp-field-label-container-left";
      break;
    case "absolute":
      styleLabel = {
        position: "absolute",
        zIndex: 2
      };
      classLabel = "";
      break;
  }

  if (settings.content_label) {
    label = `<div class="${"altrp-field-label-container " + classLabel}" style="${objectToStylesString(styleLabel)}">
   <label class="${"altrp-field-label" + (settings.content_required ? " altrp-field-label--required" : "")}">${settings.content_label}</label>
    ${label_icon && label_icon.assetType && `
      <span class="altrp-label-icon">
        ${renderAsset(label_icon)}
        </span>
    `}
    </div>`
  } else {
    label = "";
  }
// @ts-ignore
  let autocomplete: string = "off";
  if (settings.content_autocomplete) {
    autocomplete = "on";
  } else {
    autocomplete = "off";
  }

  let altrpInput: string = ""

  let input: string = "";

  const isClearable = settings.content_clearable;
  const isDate = settings.content_type === "date";
  const timestamp = getResponsiveSetting(settings, "content_timestamp", device);
  if (isDate && timestamp) {
    const isValid = moment.unix(value).isValid();
    if (isValid) {
      try {
        value = moment.unix(value / 1000).format("YYYY-MM-DD");
      } catch (error) {
            console.error(error);
      }
    }
  }
  input = `
       <div class="altrp-input-wrapper">
        ${altrpInput}
      ${isClearable && (
    `<button class="input-clear-btn">✖</button>`
  )}
      </div>
      `

  return (
    `<div class="altrp-field-container ">
  ${content_label_position_type === "top" ? label : ""}
  ${content_label_position_type === "left" ? label : ""}
  ${content_label_position_type === "right" ? label : ""}
  ${content_label_position_type === "absolute" ? label : ""}
  ${input}
  ${content_label_position_type === "bottom" ? label : ""}
  </div>`
  );
}

//@ts-ignore
const renderSelect2 = (settings, device) => {
  // const {
  //   content_options_nullable,
  //   nulled_option_title,
  //   content_placeholder
  // } = settings;

  let options = [];
  let value = getResponsiveSetting(settings, "content_default_value", device) || []


  if (!getResponsiveSetting(settings, "select2_multiple", device, false)) {
    options.forEach(option => {
      if (!option) {
        return;
      }
      // @ts-ignore
      if (option.value === value) {
        // @ts-ignore
        value = {...option};
      }
      // @ts-ignore
      if (_.isArray(option.options)) {
        // @ts-ignore
        option.options.forEach(option => {
          if (option.value == value) {
            value = {...option};
          }
        });
      }
    });
  } else {

    value = value ? (_.isArray(value) ? value : [value]) : [];
    value = value.map(v => {
      let _v = v;
      options.forEach(option => {
        // @ts-ignore
        if (option.value && option.value.toString() === _v.toString()) {
          // @ts-ignore
          _v = {...option};
        }
        // @ts-ignore
        if (_.isArray(option.options)) {
          // @ts-ignore
          option.options.forEach(option => {
            if (option.value && option.value.toString() === _v.toString()) {
              _v = {...option};
            }
          });
        }
      });
      return _v;
    });

    value.forEach(valueItem => {
      if (!_.isObject(valueItem)) {
        // @ts-ignore
        options.push({
          // value: valueItem,
          // label: valueItem
        });
      }
    });
  }

  // if (
  //   content_options_nullable &&
  //   (this.props.element.getName() !== "input-select2" ||
  //     this.props.element.getSettings("select2_multiple") !== true)
  // ) {
  //   options = _.union(
  //     [{ label: nulled_option_title, value: "<null>" }],
  //     options
  //   );
  // }

  // const select2Props = {
  //   className: "altrp-field-select2",
  //   onFocus: this.onFocus,
  //   element: this.props.element,
  //   classNamePrefix: this.props.element.getId() + " altrp-field-select2",
  //   options,
  //   name: this.props.element.getFieldId(),
  //   ref: this.altrpSelectRef,
  //   settings: this.props.element.getSettings(),
  //   onChange: this.onChange,
  //   onBlur: this.onBlur,
  //   value: value || _.find(options, o => o && o.value == this.state.value),
  //   isOptionSelected: option => {
  //     if (_.isNumber(this.state.value) || _.isString(this.state.value)) {
  //       return this.state.value == option.value;
  //     }
  //     return this.state.value && this.state.value.includes(option.value);
  //   },
  //   placeholder: content_placeholder,
  //   isMulti: this.props.element.getSettings("select2_multiple", false),
  // };
  return (
    ` <div class="altrp-input-wrapper">

  </div>`
  );
}
