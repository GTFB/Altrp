import React, {Component} from "react";
import templateLoader from "../../classes/modules/TemplateLoader";
import ElementWrapper from "../../../../../front-app/src/js/components/ElementWrapper";
import frontElementsFabric from "../../../../../front-app/src/js/classes/FrontElementsFabric";

class AltrpTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateGUID: this.props.settings.template,
    };
  }
  componentDidMount(){
    this.updateTemplate();
  }
  componentDidUpdate(){
    this.updateTemplate();
  }

  /**
   * Обновляем данные шалона
   * @return {Promise<void>}
   */
  async updateTemplate(){
    // console.log(this.props.element.getSettings('template'));
    const templateGUID = this.props.settings.template;
    if(templateGUID !== this.state.templateGUID || ! (this.state.template || this.loading)){
      let template;
      if(! templateGUID){
        return;
      } else {
        this.loading = true;
        template = await templateLoader.loadParsedTemplate(templateGUID);
        this.loading = false;
      }
      this.setState(state =>({...state, template, templateGUID}));

    }
  }

  render() {
    if(! this.props.settings.template){
      return null;
    }
    if(_.get(this.state, 'template.componentClass')){
      let template = frontElementsFabric.cloneElement(this.state.template);
      return <div className="altrp-posts">
        <div className="altrp-post">
          {React.createElement(template.componentClass,
            {
              element: template,
              ElementWrapper: ElementWrapper,
              children: template.children
            })}
        </div>
      </div>
    }
    return null;
  }
}

export default AltrpTemplate