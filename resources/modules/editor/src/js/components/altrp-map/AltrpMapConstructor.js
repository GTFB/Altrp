import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import MapDesigner from "./MapDesigner";

function AltrpMapConstructor({ settings, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [geoJson, setGeoJson] = useState({});
  const { editable, canvas, zoom, lat, lng, style_height = {}, style_margin = {} } = settings;
  console.log('HEY MAN');
  // Сохраняем данные карты
  const handleSave = (data) => {
    axios.post(`/ajax/maps/${id}`, {
      data: JSON.stringify({
        type: "FeatureCollection",
        features: data.features,
      }),
    });
  };

  const getData = useCallback(
    async (id) => {
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
  );

  // При изменении карты подгружаем новые данные
  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <MapDesigner
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
    />
  );
}

export default AltrpMapConstructor;
