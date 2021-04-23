
import FrontPopup from "./FrontPopup";

class AreaComponent extends Component {

  constructor(props){
    super(props);
    console.log('AreaComponent: ', performance.now());

  }
  componentWillUnmount() {
    window.stylesModule.removeStyleById(this.rootElement?.id);
  }

  render() {
    let classes = [`app-area`, `app-area_${this.props.id}`];
    /**
     * Если это попап
     */
    if (this.props.area.getTemplates().length) {
      let popus =  (
        <div className={classes.join(" ")}>
          {this.props.area.getTemplates().map(template => {
            return (
              <FrontPopup key={template.id} template={template} />
            )
          })}
        </div>
      );
      return popus;
    }
    /**
     * Если шаблон привязанный к странице удалили, то ничего не отрисовываем
     */
    if (! this.props.template.data) {
      return <div className={classes.join(" ")} />;
    }
    let rootElement = this.rootElement ? this.rootElement : window.frontElementsFabric.parseData(
      this.props.template.data,
      null,
      this.props.page,
      this.props.models
    );
    this.rootElement = rootElement;
    let template =  (
      <div className={classes.join(" ")}>
        {React.createElement(this.rootElement.componentClass, {
          element: this.rootElement,
          children: this.rootElement.children
        })}
      </div>
    );
    return template;
  }
}

export default AreaComponent;
