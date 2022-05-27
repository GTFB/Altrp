import React from "react";
const {
  getDataByPath,
  isEditor,
  parseOptionsFromSettings, renderAsset,
  renderAssetIcon
} = window.altrpHelpers;

import {NullArray} from "./styled-components/TreeComponent";

const TreeBlueprint = window.altrpLibs.Blueprint.Tree;

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-tree-columns {
    display: grid;
  }

  .altrp-tree-heading {
    display: grid;
    padding-left: 60px;
    align-items: center;
  }

  .altrp-tree-heading__text {
    display: inline-block;
  }

  .altrp-tree {
    overflow-x: auto;
  }

  .bp3-tree-root > .bp3-tree-node {
    padding-left: 0;
  }

  .bp3-tree-node__border_last > .bp3-tree-node-content .altrp-tree-columns__column_divider {
     border-bottom: none;
  }

  .bp3-tree-node {
    padding-left: 20px
  }

  .bp3-collapse .bp3-tree-node-content {
      padding: 0;
  }

  .bp3-tree-node-expanded > .bp3-tree-node-content .altrp-tree-columns__column_divider {
    border-bottom: none;
  }

  .bp3-tree-node-list > .bp3-tree-node__border_last {
    margin-bottom: 10px
  }
`)


export const normalizeValues = function(branch, iconValue=this.props.element.getSettings("icon")) {
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
    label: <div dangerouslySetInnerHTML={{ __html: label }}/>,
    treeId: branch.tree_id || -1,
    parentId: branch.parent || -1,
  }
}

export const getFromDatasource = function (settings = {}, settingNames=['tree_from_datasource', "tree_substitute_datasource"], defaultOptions=false) {
  settings.path = this.props.element.getLockedSettings(settingNames[0], '');
  settings.path = settings.path.replace(/}}/g, '').replace(/{{/g, '');
  settings.dataSettings = parseOptionsFromSettings(this.props.element.getLockedSettings(settingNames[1]))
  settings.sortDefault = this.props.element.getLockedSettings("sort_default");
  settings.sortOption = this.props.element.getLockedSettings("options_sorting");
  let data = _.cloneDeep(getDataByPath(settings.path, [], this.props.element.getCurrentModel().getData()));
  settings.columns = this.props.element.getLockedSettings("column_repeater", []);


  if(!_.isArray(data)){
    return [];
  }

  let repeater = [];

  // if(isEditor()) {
  //   data = [
  //     {
  //       label: "label 1",
  //       id: 1,
  //       children: [
  //         {
  //           label: "child 1",
  //           id: 2,
  //           children: []
  //         },
  //         {
  //           label: "child 2",
  //           id: 3,
  //           children: [
  //             {
  //               label: "child 1",
  //               id: 4,
  //               children: []
  //             },
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       label: "label 2",
  //       id: 5,
  //       children: [
  //         {
  //           label: "child 1",
  //           id: 6,
  //           children: []
  //         },
  //         {
  //           label: "child 2",
  //           id: 7,
  //           children: []
  //         },
  //       ]
  //     },
  //     {
  //       label: "label 3",
  //       id: 8,
  //       children: []
  //     },
  //   ]
  // }


  return data.map((branch, idx) => replaceChildrenToChildNode(branch, settings.columns, data.length - 1 === idx))
}

const replaceChildrenToChildNode = (branch, columns, last=false) => {
  branch.childNodes = branch.children || []

  delete branch.children

  branch.label = getColumns(columns, branch)
  branch.childNodes = branch.childNodes.map((childBranch, idx) => {
    return  replaceChildrenToChildNode(childBranch, columns, branch.childNodes.length - 1 === idx)
  })

  if(!last) {
    branch.className = "bp3-tree-node__border"
  } else {
    branch.className = "bp3-tree-node__border_last"
  }

  if(branch.childNodes.length === 0) {
    branch.hasCaret = false
  }

  return branch
}

const getColumns = (columns, branch) => {
  const filteredColumns = columns.filter(c => {

    return branch[c.value] !== null && branch[c.value] !== undefined
  })

  const widths = filteredColumns.map(column => {
    if(column.width) {
      return `${(column.width.size || "1") + column.width.unit || "fr"}`
    } else {
      return "1fr"
    }
  })

  return <div className="altrp-tree-columns" style={{
    gridTemplateColumns: widths.join(" ")
  }}>
    {
      filteredColumns.map((column, idx) => {
        let classNames = "altrp-tree-columns__column";

        if(column.divider) {
          classNames += " altrp-tree-columns__column_divider"
        }

        return (
          <div className={classNames} key={idx}>
            {
              branch[column.value]
            }
          </div>
        )
      })
    }
  </div>
}


export const updateRepeater = function (repeaterSetting, other={}) {
  const repeater = [];

  repeaterSetting.forEach((branch, idx) => {
    let children = [];
    const branchSettings = this.normalizeValues(branch)

    if(branchSettings.treeId !== -1) {
      repeaterSetting.forEach((possibleChild, possibleIdx) => {
        if(idx !== possibleIdx) {
          const possibleParentId = possibleChild.parent || -1;

          if(possibleParentId === branchSettings.treeId) {
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
      if(other.sort[1] === 'desc'){
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
    if(other.sort[1] === 'desc'){
      newRepeater = _.reverse(newRepeater)
    }
  }

  return newRepeater.map((branch => removeEmpty(branch))).filter((branch) => branch.parentId === -1);
}

export const removeEmpty = function (branch) {
  if(branch.childNodes.length > 0) {
    branch.childNodes = branch.childNodes.map(childNode => removeEmpty(childNode))
    return branch
  } else {
    branch.parent = -1
    branch.parentId = -1
    return branch
  }
}

export const childrenInChildren = function(children, repeater) {
  const replacedChildren = [];

  if(children.length > 0) {

    children.forEach((branch) => {
      if(branch.parent_id !== branch.tree_id) {
        repeater.forEach((repBranch) => {
          if(branch.id === repBranch.id) {
            if(repBranch.childNodes?.length > 0) {
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
  constructor(props){
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

    if(props.baseRender){
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

    if(settings.type === "repeater") {
      settings.repeater = this.props.element.getResponsiveLockedSetting("tree_repeater", "", []);

      const filtrationRepeater = this.updateRepeater(settings.repeater)

      this.setState(s => ({
        ...s,
        repeater: filtrationRepeater
      }))
    } else if(settings.type === "datasource") {
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
  }



  _componentDidUpdate(prevProps) {
    let path = this.props.element.getLockedSettings("tree_from_datasource", '');
    path = path.replace(/}}/g, '').replace(/{{/g, '');
    let rawData = getDataByPath(path, [], prevProps.element.getCurrentModel().getData());

    if(this.rawData !== rawData) {
      this.rawData = rawData
      if(! rawData?.length){
        return
      }
      let settings = this.props.element.getSettings();

      const data = this.getFromDatasource(settings) || [];

      this.setState((s) => ({
        ...s,
        repeater: data
      }))
    }
  }

  handleNodeClick(node, path) {
    const originallySelected = node.isSelected;

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
      const repeater = s.repeater;

      if(settings.hasOwnProperty("isExpanded")) {
        TreeBlueprint.nodeFromPath(settings.path, repeater).isExpanded = settings.isExpanded;
      } else {
        this.forEachNode(repeater, node => (node.isSelected = false))
        TreeBlueprint.nodeFromPath(settings.path, repeater).isSelected = settings.isSelected;
      }

      return {
        ...s,
        repeater
      }
    })
  }

  /**
   * Получить css классы для tree widget
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  getTreeHeading() {
    const columns_repeater = this.props.element.getLockedSettings("column_repeater");
    const activated = this.props.element.getLockedContent("columns_heading_activator")

    const widths = columns_repeater.map(column => {
      if(column.label_width) {
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
            <div className="altrp-tree-heading__column" key={idx}>
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

  render() {


  let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return this.state.type !== "datasource" ? (
      this.state.repeater.length > 0 ? (
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
