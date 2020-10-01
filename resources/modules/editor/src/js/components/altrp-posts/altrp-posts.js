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
      posts: _.isArray(props.data) ?  props.data : [],
      simpleTemplate: '',
    }
  }

  /**
   * Компонент загрузился
   */
  async componentDidMount() {
    const{settings} = this.props;
    let simpleTemplateId = _.get(settings, 'posts_card_template');
    if(simpleTemplateId){
      let template = await templateLoader.loadParsedTemplate(simpleTemplateId);
      this.setState(state=>({...state, simpleTemplate:template}))
    }
  }

  /**
   * Компонент обновился
   */
  async componentDidUpdate(prevProps) {
    if(! _.isEqual(prevProps.data, this.props.data)){
      this.setState(state =>({...state, posts: this.props.data}));
    }
  }

  /**
   * Отрисовывает отдельную карточку
   * @param {integer} idx - индекс в массиве записей
   */
  renderPost(idx){
    let post = this.state.posts[idx];
    let PostContentComponent = post.component || <h2>{post.title || post.id || ''}</h2>;
    if(this.state.simpleTemplate){
      PostContentComponent = React.createElement(this.state.simpleTemplate.componentClass,
        {
          element: this.state.simpleTemplate,
          isCard: true,
          cardModel: new AltrpModel(post),
          children: this.state.simpleTemplate.children
        });

    }
    return <div className="altrp-post" key={post.id}>{PostContentComponent}</div>
  }

  render() {

  return<div className="altrp-posts">
    {this.state.posts.map((p, idx)=>{
      return this.renderPost(idx);
    })}
  </div>
  }
}

export default (props) => {
  return <AltrpQueryComponent {...props}><AltrpPosts/></AltrpQueryComponent>
}