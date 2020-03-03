import React, {Component} from "react";
import DropTarget from './js/components/DropTarget'
import {hot} from "react-hot-loader/index";
import Backend from "react-dnd-html5-backend";
import {DndProvider} from 'react-dnd'
import NewSection from "./js/components/NewSection";


class EditorContent extends Component {
  render() {
    console.log(window.parent);
    return <DndProvider backend={Backend} context={window.parent}>
      <div className="editor-content">
        <NewSection/>
      </div>
    </DndProvider>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = EditorContent
} else {
  _export = hot(module)(EditorContent);
}
export default EditorContent