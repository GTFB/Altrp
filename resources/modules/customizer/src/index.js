import '../../front-app/src/js/libs/react-lodash'
import '../../front-app/src/js/libs/ckeditor'
// import '../../front-app/src/js/libs/altrp'
import '../../front-app/src/js/libs/moment'
import React, { Component } from "react";
import ReactDOM from "react-dom";
import CustomizerEditor from "./CustomizerEditor";
import store from "./js/store/store";
import _ from "lodash";
import IconsManager from "../../editor/src/js/classes/modules/IconsManager";
import "./sass/styles.scss";
import {Provider} from 'react-redux';
import AltrpCustomizer from "./js/classes/AltrpCustomizer";
import {io} from "socket.io-client";

window.altrpIo = io( {
  path: '/wsaltrp',
  auth: {
  },
})

window.React = React;
window.ReactDOM = ReactDOM;
window.Component = Component;

window._ = _;
window.iconsManager = new IconsManager();
window.altrpCustomizer = new AltrpCustomizer();

window.customizerStore = store;

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log(
    "%cWelcome to Altrp Customizer",
    "color: red; font-size: 24px; font-weight: 900;"
  );
}

let customizerTarget = document.getElementById("customizer-editor");

if (customizerTarget) window.ReactDOM.render(<Provider store={store}><CustomizerEditor /></Provider>, customizerTarget);
