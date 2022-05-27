import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import MapDesigner from "./MapDesigner";

const defaultOptions = {
  fillColor: "#3388ff",
  fillOpacity: 0.5,
  color: "#3388ff"
};

function AltrpMap({ element, settings, classes }) {
  const [isLoading, setIsLoading] = useState(false);
  const [geoJson, setGeoJson] = useState({});
  const {
    query,
    handler,
    canvas,
    zoom,
    lat,
    lng,
    style_height = {},
    style_margin = {}
  } = settings;

  const handleClickPolygon = e => {
    // Получаем ID объекта на карте
    const { id } = e.target.feature;
    const url = handler.params.replace("{{id}}", id);
    if (handler.evt === "goto") {
      window.open(url, "_blank");
    } else if (handler.evt === "load") {
      composeDynamicData(url);
    }
  };

  const composeDynamicData = useCallback(async url => {
    setIsLoading(true);
    const { data, status } = await axios(url);
    if (status === 200 && data.data) {
      const geojson = {
        type: "FeatureCollection",
        features: data.data.map(item => {
          return {
            id: item.id,
            type: "Feature",
            properties: {
              tooltip: item.name,
              ...defaultOptions,
              ...item.options
            },
            geometry: {
              type: "Polygon",
              coordinates: JSON.parse(item.polygon)
            }
          };
        })
      };
      setGeoJson(geojson);
      setIsLoading(false);
    } else {
      // Отключаем лоадер
      setIsLoading(false);
      // Сбрасываем полигоны
      setGeoJson({
        type: "FeatureCollection",
        features: []
      });
    }
  }, []);

  const parseQueryParams = (qs = "") => {
    if (!qs) return "";
    const keyValues = qs.split("\n");
    const result = keyValues.map(item => item.replace("|", "=")).join("&");
    return `?${result}`;
  };

  // При изменении модели, подгружаем новые данные
  useEffect(() => {
    if (query?.dataSource?.value) {
      const queryString = parseQueryParams(query?.defaultParams);
      composeDynamicData(query?.dataSource?.value + queryString);
    }
  }, [query]);

  return <MapDesigner
    classes={classes}
    element={element}
    isTransformLatLng={true}
    data={geoJson}
    onTap={handleClickPolygon}
    isLoading={isLoading}
    style={{
      pointerEvents: window.altrpHelpers.isEditor() ? 'none' : 'auto',
      height: (style_height.size + style_height.unit) || "200px",
      marginTop: (style_margin.top + style_margin.unit) || "10px",
      marginBottom: (style_margin.bottom + style_margin.unit) || "10px",
      marginLeft: (style_margin.left + style_margin.unit) || "10px",
      marginRight: (style_margin.right + style_margin.unit) || "10px"
    }}
    settings={settings}
    isEditable={false}
    preferCanvas={canvas}
    zoom={+element.getLockedSettings("zoom")}
    center={[element.getLockedSettings("lat"), element.getLockedSettings("lng")]}
  />
}

export default AltrpMap;
