import React, {Component} from "react";


class EditorWindow extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {

    return  <div className="editor-window">

      {/*<Frame>*/}
        {/*<FrameBindingContext>*/}
          {/*<DropTarget/>*/}
        {/*</FrameBindingContext>*/}
      {/*</Frame>*/}
      {/*<Frame src="/admin/editor-content" >*/}
        {/*<FrameBindingContext/>*/}
      {/*</Frame>*/}
      {/*<FrameContextConsumer>*/}
      <iframe src="/admin/editor-content" />
      {/*</FrameContextConsumer>*/}
    </div>
  }
}

export default EditorWindow