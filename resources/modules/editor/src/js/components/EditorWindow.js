import React, {Component} from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import DropTarget from "./DropTarget";
import Heading from "./widgets/Heading";
import HeadingElement from "../classes/elements/Heading";

const FrameBindingContext = ({ children }) => (
    <FrameContextConsumer>
      {({ window }) => (
          <DndProvider backend={HTML5Backend} context={window}>
            {children}
          </DndProvider>
      )}
    </FrameContextConsumer>
);

class EditorWindow extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {

    return <div className="editor-window">
      {
        this.state.rootElement ? React.createElement(
            this.state.rootElement.componentClass,{
              settings: {},
              children: this.state.rootElement.children,
              element:this.state.rootElement,
            }

        ) : ''
      }
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