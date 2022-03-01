import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {io} from "socket.io-client";
import getCookie from "../../editor/src/js/helpers/getCookie";
import {v4 as uuid} from "uuid";

window.React = React;
window.Component = Component;
window.ReactDOM = ReactDOM;

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Admin Page', 'color: #87CA00; font-size: 24px; font-weight: 900;');
}


import('react').then((_export) => {
  window.React = _export.default;
  window.Component = _export.Component;
  return import('react-dom');
}).then((_export) => {
  window.ReactDOM = _export.default;
  return import('./installing')
}).then((_export) => {
  return import('../../editor/src/js/classes/modules/IconsManager');
}).then((_export) => {
  window.iconsManager = new _export.default();
  return import('./Admin.js')
}).then(async (_export) => {
  window.Admin = _export.default;
  let store = (await import("./js/store/store")).default;

  ReactDOM.render(<Provider store={store}>
    <window.Admin  />
  </Provider>, document.getElementById('admin'));
});
