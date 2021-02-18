import { connect } from "react-redux";
import React, {Component} from "react";

class EmailTemplatesRenderer extends Component {
  render(){
    if(! this.props.currentEmailTemplate){
      return null
    }
    return <pre id="email-renderer"
                style={{display: 'flex',}}>
      {JSON.stringify(this.props.currentEmailTemplate, null, '\t')}
    </pre>
  }
}

function mapStateToProps(state) {
  return {
    altrpresponses: state.altrpresponses,
    formsStore: state.formsStore,
    currentDataStorage: state.currentDataStorage,
    currentModel: state.currentModel,
    currentUser: state.currentUser,
    altrpMeta: state.altrpMeta,
    altrpPageState: state.altrpPageState,
    currentEmailTemplate: state.currentEmailTemplate,
  };
}

export default connect(mapStateToProps)(EmailTemplatesRenderer)