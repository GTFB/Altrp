import getResponsiveSetting from '../getResponsiveSetting'
import _ from 'lodash'
import renderAsset from './../renderAsset'
// import getContent from '../getContent'

export default function renderDropbar(settings, device) {
  const buttonText = getResponsiveSetting(settings,"button_text", device, "");
  const id = getResponsiveSetting(settings,"position_css_id", device, "")
  const customClasses = getResponsiveSetting(settings,"position_css_classes", device, null);
  const background_image = getResponsiveSetting(settings,"background_image", device, {});
  const buttonMedia = getResponsiveSetting(settings,"button_icon", device, {});
  // const dropbarDelay = getResponsiveSetting(settings,"show_delay_dropbar_options", device);

  const showIcon = buttonMedia.url;

  const classes = ["altrp-btn", "dropbar"];

  if(customClasses) {
    classes.push(customClasses)
  }

  if (background_image.url) {
    classes.push("altrp-background-image");
  }
  // if(this.isDisabled()){
  //   classes.push('state-disabled');
  // }

  const isSSR = () => {
    return true
  }

  const buttonTemplate = `<button class='${_.join(classes, " ")}' id='${id}'>
    ${buttonText}
  ${ showIcon ? (! isSSR() && `<span class="altrp-btn-icon">${renderAsset(buttonMedia)}</span>`) : "" }
  </button>`

  // let altrpDropbar = AltrpDropbar({
  //   className: "btn",
  //   element: settings,
  //   getContent,
  //   showDelay: dropbarDelay,
  //   buttonTemplate
  // })

  return buttonTemplate
}
