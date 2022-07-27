import React, { useEffect, useState, useRef, useCallback } from "react";
import L, { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Drawer from "rc-drawer";
import { createPortal } from "react-dom";
// import MarkerCluster from "./MarkerCluster";
import {
  MapContainer as Map,
  FeatureGroup,
  TileLayer,
  MapContainer
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
// import Control from "react-leaflet-control";

import { isCircle } from "./helpers/isCircle";
import { isMarker } from "./helpers/isMarker";
import { isPolygon } from "./helpers/isPolygon";
import { customIcon } from "./DivIcon";
import tooltipOptions from "./helpers/tooltipOptions";

import ModalControl from "./ModalControl";
import Loader from "./Loader";

import MemoPaintIcon from "./Icons/PaintIcon";
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import MarkerCluster from "./MarkerCluster";

function noob() {}

function MapDesigner({
  className,
  center,
  zoom,
  data = {},
  isEditable = false,
  isLoading = false,
  isTransformLatLng = false,
  interactionOptions = {},
  style = {},
  saveData = noob,
  onTap = noob,
  url,
  field_id,
  id,
  url_connect = null,
  field_first_connect = null,
  field_second_connect = null,
  parameters,
  settings,
  element,
  classes
}) {
  const FG = useRef(null);
  const ModalRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [state, setState] = useState(data);
  const [open, setOpen] = useState(false);

  let dynamicMarkers = element.getLockedSettings("markers");

  if(_.isArray(dynamicMarkers)) {
    dynamicMarkers = dynamicMarkers.filter(elem => {
      if(!elem.marker_lat || !elem.marker_long) return false;
      return true
    })

    dynamicMarkers = dynamicMarkers.map(elem => {
      return {
        feature: {
          geometry: {
            coordinates: [elem.marker_lat, elem.marker_long]
          },
          properties: {
            tooltip: elem.marker_tooltip
          }
        }
      }
    })
  }

  const [markers, setMarkers] = useState(dynamicMarkers || null);

  const updateGeoObjectToModel = geoObject => {
    const { dbID } = geoObject;
    let data = _.cloneDeep(geoObject, {});
    delete data["dbID"];
    axios
      .put(`${url}/${dbID}`, {
        altrp_ajax: true,
        [field_id]: JSON.stringify(data)
      })
      .then(res => {
      });
  };

  const deleteGeoObjectToModel = geoObject => {
    const { dbID } = geoObject;
    axios.delete(`${url}/${dbID}`).then(res => {
    });
  };

  /**
   *
   * @param {LeafletEvent} object
   */
  const saveGeoObjectToModel = layer => {
    let geojson = layer.toGeoJSON();
    const { leafletElement } = FG.current;
    let currentFeatures = _.cloneDeep(state.features, []);
    const id = leafletElement.getLayerId(layer);

    geojson.id = id;
    geojson.properties.tooltip = geojson.properties.tooltip
      ? geojson.properties.tooltip
      : "";
    geojson.properties.popup = geojson.properties.popup
      ? geojson.properties.popup
      : "";
    // Назначаем цвет заливки
    geojson.properties.fillColor = geojson.properties.fillColor
      ? geojson.properties.fillColor
      : "#3388ff";
    // Назначаем прозрачность заливки
    geojson.properties.fillOpacity = geojson.properties.fillOpacity
      ? geojson.properties.fillOpacity
      : 0.5;
    // Задаем опции
    if (layer instanceof L.Circle) {
      // Цвет бордера
      geojson.properties.color = geojson.properties.color
        ? geojson.properties.color
        : "#3388ff";
      geojson.properties.radius = layer.getRadius();
    } else if (layer instanceof L.Polygon) {
      // Цвет бордера
      geojson.properties.color = geojson.properties.color
        ? geojson.properties.color
        : "#3388ff";
      // Polygon style properties
    } else if (layer instanceof L.Marker) {
      geojson.properties.icon = geojson.properties.opacity
        ? geojson.properties.opacity
        : 1.0;
      // geojson.properties.icon = geojson.properties.icon ? geojson.properties.icon : "GoogleMarker";
      geojson.properties.icon = "GoogleMarker";
      layer.setIcon(customIcon(geojson.properties.icon));
    }
    axios
      .post(url, {
        altrp_ajax: true,
        [field_id]: JSON.stringify(geojson)
      })
      .then(res => {
        const newObject = {
          ...JSON.parse(res.data.data[field_id]),
          dbID: res.data.data.id
        };
        currentFeatures.push(newObject);
        setState({ ...state, features: currentFeatures });
      });
  };

  const handleObserver = e => {
    const { leafletElement } = FG.current;
    // Обновляем дерево geojson

    let features = [];
    // Проходимся по каждому слою
    leafletElement.eachLayer(layer => {
      const id = leafletElement.getLayerId(layer);
      // Вешаем обработчик клика по объекту
      layer.addEventListener("click", handleSelected);
      // Преобразуем в geojson
      let geojson = layer.toGeoJSON();
      // Задаем ID
      geojson.id = id;
      geojson.properties.tooltip = geojson.properties.tooltip
        ? geojson.properties.tooltip
        : "";
      geojson.properties.popup = geojson.properties.popup
        ? geojson.properties.popup
        : "";
      // Назначаем цвет заливки
      geojson.properties.fillColor = geojson.properties.fillColor
        ? geojson.properties.fillColor
        : "#3388ff";
      // Назначаем прозрачность заливки
      geojson.properties.fillOpacity = geojson.properties.fillOpacity
        ? geojson.properties.fillOpacity
        : 0.5;
      // Задаем опции
      if (layer instanceof L.Circle) {
        // Цвет бордера
        geojson.properties.color = geojson.properties.color
          ? geojson.properties.color
          : "#3388ff";
        geojson.properties.radius = layer.getRadius();
      } else if (layer instanceof L.Polygon) {
        // Цвет бордера
        geojson.properties.color = geojson.properties.color
          ? geojson.properties.color
          : "#3388ff";
        // Polygon style properties
      } else if (layer instanceof L.Marker) {
        geojson.properties.icon = geojson.properties.opacity
          ? geojson.properties.opacity
          : 1.0;
        geojson.properties.icon = geojson.properties.icon
          ? geojson.properties.icon
          : "GoogleMarker";
        // geojson.properties.icon = "GoogleMarker";
        layer.setIcon(customIcon(geojson.properties.icon));
      }
      // Назначаем подпись
      if (geojson.properties.tooltip) {
        layer.bindTooltip(geojson.properties.tooltip, tooltipOptions);
      }
      // Назначаем всплывающие подсказки
      if (geojson.properties.popup) {
        layer.bindPopup(geojson.properties.popup);
      }
      // Добавляем в массив
      features.push(geojson);
    });
    setState({ ...state, features });

    if (e.type === "draw:created") {
      // Если добавили новый, то делаем его активным
      const id = leafletElement.getLayerId(e.layer);
      setSelected(id);
      if (typeof url !== "undefined" && url !== null) {
        saveGeoObjectToModel(e.layer);
      }
    } else if (e.type === "draw:edited") {
      if (typeof url !== "undefined" && url !== null) {
        const layers = e.layers._layers;
        const layersKeys = _.keys(layers);
        for (let k of layersKeys) {
          const json = layers[k].toGeoJSON();
          updateGeoObjectToModel(json);
        }
      }
    } else if (e.type === "draw:deleted") {
      if (typeof url !== "undefined" && url !== null) {
        const layers = e.layers._layers;
        const layersKeys = _.keys(layers);
        for (let k of layersKeys) {
          const json = layers[k].toGeoJSON();
          deleteGeoObjectToModel(json);
        }
      }
      // Если удалили, то сбрасываем активный элемент
      setSelected(null);
    }
  };

  const handleSelected = useCallback(
    e => {
      // Отправляем событие во вне
      onTap(e, FG.current);
      // Проверяем есть ли feature у слоя
      if (e.target.feature) {
        setSelected(e.target.feature.id);
      } else {
        const id = FG.current.getLayerId(e.target);
        setSelected(id);
      }
    },
    [onTap]
  );

  const handleMapClick = (e, layer) => {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);
    setSelected(null);
  };

  const handleMarkerClick = (e, layer) => {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
    setSelected(null);
    setSelected(layer.feature.id);
  };

  const handlePolygonClick = (e, layer) => {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
    setSelected(null);
    setSelected(layer.feature.id);
  };

  const handleCircleClick = (e, layer) => {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
    setSelected(null);
    setSelected(layer.feature.id);
  };

  const whenReady = useCallback(() => {
    if (!FG.current) return;
    // Очищаем старые слои
    console.log(FG.current);
    FG.current.clearLayers();
    let markers = [];
    // Добавляем новые слои
    if (state.features?.length > 0) {
      for (const geojson of state.features) {
        // Конвертируем geojson в слой leaflet
        L.geoJSON(geojson, {
          coordsToLatLng: coords => {
            return !isTransformLatLng
              ? L.latLng([coords[1], coords[0]])
              : coords;
          },
          pointToLayer: (geojson, latlng) => {
            // Создаем точные типы слоев
            if (isCircle(geojson)) {
              let circle = L.circle(latlng, geojson.properties);
              return circle;
            } else if (isMarker(geojson)) {
              let marker = L.marker(latlng, geojson.properties);
              return marker;
            } else if (isPolygon(geojson)) {
              let polygon = L.polygon(latlng, geojson.properties);
              return polygon;
            }
          },
          onEachFeature: (feature, layer) => {
            layer.addEventListener("click", handleSelected);
            if (layer instanceof L.Marker) {
              layer.addEventListener("click", e => handleMarkerClick(e, layer));
              layer.setIcon(
                customIcon(
                  feature.properties.icon,
                  feature.properties.fillColor
                )
              );
              layer.setOpacity(feature.properties.fillOpacity);
              if (feature.inCluster) {
                markers.push(layer);
              }
            } else if (layer instanceof L.Polygon) {
              layer.addEventListener("click", e =>
                handlePolygonClick(e, layer)
              );
              layer.setStyle(feature.properties);
            } else if (layer instanceof L.Circle) {
              layer.addEventListener("click", e => handleCircleClick(e, layer));
              layer.setStyle(feature.properties);
            } else {
              layer.setStyle(feature.properties);
            }
            if (feature.properties.tooltip) {
              layer.bindTooltip(feature.properties.tooltip, tooltipOptions);
            }
            if (feature.properties.popup) {
              layer.bindPopup(feature.properties.popup);
            }
            if (!feature.inCluster) {
              FG.current.addLayer(layer);
            }
          }
        });
      }
    }
    if (markers.length > 0) {
      setMarkers(markers);
    }
  }, [handleSelected, isTransformLatLng, state]);

  // Сохраняем данные после каждого изменения состояния
  useEffect(() => {
    if (state && state.features) {
      saveData(state);
      whenReady();
    }
  }, [saveData, state]);

  // Обновляем состояние после каждого изменения пропса
  useEffect(() => {
    if (data && data.features) {
      setState(data);
    }
  }, [data]);

  let parent = useState(document.body);

  React.useEffect(() => {
    if (isEditor()) {
      parent[1](
        document.getElementById("editorContent").contentWindow.document.body
      );
    }
  }, []);

  return (
    <div className={`${classes} altrp-map`} style={style}>
      {isLoading && <Loader />}
      <MapContainer
        center={center}
        zoom={zoom}
        onclick={handleMapClick}
        className={`altrp-map__container ${className} ${classes}`}
        whenReady={whenReady}
        scrollWheelZoom={true}
        touchZoom={true}
        // crs={CRS.EPSG3395}
        doubleClickZoom={true}
        keyboard={interactionOptions.keyboard}
        style={{ height: style.height }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers !== null && <MarkerCluster markers={markers} FG={FG} />}

        <FeatureGroup ref={FG}>
          <EditControl
            position="topleft"
            onCreated={handleObserver}
            onDeleted={handleObserver}
            onEdited={handleObserver}
            onEditStop={handleObserver}
            onDrawStart={handleObserver}
            draw={{
              circlemarker: false,
              rectangle: false,
              polyline: false,
              polygon: isEditable,
              circle: isEditable,
              marker: isEditable
            }}
            edit={{
              edit: isEditable,
              remove: isEditable
            }}
          />
        </FeatureGroup>
        {isEditable && selected && (
          <Control position="topleft" className={`${classes} altrp-map__paint`}>
            <button type="button" onClick={() => setOpen(!open)}>
              <MemoPaintIcon width="15" height="15" fill="#464646" />
            </button>
          </Control>
        )}
      </MapContainer>

      {createPortal(
        <Drawer
          getContainer={null}
          placement="right"
          defaultOpen={true}
          maskClosable={true}
          width={"400px"}
          open={open}
          onClose={() => setOpen(false)}
          handler={false}
        >
          {isEditable && selected && (
            <ModalControl
              markers={markers}
              settings={settings}
              url={url}
              url_connect={url_connect}
              field_first_connect={field_first_connect}
              field_second_connect={field_second_connect}
              updateGeoObjectToModel={updateGeoObjectToModel}
              open={open}
              selected={selected}
              id={id}
              onClose={() => setOpen(false)}
              setState={setState}
              state={state}
              forwardRef={ModalRef}
              fg={FG.current}
              parameters={parameters}
            />
          )}
        </Drawer>,
        parent[0]
      )}
    </div>
  );
}

export default MapDesigner;
