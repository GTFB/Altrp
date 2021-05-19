import React, { Component } from "react";
import { Tree, Icon, TreeNode } from "@blueprintjs/core";
import { connect } from "react-redux";
import NavigationItem from "./NavigationItem";
import {
  editorSetCurrentElementByID,
  deleteCurrentElementByID,
  getEditor
} from "../helpers";

const mapStateToProps = state => {
  return {
    templateData: JSON.parse(state.templateData.data)
  };
};

function isExpandable(name) {
  switch (name) {
    case "root-element":
      return true;
    case "section":
      return true;
    case "section_widget":
      return true;
    case "column":
      return true;
    default:
      return false;
  }
}
class NavigationPanel extends Component {
  constructor(props) {
    super(props);
    let template = [this.parseTemplate(props.templateData)];
    this.state = {
      template: template,
      dragOver: false,
      isDrag: false
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.showItem = this.showItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.findItem = this.findItem.bind(this);
  }

  handleExpand(node, nodePath) {
    let currentTree = _.cloneDeep(this.state.template);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = true;
    this.setState(s => ({ ...s, template: currentTree }));
  }

  handleCollapse(node, nodePath) {
    let currentTree = _.cloneDeep(this.state.template);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = false;
    this.setState(s => ({ ...s, template: currentTree }));
  }

  showItem(e, elementID) {
    e.preventDefault();
    editorSetCurrentElementByID(elementID);
    getEditor().showSettingsPanel();
  }

  deleteItem(e, elementID) {
    e.preventDefault();
    const success = deleteCurrentElementByID(elementID);
    if (success) {
      let currentTree = _.cloneDeep(this.state.template);
      let currentNode = this.findItem(elementID, currentTree[0]);
      this.setState(s => ({ ...s, template: currentTree }));
    }
  }

  findItem(id, currentNode) {
    let i, currentChild, result;
    if (id == currentNode.id) {
      return currentNode;
    } else {
      for (i = 0; i < currentNode.childNodes.length; i += 1) {
        currentChild = currentNode.childNodes[i];
        result = this.findItem(id, currentChild);
        if (result !== false) {
          return result;
        }
      }
      return false;
    }
  }

  onDragItem(e) {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  }

  parseTemplate(template, parent = null) {
    const expandable = isExpandable(template.name);
    return TreeNode.apply({
      label: (
        <NavigationItem
          key={template.id}
          text={template.name}
          id={template.id}
        ></NavigationItem>
      ),
      icon: expandable && "folder-close",
      childNodes: template.children.map(item => this.parseTemplate(item)),
      hasCaret: expandable,
      key: template.id,
      isExpanded: expandable,
      id: template.id,
      [parent != null && "parent"]: parent,
      secondaryLabel: template.name !== "root-element" && (
        <div>
          <Icon
            icon="eye-open"
            style={{ cursor: "pointer" }}
            onClick={e => this.showItem(e, template.id)}
          />{" "}
          <Icon
            icon="trash"
            style={{ cursor: "pointer" }}
            onClick={e => this.deleteItem(e, template.id)}
          />
        </div>
      )
    }); /* {
      label: (
        <NavigationItem
          key={template.id}
          text={template.name}
          id={template.id}
        ></NavigationItem>
      ),
      icon: expandable && "folder-close",
      childNodes: template.children.map(item => this.parseTemplate(item)),
      hasCaret: expandable,
      key: template.id,
      isExpanded: expandable,
      id: template.id,
      secondaryLabel: template.name !== "root-element" && (
        <div>
          <Icon
            icon="eye-open"
            style={{ cursor: "pointer" }}
            onClick={e => this.showItem(e, template.id)}
          />{" "}
          <Icon
            icon="trash"
            style={{ cursor: "pointer" }}
            onClick={e => this.deleteItem(e, template.id)}
          />
        </div>
      )
    };*/
  }

  render() {
    return (
      <div style={{ overflow: "auto" }}>
        <Tree
          contents={this.state.template}
          onNodeExpand={this.handleExpand}
          onNodeCollapse={this.handleCollapse}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(NavigationPanel);
