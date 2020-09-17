// import React from "react";
// import ReactDOM from "react-dom";
// import Admin from "./Admin.js";
// import './installing';
// import IconsManager from "../../editor/src/js/classes/modules/IconsManager";

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Admin Page', 'color: #87CA00; font-size: 24px; font-weight: 900;');
}
// ReactDOM.render(<Admin/>, document.getElementById('admin'));


import('react').then((_export)=>{
  window.React = _export.default;
  window.Component = _export.Component;
  return import('react-dom');
}).then((_export)=>{
  window.ReactDOM = _export.default;
  return import('./installing')
}).then((_export)=>{
  return import('../../editor/src/js/classes/modules/IconsManager');
}).then((_export)=>{
  window.iconsManager = new _export.default();
  return import('./Admin.js')
}).then((_export)=>{
  window.Admin =  _export.default;
  ReactDOM.render(<Admin/>, document.getElementById('admin'));
});