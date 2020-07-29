import React, { Component } from "react";
import { getCurrentScreen } from "../store/store";
import { connect } from "react-redux";

class EditorWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.currentScreen);
    return <div style={{ width: this.props.currentScreen.width, height: this.props.currentScreen.height }} className={"editor-window"} id="editorWindow">

      {/*<Frame>*/}
      {/*<FrameBindingContext>*/}
      {/*<DropTarget/>*/}
      {/*</FrameBindingContext>*/}
      {/*</Frame>*/}
      {/*<Frame src="/admin/editor-content" >*/}
      {/*<FrameBindingContext/>*/}
      {/*</Frame>*/}
      {/*<FrameContextConsumer>*/}
      <iframe src="/admin/editor-content" width="100%" />
      {/*</FrameContextConsumer>*/}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen
  }
}


export default connect(mapStateToProps)(EditorWindow)