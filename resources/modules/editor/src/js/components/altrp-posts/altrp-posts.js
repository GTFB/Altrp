import React from "react";
import '../../../sass/altrp-pagination.scss';
import './altrp-posts.scss'
import AltrpQueryComponent from "../altrp-query-component/altrp-query-component";
import templateLoader from "../../classes/modules/TemplateLoader"
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric"
import AltrpModel from "../../classes/AltrpModel";

class AltrpPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleTemplate: '',
      simpleTemplateId : null
    }
  }

  /**
   * Компонент загрузился
   */
  async componentDidMount() {
    const{settings} = this.props;
    let simpleTemplateId = _.get(settings, 'posts_card_template');
    if(simpleTemplateId){
      if(! simpleTemplateId){
        return;
      }
      this.setState(state=>({...state, simpleTemplateId}), async()=>{
        let template = await templateLoader.loadParsedTemplate(simpleTemplateId);
        this.setState(state=>({...state, simpleTemplate:template}))
      });
    }
  }

  /**
   * Когда нужно робновлять компонент
   * @param {{}} nextProps
   * @param {{}} nextState
   */
  shouldComponentUpdate(nextProps, nextState){
    if(! _.isEqual(this.state.simpleTemplate, nextState.simpleTemplate)){
      return true;
    }
    if(! _.isEqual(this.state.simpleTemplateId, nextState.simpleTemplateId)){
      return true;
    }
    if(! _.isEqual(this.props.data, nextProps.data)){
      return true;
    }
    return false;
  }
  /**
   * Компонент обновилсяdata
   * @param {{}} prevProps
   */
  async componentDidUpdate(prevProps) {
    const{settings} = this.props;
    const{simpleTemplateId} = this.state;
    const newSimpleTemplateId = _.get(settings, 'posts_card_template', simpleTemplateId);
    if(prevProps.posts !== this.state.posts)
    if(! _.isEqual(prevProps.data, this.props.data)){
      this.setState(state =>({...state, posts: this.props.data}));
    }
    if(newSimpleTemplateId !== simpleTemplateId){
      if(! newSimpleTemplateId){
        return;
      }
      this.setState(state=>({...state, simpleTemplateId: newSimpleTemplateId}),async ()=>{
        let template = await templateLoader.loadParsedTemplate(newSimpleTemplateId);
        this.setState(state=>({...state, simpleTemplate:template}));
      });
    }
  }

  /**
   * Отрисовывает отдельную карточку
   * @param {integer} idx - индекс в массиве записей
   */
  renderPost(idx){
    let post = _.cloneDeep(this.props.data[idx] || this.props.data);
    let PostContentComponent = post.component || <h2>{post.title || post.id || ''}</h2>;
    if(this.state.simpleTemplate){
      let template = frontElementsFabric.cloneElement(this.state.simpleTemplate);
      template.setCardModel(new AltrpModel(post));
      PostContentComponent = React.createElement(template.componentClass,
        {
          element: template,
          children: template.children
        });
    }
    return <div className="altrp-post" key={post.id + Math.random()}>{PostContentComponent}</div>
  }

  render() {
    let {data: posts} = this.props;
    if((! _.isArray(posts)) && _.isObject(posts)){
      posts = [posts];
    }
    if(! _.isArray(posts)){
      posts = [];
    }
    return<div className="altrp-posts">
      {posts.map((p, idx)=>{
        return this.renderPost(idx);
      })}
    </div>
  }
}

export default (props) => {
  return <AltrpQueryComponent {...props}><AltrpPosts/></AltrpQueryComponent>
}