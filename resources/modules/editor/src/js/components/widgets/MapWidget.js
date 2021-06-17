
const AltrpMap = React.lazy(() => import(/* webpackChunkName: 'AltrpMap' */"../altrp-map/AltrpMap"));

import ("../../../sass/altrp-map.scss");
class MapWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
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
        <AltrpMap settings={this.state.settings} id={this.props.element.id} />
      </Suspense>
    );
  }
}

export default MapWidget;
