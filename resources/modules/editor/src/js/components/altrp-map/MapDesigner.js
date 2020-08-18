import React, { useEffect, useState, useRef, useCallback } from "react";
import L from "leaflet";

import { Map, FeatureGroup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Control from "react-leaflet-control";

import { isCircle } from "./helpers/isCircle";
import { isMarker } from "./helpers/isMarker";
import { isPolygon } from "./helpers/isPolygon";
import { customIcon } from "./DivIcon";
import tooltipOptions from "./helpers/tooltipOptions";

import ModalControl from "./ModalControl";
import Loader from "./Loader";

import MemoPaintIcon from "./Icons/PaintIcon";

import "./style.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function noob() {}

function MapDesigner({
  className,
  center,
  zoom,
  data,
  isEditable = false,
  isLoading = false,
  isTransformLatLng = false,
  saveData = noob,
  onTap = noob,
}) {
  const FG = useRef(null);
  const [selected, setSelected] = useState(null);
  const [state, setState] = useState(data);
  const [open, setOpen] = useState(false);

  const handleObserver = (e) => {
    const { leafletElement } = FG.current;
    // Обновляем дерево geojson
    let features = [];
    // Проходимся по каждому слою
    leafletElement.eachLayer((layer) => {
      const id = leafletElement.getLayerId(layer);
      // Вешаем обработчик клика по объекту
      layer.addEventListener("click", handleSelected);
      // Преобразуем в geojson
      let geojson = layer.toGeoJSON();
      // Задаем ID
      geojson.id = id;
      geojson.properties.tooltip = geojson.properties.tooltip ? geojson.properties.tooltip : "";
      geojson.properties.popup = geojson.properties.popup ? geojson.properties.popup : "";
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
        geojson.properties.color = geojson.properties.color ? geojson.properties.color : "#3388ff";
        geojson.properties.radius = layer.getRadius();
      } else if (layer instanceof L.Polygon) {
        // Цвет бордера
        geojson.properties.color = geojson.properties.color ? geojson.properties.color : "#3388ff";
        // Polygon style properties
      } else if (layer instanceof L.Marker) {
        console.log("geojson.properties", geojson.properties);
        geojson.properties.icon = geojson.properties.opacity ? geojson.properties.opacity : 1.0;
        geojson.properties.icon = geojson.properties.icon ? geojson.properties.icon : "Marker";
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
    } else if (e.type === "draw:deleted") {
      // Если удалили, то сбрасываем активный элемент
      setSelected(null);
    }
  };

  const handleSelected = useCallback(
    (e) => {
      // Отправляем событие во вне
      onTap(e, FG.current);
      // Проверяем есть ли feature у слоя
      if (e.target.feature) {
        setSelected(e.target.feature.id);
      } else {
        const id = FG.current.leafletElement.getLayerId(e.target);
        setSelected(id);
      }
    },
    [onTap]
  );

  const whenReady = useCallback(() => {
    if (!FG.current) return;
    // Очищаем старые слои
    FG.current.leafletElement.clearLayers();
    // Добавляем новые слои
    state.length > 0 &&
      state.features.forEach((geojson) => {
        // Конвертируем geojson в слой leaflet
        L.geoJSON(geojson, {
          coordsToLatLng: (coords) => {
            return !isTransformLatLng ? L.latLng([coords[1], coords[0]]) : coords;
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
              layer.setIcon(customIcon(feature.properties.icon, feature.properties.fillColor));
              layer.setOpacity(feature.properties.fillOpacity);
            } else {
              layer.setStyle(feature.properties);
            }
            if (feature.properties.tooltip) {
              layer.bindTooltip(feature.properties.tooltip, tooltipOptions);
            }
            if (feature.properties.popup) {
              layer.bindPopup(feature.properties.popup);
            }
            FG.current.leafletElement.addLayer(layer);
          },
        });
      });
  }, [handleSelected, isTransformLatLng, state]);

  // Сохраняем данные после каждого изменения состояния
  useEffect(() => {
    if (state && state.features) {
      saveData(state);
      whenReady();
    }
  }, [saveData, state, whenReady]);

  // Обновляем состояние после каждого изменения пропса
  useEffect(() => {
    if (data && data.features) {
      setState(data);
    }
  }, [data]);

  return (
    <div className="rrbe-map">
      {isLoading && <Loader />}
      <Map
        center={center}
        zoom={zoom}
        className={`rrbe-map__container ${className}`}
        whenReady={whenReady}
      >
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={"MapDesigner"}
        />
        <FeatureGroup ref={FG}>
          <EditControl
            position="topleft"
            onCreated={handleObserver}
            onEdited={handleObserver}
            onDeleted={handleObserver}
            draw={{
              circlemarker: false,
              rectangle: false,
              polyline: false,
              polygon: isEditable,
              circle: isEditable,
              marker: isEditable,
            }}
            edit={{
              edit: isEditable,
              remove: isEditable,
            }}
          />
        </FeatureGroup>
        {isEditable && selected && (
          <Control position="topleft" className="rrbe-map__paint">
            <button type="button" onClick={() => setOpen(!open)}>
              <MemoPaintIcon width="15" height="15" fill="#464646" />
            </button>
          </Control>
        )}
      </Map>
      {isEditable && selected && (
        <ModalControl
          open={open}
          selected={selected}
          onClose={() => setOpen(false)}
          setState={setState}
          state={state}
          fg={FG.current}
        />
      )}
    </div>
  );
}

export default MapDesigner;
