import { Provider } from "react-redux";
import ElementsManager from "./js/classes/modules/ElementsManager";
import ControllersManager from "./js/classes/modules/ControllersManager";
import store from "../src/js/store/store";
import IconsManager from "./js/classes/modules/IconsManager";
import "./sass/editor-style.scss";
import controllerHistory from "./js/classes/ControllerHistory";
import {io} from "socket.io-client";

// window.altrpIo = io( {
//   path: '/wsaltrp',
//   auth: {
//   },
// })

window.iconsManager = new IconsManager();

window.stylesModulePromise = new Promise(function(resolve) {
  window.stylesModuleResolve = resolve;
});

window.elementsManager = new ElementsManager();
window.controllersManager = new ControllersManager();
window.controllersManager.init();
window.editorStore = store;

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log(
    "%cWelcome to Altrp Editor",
    "color: red; font-size: 24px; font-weight: 900;"
  );
}

function loadEditorContent(EditorContent){

  let iframe = document.getElementsByTagName("iframe")[0];

  window.EditorFrame = iframe;
  if (!iframe) {
    return;
  }
  let editorContentTarget = iframe.contentDocument.getElementById(
    "editor-content"
  );
  console.log(iframe.contentDocument.readyState);

  if (editorContentTarget) {
    ReactDOM.render(<EditorContent />, editorContentTarget);
  } else if(iframe.contentDocument.readyState === 'complete'){
    editorContentTarget = iframe.contentDocument.getElementById(
      "editor-content"
    );
    console.error(editorContentTarget);
    if (editorContentTarget) {
      ReactDOM.render(<EditorContent />, editorContentTarget);
    }
  }else{
    // DOMContentLoaded
    iframe.contentDocument.addEventListener('DOMContentLoaded', ()=>{
      editorContentTarget = iframe.contentDocument.getElementById(
        "editor-content"
      );

      if (editorContentTarget) {
        ReactDOM.render(<EditorContent />, editorContentTarget);
      }
    })
  }
  if (process.env.NODE_ENV === "production") {
    let head = iframe.contentWindow.document.getElementsByTagName(
      "head"
    )[0];
    let styleLink = iframe.contentWindow.document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = `/modules/editor/editor.css?${_altrpVersion}`;
    head.appendChild(styleLink);
    head.appendChild(document.querySelector('[data-cke]').cloneNode(true));
  } else {
    let head = iframe.contentWindow.document.getElementsByTagName(
      "head"
    )[0];
    let script = iframe.contentWindow.document.createElement("script");
    script.src = "http://127.0.0.1:3000/src/bundle.js";
    script.defer = "http://127.0.0.1:3000/src/bundle.js";
    head.appendChild(script);
  }

  function listenerHistory(event) {
    let charCode = String.fromCharCode(event.which).toLowerCase()
    if (window.parent.appStore.getState().historyStore.active) {
      if ((event.ctrlKey || event.metaKey) && charCode === 'z' && event.shiftKey) {
        controllerHistory.redo();
      } else if ((event.ctrlKey || event.metaKey) && charCode === 'z') {
        controllerHistory.undo();
      }
    }
  }
  window.addEventListener("keydown", listenerHistory, false);
  window.EditorFrame.contentWindow.addEventListener(
    "keydown",
    listenerHistory,
    false
  );
}
// window.ReactDOM.render(<Editor/>, editorTarget);
/**
 * Импортируем компонент редактора Editor
 */
import(/* webpackChunkName: 'Editor' */"./Editor.js")
  .then(Editor => {

    let editorTarget = document.getElementById("editor");

    if (editorTarget) {
      window.ReactDOM.render(
        <Provider store={store}>
          <Editor.default />
        </Provider>,
        editorTarget
      );
    }

    return import(/* webpackChunkName: 'EditorContent' */"./EditorContent");
  })
  .then(EditorContent => {
    EditorContent = EditorContent.default;
    let iframe = document.getElementsByTagName("iframe")[0];

    if(iframe && iframe.contentDocument.getElementById(
      "editor-content"
    )){
      loadEditorContent(EditorContent)
    } else if(iframe){
      iframe.onload = ()=>{
        loadEditorContent(EditorContent)
      }
    }else {

      document.addEventListener('altrp-editor-modules-initialized', ()=>{
        let iframe = document.getElementsByTagName("iframe")[0];
        if(iframe && iframe.contentDocument.getElementById(
          "editor-content"
        )){
          loadEditorContent(EditorContent)
        } else if(iframe){
          iframe.onload = ()=>{
            loadEditorContent(EditorContent)
          }
        }

      })
    }
  });
