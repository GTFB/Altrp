export default function renderText(settings) {
  return `<div class="${'altrp-text ' + (settings.position_css_classes || '')}" id="${
    settings.position_css_id
  }"><div class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred" lang="en" dir="ltr" role="textbox" aria-label="Rich Text Editor, main" contenteditable="true"><p>Type text here</p></div></div>`;
}
