import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { getRoutes } from "./js/helpers";
import appStore from "./js/store/store";
import AppContent from "./js/components/AppContent";
import { Provider } from "react-redux";
import Resource from "../../editor/src/js/classes/Resource";
import { changeCurrentUser, setUserNotice } from "./js/store/current-user/actions";
import FontsManager from "./js/components/FontsManager";

class FrontApp extends Component {
  constructor(props) {
    super(props);
    window.frontApp = this;
    this.getRoutes();
  }
  getRoutes() {
    return getRoutes().then(res => {
      this.routes = res.default;
    });
  }

  /**
   * Обновляем текущего пользователя
   */
  async componentDidMount() {
    let currentUser = await new Resource({
      route: "/ajax/current-user"
    }).getAll();
    currentUser = currentUser.data;
    appStore.dispatch(changeCurrentUser(currentUser));
    
    // Websockets
    window.Echo.private("App.User." + currentUser.id)
    .notification((notification) => {
      console.log(notification, "new notice");
      appStore.dispatch(setUserNotice(notification));
      console.log(appStore.getState().currentUser.data, 'STORE NOTICE');
    });
  }
  
  render() {
    return (
      <Provider store={appStore}>
        <AppContent />
        <FontsManager />
      </Provider>
    );
  }
}

let _export;
if (process.env.NODE_ENV === "production") {
  _export = FrontApp;
} else {
  _export = hot(module)(FrontApp);
}

export default _export;
