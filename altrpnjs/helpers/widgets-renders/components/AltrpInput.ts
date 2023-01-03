import renderAsset from "../../renderAsset";
import getResponsiveSetting from "../../getResponsiveSetting";

interface InputProps {
  type: string,
  placeholder: string
  getName: () => string,
  readOnly: boolean,
  autoComplete?: string,
  widgetView: string,
  device: string,
  settings: { },
}

export default function AltrpInput<T extends InputProps>(
  {
    type,
    placeholder,
    getName,
    readOnly,
    autoComplete,
    settings,
    device,
    widgetView}: T
) {
  let input: string = ""
  let left_icon = getResponsiveSetting(settings, 'left_icon', device) || ''

  if(left_icon){
    left_icon = `<span class="bp3-icon bp3-icon_text-widget bp3-icon_left" tabIndex="0">
      ${renderAsset(left_icon)}
    </span>`
  }

  let right_icon = getResponsiveSetting(settings, 'right_icon', device) || ''

  if(right_icon){
      right_icon = `<span class="bp3-input-action"><span class="bp3-icon bp3-icon_text-widget bp3-icon_right" tabIndex="0">
      ${renderAsset(right_icon)}
    </span></span>`
  }

  if(widgetView === "popoverOn") {
    input = `<div class="bp3-popover2-target"><div class="bp3-input-group bp3-fill">${left_icon}<input type="${type}" ${readOnly ? "readonly" : ""} name="${getName()}" id="${getName()}" placeholder="${placeholder}" class="bp3-input">${right_icon}</div></div>`
  } else if (widgetView === "popoverOff") {
    input = `<div class="bp3-input-group">${left_icon}<input type="${type}" ${readOnly ? "readonly" : ""} name="${getName()}" id="${getName()}" autocomplete="${autoComplete}" placeholder="${placeholder}" class="bp3-input">${right_icon}</div>`
  }

  return input
}
