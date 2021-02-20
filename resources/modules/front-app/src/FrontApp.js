import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { getRoutes } from "./js/helpers";
import appStore from "./js/store/store";
import AppContent from "./js/components/AppContent";
import { Provider } from "react-redux";
import Resource from "../../editor/src/js/classes/Resource";
import { changeCurrentUser } from "./js/store/current-user/actions";
import FontsManager from "./js/components/FontsManager";
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
    let currentUser = await new Resource({
      route: "/ajax/current-user"
    }).getAll();
    currentUser = currentUser.data;
    appStore.dispatch(changeCurrentUser(currentUser));
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
