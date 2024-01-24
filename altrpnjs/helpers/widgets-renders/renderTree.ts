import getResponsiveSetting from "../getResponsiveSetting"
import _ from 'lodash'
import Menu from "App/Models/Menu";
import mbParseJSON from "../mbParseJSON";

export default async function renderTree(settings, device, context) {
  const type = settings.select_type
  const menu = getResponsiveSetting(settings, 'menu', device)
  const caret_r = getResponsiveSetting(settings, 'caret_r', device)
  let element: any = {}
  let menuGuid = ''

  let classes = 'altrp-tree'
  if(caret_r){
    classes += ' altrp-tree_right-caret '
  }
  if (type === 'repeater') {
    const repeater = getResponsiveSetting(settings, 'tree_repeater', device)

    element = repeater[0]
  } else if (type === "datasource") {
    let path = getResponsiveSetting(settings, 'tree_from_datasource', device, '');
    path = path.replace(/}}/g, '').replace(/{{/g, '');
    const data = _.get(path, context, []);

    element = data[0]
  } else if (type === 'menu' && menu) {
    menuGuid = menu
    element = await Menu.query().where('guid', menu).first()
    if (!element) {
      element = null
    } else {
      element = element.children
      element = mbParseJSON(element, [])
      //element.label = element?.[0].label

      if(_.isArray(element)){

        return `
<div class="${classes}">
    <div class="bp3-tree" data-menu="${menuGuid}">
      <ul class="bp3-tree-node-list bp3-tree-root">
        ${element.map(i=>_renderItem(i)).join('')}
      </ul>
    </div>
</div>

    `
      }
    }
  }

  if (!element?.label) {
    if (type === 'repeater') {
      return `<div style="height: 75px; display: flex; justify-content: center; align-items: center; background-color: #C4C4C4;">Add a branch</div>`
    }
    return ``
  }

  return `
<div class="${classes}">
    <div class="bp3-tree">
      <ul class="bp3-tree-node-list bp3-tree-root">
        <li class="bp3-tree-node altrp-pointer">
          <div class="bp3-tree-node-content bp3-tree-node-content-0">
            <span class="bp3-icon bp3-icon-chevron-right bp3-tree-node-caret bp3-tree-node-caret-closed">
              <svg data-icon="chevron-right" width="16" height="16" viewBox="0 0 16 16">
                <desc>Expand group</desc>
                <path d="M10.71 7.29l-4-4a1.003 1.003 0 00-1.42 1.42L8.59 8 5.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4-4c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z" fill-rule="evenodd"></path>
              </svg>
            </span>
            <span class="bp3-tree-node-label">
              ${element.label}
            </span>
          </div>
          <div class="bp3-collapse" style="">
            <div class="bp3-collapse-body" aria-hidden="false" style="transform: translateY(-100px);">
            </div>
          </div>
        </li>
      </ul>
    </div>
</div>
  `
}

function _renderItem(item){
  return`
<li class="bp3-tree-node altrp-pointer">
  <div class="bp3-tree-node-content bp3-tree-node-content-0">
    ${item.children?.length ? `<span class="bp3-icon bp3-icon-chevron-right bp3-tree-node-caret bp3-tree-node-caret-closed">
      <svg data-icon="chevron-right" width="16" height="16" viewBox="0 0 16 16">
        <desc>Expand group</desc>
        <path d="M10.71 7.29l-4-4a1.003 1.003 0 00-1.42 1.42L8.59 8 5.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4-4c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z" fill-rule="evenodd"></path>
      </svg>
    </span>` : '<span class="bp3-tree-node-caret-none"></span>'}
    <img src="" style="height: 20px;">
    <span class="bp3-tree-node-label">
      ${item.label}
    </span>
  </div>
  <div class="bp3-collapse" style="">
    <div class="bp3-collapse-body" aria-hidden="false" style="transform: translateY(-100px);">
    </div>
  </div>
</li>
  `

}
