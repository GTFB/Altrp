import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import MapDesigner from "./MapDesigner";

const defaultOptions = {
  fillColor: "#3388ff",
  fillOpacity: 0.5,
  color: "#3388ff",
};

function AltrpMap({ settings }) {
  const [isLoading, setIsLoading] = useState(false);
  const [geoJson, setGeoJson] = useState({});
  const { query, canvas, zoom, lat, lng, style_height = {}, style_margin = {} } = settings;

  const handleClickPolygon = (e) => {
    console.log("handleClickPolygon :>> ", e);
  };

  const composeDynamicData = useCallback(async (query) => {
    setIsLoading(true);
    if (query?.dataSource?.value) {
      // Получаем данные из модели
      const url = query.dataSource?.value;
      console.log("url :>> ", url);
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
                ...defaultOptions,
                ...item.options,
              },
              geometry: {
                type: "Polygon",
                coordinates: JSON.parse(item.polygon),
              },
            };
          }),
        };
        setGeoJson(geojson);
        setIsLoading(false);
      } else {
        // Отключаем лоадер
        setIsLoading(false);
        // Сбрасываем полигоны
        setGeoJson({
          type: "FeatureCollection",
          features: [],
        });
      }
    }
  }, []);

  // При изменении модели, подгружаем новые данные
  useEffect(() => {
    composeDynamicData(query);
  }, [query]);

  return (
    <MapDesigner
      isTransformLatLng={true}
      data={geoJson}
      onTap={handleClickPolygon}
      isLoading={isLoading}
      style={{
        height: style_height.size + style_height.unit,
        marginTop: style_margin.top + style_margin.unit,
        marginBottom: style_margin.bottom + style_margin.unit,
        marginLeft: style_margin.left + style_margin.unit,
        marginRight: style_margin.right + style_margin.unit,
      }}
      isEditable={false}
      preferCanvas={canvas}
      zoom={+zoom}
      center={[lat, lng]}
    />
  );
}

export default AltrpMap;
