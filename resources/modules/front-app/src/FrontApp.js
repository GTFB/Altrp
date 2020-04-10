import React, {Component} from "react";
import {hot} from "react-hot-loader";
import {getTemplates} from "./js/helpers";

class FrontApp extends Component {
  constructor(props){
    super(props);
    window.frontApp = this;
    this.getTemplates().then(Templates => {
      this.templates = Templates.default
    });
    this.getTemplates().then(Templates => {
    console.log(this.templates === Templates.default);
    });
  }
  getTemplates(){
    return getTemplates();
  }
  onClick(){
    this.getTemplates().then(Templates => {
      console.log(this.templates === Templates.default);
    });
  }
  render(){
    return <h1 onClick={this.onClick.bind(this)}>FRONT APP</h1>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = FrontApp;
} else {
  _export = hot(module)(FrontApp);
}

export default _export;
