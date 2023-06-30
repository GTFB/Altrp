import Query from "../../classes/Query";
import getDataByPath from "../../../../../front-app/src/js/functions/getDataByPath";
import PostsComponent from '../altrp-posts/altrp-posts';
import RootComponentContext from "../../Contexts/RootComponentContext";

class PostsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.element.getSettings(),
    };
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  /**
   * Показывать ли записи
   * @param{Query} query
   * @return {boolean}
   */
  showPosts(query = {}) {
    if (this.props.element.getLockedSettings('choose_datasource') === 'datasource') {
      return true;
    }
    if (!query.modelName && !query.dataSource) {
      return false;
    }
    return true;
  }

  /**
   * Получить css классы для posts widget ( cards widget )
   */
  getClasses = ()=>{
    let classes = ``;
    if(this.isActive()){
      classes += 'active '
    }
    if(this.isDisabled()){
      classes += 'state-disabled '
    }
    return classes;
  }

  render() {
    let classes =
      this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    if (!this.props.currentModel.getProperty('altrpModelUpdated')) {
      return '';
    }
    let query = new Query(this.props.element.getSettings().table_query || {}, this);
    if (!this.showPosts(query)) {
      return <div children="Please Choose Source"/>
    }
    let data = query.getFromModel(this.state.modelData) || [];
    if (this.props.element.getLockedSettings('choose_datasource') === 'datasource') {
      let path = this.props.element.getLockedSettings('posts_datasource', '');
      console.log(path)
      path = path.replace(/}}/g, '').replace(/{{/g, '');
      data = getDataByPath(path, [], this.props.element.getCurrentModel().getData());

    }

    const settings = {
      ...this.props.element.settings,
      ...this.props.element.settingsLock || {},
    };
    if(this.context.isImportantStylesModule){
      return ''
    }
    return <PostsComponent query={query}
                           className={classes}
                           currentModel={this.props.currentModel}
                           data={data}
                           element={this.props.element}
                           settings={settings}/>;
  }

  static contextType = RootComponentContext
}

export default PostsWidget

