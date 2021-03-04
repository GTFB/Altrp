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

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, } from 'react-dnd'

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
    // get current user
    let currentUser = await new Resource({ route: "/ajax/current-user" }).getAll();
    currentUser = currentUser.data;
    appStore.dispatch(changeCurrentUser(currentUser));


    let pusherKey = await new Resource({ route: "/admin/ajax/settings" }).get("pusher_app_key");
    let websocketsPort = await new Resource({ route: "/admin/ajax/settings" }).get("websockets_port");
    
    pusherKey = pusherKey?.pusher_app_key;
    websocketsPort = websocketsPort?.websockets_port;

    console.log(websocketsPort);

    // Проверка наличия ключа и порта
    if(pusherKey && websocketsPort){
      try {
        window.Pusher = require("pusher-js");
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: pusherKey,
          wsHost: window.location.hostname,
          wsPort: websocketsPort,
          forceTLS: false,
          disableStats: true
        });
        console.log("Вебсокеты включены");

      } catch (error) {
        console.log(error);
      }

      // Подключение слушателя канала
      window.Echo.private("App.User." + currentUser.id)
      .notification((notification) => {
        // Запись пришедших по каналу уведомлений в appStore
        appStore.dispatch(setUserNotice(notification));
        console.log(appStore.getState().currentUser, 'STORE NOTICE');
      });  

    } else {
     console.log("Вебсокеты выключены");
    }
  }
  
  render() {
    return (
      <Provider store={appStore}>
        <DndProvider backend={HTML5Backend}>
          <AppContent />
        </DndProvider>
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
