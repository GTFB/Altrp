import Chevron from "../../svgs/chevron.svg";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getEditor } from "../helpers";
import CONSTANTS from "../consts";

class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowed: false
    };
    this.saveTemplate = this.saveTemplate.bind(this);
  }
  saveTemplate(e) {
    getEditor().modules.saveImportModule.saveTemplate();
  }
  showModal() {
    this.props.toggleModalWindow();
  }

  render() {
    let buttonClasses = "btn font_montserrat font_500 btn_grey";
    switch (this.props.templateStatus) {
      case CONSTANTS.TEMPLATE_UPDATED:
        {
          buttonClasses += " btn_disabled ";
        }
        break;
      case CONSTANTS.TEMPLATE_NEED_UPDATE:
        {
          buttonClasses += " btn_active ";
        }
        break;
    }
    return (
      <div className="control-group d-flex">
        <button className={buttonClasses} onClick={this.saveTemplate}>
          UPDATE
        </button>
        <button onClick={() => this.showModal()} className="btn btn_grey">
          <Chevron className="icon" />
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    templateStatus: state.templateStatus.status
  };
}
export default connect(mapStateToProps)(UpdateButton);
