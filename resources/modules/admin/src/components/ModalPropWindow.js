import CloseModal from "../svgs/clear_black.svg";
import React from "react";
import AddRelationForm from "./models/AddRelationForm";
import "./../sass/components/ModalRelationWindow.scss";
import PropForm from "./models/PropForm";


class ModalPropWindow extends React.Component {


  render() {
    return (
      <div
        className={this.props.activeMode ? "modal-relation-window modal-relation-window_active" : "modal-relation-window"}
        onClick={this.props.toggleModal}>
        <div className="modal-relation-window_content" onClick={(e) => e.stopPropagation()}>
          <CloseModal className="icon_modal" onClick={this.props.toggleModal} />
          <PropForm modelId={this.props.modelId}
                    prop_name={this.props.prop_name}
                    toggleModal={this.props.toggleModal} />
        </div>
      </div>
    );
  }
}


export default ModalPropWindow
