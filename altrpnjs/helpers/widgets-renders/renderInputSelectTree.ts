import objectToStylesString from '../objectToStylesString';
import getResponsiveSetting from '../getResponsiveSetting';
import renderAsset from "../renderAsset";

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

export default function renderInputSelectTree(settings, device) {
  const renderLeftIcon = () => {
    const left_icon = getResponsiveSetting(settings, 'left_icon', device)

    if(!left_icon || !Object.keys(left_icon).length){
      return ''
    }

    return `
      <span className="bp3-icon bp3-icon_text-widget bp3-icon_left" >
        ${renderAsset(left_icon)}
      </span>
    `
  }

  const renderRightIcon = () => {
    const right_icon = getResponsiveSetting(settings, 'right_icon', device)

    if(!right_icon || !Object.keys(right_icon).length){
      return ''
    }

    return `
      <span className="bp3-icon bp3-icon_text-widget bp3-icon_right" >
        ${renderAsset(right_icon)}
      </span>
    `
  }

  let label = '';

  let buttonLabel = '';

  const content_options_nullable = getResponsiveSetting(settings, 'content_options_nullable', device)

  if (content_options_nullable) {
    buttonLabel = getResponsiveSetting(settings, 'nulled_option_title', device) || ''
  }

  const label_icon = getResponsiveSetting(settings, 'label_icon', device)

  let classLabel = "";
  let styleLabel = {};

  const content_label_position_type = getResponsiveSetting(settings, "content_label_position_type", device) || 'top';

  const label_style_spacing = getResponsiveSetting(settings, "label_style_spacing", device);

  const labelSpacing = label_style_spacing ? label_style_spacing.size + label_style_spacing.unit : '2px'

  switch (content_label_position_type) {
    case "top":
      styleLabel = {
        marginBottom: labelSpacing
      };
      classLabel = '';
      break;
    case "bottom":
      styleLabel = {
        marginTop: labelSpacing
      };
      classLabel = "";
      break;
    case "left":
      styleLabel = {
        marginRight: labelSpacing
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

  const content_label = getResponsiveSetting(settings, 'content_label', device)
  const content_required = getResponsiveSetting(settings, 'content_required', device)

  if (content_label) {
    label = `
        <div class="altrp-field-label-container ${classLabel}" style="${objectToStylesString(styleLabel)}">
          <label class="altrp-field-label ${content_required ? "altrp-field-label--required" : ""}">
            ${content_label}
          </label>
          ${label_icon && label_icon.assetType && `
            <span className="altrp-label-icon">
              ${renderAsset(label_icon)}
            </span>
          `}
        </div>
      `;
  } else {
    label = '';
  }

  const content_readonly = getResponsiveSetting(settings, 'content_readonly', device);

  const leftIcon = renderLeftIcon()
  const rightIcon = renderRightIcon()

  const input = `
    <span class="bp3-popover-wrapper">
      <span aria-haspopup="true" class="bp3-popover-target altrp-select-popover">
        <div class="">
          <button type="button" disabled="${content_readonly}" class="${"bp3-button" + (content_readonly ? " bp3-disabled" : "")} bp3-fill bp3-popover2-target altrp-select-tree-btn">
              ${leftIcon}
              <span class="bp3-button-text">${buttonLabel ? buttonLabel : ''}</span>
              ${rightIcon ? rightIcon : `<span class="bp3-icon bp3-icon-caret-down" aria-hidden="true">
                <svg data-icon="caret-down" width="16" height="16" viewBox="0 0 16 16"><path d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z" fill-rule="evenodd"></path></svg>
              </span>`}
          </button>
        </div>
      </span>
    </span>
  `

  return AltrpFieldContainer(
    {
      content_label_position_type,
      className: "altrp-field-container",
    },
    `
      ${content_label_position_type !== "bottom" ? label : ''}
      ${input}
      ${content_label_position_type === "bottom" ? label : ''}
    `
  )
}
