import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import MapDesigner from "./MapDesigner";

const defaultOptions = {
  fillColor: "#3388ff",
  fillOpacity: 0.5,
  color: "#3388ff",
};

function AltrpMap({ settings, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [geoJson, setGeoJson] = useState({});
  const {
    editable,
    canvas,
    zoom,
    lat,
    lng,
    query,
    style_height = {},
    style_margin = {},
  } = settings;

  // Сохраняем данные карты
  const handleSave = (data) => {
    axios.post(`/ajax/maps/${id}`, {
      data: JSON.stringify({
        type: "FeatureCollection",
        features: data.features,
      }),
    });
  };

  /* const getData = useCallback(
    async (id) => {
      console.log("id :>> ", id);
      try {
        setIsLoading(true);
        const req = await axios(`/ajax/maps/${id}`);
        if (req.status === 200) {
          setGeoJson(req.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
    [id]
  ); */

  // При изменении карты подгружаем новые данные
  /* useEffect(() => {
    getData(id);
  }, [id]); */

  // При изменении модели подгружаем новые данные
  useEffect(() => {
    //console.log("query changed to :>> ", query);
    if (query?.dataSource?.value) {
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
          //handleSave(geojson);
        } else {
          // Отключаем лоадер
          setIsLoading(false);
          // Сбрасываем полигоны
          setGeoJson({
            type: "FeatureCollection",
            features: [],
          });
          // Сохраняем пустые полигоны
          //handleSave([]);
        }
      })();
    }
  }, [settings.query]);

  return (
    <MapDesigner
      isTransformLatLng={true}
      data={geoJson}
      saveData={handleSave}
      isLoading={isLoading}
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
  );
}

export default AltrpMap;
