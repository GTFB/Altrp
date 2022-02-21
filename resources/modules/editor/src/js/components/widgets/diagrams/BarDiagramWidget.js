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

  render() {
    return (
        <AltrpBarDiagram settings={this.state.settings} id={this.state.id} />
    );
  }
}

export default BarDiagramWidget;
