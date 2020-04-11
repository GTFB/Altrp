import React from "react";
import ReactDOM from "react-dom";
import FrontApp from './FrontApp'
import FrontElementsManager from './js/classes/FrontElementsManager';
import FrontElementsFabric from './js/classes/FrontElementsFabric';
import './sass/front-style.scss';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('%cWelcome to Altrp Front App', 'color: blue; font-size: 24px; font-weight: 900;');
}
ReactDOM.render(<FrontApp/>, document.getElementById("front-app"));
