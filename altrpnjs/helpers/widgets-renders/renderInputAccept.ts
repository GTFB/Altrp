import getResponsiveSetting from '../getResponsiveSetting';
import objectToStylesString from "../objectToStylesString";
import renderAsset from "../renderAsset";

const AltrpFieldContainer = (settings, child) => {
  const { content_label_position_type, className } = settings

  return `
    <div
      style="${content_label_position_type == 'left' ? 'display: flex;' : ''} ${content_label_position_type == 'right' ? 'display:flex;flex-direction:row-reverse;justify-content:flex-end;' : ''}"
      class="${className}"
    >
      ${child}
    </div>
  `
}

export default function renderInputAccept(settings, device) {
    let label = ``;
    // const isMultiple = getResponsiveSetting(settings, 'select2_multiple', device)
    const label_icon = getResponsiveSetting(settings, 'label_icon', device)

    let value = getResponsiveSetting(settings, "content_default_value", device) ||  "";

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

    const spacing = label_style_spacing ? label_style_spacing.size + label_style_spacing.unit : '2px'

    switch (content_label_position_type) {
      case "top":
        styleLabel = {
          'margin-bottom': spacing
        };
        break;
      case "bottom":
        styleLabel = {
          'margin-top': spacing
        };
        break;
      case "left":
        styleLabel = {
          'margin-right': spacing
        };
        classLabel = "altrp-field-label-container-left";
        break;
      case "right":
        styleLabel = {
          'margin-left': spacing
        };
        classLabel = "altrp-field-label-container-left";
        break;
      case "absolute":
        styleLabel = {
          position: "absolute",
          'z-index': 2
        };
        break;
    }

    const content_required = getResponsiveSetting(settings, "content_required", device);
    const content_label = getResponsiveSetting(settings, "content_label", device);
    const labelIcon = label_icon && label_icon.assetType && `
      <span class="altrp-label-icon">
        ${renderAsset(label_icon)}
      </span>
    `

    if (content_label) {
      label = `
        <div class="altrp-field-label-container ${classLabel}" style="${objectToStylesString(styleLabel)}">
          <label class="altrp-field-label ${content_required ? "altrp-field-label--required" : ""}">
            ${content_label}
          </label>
          ${labelIcon ? labelIcon : ''}
        </div>
      `;
    } else {
      label = ``;
    }


    let trueValue = getResponsiveSetting(settings, "accept_checked", device) || true;
    let falseValue = getResponsiveSetting(settings, "accept_unchecked", device) || false;

    if (value === trueValue) {
      value = true;
    } else if (value === falseValue) {
      value = false;
    }
    const input =  `
      <div class="altrp-field-option ${value ? "active" : ""}">

<span class="altrp-field-option-span">
<label class="bp3-control bp3-checkbox bp3-inline altrp-field-checkbox">
<input  type="checkbox"><span class="bp3-control-indicator"></span></label>
</span>
      </div>
    `;

    return AltrpFieldContainer(
      {
        content_label_position_type,
        className: "altrp-field-container "
      },
        `
        ${content_label_position_type !== "bottom" ? label : ""}
        ${input}
        ${content_label_position_type === "bottom" ? label : ""}
    `);
}
