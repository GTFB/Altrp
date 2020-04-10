import React from "react";
import ReactDOM from "react-dom";
import FrontApp from './FrontApp'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Front App', 'color: #343B4C; font-size: 24px; font-weight: 900;');
}

ReactDOM.render(<FrontApp/>, document.getElementById("front-app"));
