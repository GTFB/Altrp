import React, { Component, Suspense } from "react";
import axios from "axios";

const MapDesigner = React.lazy(() => import("../altrp-map/MapDesigner"));

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "../../../sass/altrp-map.scss";
class MapWidget extends Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);

    this.state = {
      settings: props.element.getSettings(),
      geojson: {},
      isLoading: false,
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
  }

  async _componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const req = await axios(`/ajax/maps/${this.props.element.id}`);
      if (req.status === 200) {
        this.setState({ geojson: req.data, isLoading: false });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  handleSave(data) {
    axios.post(`/ajax/maps/${this.props.element.id}`, {
      data: JSON.stringify({
        type: "FeatureCollection",
        features: data.features,
      }),
    });
  }

  render() {
    const { editable, canvas, zoom, lat, lng, style_height = {}, style_margin = {} } = this.state.settings;
    return (
      <Suspense fallback={"Loading"}>
        <MapDesigner
          //className="altrp-map"
          data={this.state.geojson}
          saveData={this.handleSave}
          isLoading={this.state.isLoading}
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
            keyboard: editable,
          }}
        />
      </Suspense>
    );
  }
}

export default MapWidget;
