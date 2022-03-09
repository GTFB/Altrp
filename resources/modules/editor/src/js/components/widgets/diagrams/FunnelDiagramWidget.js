import AltrpFunnelDiagram from "../../altrp-diagram/AltrpFunnelDiagram"
class FunnelDiagramWidget extends Component {
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
      <Suspense fallback={"Loading"}>
        <AltrpFunnelDiagram settings={this.state.settings} id={this.state.id} />
      </Suspense>
    );
  }
}

export default FunnelDiagramWidget;