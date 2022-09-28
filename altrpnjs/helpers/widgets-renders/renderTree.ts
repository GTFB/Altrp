import getResponsiveSetting from "../getResponsiveSetting"
import _ from 'lodash'

export default function renderTree(settings, device, context) {
  const type = getResponsiveSetting(settings, 'type', device)
  let element : any = {}

  if (type === 'repeater') {
    const repeater = getResponsiveSetting(settings, 'tree_repeater', device)

    element = repeater[0]
  } else if (type === "datasource") {
    let path = getResponsiveSetting(settings, 'tree_from_datasource', device, '');
    path = path.replace(/}}/g, '').replace(/{{/g, '');
    const data = _.get(path, context, []);

    element = data[0]
  }

  if (!element?.label) {
    if (type === 'repeater') {
      return `<div style="height: 75px; display: flex; justify-content: center; align-items: center; background-color: #C4C4C4;">Add a branch</div>`
    }
    return ``
  }

  return `
    <div class="bp3-tree">
      <ul class="bp3-tree-node-list bp3-tree-root">
        <li class="bp3-tree-node">
          <div class="bp3-tree-node-content bp3-tree-node-content-0">
            <span class="bp3-icon bp3-icon-chevron-right bp3-tree-node-caret bp3-tree-node-caret-closed">
              <svg data-icon="chevron-right" width="16" height="16" viewBox="0 0 16 16">
                <desc>Expand group</desc>
                <path d="M10.71 7.29l-4-4a1.003 1.003 0 00-1.42 1.42L8.59 8 5.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4-4c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z" fill-rule="evenodd"></path>
              </svg>
            </span>
            <img src="" style="height: 20px;">
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
  `
}
