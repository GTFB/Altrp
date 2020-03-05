import React, {Component} from "react";
import DropTarget from './js/components/DropTarget'
import {hot} from "react-hot-loader/index";
import Backend from "react-dnd-html5-backend";
import NewSection from "./js/components/NewSection";
import {getEditor} from "./js/helpers";


class EditorContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editorWindow = React.createRef();

    window.altrpEditorContent = this;
  }

  // log(e){
  //   e.preventDefault();
  //   console.log(e);
  // }
  //
  // onDragOver (e) {
  //   let event = e ;
  //   event.stopPropagation();
  // }
  //
  // onDragEnter  (e) {
  //   let event = e ;
  //   event.stopPropagation();
  // }
  onDragOver(e) {
    // console.log(e);
    e.preventDefault();
  }

  onDragEnter(e) {
    // console.log(e);
    e.preventDefault();
  }


  componentDidMount() {
    let rootElement = getEditor().modules.templateDataStorage.getRootElement();
    this.setState({
      rootElement
    })
  }

  render() {
    return <div className="editor-content d-flex flex-column justify-center align-content-center"
                ref={this.editorWindow}
                onDragOver={this.onDragOver}

                onDragEnter={this.onDragEnter}>
      {
        this.state.rootElement ? React.createElement(
            this.state.rootElement.componentClass,{
              settings: {},
              children: this.state.rootElement.children,
              element:this.state.rootElement,
            }

        ) : ''
      }
      <NewSection />
    </div>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = EditorContent
} else {
  _export = hot(module)(EditorContent);
}
export default EditorContent