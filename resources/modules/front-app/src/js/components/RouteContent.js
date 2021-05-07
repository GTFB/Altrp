if (typeof window === "undefined") {
  global.window = {};
  global.window.ssr = true;
}
if (typeof document === "undefined") {
  global.document = {};
}
import React, { Component, Suspense } from "react";
import AreaComponent from "./AreaComponent";
const AdminBar = React.lazy(() => import("./AdminBar"));
import { Scrollbars } from "react-custom-scrollbars";
import { Redirect, withRouter } from "react-router-dom";
import pageLoader from "./../classes/PageLoader";
import Area from "../classes/Area";
import Resource from "../../../../editor/src/js/classes/Resource";
import appStore from "../store/store";
import { changeCurrentModel } from "../store/current-model/actions";
import { queryCache } from "react-query";
import { connect } from "react-redux";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import { setScrollValue } from "../store/scroll-position/actions";
import dataStorageUpdater from "../classes/modules/DatastorageUpdater";
import { clearElements } from "../store/elements-storage/actions";
import { clearAllResponseData } from "../store/responses-storage/actions";
import { clearPageState } from "../store/altrp-page-state-storage/actions";
import { changeCurrentTitle } from "../store/current-title/actions";
import { changeCurrentPageProperty } from "../store/current-page/actions";
import RouteContentWrapper from "./styled-components/RouteContentWrapper";

class RouteContent extends Component {
  constructor(props) {
    super(props);
    let title = this.props.title;
    appStore.dispatch(changeCurrentTitle(title));
    this.state = {
      areas:
        window.ssr === true
          ? this.props.areas.map(area => Area.areaFabric(area))
          : this.props.areas || [],
      admin: this.props.currentUser.hasRoles("admin")
    };
    this.scrollbar = React.createRef();
    this.isReport = window.location?.href.includes("reports") || false;
    appStore.dispatch(clearElements());
    window.currentRouterMatch = new AltrpModel(props.match);
    window.currentPageId = props.id;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      ...state,
      admin: nextProps.currentUser.hasRoles("admin")
    }));
  }
  /**
   * Меняем заголовок страницы
   * лениво подгружаем области, если необходимо и страница доступна к просмотру
   * главный скролбар сохраняем в глобальной области видимости
   * @return {Promise<void>}
   */
  async componentDidMount() {
    window.mainScrollbars = this.scrollbar.current;

    /**
     * Запускаем обновление списка страниц
     */
    appStore.dispatch(changeCurrentPageProperty("url", location.href));
    if (this.props.lazy && this.props.allowed) {
      let page = await pageLoader.loadPage(this.props.id);
      let areas = page.areas.map(area => Area.areaFabric(area));
      this.setState(state => ({
        ...state,
        areas
      }));
    }

    /**
     * Меняем текущую модель
     */
    this.changeRouteCurrentModel();
    /**
     * Обнуляем хранилище ответов на отправленные формы
     */
    appStore.dispatch(clearAllResponseData());
    /**
     * затем отправляем запросы на обновление данных и altrpPageState
     */
    window.formsManager.clearFieldsStorage();
    this.updateAppData();
  }

  /**
   * Очистим currentDataSource после удаления компонента
   */
  componentWillUnmount() {
    dataStorageUpdater.clearCurrent();
  }
  /**
   *  обновление currentDataStorage
   *  Сброс altrpPageState
   */
  async updateAppData() {
    dataStorageUpdater.clearCurrent();
    if (window.formsManager) {
      formsManager.clearFormsStore();
    }
    /**
     * @member {array} data_sources
     */
    let { data_sources } = this.props;
    dataStorageUpdater.updateCurrent(data_sources);
    appStore.dispatch(clearPageState());
  }
  /**
   * Меняем текущую модель
   */
  async changeRouteCurrentModel() {
    if (
      _.get(this.props, "model.modelName") &&
      _.get(this.props, "match.params.id")
    ) {
      try {
        let model = await new Resource({
          route: `/ajax/models/${this.props.model.modelName}`
        }).get(this.props.match.params.id);
        let oldModel = appStore.getState().currentModel.getData();
        model.altrpModelUpdated = true;
        if(! _.isEqual(model, oldModel)){
          appStore.dispatch(changeCurrentModel({ altrpModelUpdated: false }));
          appStore.dispatch(changeCurrentModel(model));
        }
      } catch (e) {
        console.error(e);
        appStore.dispatch(changeCurrentModel({ altrpModelUpdated: true }));
      }
    } else {
      appStore.dispatch(changeCurrentModel({ altrpModelUpdated: true }));
    }
  }

  /**
   * Если меняется роут
   * @params {{}} prevProps
   * @return {Promise<void>}
   */
  async componentDidUpdate(prevProps) {
    queryCache.clear();
    if (
      _.get(this.props, "model.modelName") !==
        _.get(prevProps, "model.modelName") ||
      _.get(this.props, "match.params.id") !==
        _.get(prevProps, "match.params.id")
    ) {
      this.changeRouteCurrentModel();
      appStore.dispatch(changeCurrentPageProperty("url", location.href));
    }
    /**
     * При изменении страницы без изменения текущего ройта
     * отправляем запросы на обновление данных и altrpPageState
     */
    if (
      !_.isEqual(
        _.get(this.props, "match.params"),
        _.get(prevProps, "match.params")
      )
    ) {
      this.updateAppData();
    }
    if (!_.isEqual(_.get(this.props, "match"), _.get(prevProps, "match"))) {
      window.currentRouterMatch = new AltrpModel(this.props.match);
      // appStore.dispatch(clearFormStorage());
    }
  }

  render() {
    if (!this.props.allowed) {
      return <Redirect to={this.props.redirect || "/"} />;
    }
    return (
      <React.Fragment>
        <Suspense fallback={<div />}>
          {this.state.admin && (
            <AdminBar
              areas={this.state.areas}
              data={this.props.currentUser.data}
              idPage={this.props.id}
            />
          )}{" "}
        </Suspense>

        <Scrollbars
          className="main-content"
          universal={true}
          ref={this.scrollbar}
          onUpdate={this.props.setScrollValue}
          // style={{ zIndex: 99999 }}
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}
          renderTrackVertical={({ style, ...props }) => {
            return (
              <div
                className="altrp-scroll__vertical-track"
                style={style}
                {...props}
              />
            );
          }}
        >
          <RouteContentWrapper className="route-content" id="route-content">
            {this.state.areas.map((area, idx) => {
              return (
                <AreaComponent
                  {...area}
                  area={area}
                  page={this.props.id}
                  models={[this.props.model]}
                  key={"appArea_" + area.id}
                />
              );
            })}
          </RouteContentWrapper>
        </Scrollbars>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => {
  return {
    setScrollValue: topPosition => dispatch(setScrollValue(topPosition))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RouteContent));
