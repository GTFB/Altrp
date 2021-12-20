import React, {Component} from "react";
import {Menu, Item, Separator, animation} from "react-contexify";
import ReactDOM from "react-dom";
import store from "../../../../store/store";
import {setCustomizerSettingsData} from "../../../../store/customizer-settings/actions";
import("react-contexify/scss/main.scss");


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

  // onEdit = () => {
  //
  // }


  render() {
    return (
      ReactDOM.createPortal(
        <Menu animation={animation.scale} id="context">
          {/*<Item disabled={this.props.disabled === 'widgets'} onClick={this.onEdit}>*/}
          {/*  Edit*/}
          {/*</Item>*/}
          {/*<Separator/>*/}
          <Item disabled={this.props.disabled === 'widgets'} onClick={this.onDuplicate}>
            Duplicate
          </Item>
          <Separator/>
          <Item disabled={this.props.disabled === 'widgets'} onClick={this.onRemove}>
            Delete
          </Item>
        </Menu>,
        document.body
      )
    )
  }
}

export default ContextMenuCustomizer
