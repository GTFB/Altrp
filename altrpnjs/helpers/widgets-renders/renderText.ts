

export default function renderText(settings) {
  return `<div class="altrp-text ck ck-content${(settings.position_css_classes || "")
  + (settings.text_position_css_classes || "")
  }" id="${(settings.position_css_id || "")
  + (settings.text_position_css_id  || "")
  }">${settings.text || ''}</div>`
}
