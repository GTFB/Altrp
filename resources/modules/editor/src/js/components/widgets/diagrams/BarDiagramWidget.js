import AltrpBarDiagram from "../../altrp-diagram/AltrpBarDiagram";

class BarDiagramWidget extends Component {
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
   * Получить css классы для bar diagram widget
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
        <AltrpBarDiagram classes={classes} settings={this.state.settings} id={this.state.id} />
    );
  }
}

export default BarDiagramWidget;
