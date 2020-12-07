import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./sass/front-style.scss";
import "./js/classes/FrontElementsFabric";
import "./js/classes/FrontElementsManager";
import "./installing";
window.React = React;
window.ReactDOM = ReactDOM;
window.Component = Component;

import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
window.Echo = new Echo({
  broadcaster: "pusher",
  // key: process.env.MIX_PUSHER_APP_KEY,
  key: 123456,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true
});

window.stylesModulePromise = new Promise(function(resolve) {
  window.stylesModuleResolve = resolve;
});

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log(
    "%cWelcome to Altrp Front App",
    "color: blue; font-size: 24px; font-weight: 900;"
  );
}
import("../../editor/src/js/classes/modules/IconsManager").then(
  IconsManager => {
    window.iconsManager = new IconsManager.default();
  }
);
import("./FrontApp").then(FrontApp => {
  FrontApp = FrontApp.default;
  ReactDOM.render(<FrontApp />, document.getElementById("front-app"));
});
