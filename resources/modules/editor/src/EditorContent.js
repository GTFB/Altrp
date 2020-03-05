import React, {Component} from "react";
import DropTarget from './js/components/DropTarget'
import {hot} from "react-hot-loader/index";
import Backend from "react-dnd-html5-backend";
import NewSection from "./js/components/NewSection";


class EditorContent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    console.log(this.myRef);
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
  componentDidMount() {
    console.log(this.myRef.current.__proto__);
    this.myRef.current.ondrop = e => {
      console.log(e);
    };
    this.myRef.current.onmouseup = e => {
      console.log(e);
    };
  }

  render() {
    // console.log(window.parent);
    return <div ref={this.myRef} >
          <div className="editor-content"
            // onDrop={this.log} onDragEnter={this.onDragEnter}
            // onDragOver={this.onDragOver}  onClick={this.log}
        >
          <NewSection/>
        </div>
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