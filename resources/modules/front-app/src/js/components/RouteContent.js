import React, {Component} from "react";
import AreaComponent from "./AreaComponent";
import {setTitle} from "../helpers";
import { Scrollbars } from "react-custom-scrollbars";
import {Redirect, withRouter} from "react-router-dom";
import pageLoader from './../classes/PageLoader'
import Area from "../classes/Area";
import Resource from "../../../../editor/src/js/classes/Resource";
import appStore from "../store/store"
import {changeCurrentModel} from "../store/current-model/actions";
import {queryCache} from  "react-query";
import connect from "react-redux/es/connect/connect";
import {
  changeCurrentDataStorage,
  clearCurrentDataStorage,
  currentDataStorageLoaded
} from "../store/current-data-storage/actions";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import {clearFormStorage} from "../store/forms-data-storage/actions";
import { setScrollTop } from "../store/scroll-position/actions";


class RouteContent extends Component {
  constructor(props){
    super(props);
    setTitle(this.props.title);
    this.state = {
      areas: this.props.areas || []
    };
  }

  /**
   * Меняем заголовок страницы
   * лениво подгружаем области если необходимо и страница доступна к просмотру
   * @return {Promise<void>}
   */
  async componentDidMount(){
    window.currentRouterMatch = new AltrpModel(this.props.match);
    setTitle(this.props.title);
    if(this.props.lazy && this.props.allowed){
      let page = await pageLoader.loadPage(this.props.id);
      let areas = page.areas.map(area=> (Area.areaFabric(area)));
      this.setState(state=>({
          ...state,
        areas,
      }));
    }
    /**
     * Меняем текущую модель
     */
    this.changeRouteCurrentModel();
    /**
     * Обнуляем текущее хранилище dataStorage
     */
    appStore.dispatch(clearCurrentDataStorage());
    /**
     * затем отправляем запросы на обновление
     */
    this.updateDataStorage();
  }

  /**
   *  обновление currentDataStorage
   */
  async updateDataStorage () {
    /**
     * @member {[]} data_sources
     */
    let { data_sources } = this.props;
    data_sources = _.sortBy(data_sources, data_source => data_source.priority);
    /**
     * @member {Datasource} data_source
     */
    for(let datasource of data_sources){
      if(datasource.getWebUrl()){
        let params = datasource.getParams(this.props.match.params);
        let res = {};
        if(datasource.getType() === 'show') {
          let id = _.get(params, 'id', _.get(this.props, 'match.params.id'));
          if(id){
            res = await (new Resource({route: datasource.getWebUrl()})).get(id);
          }
        } else if(params) {
          res = await (new Resource({route: datasource.getWebUrl()})).getQueried(params);
        } else {
          res = await (new Resource({route: datasource.getWebUrl()})).getAll();
        }
        res = _.get(res, 'data', res);
        appStore.dispatch(changeCurrentDataStorage(datasource.getAlias(), res));
      }
    }
    appStore.dispatch(currentDataStorageLoaded());

  }
  /**
   * Меняем текущую модель
   */
  async changeRouteCurrentModel(){
    if(_.get(this.props, 'model.modelName') && _.get(this.props, 'match.params.id')){
      appStore.dispatch(changeCurrentModel({altrpModelUpdated: false}));
      let model = await (new Resource({route:`/ajax/models/${this.props.model.modelName}`})).get(this.props.match.params.id);
      model.altrpModelUpdated = true;
      appStore.dispatch(changeCurrentModel(model));
    } else {
      appStore.dispatch(changeCurrentModel({altrpModelUpdated: true}));
    }
  }

  /**
   * Если меняется роут
   * @params {{}} prevProps
   * @return {Promise<void>}
   */
  async componentDidUpdate(prevProps){
    queryCache.clear();
    if((_.get(this.props, 'model.modelName') !== _.get(prevProps, 'model.modelName'))
        || (_.get(this.props, 'match.params.id') !== _.get(prevProps, 'match.params.id'))
    ){
      this.changeRouteCurrentModel();
    }

    if(! _.isEqual(_.get(this.props, 'match.params'),_.get(prevProps, 'match.params'))){
      this.updateDataStorage();
    }
    if(! _.isEqual(_.get(this.props, 'match'),_.get(prevProps, 'match'))) {
      window.currentRouterMatch = new AltrpModel(this.props.match);
      appStore.dispatch(clearFormStorage())
    }
  }

  scrollHandler = ({top}) => {
    if (this.state.areas[3] && this.state.areas[3].templates.find(({ triggers }) => triggers.data.on_scroll)) {
      this.props.setScrollTop(top);
    }
  }

  render(){
    if(! this.props.allowed){
      return<Redirect to={this.props.redirect || '/'}/>
    }
    return (
    <Scrollbars
      onUpdate={this.scrollHandler}
      style={{zIndex: 99999}}
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderTrackVertical={({style, ...props})=>{
        return<div className="altrp-scroll__vertical-track" style={style} {...props} />}}
    >
    <div className="route-content">{
      this.state.areas.map(area => <AreaComponent
          {...area}
          area={area}
          page={this.props.id}
          models={[this.props.model]}
          key={'appArea_' + area.id}/>)
    }</div>
    </Scrollbars>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScrollTop: topPosition => dispatch(setScrollTop(topPosition))
  }
};

export default connect(null, mapDispatchToProps)(withRouter(RouteContent));
