import React, { Component, Suspense } from "react";
const MapDesigner = React.lazy(() => import("../altrp-map/MapDesigner"));
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

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

    console.log("this.state.settings :>> ", this.state.settings);
  }

  render() {
    return (
      <Suspense fallback={"Loading"}>
        <MapDesigner
          className="altrp-map"
          data={[]}
          isEditable={this.state.settings.editable}
          preferCanvas={this.state.settings.canvas}
          zoom={+this.state.settings.zoom}
          center={[this.state.settings.lat, this.state.settings.lng]}
          interactionOptions={{
            doubleClickZoom: this.state.settings.editable,
            scrollWheelZoom: this.state.settings.editable,
            touchZoom: this.state.settings.editable,
            boxZoom: this.state.settings.editable,
            dragging: this.state.settings.editable,
            keyboard: this.state.settings.editable,
            noMoveStart: this.state.settings.editable,
          }}
        />
      </Suspense>
    );
  }
}

export default MapWidget;
