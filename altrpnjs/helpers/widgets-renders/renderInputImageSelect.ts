import getResponsiveSetting from "../getResponsiveSetting";
import objectToStylesString from "../objectToStylesString";
import renderAsset from "../renderAsset";

const AltrpImageSelect = ({ options, isMultiple, value }) => {
  return `
    <div class="altrp-image-select">
      ${
        options?.map(option => `
        <div class="altrp-field altrp-field-container ${isMultiple && value.includes(option.value) || value === option.value ? "active" : ''}">
            ${option.image && `<img src="${option.image?.url}" width="100%" />`}
            <div class="altrp-image-select__label">${option.label}</div>
          </div>
        `)
      }
    </div>
  `
}


const AltrpFieldContainer = (settings, child) => {
  const {content_label_position_type, className} = settings

  return `
    <div
      style="
        ${content_label_position_type == 'left' ? 'display: flex;' : ''}
        ${content_label_position_type == 'right' ? 'display:flex;flex-direction:row-reverse;justify-content:flex-end;' : ''}
      "
      class="${className}"
    >
      ${child}
    </div>
  `
}

// @ts-ignore
export default function renderInputImageSelect(settings, device,) {
  let label = '';

  const image_select_options = getResponsiveSetting(settings, "image_select_options", device);
  const isMultiple = getResponsiveSetting(settings, "select2_multiple", device);
  const label_icon = getResponsiveSetting(settings, "label_icon", device);

  let value = getResponsiveSetting(settings, "content_default_value", device);

  /**
   * Пока динамический контент загружается (Еесли это динамический контент),
   * нужно вывести пустую строку
   */

  if (value && value.dynamic) {
    value = "";
  }

  let classLabel = "";
  let styleLabel = {};

  const content_label_position_type = getResponsiveSetting(settings, "content_label_position_type", device);
  const label_style_spacing = getResponsiveSetting(settings, "label_style_spacing", device);

  switch (content_label_position_type) {
    case "top":
      styleLabel = {
        marginBottom: label_style_spacing
          ? label_style_spacing.size + label_style_spacing.unit
          : '2px'
      };
      break;
    case "bottom":
      styleLabel = {
        marginTop: label_style_spacing
          ? label_style_spacing.size + label_style_spacing.unit
          : '2px'
      };
      break;
    case "left":
      styleLabel = {
        marginRight: label_style_spacing
          ? label_style_spacing.size + label_style_spacing.unit
          : '2px'
      };
      classLabel = "altrp-field-label-container-left";
      break;
    case "absolute":
      styleLabel = {
        position: "absolute",
        zIndex: 2
      };
      break;
  }

  const content_label = getResponsiveSetting(settings, "content_label", device);
  const content_required = getResponsiveSetting(settings, "content_required", device);

  if (content_label) {
    label = `
      <div class="altrp-field-label-container ${classLabel}" style="${objectToStylesString(styleLabel)}">
        <label class="altrp-field-label ${content_required ? 'altrp-field-label--required' : ''}">
          ${content_label}
        </label>
        ${label_icon && label_icon.assetType && `
          <span class="altrp-label-icon">
            ${renderAsset(label_icon)}
          </span>
        `}
      </div>
    `;
  } else {
    label = '';
  }

  let input = AltrpImageSelect({
    options: image_select_options,
    value: value,
    isMultiple: isMultiple
  })

  return AltrpFieldContainer({
      settings: { content_label_position_type },
      className: '' + classLabel,
    },
    `
      ${ content_label_position_type !== "bottom" ? label : "" }
      ${ input }
      ${ content_label_position_type === "bottom" ? label : "" }
    `
  );
}
