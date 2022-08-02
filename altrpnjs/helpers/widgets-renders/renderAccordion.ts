import renderAsset from './../renderAsset';
import getResponsiveSetting from '../getResponsiveSetting';

export default function renderAccordion(settings, device) {
  let items = settings.repeater_meta_data_section || [];
  let activeItem = [];
  let icon = '';
  let active_icon = '';

  if (settings.icon_accordion_content) {
    icon = renderAsset(settings.icon_accordion_content, { class: 'altrp-accordion-item-icon-svg' });
  }

  if (settings.active_icon_accordion_content) {
    active_icon = renderAsset(settings.active_icon_accordion_content, {
      class: 'altrp-accordion-item-active-icon-svg',
    });
  }
  const title_html_tag_accordion_content =
    getResponsiveSetting(settings, 'title_html_tag_accordion_content', device) || 'div';

  return `<div class="altrp-accordion">
  ${items
    .map((item, idx) => {
      return `<div class="${'altrp-accordion-item' + (activeItem[idx] ? ' active' : '')}">
      <div class="altrp-accordion-item-button" data-key="${idx}">
        <div class="altrp-accordion-item-label-container">
          <${title_html_tag_accordion_content} class="altrp-accordion-item-label">
             ${item.title_repeater}
          </${title_html_tag_accordion_content}>
        </div>
        <div class="altrp-accordion-item-icon">${activeItem[idx] ? active_icon : icon}</div>
      </div>
      <div style="max-height: 0;" class="altrp-accordion-item-content" data-item="${idx}">
        <div class="altrp-accordion-item-content-text">${item.wysiwyg_repeater}</div>
      </div>
    </div>`;
    })
    .join(' ')}
  </div>`;
}
