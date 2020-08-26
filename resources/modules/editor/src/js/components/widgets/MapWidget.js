import React, { Component, Suspense } from "react";
import isEqual from "lodash/isEqual";
const MapDesigner = React.lazy(() => import("../altrp-map/MapDesigner"));
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

class MapWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.element.getSettings(),
      data: [],
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  shouldComponentUpdate(_, nextState) {
    return isEqual(this.state, nextState);
  }

  handleSave(data) {
    console.log("data :>> ", data);
    this.setState((state) => {
      return { ...state, data };
    });
  }

  render() {
    console.log("this.state.settings :>> ", this.state.settings);
    const { editable, canvas, zoom, lat, lng, style_height, style_margin } = this.state.settings;
    return (
      <Suspense fallback={"Loading"}>
        <MapDesigner
          className="altrp-map"
          data={this.state.data}
          saveData={this.handleSave.bind(this)}
          style={{
            height: style_height.size + style_height.unit,
            marginTop: style_margin.top + style_margin.unit,
            marginBottom: style_margin.bottom + style_margin.unit,
            marginLeft: style_margin.left + style_margin.unit,
            marginRight: style_margin.right + style_margin.unit,
          }}
          isEditable={editable}
          preferCanvas={canvas}
          zoom={+zoom}
          center={[lat, lng]}
          interactionOptions={{
            doubleClickZoom: editable,
            scrollWheelZoom: editable,
            touchZoom: editable,
            boxZoom: editable,
            dragging: editable,
            keyboard: editable,
            noMoveStart: editable,
          }}
        />
      </Suspense>
    );
  }
}

export default MapWidget;
