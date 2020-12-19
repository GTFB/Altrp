import React, { Component } from "react";
import { hot } from "react-hot-loader";
import appStore from "../../front-app/src/js/store/store";
import AreaComponent from "../../front-app/src/js/components/AreaComponent";
import { Scrollbars } from "react-custom-scrollbars";
import { Provider } from "react-redux";
import Resource from "../../editor/src/js/classes/Resource";
import { changeCurrentUser } from "../../front-app/src/js/store/current-user/actions";
import AltrpModel from "../../editor/src/js/classes/AltrpModel";
import { changeCurrentModel } from "../../front-app/src/js/store/current-model/actions";
import dataStorageUpdater from "../../front-app/src/js/classes/modules/DatastorageUpdater";
import { clearElements } from "../../front-app/src/js/store/elements-storage/actions";
import { clearAllResponseData } from "../../front-app/src/js/store/responses-storage/actions";
import { clearPageState } from "../../front-app/src/js/store/altrp-page-state-storage/actions";
import pageLoader from "../../front-app/src/js/classes/PageLoader";
import { getRoutes } from "../../front-app/src/js/helpers";
import Area from "../../front-app/src/js/classes/Area";
import _ from "lodash";
import Datasource from "../../front-app/src/js/classes/Datasource";
// import ExportPanel from "./ExportPanel";

class ReportsContent extends Component {
  constructor(props) {
    super(props);
    window.frontApp = this;
    this.state = {
      areas: this.props.areas || [],
      currentRoute: []
    };
    this.scrollbar = React.createRef();
    appStore.dispatch(clearElements());
  }
  /**
   * Обновляем текущего пользователя
   */
  async componentDidMount() {
    let currentUser = await new Resource({
      route: "/ajax/current-user"
    }).getAll();
    currentUser = currentUser.data;
    let routes = await (await getRoutes()).default?.resource;
    let routeList = await routes.getAll();
    const currentPath = _.find(routeList.pages, {
      path: window.location.pathname
    });

    appStore.dispatch(changeCurrentUser(currentUser));
    window.currentRouterMatch = new AltrpModel(this.props.match);
    window.mainScrollbars = this.scrollbar.current;

    // let page = await pageLoader.loadPage(currentPath.id);
    // let areas = page.areas.map(area => Area.areaFabric(area));
    // this.setState(state => ({
    //   ...state,
    //   areas
    //   // currentRoute: currentPath
    // }));
    /**
     * Меняем текущую модель
     */
    this.changeRouteCurrentModel();
    /**
     * Обнуляем текущее хранилище dataStorage
     */
    dataStorageUpdater.clearCurrent();
    /**
     * Обнуляем хранилище ответов на отправленные формы
     */
    appStore.dispatch(clearAllResponseData());
    /**
     * затем отправляем запросы на обновление данных и altrpPageState
     */
    this.updateDataStorage();
  }

  /**
   * Меняем текущую модель
   */
  async changeRouteCurrentModel() {
    if (
      _.get(this.props, "model.modelName") &&
      _.get(this.props, "match.params.id")
    ) {
      appStore.dispatch(changeCurrentModel({ altrpModelUpdated: false }));
      let model = await new Resource({
        route: `/ajax/models/${this.props.model.modelName}`
      }).get(this.props.match.params.id);
      model.altrpModelUpdated = true;
      appStore.dispatch(changeCurrentModel(model));
    } else {
      appStore.dispatch(changeCurrentModel({ altrpModelUpdated: true }));
    }
  }

  /**
   *  обновление currentDataStorage
   *  Сброс altrpPageState
   */
  async updateDataStorage() {
    /**
     * @member {array} data_sources
     */
    let routes = await (await getRoutes()).default?.resource;
    let routeList = await routes.getAll();
    const currentPath = _.find(routeList.pages, {
      path: window.location.pathname
    });
    let { data_sources } = currentPath;
    data_sources = data_sources.map((item, index) => {
      return new Datasource(item);
    });
    dataStorageUpdater.updateCurrent(data_sources);
    appStore.dispatch(clearPageState());
  }

  render() {
    return (
      <Provider store={appStore}>
        {/* <ExportPanel reportID={this.state.currentRoute.id} /> */}
        {this.state.areas.map(area => {
          return (
            <AreaComponent
              {...area}
              area={area}
              page={this.state.currentRoute.id}
              models={[this.state.currentRoute]}
              key={"appArea_" + area.id}
            />
          );
        })}
      </Provider>
    );
  }
}

let _export;
if (process.env.NODE_ENV === "production") {
  _export = ReportsContent;
} else {
  _export = hot(module)(ReportsContent);
}

export default _export;
