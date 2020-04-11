import React, {Component} from "react";
import {hot} from "react-hot-loader";
import {getRoutes, getTemplates} from "./js/helpers";
import appStore from "./js/store/store";
import AppContent from "./js/components/AppContent";
import {Provider} from 'react-redux'

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
    return <Provider store={appStore}>
      <AppContent/>
    </Provider>;
  }
}

let _export;
if (process.env.NODE_ENV === 'production') {
  _export = FrontApp;
} else {
  _export = hot(module)(FrontApp);
}

export default _export;
