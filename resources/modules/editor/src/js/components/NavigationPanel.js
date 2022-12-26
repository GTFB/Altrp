import React, { Component } from "react";
import { Tree, Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import NavigationItem from "./NavigationItem";
import Scrollbars from "react-custom-scrollbars";
import {
  editorSetCurrentElementByID,
  deleteCurrentElementByID,
  getEditor
} from "../helpers";

import store from "../store/store";
import { contextMenu } from "react-contexify";
import {setCurrentContextElement} from "../store/current-context-element/actions";

const mapStateToProps = state => {
  return {
    templateData: getEditor().modules.templateDataStorage.getRootElement()
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
      isDrag: false,
      isHidden: []
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.showItem = this.showItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.check = this.check.bind(this);
    store.subscribe(this.storeListener.bind(this));
  }

  handleExpand(node, nodePath) {
    let currentTree = _.cloneDeep(this.state.template);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = true;
    let newArrayIsHidden = this.state.isHidden.filter(item => item !== currentNode.id)
    this.setState(s => ({ ...s, template: currentTree, isHidden: newArrayIsHidden }));
  }

  handleCollapse(node, nodePath) {
    let currentTree = _.cloneDeep(this.state.template);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = false;
    this.setState(s => ({ ...s, template: currentTree, isHidden: [...this.state.isHidden, currentNode.id] }));
  }

  showItem(node, nodePath) {
    editorSetCurrentElementByID(node.id);
    getEditor().showSettingsPanel();
  }
  showContextMenu = (item,path, e) =>{
    e.persist();
    e.preventDefault();
    e.stopPropagation();

    const rootElement =  getEditor().modules.templateDataStorage.getRootElement()
    const element = rootElement.findElementById(item.id)

    store.dispatch(setCurrentContextElement(element, true));

    contextMenu.show({
      id: "element-menu-main-window",
      event: e,
      props: {
        element,
        inMainWindow: true,
      }
    });
  }
  check(item) {
    if (this.state.isHidden.includes(item.id)) item.isExpanded = false
    if (item.childNodes.length > 0) item.childNodes.forEach(child => this.check(child))
  }

  storeListener() {
    const newTemplate = [
      this.parseTemplate(
        getEditor().modules.templateDataStorage.getRootElement()
      )
    ];
    newTemplate.forEach(item => this.check(item))
    const currentTemplate = _.cloneDeep(this.state.template, []);
    if (!_.isEqual(newTemplate, currentTemplate)) {
      this.setState(s => ({ ...s, template: newTemplate }));
    }
  }

  deleteItem(e, elementID) {
    const confirm = window.confirm("Are you shure?");
    e.preventDefault();
    if (confirm) {
      const success = deleteCurrentElementByID(elementID);
      if (success) {
        let currentTree = _.cloneDeep(this.state.template);
        let newTree = this.removeElementFromArray(currentTree, elementID);
        this.setState(s => ({ ...s, template: newTree }));
      }
    }
  }

  removeElementFromArray(template, elementID) {
    return template.filter(function f(item) {
      if (item.childNodes.length > 0) {
        return (item.childNodes = item.childNodes.filter(f)).length;
      } else if (item.id === elementID) return false;
      else return true;
    });
  }

  /**
   *
   * @param {BaseElement} template
   */
  parseTemplate(template) {
    const expandable = isExpandable(template.getName());

    return {
      label: (
        <NavigationItem
          key={template.id}
          text={template.getName()}
          id={template.id}
        />
      ),
      depth: 2,
      name: template.getName(),
      icon: expandable && "folder-close",
      childNodes: template.children.map((item, index) =>
        this.parseTemplate(item)
      ),
      isSelected: getEditor().modules.templateDataStorage.getCurrentElement().id === template.id,
      hasCaret: expandable,
      key: template.id,
      isExpanded: expandable,
      id: template.id,
      onClick: (node, e) => this.showItem(e, node.id),
      [parent != null && "parent"]: parent,
      secondaryLabel: (
        (template.getName() !== "root-element" && (template.getName() === "column" ? template.parent.children.length > 1 : true)) && (
          <div>
            <Icon
              icon="trash"
              style={{ cursor: "pointer" }}
              onClick={e => this.deleteItem(e, template.id)}
            />
          </div>
        )
      )
    };
  }

  render() {
    return (
      <Scrollbars  autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div style={{ width: '100%', padding: '10px'}}>
          <Tree
            contents={this.state.template}
            onNodeExpand={this.handleExpand}
            onNodeCollapse={this.handleCollapse}
            onNodeDoubleClick={this.showItem}
            onNodeClick={this.showItem}
            onNodeContextMenu={this.showContextMenu}
          />
        </div>
        {/*<ElementContextMenu/>*/}
      </Scrollbars>
    );
  }
}

export default connect(mapStateToProps)(NavigationPanel);
