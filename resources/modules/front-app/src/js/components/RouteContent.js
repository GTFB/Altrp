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
    if((_.get(this.props, 'model.modelName') !== _.get(prevProps, 'model.modelName'))
        || (_.get(this.props, 'match.params.id') !== _.get(prevProps, 'match.params.id'))
    ){
      this.changeRouteCurrentModel();
    }
  }
  render(){
    if(! this.props.allowed){
      return<Redirect to={this.props.redirect || '/'}/>
    }
    return (
    <Scrollbars
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

export default withRouter(RouteContent);