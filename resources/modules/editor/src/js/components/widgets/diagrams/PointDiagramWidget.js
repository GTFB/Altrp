const AltrpDiagram = React.lazy(() => import(/* webpackChunkName: 'AltrpDiagram' */"../../altrp-diagram/AltrpPointDiagram"));
class DiagramWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
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
        <AltrpDiagram settings={this.state.settings} id={this.state.id} />
      </Suspense>
    );
  }
}

export default DiagramWidget;