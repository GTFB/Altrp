import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MapDesigner from "./MapDesigner";
import { getDataByPath } from "../../../../../front-app/src/js/helpers";

function AltrpMapConstructor({ settings, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [geoJson, setGeoJson] = useState({});
  const {
    editable,
    canvas,
    zoom,
    lat,
    lng,
    style_height = {},
    style_margin = {},
    objects = {}
  } = settings;
  const dynamicGeoObjects = objects
    .map(r => {
      const geoObj = getDataByPath(r.path, []);
      const result = geoObj.map(data => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            Number(_.get(data, r.latitude)),
            Number(_.get(data, r.longitude))
          ]
        },
        properties: {
          fillOpacity: 1,
          icon: r.icon || "GoogleMarker",
          tooltip: r.tooltipByKeyboard
            ? r.tooltip
            : _.get(data, r.tooltip) || "",
          popup: r.popupByKeyboard ? r.popup : _.get(data, r.popup) || "",
          fillColor: "#3388ff"
        }
      }));
      return result;
    })
    .flat();
  // Сохраняем данные карты
  const handleSave = data => {
    axios.post(`/ajax/maps/${id}`, {
      data: JSON.stringify({
        type: "FeatureCollection",
        features: data.features.filter(item => typeof item.id !== "undefined")
      })
    });
  };

  const getData = useCallback(
    async id => {
      try {
        setIsLoading(true);
        const req = await axios(`/ajax/maps/${id}`);
        if (req.status === 200) {
          let responseData = req.data;
          let data = [];
          let featuers = responseData.features;
          if (_.keys(dynamicGeoObjects).length > 0) {
            data = featuers.concat(dynamicGeoObjects);
          }
          req.data.features = data.length > 0 ? data : featuers;
          setGeoJson(req.data);
          setIsLoading(false);
        }
      } catch (error) {
        let data = {
          type: "FeatureCollection",
          features: dynamicGeoObjects
        };
        setGeoJson(data);
        setIsLoading(false);
      }
    },
    [id]
  );

  // При изменении карты подгружаем новые данные
  useEffect(() => {
    getData(id);
  }, [id]);
  console.log("====================================");
  console.log(geoJson);
  console.log("====================================");
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
        marginRight: style_margin.right + style_margin.unit
      }}
      isEditable={editable}
      preferCanvas={canvas}
      zoom={+zoom}
      center={[lat, lng]}
    />
  );
}

export default AltrpMapConstructor;
