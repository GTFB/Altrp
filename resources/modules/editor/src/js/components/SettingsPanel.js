import React, {Component} from "react";
import {connect} from 'react-redux';

class SettingsPanel extends Component {

  render() {
    console.log(this.props.currentElement);
    console.log(this.state);
    return <div className="settings-panel">
      SettingsPanel
    </div>
  }
}
function mapStateToProps(state) {
  return{
    currentElement:state.currentElement.currentElement
  };
}
export default connect(mapStateToProps)(SettingsPanel);