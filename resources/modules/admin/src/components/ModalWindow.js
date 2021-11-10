import React, { Component } from "react";
import CloseModal from "./../svgs/clear_black.svg";
import "./../sass/components/ModalWindow.scss";
import AddFieldFormModal from "./models/AddFieldFormModal";
import Resource from "../../../editor/src/js/classes/Resource";
import {connect} from "react-redux";


class ModalWindow extends Component {
  constructor(props) {
    super(props);

    this.filedsResource = new Resource({ route: `/admin/ajax/models/${this.props.modelId}/fields` });
  }


  onSubmit = async (data, isNeedToCheckName) => {

    if (isNeedToCheckName) {
      fetch(`/admin/ajax/models/${this.props.modelId}/field_name_is_free/?name=${data.name}`)
        .then(res => res.json())
        .then(res => {
          if (!res.taken) return alert(`Name ${data.name} is already taken. Use another one.`);
        });
    }

    if (this.props.modelReduxID) {
      await this.filedsResource.put(this.props.modelReduxID, data);
      this.props.toggleModal();
    } else {
      await this.filedsResource.post(data);
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={this.props.activeMode ? "modal-window modal-window_active" : "modal-window"} onClick={this.props.toggleModal}>
        <div className="modal-window-content" onClick={(e) => e.stopPropagation()}>
           <CloseModal className="icon_modal" onClick={this.props.toggleModal} />
           <AddFieldFormModal onSubmit={this.onSubmit} modelId={this.props.modelId}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modelReduxID: state.modelsState.modelID
  }
}

ModalWindow = connect(mapStateToProps)(ModalWindow)

export default ModalWindow;
