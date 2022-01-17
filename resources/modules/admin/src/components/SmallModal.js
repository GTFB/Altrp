import React, { Component } from "react";
import CloseModal from "../svgs/clear_black.svg";

class SmallModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.activeMode ? "modal-window modal-window_active" : "modal-window"} onClick={this.props.toggleModal}>
        <div className="modal-window-content animation-scale" onClick={(e) => e.stopPropagation()}>
          <CloseModal className="icon_modal" onClick={this.props.toggleModal} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SmallModal
