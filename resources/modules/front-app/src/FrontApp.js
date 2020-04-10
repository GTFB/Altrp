import React, {Component} from "react";
import {hot} from "react-hot-loader";
import {getRoutes, getTemplates} from "./js/helpers";

class FrontApp extends Component {
  constructor(props){
    super(props);
    window.frontApp = this;
    this.getTemplates();
    this.getRoutes();
  }
  getTemplates(){
    return getTemplates().then(res => {
      this.templates = res.default
    });
  }
  getRoutes(){
    return getRoutes().then(res => {
      this.routes = res.default;
    });
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
