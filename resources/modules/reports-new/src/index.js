import React, { Component, Provider } from "react";
import ReactDOM from "react-dom";
import "../../editor/src/installing";
import ReportsElementManager from "./js/classes/ReportsElementManager";
import ControllersManager from "../../editor/src/js/classes/modules/ControllersManager";
import store from "./js/store/store";
import _ from "lodash";
import "../../editor/src/sass/editor-style.scss";
import IconsManager from "../../editor/src/js/classes/modules/IconsManager";

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = Component;

window._ = _;
window.iconsManager = new IconsManager();

window.stylesModulePromise = new Promise(function(resolve) {
  window.stylesModuleResolve = resolve;
});

window.elementsManager = new ReportsElementManager();
window.controllersManager = new ControllersManager();
window.controllersManager.init();
window.reportsStore = store;

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log(
    "%cWelcome to Altrp Editor",
    "color: red; font-size: 24px; font-weight: 900;"
  );
}

import("./Reports")
  .then(Reports => {
    Reports = Reports.default;
    let reportsTarget = document.getElementById("reports");
    if (reportsTarget) {
      window.ReactDOM.render(<Reports />, reportsTarget);
    }
    return import("./ReportsContent");
  })
  .then(ReportsContent => {
    ReportsContent = ReportsContent.default;
    const { Provider } = import("react");
    window.onload = () => {
      let iframe = document.getElementsByTagName("iframe")[0];
      if (!iframe) {
        return;
      }
      let reportsContentTarget = iframe.contentWindow.document.getElementById(
        "reports-content"
      );

      if (reportsContentTarget) {
        ReactDOM.render(<ReportsContent />, reportsContentTarget);
      }
      if (process.env.NODE_ENV === "production") {
        let head = iframe.contentWindow.document.getElementsByTagName(
          "head"
        )[0];
        let styleLink = iframe.contentWindow.document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = `/modules/editor/editor.css?${_altrpVersion}`;
        head.appendChild(styleLink);
      } else {
        let head = iframe.contentWindow.document.getElementsByTagName(
          "head"
        )[0];
        let script = iframe.contentWindow.document.createElement("script");
        script.src = "http://localhost:3005/src/bundle.js";
        script.defer = "http://localhost:3005/src/bundle.js";
        head.appendChild(script);
      }
    };
  });
