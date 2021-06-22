import AltrpMap from "../altrp-map/AltrpMapConstructor";

import("../../../sass/altrp-map.scss");

class MapConstructorWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings()
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    if (props.baseRender) {
      this.render = props.baseRender(this);
    }
  }

  render() {
    return (
      <AltrpMap settings={this.state.settings} id={this.props.element.id} />
    );
  }
}

export default MapConstructorWidget;
