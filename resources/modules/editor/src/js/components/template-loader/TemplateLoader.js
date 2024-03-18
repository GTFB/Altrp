import AltrpModel from "../../classes/AltrpModel";

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
    const templateLoader = (await import(/* webpackChunkName: 'TemplateLoader' */"../../classes/modules/TemplateLoader")).default;
    const frontElementsFabric = (await import( /* webpackChunkName: 'FrontElementsFabric' */"../../../../../front-app/src/js/classes/FrontElementsFabric")).default;
    const ElementWrapper = (await import( /* webpackChunkName: 'ElementWrapper' */"../../../../../front-app/src/js/components/ElementWrapper")).default;

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
      if(this.props.cardModel instanceof AltrpModel){
        templateComponent.setCardModel(this.props.cardModel);
      }

      templateComponent = React.createElement(templateComponent.componentClass,
          {...this.props,
            children: templateComponent.children,
            element: templateComponent,
            ElementWrapper: this.state.ElementWrapper
          });
    }


    this.setState(state => ({...state, templateComponent}), async () => {
      if(_.isFunction(this.props.onLoad)) {
        // await delay(50);
        this.props.onLoad();
      };
    });
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
    if(this.props.cardModel !== prevProps.cardModel && this.state.templateComponent
      && ! _.isEqual(this.state.templateComponent.props.element.getCardModel(), this.props.cardModel)){
      console.log('updates')
      this.state.templateComponent.props.element.setCardModel(this.props.cardModel)
    }
  }
  render() {
    return <div className="inner-template">{this.state.templateComponent}</div>;
  }
}

export default TemplateLoader
