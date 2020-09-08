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

    this.defaultOptions = {
      fillColor: "#3388ff",
      fillOpacity: 0.5,
      color: "#3388ff",
    };

    props.element.component = this;

    if (window.elementDecorator) {
      window.elementDecorator(this);
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

  async _componentDidMount() {
    const { query } = this.state.settings;
    // Если запрос выбран
    if (query.dataSource?.value) {
      // Получаем url запроса
      const url = query.dataSource?.value;
      // Получаем данные по url
      try {
        this.setState({ isLoading: true });
        const { data, status } = await axios(url);
        // Если данные успешно получены и возвращают массив
        if (status === 200 && data.data) {
          console.log("req :>> ", data);
          // Данные для прорисовки полигонов: id, name, polygon, options
          const geojson = {
            type: "FeatureCollection",
            features: data.data.map((item) => {
              return {
                id: item.id,
                type: "Feature",
                properties: {
                  tooltip: item.name,
                  ...this.defaultOptions,
                  ...item.options,
                },
                geometry: {
                  type: "Polygon",
                  coordinates: JSON.parse(item.polygon),
                },
              };
            }),
          };
          this.setState({ geojson, isLoading: false });
          this.handleSave(geojson);
        }
      } catch (error) {
        this.setState({ isLoading: false });
      }
    } else {
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
  }
  // При изменении модели
  /*   componentDidUpdate() {
    const { query } = this.state.settings;
    // Если запрос выбран
    if (query.dataSource?.value) {
      // Получаем данные из модели
      (async () => {
        const url = query.dataSource?.value;
        const { data, status } = await axios(url);
        if (status === 200 && data.data) {
          const geojson = {
            type: "FeatureCollection",
            features: data.data.map((item) => {
              return {
                id: item.id,
                type: "Feature",
                properties: {
                  tooltip: item.name,
                  ...this.defaultOptions,
                  ...item.options,
                },
                geometry: {
                  type: "Polygon",
                  coordinates: JSON.parse(item.polygon),
                },
              };
            }),
          };
          this.setState({ geojson, isLoading: false });
          this.handleSave(geojson);
        }
      })();
    }
  }

  shouldComponentUpdate(newProps, newState) {
    console.log("newState :>> ", newProps.element.settings);
    return false;
  } */

  render() {
    const {
      editable,
      canvas,
      zoom,
      lat,
      lng,
      style_height = {},
      style_margin = {},
    } = this.state.settings;

    return (
      <Suspense fallback={"Loading"}>
        <MapDesigner
          isTransformLatLng={true}
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
