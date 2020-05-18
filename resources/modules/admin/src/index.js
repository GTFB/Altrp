import React from "react";
import ReactDOM from "react-dom";
import Admin from "./Admin.js";
import './installing';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Admin Page', 'color: #87CA00; font-size: 24px; font-weight: 900;');
}

ReactDOM.render(<Admin/>, document.getElementById('admin'));

