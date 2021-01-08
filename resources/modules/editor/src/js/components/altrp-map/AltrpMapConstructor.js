import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import MapDesigner from "./MapDesigner";
import { useSelector } from "react-redux";
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
    latDs,
    lngDs,
    centerByDatasource = false,
    style_height = {},
    style_margin = {},
    objects = {}
  } = settings;
  let latitude = lat;
  let longitude = lng;

  const currentDataStorage = useSelector(
    state => state.currentDataStorage.data
  );
  if (centerByDatasource) {
    const latDatasource = getDataByPath(latDs, 50.7496449);
    const lngDatasource = getDataByPath(lngDs, 86.1250068);
    latitude = latDatasource;
    longitude = lngDatasource;
  }
  const dynamicGeoObjectsRepeater = useMemo(() => {
    if (_.keys(objects).length > 0) {
      return objects
        .map(r => {
          const geoObj = getDataByPath(r.path, []);

          const result = Array.isArray(geoObj)
            ? geoObj.map(data => ({
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
                  popup: r.popupByKeyboard
                    ? r.popup
                    : _.get(data, r.popup) || "",
                  fillColor: r.color?.colorPickedHex || "#3388ff"
                }
              }))
            : {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    Number(_.get(geoObj, r.latitude)),
                    Number(_.get(geoObj, r.longitude))
                  ]
                },
                properties: {
                  fillOpacity: 1,
                  icon: r.icon || "GoogleMarker",
                  tooltip: r.tooltipByKeyboard
                    ? r.tooltip
                    : _.get(geoObj, r.tooltip) || "",
                  popup: r.popupByKeyboard
                    ? r.popup
                    : _.get(geoObj, r.popup) || "",
                  fillColor: r.color?.colorPickedHex || "#3388ff"
                }
              };
          return result;
        })
        .flat();
    }
  }, [objects, currentDataStorage]);
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
    async (id, dynamicGeoObjects) => {
      try {
        setIsLoading(true);
        const req = await axios(`/ajax/maps/${id}`);
        if (req.status === 200) {
          let responseData = _.cloneDeep(req.data);
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
          features: dynamicGeoObjectsRepeater
        };
        setGeoJson(data);
        setIsLoading(false);
      }
    },
    [id]
  );

  // При изменении карты подгружаем новые данные
  useEffect(() => {
    getData(id, dynamicGeoObjectsRepeater);
  }, [id, dynamicGeoObjectsRepeater]);

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
      center={[latitude || 50.7496449, longitude || 86.1250068]}
    />
  );
}

export default AltrpMapConstructor;
