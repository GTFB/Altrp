import React, {Component} from "react";


class EditorWindow extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {

    return  <div className="editor-window" id="editorWindow">

      {/*<Frame>*/}
        {/*<FrameBindingContext>*/}
          {/*<DropTarget/>*/}
        {/*</FrameBindingContext>*/}
      {/*</Frame>*/}
      {/*<Frame src="/admin/editor-content" >*/}
        {/*<FrameBindingContext/>*/}
      {/*</Frame>*/}
      {/*<FrameContextConsumer>*/}
      <iframe src="/admin/editor-content" width="100%"/>
      {/*</FrameContextConsumer>*/}
    </div>
  }
}

export default EditorWindow