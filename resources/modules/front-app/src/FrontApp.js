import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { getRoutes } from "./js/helpers";
import appStore from "./js/store/store";
import AppContent from "./js/components/AppContent";
import { Provider } from "react-redux";
import Resource from "../../editor/src/js/classes/Resource";
import { changeCurrentUser, setUserNotice } from "./js/store/current-user/actions";
import FontsManager from "./js/components/FontsManager";
import Echo from "laravel-echo";


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
    let currentUser = await new Resource({ route: "/ajax/current-user" }).getAll();
    let pusherKey = await new Resource({ route: "/admin/ajax/settings" }).get("PUSHER_APP_KEY");

    currentUser = currentUser.data;
    appStore.dispatch(changeCurrentUser(currentUser));
    
    pusherKey = pusherKey?.PUSHER_APP_KEY;

    if(pusherKey){
      console.log(pusherKey);
      try {
        window.Pusher = require("pusher-js");
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: pusherKey,
          wsHost: window.location.hostname,
          wsPort: 6001,
          forceTLS: false,
          disableStats: true
        });
      } catch (error) {
        console.log(error);
      }
      
      window.Echo.private("App.User." + currentUser.id)
      .notification((notification) => {
        appStore.dispatch(setUserNotice(notification));
        console.log(appStore.getState().currentUser.data, 'STORE NOTICE');
      });  

    } else {
     console.log("Ошибка получения pusher_key: " + pusherKey);
    }     
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
