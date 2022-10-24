import Chevron from "../../svgs/chevron.svg";
import React, { Component } from "react";
import { connect } from "react-redux";
import clsx from 'clsx';
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
  updateTemplate(e) {
    getEditor().modules.saveImportModule.updateTemplate();
  }
  showModal() {
    this.props.toggleModalWindow();
  }

  render() {
    let showTemplateConditions = true;
    const { templateData, templateStatus } = this.props;
    if(templateData.template_type
        && (TEMPLATE_TYPES_WITHOUT_CONDITIONS.indexOf(templateData.template_type) >= 0)){
      showTemplateConditions = false;
    }
    return (
      <div
        className={clsx('control-group d-flex group-hover', {
          'control-group_single': !showTemplateConditions
        })}
      >
        <button
          className={clsx('btn font_montserrat font_500 btn_grey btn-publish group-hover-visible', {
            btn_disabled: templateStatus === CONSTANTS.TEMPLATE_PUBLISHED,
            btn_active: templateStatus === CONSTANTS.TEMPLATE_NEED_UPDATE,
          })}
          onClick={this.saveTemplate}
        >
          PUBLISH
        </button>
        <button
          className={clsx('btn font_montserrat font_500 btn_grey btn-update', {
            btn_disabled: [CONSTANTS.TEMPLATE_UPDATED, CONSTANTS.TEMPLATE_PUBLISHED].includes(templateStatus),
            btn_active: templateStatus === CONSTANTS.TEMPLATE_NEED_UPDATE,
          })}
          onClick={this.updateTemplate}
        >
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
