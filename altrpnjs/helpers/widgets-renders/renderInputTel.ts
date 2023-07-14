import getResponsiveSetting from "../getResponsiveSetting";
import renderAsset from "../renderAsset";
import objectToStylesString from "../objectToStylesString";
export default function renderInputTextarea(settings, device) {
  let classLabel: string = "";
  const content_label_position_type = getResponsiveSetting(settings,"content_label_position_type", device) || 'top';
  const label_icon_position = getResponsiveSetting(settings,'label_icon_position', device)
  const label_style_spacing = getResponsiveSetting(settings,'label_style_spacing', device)
  const label_icon = getResponsiveSetting(settings, 'label_icon', device)
  let label: string = "";

  let styleLabel = {};

  let labelIcon: string = "";
  switch (content_label_position_type) {
    case "top":
      styleLabel = {
        marginBottom: label_style_spacing
          ? label_style_spacing?.size +
          label_style_spacing?.unit
          : 2 + "px"
      };
      classLabel = "";
      break;
    case "bottom":
      styleLabel = {
        marginTop: label_style_spacing
          ? label_style_spacing?.size +
          label_style_spacing?.unit
          : 2 + "px"
      };
      classLabel = "";
      break;
    case "left":
      styleLabel = {
        marginRight: label_style_spacing
          ? label_style_spacing?.size +
          label_style_spacing?.unit
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
  let containerClass: string = "";

  switch (content_label_position_type) {
    case "left":
      containerClass = "display: flex";
      break
    case "right":
      containerClass = "display: flex; flex-direction: row-reverse; justify-content: flex-end;";
      break
  }

  if (label_icon && label_icon.type) {
    labelIcon = `<span class="altrp-label-icon">${renderAsset(label_icon)}</span>`
  }


  if (settings.content_label || label_icon ) {
    label = `<div class='${"altrp-field-label-container " + classLabel}' style='${objectToStylesString(styleLabel)}'>
    <label  style='${"display: flex, flex-direction: " + label_icon_position}' class='${"altrp-field-label altrp-field-label_text-widget" + (settings.content_required ? " altrp-field-label--required" : "")}'>${settings.content_label || ''}</label>
    ${labelIcon}
    </div>`
  }


  return `
<div class="altrp-field-container " style="${containerClass}">

  ${content_label_position_type === "top" ? label : ""}
  ${content_label_position_type === "left" ? label : ""}
  ${content_label_position_type === "right" ? label : ""}
  ${content_label_position_type === "absolute" ? label : ""}

  <div class="altrp-input-wrapper ">
    <div class="bp3-input-group  react-tel-input ">
    <div class="special-label">Phone</div>
    <input class="form-control bp3-input " placeholder="123123" >
      <div class="flag-dropdown ">
        <div class="selected-flag" title="" tabindex="0" role="button" aria-haspopup="listbox">
          <div class="flag 0">
            <div class="arrow">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  ${content_label_position_type === "bottom" ? label : ""}
</div>
`
}
