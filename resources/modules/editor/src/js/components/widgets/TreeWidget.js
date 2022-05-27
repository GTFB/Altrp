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
    display: flex;
  }

  .altrp-tree-columns__column {
    margin-right: 20px;
  }

  .altrp-tree-columns__column:last-child {
    margin-right: 0;
  }

  .altrp-tree-heading {
    display: flex;
    padding-left: 60px;
  }

  .altrp-tree-heading__column {
    margin-right: 20px;
  }

  .altrp-tree-heading__column:last-child {
    margin-right: 0;
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
  let data = [...getDataByPath(settings.path, [], this.props.element.getCurrentModel().getData())];
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


  return data.map((branch) => replaceChildrenToChildNode(branch, settings.columns))
}

const replaceChildrenToChildNode = (branch, columns) => {
  branch.childNodes = branch.children || []

  delete branch.children

  branch.label = getColumns(columns, branch)
  branch.childNodes = branch.childNodes.map((branch) => replaceChildrenToChildNode(branch, columns))

  if(branch.childNodes.length === 0) {
    branch.hasCaret = false
  }

  return branch
}

const getColumns = (columns, branch) => {
  const filteredColumns = columns.filter(c => {

    return branch[c.value] !== null && branch[c.value] !== undefined
  })

  return <div className="altrp-tree-columns">
    {
      filteredColumns.map((column, idx) => (
        <div className="altrp-tree-columns__column" key={idx}>
          {
            branch[column.value]
          }
        </div>
      ))
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

    this.setState((s) => s)
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
    const column_repeater = this.props.element.getLockedSettings("column_repeater");
    const activated = this.props.element.getLockedContent("columns_heading_activator")

    return activated ? (
      <div className="altrp-tree-heading">
        {
          column_repeater.map((column, idx) => (
            <div className="altrp-tree-heading__column" key={idx}>
              {
                column.label
              }
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
        <>
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
        </>
      ) : (
        <NullArray>
          Add a branch
        </NullArray>
      )
    ) : this.state.repeater.length > 0 ? (
      <>
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
      </>
    ) : isEditor() ? (
      <NullArray>
        Datasource is null
      </NullArray>
    ) : ""
  }
}

export default TreeWidget
