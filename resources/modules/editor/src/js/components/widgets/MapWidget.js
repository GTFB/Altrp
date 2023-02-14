import AltrpMap from "../altrp-map/AltrpMap"

(window.globalDefaults = window.globalDefaults || []).push(`
  .altrp-map {
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

    &__paint {
      background-color: #fff;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
      border-radius: 4px;
      text-align: center;
      button {
        margin-top: 3px;
        background: none;
        border: 0;
        cursor: pointer;
        padding: 3px 6px;
      }
    }

    &__modal {
      .modal {
        &__body {
          position: absolute;
          display: none;
          width: 100%;
          height: 100%;
          overflow: auto;
          left: 0;
          top: 0;
          background-color: #fff;
          z-index: 9999;
          box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding: 20px;
          &.open {
            display: block;
          }
          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 7px;
            border: 0;
          }
          &-color {
            button {
              border: 0;
              width: 30px;
              height: 30px;
              background: none;
              margin: 10px 10px 20px 0;
              cursor: pointer;
              &.active {
                background-image: url("../svgs/correct.png");
                background-position: center center;
                background-repeat: no-repeat;
              }
            }
          }
          &-text {
            label {
              //color: #919191;
              //display: flex;
              //flex-direction: column;
              //font-size: 0.9rem;
              textarea,
              input {
                margin: 10px 0 20px;
                padding: 5px;
                border: 1px solid #919191;
                font-family: Arial, Helvetica, sans-serif;
              }
              input[type="range"] {
                padding: 0;
              }
            }
          }
          &-icon {
            margin: 10px 0 20px;
            button {
              background-color: #fff;
              border: 0;
              padding: 5px 8px;
              cursor: pointer;
              border-radius: 3px;
              &.active {
                border: 1px solid #343a40;
              }
            }
          }
        }
      }
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

`);

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

  /**
   * Получить css классы для map widget
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
        <AltrpMap element={this.props.element} classes={classes} settings={{
          ...this.props.element.getSettings(),
          ...this.props.element.getSettings(true),
        }} id={this.props.element.id} />
    );
  }
}

export default MapWidget;
