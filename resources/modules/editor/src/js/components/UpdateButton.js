import Chevron from "../../svgs/chevron.svg";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getEditor } from "../helpers";
import CONSTANTS from "../consts";
const TEMPLATE_TYPES_WITHOUT_CONDITIONS = [
  'email',
];
class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowed: false
    };
    this.saveTemplate = this.saveTemplate.bind(this);
  }
  async saveTemplate(e) {
    const { templateData, previewTab } = this.props;

    await getEditor().modules.saveImportModule.saveTemplate();

    if (previewTab && !previewTab.closed) {
      const newTabUrl = `/admin/altrp-template-preview/${templateData.guid}`;

      previewTab.location.href = newTabUrl;
    }
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
    let showTemplateConditions = true;
    if(this.props.templateData.template_type
        && (TEMPLATE_TYPES_WITHOUT_CONDITIONS.indexOf(this.props.templateData.template_type) >= 0)){
      showTemplateConditions = false;
    }
    return (
      <div className={"control-group d-flex " + (showTemplateConditions ? '' : 'control-group_single')}>
        <button className={buttonClasses} onClick={this.saveTemplate}>
          UPDATE
        </button>
        {showTemplateConditions && <button onClick={() => this.showModal()} className="btn btn_grey">
          <Chevron className="icon" />
        </button>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    templateStatus: state.templateStatus.status,
    templateData: state.templateData,
    previewTab: state.portalStatus.previewTab,
  };
}
export default connect(mapStateToProps)(UpdateButton);
