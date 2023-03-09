import getResponsiveSetting from '../getResponsiveSetting'
import _ from 'lodash'
import renderAsset from './../renderAsset'

export default function renderDropbar(settings, device) {
  const buttonText = getResponsiveSetting(settings,"button_text", device, "");
  const id = getResponsiveSetting(settings,"position_css_id", device, "")
  const customClasses = getResponsiveSetting(settings,"position_css_classes", device, null);
  const background_image = getResponsiveSetting(settings,"background_image", device, {});
  const buttonMedia = getResponsiveSetting(settings,"button_icon", device, {});
  let dynamic_icon = getResponsiveSetting(settings,"dynamic_icon", device) || '';


  const showIcon = buttonMedia?.url;

  const classes = ["altrp-btn", "dropbar"];

  if(customClasses) {
    classes.push(customClasses)
  }

  if (background_image?.url) {
    classes.push("altrp-background-image");
  }
  // if(this.isDisabled()){
  //   classes.push('state-disabled');
  // }

  let icon = ''
  if(showIcon){
    icon = `<span class="altrp-btn-icon">${renderAsset(buttonMedia)}</span>`
    dynamic_icon = dynamic_icon.trim()
    if(dynamic_icon){
      //dynamic_icon = `{{${dynamic_icon}}}`
      icon =`
      {{#${dynamic_icon}}}
      <img src="{{${dynamic_icon}}}" alt="{{${dynamic_icon}}}"/>
      {{/${dynamic_icon}}}
      {{^${dynamic_icon}}}
      ${icon}
      {{/${dynamic_icon}}}
      `
    }
  }

  const buttonTemplate: string = `<div class="altrp-btn-wrapper_dropbar altrp-btn-wrapper">
      <div class="altrp-dropbar altrp-dropbar-altrp-dropbar-btn">
        <span class="altrp-dropbar-children-wrapper altrp-dropbar-btn-wrapper">
          <button class='${_.join(classes, " ")}' id='${id}'>
            ${buttonText}
            ${icon}
          </button>
        </span>
      </div>
</div>`

  // let altrpDropbar = AltrpDropbar({
  //   className: "btn",
  //   element: settings,
  //   showDelay: dropbarDelay,
  //   buttonTemplate
  // })

  return buttonTemplate
}
