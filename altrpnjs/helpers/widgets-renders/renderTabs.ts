import objectToStylesString from "../objectToStylesString";
import renderAsset from "../renderAsset";
import getResponsiveSetting from "../getResponsiveSetting"
import replaceContentWithData from "../string/replaceContentWithData";

export default function renderTabs(settings, device, context) {
  let buttonClasses = "";

  // this.state.selected
  const selected = 'tab-1'

  const vertical = getResponsiveSetting(settings, "vertical", device, false);
  const animate = getResponsiveSetting(settings, "animate", device);

  let tabs = [];
  const spacing_icon_style = getResponsiveSetting(settings, "spacing_icon_style", device) || {size: '10',unit:'px'};
  if (settings.items_tabs) {
    tabs = settings.items_tabs?.map((tab, idx) => {
      let iconStyles = {};
      const alignment_icon_style = getResponsiveSetting(settings, "alignment_icon_style", device) || 'left'
      if (alignment_icon_style === "left") {
        iconStyles = {
          marginRight:
            spacing_icon_style?.size + spacing_icon_style?.unit
        };
      } else {
        iconStyles = {
          marginLeft:
            spacing_icon_style?.size + spacing_icon_style?.unit
        };
      }

      let icon = '';

      if (tab.icon_items) {
        if(!Array.isArray(tab.icon_items)) {
          if(tab.icon_items?.url) {
            icon = `
              <div className="altrp-tab-btn-icon" style="${objectToStylesString(iconStyles)}">
                ${renderAsset(tab.icon_items, {})}
              </div>
            `;
          }
        }
      }

      // const Template = TemplateLoader({
      //   templateId: tab.card_template
      // })

      const Template = `<div className="inner-template"></div>`

      return {
        id: `tab-${idx + 1}`,
        className: "altrp-tab-btn" +
          buttonClasses +
          (selected === `tab-${idx + 1}` ? " active" : "") +
          (vertical ? " altrp-tab-vertical" : " altrp-tab-horizontal")
        ,
        panel: `
          <div class="altrp-tab ${selected === `tab-${idx + 1}` ? "active" : ""}">
            ${tab.card_template ? `
              ${Template}
            ` : `
              ${tab.wysiwyg_items}
            `}
          </div>
        `,
        key: idx + 1,
        title: `
          ${alignment_icon_style == "left" ? icon : ''}
          <p>${tab.title_and_content_items}</p>
          ${alignment_icon_style == "right" ? icon : ''}
        `
      }
    })
  }

  const defaultSelectedTabId = 'tab-1'

  return `
    <div class="bp3-tabs altrp-tabs ${vertical ? "altrp-tabs-vertical" : 'altrp-tabs-horizontal'} ${animate ? '' : ' altrp-tabs-without-animation'}">
      <div class="bp3-tab-list" role="tablist">
        ${tabs.map(({title, id, className}) => `
          <div
            aria-controls="bp3-tab-panel_${id}"
            aria-disabled="false"
            aria-selected="${defaultSelectedTabId === id}"
            class="bp3-tab ${className}"
            data-tab-id="${id}"
            id="bp3-tab-title_${id}"
            role="tab"
            tabindex="0"
          >
            ${replaceContentWithData(title, context)}
          </div>
        `).join('')}
      </div>

      ${tabs.map(({panel, id, className}) => defaultSelectedTabId === id ? `
        <div
          aria-labelledby="bp3-tab-title_${id}"
          aria-hidden="false"
          class="bp3-tab-panel ${className}"
          id="bp3-tab-panel_${id}"
          role="tabpanel"
        >
          ${replaceContentWithData(panel, context)}
        </div>
      ` : '').join('')}
    </div>
  `
}
