import React from "react";
const {
  getDataByPath,
  isEditor,
  parseOptionsFromSettings, renderAsset,
  renderAssetIcon
} = window.altrpHelpers;

import {NullArray} from "./styled-components/TreeComponent";

const TreeBlueprint = window.altrpLibs.Blueprint.Tree;

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
  settings.path = this.props.element.getSettings(settingNames[0], '');
  settings.path = settings.path.replace(/}}/g, '').replace(/{{/g, '');
  settings.dataSettings = parseOptionsFromSettings(this.props.element.getSettings(settingNames[1]))
  settings.sortDefault = this.props.element.getLockedSettings("sort_default");
  settings.sortOption = this.props.element.getLockedSettings("options_sorting");
  const data = getDataByPath(settings.path, [], this.props.element.getCurrentModel().getData());

  if(!_.isArray(data)){
    return [];
  }

  let repeater = [];

  const keys = {
    label: "label",
    icon: "icon",
    tree_id: "tree_id",
    parent: "parent_id",
  }

  if(isEditor()) {
    settings.data = [
      {
        label: "label 1",
        tree_id: 1,
        value: 1,
      },
      {
        label: "child 1",
        parent_id: 1,
        value: 2,
      },
      {
        label: "child 2",
        parent_id: 1,
        tree_id: 2,
        value: 3,
      },
      {
        label: "child 1",
        parent_id: 2,
        tree_id: 2,
        value: 4,
      },
      {
        label: "label 2",
        tree_id: 3,
        value: 5,
      },
      {
        label: "child 1",
        parent_id: 3,
        value: 6,
      },
      {
        label: "child 2",
        parent_id: 3,
        value: 7,
      },
      {
        label: "label 3",
        value: 8,
      },
    ]
  }


  settings.dataSettings.forEach((s) => {
    switch (s.value) {
      case "label":
        keys[s.value] = s.label || "label"
        break;
      case "icon":
        keys[s.value] = s.label || "icon"
        break;
      case "parent":
        keys[s.value] = s.label || "parent_id"
        break;
      case "tree_id":
        keys[s.value] = s.label || "tree_id"
        break;
    }
  })

  let allKeys = true;

  Object.values(keys).forEach((k) => {
    if(!k) {
      allKeys = false
    }
  })

  if(allKeys && data.length > 0) {
    data.forEach((d) => {
      repeater.push({
        label: d[keys.label],
        icon: d[keys.icon],
        tree_id: d[keys.tree_id],
        parent: d[keys.parent],
        value: d.value ? d.value : -1
      })
    })
  }

  if(!defaultOptions) {
    console.log(repeater, "sadsadsa")
    return this.updateRepeater(repeater, {
      sort: [settings.sortDefault, settings.sortOption]
    })
  } else {
    if(! _.isArray(settings?.data)){
      return  [];
    }
    return settings?.data?.map(branch => this.normalizeValues(branch)) || []
  }
}

export const updateRepeater = function (repeaterSetting, other={}) {
  const repeater = [];

  console.log('sadass')

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

  return newRepeater
  return newRepeater.filter((branch) => branch.parentId === -1);
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

    this.state = {
      settings,
      type: settings.select_type || "repeater",
      repeater: [],
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
      settings = {

      }
      const filtrationRepeater = this.getFromDatasource({
        ...this.state.settings,
        ...settings,
      }) || []

      this.setState(s => ({
        ...s,
        repeater: filtrationRepeater
      }))
    }
  }



  // _componentDidUpdate(prevProps, prevState) {
  //   let settings = {
  //     type: this.state.type,
  //   }
  //
  //   if(isEditor()) {
  //     if(settings.type === "repeater") {
  //       settings.repeater = this.props.element.getResponsiveLockedSetting("tree_repeater", "", []);
  //       settings.prevRepeater = prevState.settings.tree_repeater || [];
  //
  //       if(settings.type === "repeater") {
  //
  //         const filtrationRepeater = this.updateRepeater(settings.repeater)
  //
  //         if(!_.isEqual(settings.prevRepeater, this.state.settings.tree_repeater)) {
  //           this.setState(s => ({
  //             ...s,
  //             repeater: filtrationRepeater
  //           }))
  //         }
  //       }
  //     }
  //
  //     if(this.state.settings.select_type !== prevState.settings.select_type) {
  //       this.setState(s => ({
  //         ...s,
  //         type: this.state.settings.select_type
  //       }))
  //     }
  //   }
  // }
  //
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

  render() {
  let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return this.state.type !== "datasource" ? (
      this.state.repeater.length > 0 ? (
        <TreeBlueprint
          className={classes}
          contents={this.state.repeater}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          />
      ) : (
        <NullArray>
          Add a branch
        </NullArray>
      )
    ) : this.state.repeater.length > 0 ? (<TreeBlueprint
      className={classes}
      contents={this.state.repeater}
      onNodeClick={this.handleNodeClick}
      onNodeCollapse={this.handleNodeCollapse}
      onNodeExpand={this.handleNodeExpand}
    />) : isEditor ? (
      <NullArray>
        Datasource is null
      </NullArray>
    ) : ""
  }
}

export default TreeWidget
