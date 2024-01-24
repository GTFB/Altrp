import { parse } from 'svg-parser';
import getResponsiveSetting from "../getResponsiveSetting"
import _ from 'lodash'
import Menu from "App/Models/Menu";
import prepareSVG from "../string/prepareSVG";
export default async function renderMenu(settings, device, elementID):Promise<string> {

  let shouldRenderButton = getResponsiveSetting(settings,'button', device);

  const menu = await Menu.query().where('guid', settings.menu|| '').first()
  if(shouldRenderButton){
    // @ts-ignore
    return renderButton(settings,  device,menu)
  }
  if(! menu){
    return `
  `
  }
  const menuData= menu ? menu.toJSON() : {};
  if(menu){
    menuData.children = JSON.parse(menu.children);
  }
  return _renderMenu(settings,  device, menuData.children, elementID)
}

function _renderMenu(settings,  device, children, elementID):string{

  const  type = getResponsiveSetting(settings, 'type', device) || 'vertical';
return `
<ul class="bp3-menu altrp-menu altrp-menu_${type}" data-menu="${settings.menu}">
  ${
  children.map(menuItem=>{
    let {
      children = [],
      url,
      label,
      icon,
    } = menuItem
    if(icon){
      icon = prepareSVG(icon)
    }

    return `
    <li class="${children?.length ? 'bp3-submenu' :''}">
<a tabindex="0"  href="${url}" width="100" class="bp3-menu-item bp3-popover-dismiss   altrp-menu-item  altrp-menu-item${elementID} ">
<span class=" altrp-menu-item__icon">${icon || ''}</span>
<div class="bp3-fill bp3-text-overflow-ellipsis">${label}</div>
${children.length ? `<span  class="bp3-icon bp3-icon-caret-right"><svg data-icon="caret-right" width="16" height="16" viewBox="0 0 16 16"><desc>Open sub menu</desc><path d="M11 8c0-.15-.07-.28-.17-.37l-4-3.5A.495.495 0 006 4.5v7a.495.495 0 00.83.37l4-3.5c.1-.09.17-.22.17-.37z" fill-rule="evenodd"></path></svg></span>`
    : ''}
</a>
</li>
    `
  }).join('')
}
</ul>
`
}

async  function renderButton  (settings,  device, menu:Menu):Promise<string>  {

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
    data-menu="${menu.guid}"
  >
  <span class="${classes} altrp-menu-item__icon">
  ${toggle_icon}</span>
  </button>
  </span>`
)
}
