import React, {Component} from "react";
import {hot} from "react-hot-loader";
import {getRoutes} from "./js/helpers";
import appStore from "./js/store/store";
import AppContent from "./js/components/AppContent";
import {Provider} from 'react-redux';

class FrontApp extends Component {
  constructor(props){
    super(props);
    window.frontApp = this;
    this.getRoutes();
  }
  getRoutes(){
    return getRoutes().then(res => {
      this.routes = res.default;
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
