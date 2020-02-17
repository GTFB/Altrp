import React, {Component} from "react";
import './sass/style.scss';
import {hot} from "react-hot-loader";
import Modules from "./js/classes/Modules";

class Editor extends Component {

  constructor(props) {
    super(props);
    this.initModules();
  }

  initModules() {
    this.modules = new Modules();
  }

  render() {
    return (
        <div className="editor">
          <h1> Hello, Editor!</h1>
        </div>
    );
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = Editor;
} else {
  _export = hot(module)(Editor);
}

export default _export;
