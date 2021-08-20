import  "../../classes/modules/TemplateLoader";
import ElementWrapper from "../../../../../front-app/src/js/components/ElementWrapper";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";

class AltrpTemplate extends Component {
  constructor(props) {
    super(props);
    let template = window.templateLoader.mbGetParsedTemplate(this.props.settings.template)
    if(template){
      template = frontElementsFabric.cloneElement(template);
    }
    this.state = {
      template,
      templateGUID: this.props.settings.template
    };
    this.template = template;
  }
  componentDidMount() {
    this.updateTemplate();
  }
  componentDidUpdate() {
    this.updateTemplate();
  }

  /**
   * Обновляем данные шалона
   * @return {Promise<void>}
   */
  async updateTemplate() {
    // console.log(this.props.element.getSettings('template'));
    const templateGUID = this.props.settings.template;
    if (
      templateGUID !== this.state.templateGUID ||
      !(this.state.template || this.loading)
    ) {
      let template;
      if (!templateGUID) {
        return;
      } else {
        this.loading = true;
        template = await window.templateLoader.loadParsedTemplate(templateGUID);
        this.loading = false;
        this.template = null;
      }
      this.setState(state => ({ ...state, template, templateGUID }));
    }
  }

  render() {
    if (!this.props.settings.template) {
      return null;
    }
    if (_.get(this.state, "template.componentClass")) {
      let template =
        this.template || frontElementsFabric.cloneElement(this.state.template);
      this.template = template;
      return (
        <div className="altrp-posts">
          <div className="altrp-post">
            {React.createElement(template.componentClass, {
              element: template,
              ElementWrapper: ElementWrapper,
              children: template.children
            })}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default AltrpTemplate;
