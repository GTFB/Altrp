import React from "react";
import ReactDOM from "react-dom";
import Editor from "./Editor.js";

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Editor', 'color: red; font-size: 24px; font-weight: 900;');
}

ReactDOM.render(<Editor/>, document.getElementById("editor"));

