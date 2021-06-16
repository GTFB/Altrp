import React, {Component} from "react";
import Query from "../../classes/Query";
import {getDataByPath} from "../../../../../front-app/src/js/helpers";

class PostsWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: props.element.getSettings(),
      PostsComponent: ()=><div children="Loading..."/>
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }
  _componentDidMount(){
    import(/* webpackChunkName: 'altrp-posts' */'../altrp-posts/altrp-posts').then(res=>{
      this.setState(state=>({...state,PostsComponent:res.default}))
    })
  }
  /**
   * Показывать ли записи
   * @param{Query} query
   * @return {boolean}
   */
  showPosts(query = {}){
    if( this.props.element.getSettings('choose_datasource') === 'datasource' ){
      return true;
    }
    if(! query.modelName && ! query.dataSource){
      return false;
    }
    return true;
  }
  render(){
    if(! this.props.currentModel.getProperty('altrpModelUpdated')){
      return '';
    }
    let query = new Query(this.props.element.getSettings().table_query || {}, this);
    if(! this.showPosts(query)){
      return <div children="Please Choose Source"/>
    }
    let data = query.getFromModel(this.state.modelData) || [];
    if(this.props.element.getSettings('choose_datasource') === 'datasource') {
      let path = this.props.element.getSettings('posts_datasource', '');
      path = path.replace(/}}/g, '').replace(/{{/g, '');
      data = getDataByPath(path, [], this.props.element.getCurrentModel().getData());
    }
    return <this.state.PostsComponent query={query}
                                      currentModel={this.props.currentModel}
                                      data={data}
                                      element={this.props.element}
                                      settings={this.props.element.getSettings()}/>;
  }
}

export default PostsWidget

