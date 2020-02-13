import React, { Component } from "react";
import './sass/style.scss';

import {hot} from "react-hot-loader";

class App extends Component{
  render(){
    return(
        <div className="App">
          <h1> Hello, World! </h1>
        </div>
    );
  }
}
console.log(App);

export default hot(module)(App);