

export default function renderText(settings) {
  let text = settings.text
  text = text.replace(/{{/g, '{{{')
  text = text.replace(/}}/g, '}}}')
  return `<div class="altrp-text ck ck-content${(settings.position_css_classes || "")
  + (settings.text_position_css_classes || "")
  }" id="${(settings.position_css_id || "")
  + (settings.text_position_css_id  || "")
  }">${text || ''}</div>`
}
