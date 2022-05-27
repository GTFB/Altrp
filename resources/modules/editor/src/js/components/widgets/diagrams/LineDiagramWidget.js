import AltrpLineDiagram from "../../altrp-diagram/AltrpLineDiagram"
class DiagramWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getLockedSettings(),
      id: props.element.getId()
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if(props.baseRender){
      this.render = props.baseRender(this);
    }
  }

  /**
   * Получить css классы для line diagram widget
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
    let classes = this.getClasses() + (this.props.element.getResponsiveLockedSetting('position_css_classes', '', '') || "")
    return (
      <Suspense fallback={"Loading"}>
        <AltrpLineDiagram classes={classes} settings={this.state.settings} id={this.state.id} />
      </Suspense>
    );
  }
}

export default DiagramWidget;
