import React from "react";
import ReactDOM from "react-dom";
import Editor from "./Editor.js";
import ElementsManager from './js/classes/modules/ElementsManager';
import ControllersManager from './js/classes/modules/ControllersManager';
import EditorContent from "./EditorContent";
import store from '../src/js/store/store'

window.elementsManager = new ElementsManager();
window.controllersManager = new ControllersManager();
window.editorStore = store;

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Editor', 'color: red; font-size: 24px; font-weight: 900;');
}

let editorTarget = document.getElementById("editor");

if(editorTarget){
  ReactDOM.render(<Editor/>, editorTarget);
}
let editorContentTarget = document.getElementById("editor-content");

if(editorContentTarget){
  ReactDOM.render(<EditorContent/>, editorContentTarget);

}


