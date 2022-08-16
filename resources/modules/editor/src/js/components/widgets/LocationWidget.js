import clsx from "clsx";
import AltrpLocation from "../altrp-location/AltrpLocation";

(window.globalDefaults = window.globalDefaults || []).push`
  .altrp-location {
    position: relative;
    width: 100%;
    overflow: hidden;

    &__preloader {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: 9999;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: inline-block;
        width: 64px;
        height: 64px;
      }
    }

    &__container {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }

  .leaflet-marker-icon {
    &.leaflet-div-icon:not(.leaflet-editing-icon) {
      background: transparent;
      border: none;
    }
  }

  .leaflet-bottom.leaflet-right {
    display: none;
  }
`;

class LocationWidget extends Component {
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
    let classes = clsx(
      {
        active: this.isActive(),
        "state-disabled": this.isDisabled(),
      },
      this.props.element.getResponsiveLockedSetting("position_css_classes", "", "")
    );

    return (
      <AltrpLocation
        element={this.props.element}
        classes={classes}
        settings={this.state.settings}
        id={this.props.element.id}
      />
    );
  }
}

export default LocationWidget;
