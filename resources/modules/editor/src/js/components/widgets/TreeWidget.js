import React from "react";
import {NullArray} from "./styled-components/TreeComponent";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import parseOptionsFromSettings from "../../../../../front-app/src/js/functions/parseOptionsFromSettings";

import {Tree as TreeBlueprint} from '@blueprintjs/core'
import replacePageContent from "../../../../../front-app/src/js/helpers/replace-page-content";

export const normalizeValues = function (branch, iconValue = this.props.element.getSettings("icon")) {
  const folderIcon = "folder-close";

  const icon = iconValue || folderIcon;

  // {
  //   assetType: "media",
  //     url: '/img/nullImage.png',
  //   name: "default"
  // }
  const label = branch.label || "Label";

  return {
    ...branch,
    labelValue: label,
    label: <div dangerouslySetInnerHTML={{__html: label}}/>,
    treeId: branch.tree_id || -1,
    parentId: branch.parent || -1,
  }
}

export const getFromDatasource = function (settings = {}, settingNames = ['tree_from_datasource', "tree_substitute_datasource"], defaultOptions = false) {
  settings.path = this.props.element.getLockedSettings(settingNames[0], '');
  settings.path = settings.path.replace(/}}/g, '').replace(/{{/g, '');
  settings.dataSettings = parseOptionsFromSettings(this.props.element.getLockedSettings(settingNames[1]))
  settings.sortDefault = this.props.element.getLockedSettings("sort_default");
  settings.sortOption = this.props.element.getLockedSettings("options_sorting");
  let data = _.cloneDeep(getDataByPath(settings.path, [], this.props.element.getCurrentModel().getData())) || [];
  settings.columns = this.props.element.getLockedSettings("column_repeater", []);
  settings.flat = this.props.element.getLockedSettings("flat_col", false);

  if (!_.isArray(data)) {
    return [];
  }

  let repeater = [];


  settings.maxDepth = getMaxDepth(data, settings.maxDepth)

  return data.map((branch, idx) => replaceChildrenToChildNode(branch, settings.columns, data.length - 1 === idx, 0, settings.flat, settings.maxDepth))
}

const getMaxDepth = (data, maxDepth = 0, depth = 0) => {
  if (depth > maxDepth) {
    maxDepth = depth
  }

  for (const branch of data) {
    if (branch?.children?.length > 0) {
      maxDepth = getMaxDepth(branch.children, maxDepth, depth + 1)
    }
  }

  return maxDepth
}

const replaceChildrenToChildNode = (branch, columns, last = false, depth, flat = false, maxDepth) => {
  branch.childNodes = branch.children || []
  branch.childNodes = branch.childNodes.filter(i => i)
  delete branch.children

  branch.depth = depth

  branch.label = getColumns(columns, branch, flat, maxDepth)


  branch.childNodes = branch.childNodes.map((childBranch, idx) => {
    return replaceChildrenToChildNode(childBranch, columns, branch.childNodes.length - 1 === idx, depth + 1, flat, maxDepth)
  })


  if (!last) {
    branch.className = "bp3-tree-node__border"
  } else {
    branch.className = "bp3-tree-node__border_last"
  }

  if (branch.childNodes.length === 0) {
    branch.hasCaret = false
  }

  return branch
}

const getColumns = (columns, branch, flat, maxDepth) => {
  const filteredColumns = columns.filter(c => {

    return branch[c.value] !== null && branch[c.value] !== undefined
  })

  const firstElementWidth = filteredColumns?.[0]?.size || "1" + filteredColumns?.[0]?.unit || "px"
  const widths = filteredColumns.slice(1).map(column => {
    if (column.width) {
      return `${(column.width.size || "1") + column.width.unit || "fr"}`
    } else {
      return "1fr"
    }
  })

  const values = {
    classNames: "altrp-tree-columns__column",
    marginRight: 0,
    translateX: 0
  }

  let tag = 'div'
  if (branch.url) {
    values.href = branch.url
    tag = 'a'
  }

  if (flat) {
    if (maxDepth > 0) {
      values.marginRight = 20 + (20 * maxDepth) - (branch.depth * 20)
    }

    if (columns[0].divider) {
      values.classNames += " altrp-tree-columns__column_divider"
    }
  }

  return <>
    {
      !flat ? (
        <div className="altrp-tree-columns" style={{
          gridTemplateColumns: widths.join(" ")
        }}>
          {
            filteredColumns.map((column, idx) => {
              let classNames = "altrp-tree-columns__column";
              let translateX = 0;
              let marginRight = 0;

              // if(idx > 0 && branch.depth > 0) {
              //   translateX = (15 * branch.depth)
              // }
              //
              // if(idx === 0 && branch.depth > 0 && maxDepth > 0) {
              //   marginRight = 20 + (20 * maxDepth)
              // }

              if (column.divider) {
                classNames += " altrp-tree-columns__column_divider"
              }


              return (
                React.createElement(tag, {
                  className: classNames,
                  href: values.href,
                  key: branch[column.value] + idx,
                }, branch[column.value])

              )
            })
          }
        </div>
      ) : (
        <>
          {React.createElement(tag, {
            className: values.classNames,
            href: values.href,
            style: {
              width: firstElementWidth,
              marginRight: values.marginRight,
              float: "left"
            }
          }, branch[columns[0].value])
          }
          <div className="altrp-tree-columns_flat altrp-tree-columns" style={{
            transform: `translateX(-${values.translateX}px)`,
            gridTemplateColumns: widths.join(" ")
          }}>
            {
              filteredColumns.map((column, idx) => {
                if (idx === 0) return "";

                let classNames = "altrp-tree-columns__column";

                return (
                  <div
                    className={classNames}
                    key={branch[column.value] + idx}
                  >
                    {
                      branch[column.value]
                    }
                  </div>
                )
              })
            }
          </div>
        </>
      )
    }
  </>
}


export const updateRepeater = function (repeaterSetting, other = {}) {
  const repeater = [];

  repeaterSetting.forEach((branch, idx) => {
    let children = [];
    const branchSettings = this.normalizeValues(branch)

    if (branchSettings.treeId !== -1) {
      repeaterSetting.forEach((possibleChild, possibleIdx) => {
        if (idx !== possibleIdx) {
          const possibleParentId = possibleChild.parent || -1;

          if (possibleParentId === branchSettings.treeId) {
            children.push({
              ...this.normalizeValues(possibleChild),
              id: possibleIdx,
            })
          }
        }
      })
    }

    if (other?.sort && !other?.sort[0]) {
      children = _.sortBy(children, o => o && (o.label ? o.label.toString() : o));
      if (other.sort[1] === 'desc') {
        children = _.reverse(children)
      }
    }

    repeater.push({
      ...branchSettings,
      id: idx,
      childNodes: children
    })
  })

  let newRepeater = [];

  repeater.forEach((branch) => {
    branch.childNodes = this.childrenInChildren(branch.childNodes, repeater)
    branch.hasCaret = branch.childNodes.length > 0

    newRepeater.push(branch)
  })

  if (other?.sort && !other?.sort[0]) {
    newRepeater = _.sortBy(newRepeater, o => o && (o.label ? o.label.toString() : o));
    if (other.sort[1] === 'desc') {
      newRepeater = _.reverse(newRepeater)
    }
  }

  return newRepeater.map((branch => removeEmpty(branch))).filter((branch) => branch.parentId === -1);
}

export const removeEmpty = function (branch) {
  if (branch.childNodes.length > 0) {
    branch.childNodes = branch.childNodes.map(childNode => removeEmpty(childNode))
    return branch
  } else {
    branch.parent = -1
    branch.parentId = -1
    return branch
  }
}

export const childrenInChildren = function (children, repeater) {
  const replacedChildren = [];

  if (children.length > 0) {

    children.forEach((branch) => {
      if (branch.parent_id !== branch.tree_id) {
        repeater.forEach((repBranch) => {
          if (branch.id === repBranch.id) {
            if (repBranch.childNodes?.length > 0) {
              repBranch.childNodes = this.childrenInChildren(repBranch.childNodes, repeater)
            }

            replacedChildren.push(repBranch)
          }
        })
      }
    })
  }

  return replacedChildren
}

class TreeWidget extends Component {
  constructor(props) {
    super(props);
    let settings = props.element.getSettings();

    const filtrationRepeater = this.getFromDatasource(settings) || []

    this.state = {
      settings,
      type: settings.select_type || "repeater",
      repeater: filtrationRepeater,
    };

    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }

    if (props.baseRender) {
      this.render = props.baseRender(this);
    }

    this.updateNode = this.updateNode.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this)
  }

  normalizeValues = normalizeValues;
  getFromDatasource = getFromDatasource;
  updateRepeater = updateRepeater;
  childrenInChildren = childrenInChildren;


  _componentDidMount() {
    let settings = {
      type: this.state.type,
    }

    if (settings.type === "repeater") {
      settings.repeater = this.props.element.getResponsiveLockedSetting("tree_repeater", "", []);

      const filtrationRepeater = this.updateRepeater(settings.repeater)

      this.setState(s => ({
        ...s,
        repeater: filtrationRepeater
      }))
    } else if (settings.type === "datasource") {
      let settings = this.props.element.getSettings();

      const data = this.getFromDatasource(settings) || [];

      this.setState((s) => ({
        ...s,
        repeater: data
      }))
      //
      // this.setState(s => ({
      //   ...s,
      //   repeater: filtrationRepeater
      // }))
    }
    this.updateMenu()

  }

  updateMenu =()=>{
    const settings = this.props.element.getSettings()
    let {
      menu,
      select_type,
    } = settings
    if(select_type === 'menu'){
      if(this.menu !== menu){
        this.menu = menu

        menu = window.altrp.menus?.find(m=>m.guid === menu)
        if(menu){

          let repeater = menu.children
          repeater = repeater ? JSON.parse(repeater) : []

          repeater = repeater.map(i=>menuRecursive(i))
          this.setState(state=>({...state, repeater}))
        }
      }

    }
  }

  _componentDidUpdate(prevProps) {
    let path = this.props.element.getLockedSettings("tree_from_datasource", '');
    path = path.replace(/}}/g, '').replace(/{{/g, '');
    let rawData = getDataByPath(path, [], prevProps.element.getCurrentModel().getData());

    if (this.rawData !== rawData) {
      this.rawData = rawData
      if (!rawData?.length) {
        return
      }
      let settings = this.props.element.getSettings();

      const data = this.getFromDatasource(settings) || [];

      this.setState((s) => ({
        ...s,
        repeater: data
      }))
    }
    this.updateMenu()

  }

  handleNodeClick(node, path) {
    if(isEditor()){
      return
    }
    const originallySelected = node.isSelected;
    if(node.url?.indexOf('event:') === 0){
      const event = new CustomEvent(node.url?.replace('event:', ''),
        {
          detail: {
            element: this.props.element,
          }
        })
      document.dispatchEvent(event)
      window.dispatchEvent(event)
    } else if(node.url?.indexOf('/') === 0){
      replacePageContent(node.url)
    } else if(node.url?.indexOf('http') === 0){
      location.href = node.url
    }
    this.updateNode({
      node,
      path,
      current: path[0],
      isSelected: originallySelected == null ? true : !originallySelected,
      repeater: this.state.repeater,
      next: path[1] ? path[1] : -1
    })
  }

  forEachNode(nodes, callback) {
    if (nodes === undefined) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }

  handleNodeCollapse(node, path) {

    this.updateNode({
      node,
      path,
      current: path[0],
      isExpanded: false,
      repeater: this.state.repeater,
      next: path[1] ? path[1] : -1
    })
  }

  handleNodeExpand(node, path) {

    this.updateNode({
      node,
      path,
      current: path[0],
      isExpanded: true,
      repeater: this.state.repeater,
      next: path[1] ? path[1] : -1
    })
  }

  updateNode(settings) {
    this.setState(s => {
      const repeater = this.getRepeater();

      if (settings.hasOwnProperty("isExpanded")) {
        TreeBlueprint.nodeFromPath(settings.path, repeater).isExpanded = settings.isExpanded;
      } else {
        this.forEachNode(repeater, node => (node.isSelected = false))
        TreeBlueprint.nodeFromPath(settings.path, repeater).isSelected = settings.isSelected;
      }

      return {
        ...s,
        repeater,
      }
    })
  }

  /**
   * Получить css классы для tree widget
   */
  getClasses = () => {
    let classes = ``;
    if (this.isActive()) {
      classes += 'active '
    }
    if (this.isDisabled()) {
      classes += 'state-disabled '
    }
    return classes;
  }

  getTreeHeading() {
    const columns_repeater = this.props.element.getLockedSettings("tree_repeater") || [];
    const activated = this.props.element.getLockedContent("columns_heading_activator")

    const widths = columns_repeater.map(column => {
      if (column.label_width) {
        return `${(column.label_width.size || "1") + column.label_width.unit || "fr"}`
      } else {
        return "1fr"
      }
    })

    return activated ? (
      <div className="altrp-tree-heading" style={{
        gridTemplateColumns: widths.join(" ")
      }}>
        {
          columns_repeater.map((column, idx) => (
            <div className="altrp-tree-heading__column" key={column.label + idx}>
              <div className="altrp-tree-heading__text">
                {
                  column.label
                }
              </div>
            </div>
          ))
        }
      </div>
    ) : ""
  }
  getRepeater = ()=>{
    return this.state.repeater

  }
  render() {
    const settings = this.props.element.getSettings()

    const {
      caret_r
    } = settings

    const repeater = this.getRepeater()
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return this.state.type !== "datasource" ? (
      repeater?.length > 0 ? (
        <div className={`altrp-tree ${caret_r ? 'altrp-tree_right-caret': ''}`}>
          {
            this.getTreeHeading()
          }
          <TreeBlueprint
            className={classes}
            contents={repeater}
            onNodeClick={this.handleNodeClick}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeExpand={this.handleNodeExpand}
          />
        </div>
      ) : (
        <NullArray>
          Add a branch
        </NullArray>
      )
    ) : this.state.repeater.length > 0 ? (
      <div className="altrp-tree">
        {
          this.getTreeHeading()
        }
        <TreeBlueprint
          className={classes}
          contents={this.state.repeater}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
        />
      </div>
    ) : isEditor() ? (
      <NullArray>
        Datasource is null
      </NullArray>
    ) : ""
  }
}

export default TreeWidget

function menuRecursive(item){
  let newItem = {
    id: item.id,
    label: item.label,
    url: item.url
  }
  if(newItem.url){
    newItem.className = 'altrp-pointer'
  }
  if(item.icon){
    newItem.icon = <span className="bp3-icon " dangerouslySetInnerHTML={{__html: item.icon}}></span>
  }
  newItem.childNodes = item.children || []

  newItem.childNodes = newItem.childNodes.map(i=>menuRecursive(i))

  newItem.hasCaret = !! newItem.childNodes.length


  return newItem
}
