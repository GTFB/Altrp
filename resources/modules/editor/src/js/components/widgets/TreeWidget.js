import React from "react";
import {
  getDataByPath,
  isEditor,
  parseOptionsFromSettings, renderAsset,
  renderAssetIcon
} from "../../../../../front-app/src/js/helpers";
import {NullArray} from "./styled-components/TreeComponent";

const TreeBlueprint = window.altrpLibs.Blueprint.Tree;

class TreeWidget extends Component {
  constructor(props){
    super(props);
    let settings = props.element.getSettings();

    this.state = {
      settings,
      type: settings.select_type || "repeater",
      repeater: [],
      repeaterType: "default"
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

  normalizeValues(branch) {
    const folderIcon = "folder-close";
    const icon = branch.icon || folderIcon;

    // {
    //   assetType: "media",
    //     url: '/img/nullImage.png',
    //   name: "default"
    // }
    const label = branch.label || "Label";

    return {
      labelValue: label,
      label: label,
      icon: !icon.type ? folderIcon : renderAsset(icon),
      iconValue: icon,
      treeId: branch.tree_id || -1,
      parentId: branch.parent || -1,
    }
  }

  _componentDidMount() {
    let settings = {
      type: this.state.type,
    }

    if(settings.type === "repeater") {
      settings.repeater = this.props.element.getResponsiveSetting("tree_repeater", "", []);

      const filtrationRepeater = this.updateRepeater(settings.repeater)

      this.setState(s => ({
        ...s,
        repeater: filtrationRepeater
      }))
    } else if(settings.type === "datasource") {
      const filtrationRepeater = this.getFromDatasource(settings) || []

      this.setState(s => ({
        ...s,
        repeater: filtrationRepeater
      }))
    }
  }

  getFromDatasource(settings) {
    settings.path = this.props.element.getSettings('tree_from_datasource', '');
    settings.path = settings.path.replace(/}}/g, '').replace(/{{/g, '');
    settings.data = getDataByPath(settings.path, [], this.props.element.getCurrentModel().getData());
    settings.dataSettings = parseOptionsFromSettings(this.props.element.getSettings("tree_substitute_datasource"))

    const repeater = [];

    const keys = {
      label: "",
      icon: "",
      tree_id: "",
      parent: "",
    }

    settings.dataSettings.forEach((s) => {
      keys[s.value] = s.label
    })

    let allKeys = true;

    Object.values(keys).forEach((k) => {
      if(!k) {
        allKeys = false
      }
    })

    if(allKeys) {
      settings.data.forEach((d) => {
        repeater.push({
          label: d[keys.label],
          icon: d[keys.icon],
          tree_id: d[keys.tree_id],
          parent: d[keys.parent]
        })
      })

      return this.updateRepeater(repeater)
    }
  }

  _componentDidUpdate(prevProps, prevState) {
    let settings = {
      type: this.state.type,
    }

    if(isEditor()) {
      if(settings.type === "repeater") {
        settings.repeater = this.props.element.getResponsiveSetting("tree_repeater", "", []);
        settings.prevRepeater = prevState.settings.tree_repeater || [];

        if(settings.type === "repeater") {

          const filtrationRepeater = this.updateRepeater(settings.repeater)

          if(!_.isEqual(settings.prevRepeater, this.state.settings.tree_repeater)) {
            this.setState(s => ({
              ...s,
              repeater: filtrationRepeater
            }))
          }
        }
      }

      if(this.state.settings.select_type !== prevState.settings.select_type) {
        this.setState(s => ({
          ...s,
          type: this.state.settings.select_type
        }))
      }
    }
  }

  updateRepeater(repeaterSetting) {
    const repeater = [];

    repeaterSetting.forEach((branch, idx) => {
      const children = [];
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

      repeater.push({
        id: idx,
        ...branchSettings,
        hasCaret: branchSettings.treeId !== -1,
        childNodes: children
      })
    })

    const newRepeater = [];

    repeater.forEach((branch) => {
      newRepeater.push({
        ...branch,
        childNodes: this.childrenInChildren(branch.childNodes, repeater)
      })
    })

    return newRepeater.filter((branch) => branch.parentId === -1);
  }

  childrenInChildren(children, repeater) {
    const replacedChildren = [];

    if(children.length > 0) {
      children.forEach((branch) => {
        repeater.forEach((repBranch) => {
          if(branch.id === repBranch.id) {
            repBranch.childNodes = this.childrenInChildren(repBranch.childNodes, repeater)
            replacedChildren.push(repBranch)
          }
        })
      })
    }

    return replacedChildren
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

  render() {

    return this.state.type !== "datasource" ? (
      this.state.repeater.length > 0 ? (
        <TreeBlueprint
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
    ) : isEditor() ? <NullArray>
      Tree with datasource
    </NullArray> : this.state.repeater.length > 0 ? (<TreeBlueprint
      contents={this.state.repeater}
      onNodeClick={this.handleNodeClick}
      onNodeCollapse={this.handleNodeCollapse}
      onNodeExpand={this.handleNodeExpand}
    />) : <NullArray>
      Datasource is null
    </NullArray>
  }
}

export default TreeWidget
