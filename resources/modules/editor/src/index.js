import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./installing";
import ElementsManager from "./js/classes/modules/ElementsManager";
import ControllersManager from "./js/classes/modules/ControllersManager";
import store from "../src/js/store/store";
import _ from "lodash";
import IconsManager from "./js/classes/modules/IconsManager";
import "./sass/editor-style.scss";

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = Component;

// Websockets import
// let mix = require('laravel-mix');
// require('dotenv').config();
// let my_env_key = process.env.MIX_PUSHER_APP_KEY;

import Echo from "laravel-echo"
window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 324345,
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});

window._ = _;
window.iconsManager = new IconsManager();

window.stylesModulePromise = new Promise(function (resolve) {
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

// window.ReactDOM.render(<Editor/>, editorTarget);
/**
 * Импортируем компонент редактора Editor
 */
import("./Editor.js")
  .then((Editor) => {
    Editor = Editor.default;

    let editorTarget = document.getElementById("editor");
    if (editorTarget) {
      window.ReactDOM.render(<Editor />, editorTarget);
    }

    return import("./EditorContent");
  })
  .then((EditorContent) => {
    EditorContent = EditorContent.default;

    window.onload = () => {
      let iframe = document.getElementsByTagName("iframe")[0];
      if (!iframe) {
        return;
      }
      let editorContentTarget = iframe.contentWindow.document.getElementById(
        "editor-content"
      );

      if (editorContentTarget) {
        ReactDOM.render(<EditorContent />, editorContentTarget);
      }
      if (process.env.NODE_ENV === "production") {
        let head = iframe.contentWindow.document.getElementsByTagName(
          "head"
        )[0];
        let styleLink = iframe.contentWindow.document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = `/modules/editor/editor.css?${_altrpVersion}`;
        head.appendChild(styleLink);
      } else
        {
        let head = iframe.contentWindow.document.getElementsByTagName(
          "head"
        )[0];
        let script = iframe.contentWindow.document.createElement("script");
        script.src = "http://localhost:3000/src/bundle.js";
        script.defer = "http://localhost:3000/src/bundle.js";
        head.appendChild(script);
      }
    };
  });
