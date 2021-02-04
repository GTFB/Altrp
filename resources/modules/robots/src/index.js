import React, { Component } from "react";
import ReactDOM from "react-dom";
import RobotsEditor from "./RobotsEditor";
import store from "./js/store/store";
import _ from "lodash";
import IconsManager from "../../editor/src/js/classes/modules/IconsManager";
import "./sass/styles.scss";

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = Component;

window._ = _;
window.iconsManager = new IconsManager();

window.robotStore = store;

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log(
    "%cWelcome to Altrp Robots",
    "color: red; font-size: 24px; font-weight: 900;"
  );
}

let robotsTarget = document.getElementById("robots-editor");

if (robotsTarget) window.ReactDOM.render(<RobotsEditor />, robotsTarget);