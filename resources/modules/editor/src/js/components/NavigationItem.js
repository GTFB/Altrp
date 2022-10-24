import React, { Component } from "react";

import { DragSource } from "react-dnd";
/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};
/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
class NavigationItem extends Component {
  render() {
    const { isDragging, connectDragSource, text, key } = this.props;
    return connectDragSource(
      <div
        key={key}
        className="n-text"
        style={{ opacity: isDragging ? 0.5 : 1, cursor: "pointer" }}
      >
        {text}
      </div>
    );
  }
}

export default DragSource("CARD", cardSource, collect)(NavigationItem);
