import getResponsiveSetting from "../getResponsiveSetting";
import renderAsset from "../renderAsset";
import objectToStylesString from "../objectToStylesString";


export default function renderInputWysiwyg(settings, device) {
  const label_icon = getResponsiveSetting(settings, 'label_icon', device)
  const content_label_position_type = getResponsiveSetting(settings, "content_label_position_type", device);
  //const content_value = getResponsiveSetting(settings, "content_default_value", device)
  const read_only = getResponsiveSetting(settings, "read_only", device)

  let label: string = "";
  let labelIcon: string = "";
  let containerClass: string = "";
  let classLabel: string = "";
  let styleLabel = {};

  switch (content_label_position_type) {
    case "top":
      styleLabel = {
        marginBottom: settings.label_style_spacing
          ? settings.label_style_spacing.size +
          settings.label_style_spacing.unit
          : 2 + "px"
      };
      classLabel = "";
      break;
    case "bottom":
      styleLabel = {
        marginTop: settings.label_style_spacing
          ? settings.label_style_spacing.size +
          settings.label_style_spacing.unit
          : 2 + "px"
      };
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

  switch (content_label_position_type) {
    case "left":
      containerClass = "display: flex";
      break
    case "right":
      containerClass = "display: flex; flex-direction: row-reverse; justify-content: flex-end;";
      break
  }

  if (label_icon && label_icon.assetType) {
    labelIcon = `<span class="altrp-label-icon">${renderAsset(label_icon)}</span>`
  }

  if (settings.content_label) {
    label = `
      <div class='${"altrp-field-label-container " + classLabel}' style='${objectToStylesString(styleLabel)}'>
        <label class='${"altrp-field-label" + (settings.content_required ? " altrp-field-label--required" : "")}'>${settings.content_label || ''}</label>
        ${labelIcon}
      </div>
    `
  }
  let altrpWysiwyg: string = `
    <div class="${"ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred" + (read_only ? " ck-read-only" : "")}" lang="en" dir="ltr" role="textbox" aria-label="Rich Text Editor, main" contenteditable="true">
      <p><br data-cke-filler="true"/></p>
    </div>
  `

  return `
    <div class="altrp-field-container " style="${containerClass}">${content_label_position_type === "top" ? label : ""}${content_label_position_type === "left" ? label : ""}${content_label_position_type === "right" ? label : ""}${content_label_position_type === "absolute" ? label : ""}
${altrpWysiwyg}
      ${content_label_position_type === "bottom" ? label : ""}
    </div>
  `
}
