import React, {Component} from "react";
import {Menu, Item, Separator, animation} from "react-contexify";
import ReactDOM from "react-dom";
import store from "../../../../store/store";
import {setCustomizerSettingsData} from "../../../../store/customizer-settings/actions";
import {setCopyNode} from "../../../../store/copy-node/action";
import {connect} from "react-redux";
import("react-contexify/scss/main.scss");
import {storage} from "../../../../storage"


class ContextMenuCustomizer extends Component {
  constructor(props) {
    super(props);
  }

  getId() {
    return new Date().getTime();
  }

  onRemove = () => {
    let elementsToRemove = {
      id: this.props.node.id,
      type: this.props.node.type,
      position: this.props.node.position,
      data: this.props.node.data
    }
    this.props.deleteNode([elementsToRemove])
  }

  onDuplicate = () => {
    const newNode = {
      id: `${this.getId()}`,
      type: this.props.node.type,
      position: {
        ...this.props.node.position,
        x: this.props.node.position.x + 100,
        y: this.props.node.position.y
      },
      data: this.props.node.data
    };

    const customizerStore = store.getState()?.customizerSettingsData;
    const newStore = customizerStore.concat(newNode);
    store.dispatch(setCustomizerSettingsData(newStore));
  }

  onCopy = () => {
    const obj = {
      type: this.props.node.type,
      data: this.props.node.data
    };
    const clipboard = {
      node: obj,
      startTime: new Date().getTime(),
      expires: 3600000
    }
    storage.setItem('node', clipboard)
    store.dispatch(setCopyNode(true))
  }

  onPaste = (e) => {
    const reactFlowBounds = this.props.reactFlowRef.getBoundingClientRect();
    const position = this.props.reactFlowInstance.project({
      x: e.event.clientX - reactFlowBounds.left - 50,
      y: e.event.clientY - reactFlowBounds.top - 50
    });
    let localObj = storage.getItem('node')
    const pasteObj = {
      ...localObj.node,
      id: `${this.getId()}`,
      position
    }

    const customizerStore = store.getState()?.customizerSettingsData;
    const newStore = customizerStore.concat(pasteObj);
    store.dispatch(setCustomizerSettingsData(newStore));
  }



  render() {
    return (
      ReactDOM.createPortal(
        <Menu animation={animation.scale} id="context">
          <Item onClick={this.onCopy} disabled={this.props.disabled === 'widgets' || this.props.disabled === 'settings'} >
            Copy
          </Item>
          <Separator/>
          <Item onClick={this.onPaste} disabled={!this.props.copyNode} >
            Paste
          </Item>
          <Separator/>
          <Item disabled={this.props.disabled === 'widgets' || this.props.disabled === 'settings'} onClick={this.onDuplicate}>
            Duplicate
          </Item>
          <Separator/>
          <Item disabled={this.props.disabled === 'widgets' || this.props.disabled === 'settings'} onClick={this.onRemove}>
            Delete
          </Item>
        </Menu>,
        document.body
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    copyNode: state.copyNodeData.copyNodeState,
  }
}

export default connect(mapStateToProps)(ContextMenuCustomizer)
