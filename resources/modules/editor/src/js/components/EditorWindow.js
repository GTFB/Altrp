import React, { Component } from "react";
import { connect } from "react-redux";

class EditorWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div style={{ width: this.props.currentScreen.width, height: this.props.currentScreen.height }} className={"editor-window-page"} id="editorWindow">
      {!this.props.historyStoreActive && <div className="blocking-layer" />}
      <iframe src="/admin/editor-content" id="editorContent" width="100%" />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen,
    historyStoreActive: state.historyStore.active
  }
}


export default connect(mapStateToProps)(EditorWindow)
