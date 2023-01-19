import { parse } from 'svg-parser';
import getResponsiveSetting from "../getResponsiveSetting"
import _ from 'lodash'
import Menu from "App/Models/Menu";
export default async function renderMenu(settings, device, ):Promise<string> {

  let shouldRenderButton = getResponsiveSetting(settings,'button', device);

  if(shouldRenderButton){
    return renderButton(settings,  device,)
  }
  return `
  `
}

async  function renderButton  (settings,  device,):Promise<string>  {
  const menu = await Menu.query().where('guid', settings.menu|| '').first()

  const menuData= menu ? menu.toJSON() : {};
  if(menu){
    menuData.settings = JSON.parse(menu.settings);
  }
  if (_.isEmpty(menuData)) {
    return '';
  }
  let toggle_icon = _.get(menuData, 'settings.toggle_icon', '')
  if(_.isEmpty(toggle_icon)){
    toggle_icon = `<svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="19" height="2" fill="#5c7080"/>
<path d="M0 6.00002H19V8.00002H0V6.00002Z" fill="#5c7080"/>
<rect y="12" width="19" height="2" fill="#5c7080"/>
</svg>

`
  } else {
    let _toggle_icon =parse(toggle_icon)

    toggle_icon = toggle_icon.replace(_.get(_toggle_icon,'children.0.metadata'), '')
  }


  let classes = (getResponsiveSetting(settings,'position_css_classes', device, '') || "")
  return (
  `
  <span class=" altrp-popover bp3-popover2-target">
  <button
    class="${classes} bp3-button altrp-menu-toggle"
  >
  <span class="${classes} altrp-menu-item__icon">
  ${toggle_icon}</span>
  </button>
  </span>`
)
}
