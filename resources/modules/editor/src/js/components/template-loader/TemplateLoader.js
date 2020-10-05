import React, {Component} from "react";

class TemplateLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateComponent: null,
    };
  }
  /**
   * Загрузим необходимые модули
   * @return {Promise<void>}
   */
  async componentDidMount() {
    const templateLoader = (await import("../../classes/modules/TemplateLoader")).default;
    const frontElementsFabric = (await import( "../../../../../front-app/src/js/classes/FrontElementsFabric")).default;
    const ElementWrapper = (await import( "../../../../../front-app/src/js/components/ElementWrapper")).default;
    this.setState(state => ({...state, templateLoader, frontElementsFabric, ElementWrapper}), this.loadTemplate);
  }
  /**
   * Загрузим шаблон
   * @return {Promise<void>}
   */
  async loadTemplate(){
    let templateComponent = null;
    const {templateLoader, frontElementsFabric} = this.state;
    if(this.props.templateId){
      templateComponent = await templateLoader.loadParsedTemplate(this.props.templateId);
      templateComponent = frontElementsFabric.cloneElement(templateComponent);
      templateComponent = React.createElement(templateComponent.componentClass,
          {...this.props,
            children: templateComponent.children,
            element: templateComponent,
            ElementWrapper: this.state.ElementWrapper
          });
    }
    this.setState(state => ({...state, templateComponent}));
  }

  /**
   * Обновление компонента
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  componentDidUpdate(prevProps, prevState) {

    /**
     * Проверим обновилось ли ИД шаблона
     */
    if(this.props.templateId !== prevProps.templateId){
      this.loadTemplate();
    }
  }
  render() {
    return <div className="inner-template">{this.state.templateComponent}</div>;
  }
}

export default TemplateLoader