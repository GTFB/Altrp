import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  forwardRef
} from "react";
import Select from "react-select";
import L from "leaflet";

import { iconTypes, customIcon } from "./DivIcon";
import tooltipOptions from "./helpers/tooltipOptions";
import axios from "axios";

const ModalControl = forwardRef(
  (
    {
      markers = [],
      selected,
      state,
      open,
      onClose,
      setState,
      fg,
      updateGeoObjectToModel,
      url_connect = null,
      field_first_connect = null,
      field_second_connect = null
    },
    ref
  ) => {
    const colors = ["#3388ff", "#dc3545", "#28a745", "#ffc107", "#6c757d"];
    const icons = Object.keys(iconTypes);
    const [properties, setProperties] = useState({});
    const [points, setPoints] = useState([]);
    // const [pointResult, setPointsResult] = useState([]);

    useLayoutEffect(() => {
      if (selected) {
        const feature = state.features.filter(item => item.id === selected);
        console.log(selected);
        if (feature.length > 0) {
          setProperties(feature[0].properties);
        }
      }
    }, [selected, state.features]);

    const getId = layer => {
      if (layer.feature?.id) {
        return layer.feature.id;
      } else {
        return fg.leafletElement.getLayerId(layer);
      }
    };

    const getLayer = () => {
      let layer;
      fg.leafletElement.eachLayer(item => {
        if (selected === getId(item)) {
          layer = item;
        }
      });
      return layer;
    };

    // Сохраняем все настройки
    const saveSettings = () => {
      const features = state.features.map(item => {
        if (item.id === selected) {
          item.properties = properties;
          if (typeof item.dbID !== "undefined" && item.dbID !== null) {
            updateGeoObjectToModel(item);
          }
        }
        return item;
      });
      setState({ ...state, features });
      onClose();
    };

    const handleFillColor = hex => {
      setProperties({ ...properties, fillColor: hex });
      const layer = getLayer();
      if (layer instanceof L.Marker) {
        layer.setIcon(customIcon(properties.icon, hex));
      } else {
        layer.setStyle({ fillColor: hex });
      }
    };

    //Меняем цвет границы
    const handleColor = hex => {
      setProperties({ ...properties, color: hex });
      const layer = getLayer();
      if (layer instanceof L.Marker) {
        layer.setIcon(customIcon(properties.icon, hex));
      } else {
        layer.setStyle({ color: hex });
      }
    };

    const handleIcon = name => {
      setProperties({ ...properties, icon: name });
      const layer = getLayer();
      layer.setIcon(customIcon(name, properties.fillColor));
    };

    const handleTooltip = event => {
      setProperties({ ...properties, tooltip: event.target.value });
      const layer = getLayer();
      if (layer.getTooltip()) {
        layer.setTooltipContent(event.target.value);
      } else {
        layer.bindTooltip(event.target.value, tooltipOptions);
      }
    };

    const handlePopup = event => {
      setProperties({ ...properties, popup: event.target.value });
      const layer = getLayer();
      if (layer.getTooltip()) {
        layer.setPopupContent(event.target.value);
      } else {
        layer.bindPopup(event.target.value);
      }
    };

    const handleFillOpacity = event => {
      setProperties({ ...properties, fillOpacity: event.target.value });
      const layer = getLayer();
      if (layer instanceof L.Marker) {
        layer.setOpacity(event.target.value);
      } else {
        layer.setStyle({ fillOpacity: event.target.value });
      }
    };

    const calculatePoints = () => {
      const layer = getLayer();
      let points = [];
      if (markers != null && markers.length > 0) {
        if (layer instanceof L.Polygon) {
          const polygonPoints = layer.feature.geometry.coordinates[0];
          for (let marker of markers) {
            const markerCoordinates = marker.feature.geometry.coordinates;
            if (pointInPolygon(markerCoordinates, polygonPoints)) {
              points.push(marker);
            }
          }
        }
        if (layer instanceof L.Circle) {
          const radius = layer.getRadius();
          const center = layer.getLatLng();
          for (let marker of markers) {
            if (pointInCircle(marker, radius, center)) {
              points.push(marker);
            }
          }
        }
      }

      return points;
    };
    const pointInPolygon = (point, vs) => {
      const x = point[0],
        y = point[1];

      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0],
          yi = vs[i][1];
        let xj = vs[j][0],
          yj = vs[j][1];

        let intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }

      return inside;
    };

    const pointInCircle = (marker, radius, center) => {
      const markerCoordinates = marker.getLatLng();
      const inCircle = Math.abs(center.distanceTo(markerCoordinates)) <= radius;
      return inCircle;
    };

    const handleSelected = async options => {
      const difference =
        points
          ?.filter(x => !options?.includes(x))
          ?.map(item => {
            const val = JSON.parse(item.value);
            const coordinates = val.coords.split(",");
            return {
              coordinates: {
                lat: coordinates[0],
                long: coordinates[1]
              },
              id: val.id,
              rowID: val?.rowID || -1,
              view: item.label
            };
          }) || [];

      let values =
        options?.map(item => {
          const val = JSON.parse(item.value);
          const coordinates = val.coords.split(",");
          return {
            coordinates: {
              lat: coordinates[0],
              long: coordinates[1]
            },
            id: val.id,
            rowID: val?.rowID || -1,
            view: item.label
          };
        }) || [];

      const layout = getLayer();

      if (
        typeof layout.feature?.dbID !== "undefined" &&
        layout.feature.dbID !== null
      ) {
        if (field_first_connect === null) {
          throw "Not set first column connect";
        }
        if (field_second_connect === null) {
          throw "Not set second column connect";
        }
        const dbID = layout.feature.dbID;
        if (difference.length > 0) {
          for (let obj of difference) {
            const objectID = obj.id;
            if (objectID === null) {
              alert("Error, return with objects data source field 'id'");
              throw "Error, return with objects data source field 'id'";
            }
            if (obj.rowID != -1) {
              deleteConnectedModel(Number(obj.rowID));
              continue;
            }
          }
        }

        for (let obj of values) {
          const objectID = obj.id;
          if (obj.id === null) {
            alert("Error, return with objects data source field 'id'");
            throw "Error, return with objects data source field 'id'";
          }

          if (obj.rowID != -1) {
            updateConnectedModel(Number(obj.rowID), dbID, Number(objectID));
            continue;
          } else {
            const { row_id, field_second_id } = await sendConnectedModel(
              dbID,
              Number(objectID)
            );
            options =
              options?.map(item => {
                const val = JSON.parse(item.value);
                if (Number(val.id) == Number(field_second_id)) {
                  return {
                    value: JSON.stringify({
                      ...val,
                      rowID: row_id
                    }),
                    label: item.label
                  };
                }
                return { ...item };
              }) || [];
            console.log(options);
            continue;
          }
        }
        setPoints(options);
        const calculateToSelect = calculatePoints()
          .map(item => {
            return {
              value: JSON.stringify({
                coords: item.feature.geometry.coordinates.toString(),
                id: item.feature.id
              }),
              label: item.feature.properties.popup
            };
          })
          .filter(point => {
            const views = options?.map(it => it.label);
            return !views.includes(point.label);
          });
        setOptionsToSelect(calculateToSelect);
      } else {
        throw "No database ID";
      }
    };

    const sendConnectedModel = async (dbID, objID) => {
      const response = await axios.post(url_connect, {
        [field_first_connect]: JSON.stringify(dbID),
        [field_second_connect]: JSON.stringify(objID)
      });
      const result = response.data.data;
      if (result.length === 0) {
        throw "No data";
      }
      const row_id = result.id;
      const field_first_id = result[field_first_connect];
      const field_second_id = result[field_second_connect];
      return {
        row_id: row_id,
        field_first_id: field_first_id,
        field_second_id: field_second_id
      };
    };

    const updateConnectedModel = _.debounce(async (rowID, dbID, objID) => {
      const response = await axios.put(url_connect + `/${rowID}`, {
        [field_first_connect]: JSON.stringify(dbID),
        [field_second_connect]: JSON.stringify(objID)
      });
      console.log(response);
    }, 350);

    const deleteConnectedModel = _.debounce(async rowID => {
      const response = await axios.delete(url_connect + `/${rowID}`);
      console.log(response);
    }, 350);

    const renderOption = name => {
      let Icon = iconTypes[name];
      return (
        <button
          key={name}
          type="button"
          className={`icon ${name === properties.icon ? "active" : ""}`}
          onClick={() => handleIcon(name)}
        >
          <Icon fill={properties.fillColor} width={24} height={24} />
        </button>
      );
    };

    const [optionsToSelect, setOptionsToSelect] = useState(
      calculatePoints()?.map(item => {
        return {
          value: JSON.stringify({
            coords: item.feature.geometry.coordinates.toString(),
            id: item.feature.id
          }),
          label: item.feature.properties.popup
        };
      }) || []
    );

    const getLayoutData = useCallback(async () => {
      const layout = getLayer();
      if (
        typeof layout.feature?.dbID !== "undefined" &&
        layout.feature.dbID !== null
      ) {
        if (field_first_connect === null) {
          throw "Not set first column connect";
        }
        if (field_second_connect === null) {
          throw "Not set second column connect";
        }
        const dbID = layout.feature.dbID;
        axios.get(url_connect).then(res => {
          const result = res.data.data;
          if (result.length === 0) {
            throw "No data";
          }

          const currentPoints =
            result.filter(item => item[field_first_connect] == dbID) || [];

          const secondPointsIDs = currentPoints.map(
            item => item[field_second_connect]
          );
          const dataToSelect = optionsToSelect.map(item => {
            let value = JSON.parse(item.value);
            value = {
              ...value,
              rowID:
                _.find(currentPoints, row => {
                  const localID = Number(value.id);
                  return row[field_second_connect] === localID;
                })?.id || -1
            };
            return { ...item, value: JSON.stringify(value) };
          });
          setOptionsToSelect(dataToSelect);
          let resultPoints =
            calculatePoints()
              ?.map(item => {
                const featureID = Number(item.feature.id);
                if (secondPointsIDs.includes(featureID)) {
                  return item;
                }
              })
              ?.filter(item => typeof item !== "undefined") || [];
          if (resultPoints.length > 0) {
            resultPoints = resultPoints.map(item => {
              return {
                value: JSON.stringify({
                  coords: item.feature.geometry.coordinates.toString(),
                  id: item.feature.id,
                  rowID:
                    _.find(currentPoints, row => {
                      const localID = Number(item.feature.id);
                      return row[field_second_connect] === localID;
                    })?.id || -1
                }),
                label: item.feature.properties.popup
              };
            });
            setPoints(resultPoints);
          }
        });
      } else {
        throw "No database ID";
      }
    });

    useEffect(() => {
      setPoints([]);
      if (url_connect !== null) {
        getLayoutData();
      }
    }, [selected, url_connect, field_first_connect, field_second_connect]);
    return (
      <div className="altrp-map__modal modal">
        <div className={!open ? "modal__body" : "modal__body open"}>
          <h3>Настройки</h3>
          <div className="modal__body-text">
            <label>
              Подпись
              <input
                type="text"
                value={properties.tooltip}
                onChange={handleTooltip}
              />
            </label>
          </div>
          <div className="modal__body-text">
            <label>
              Всплывающее сообщение
              <textarea value={properties.popup} onChange={handlePopup} />
            </label>
          </div>
          {optionsToSelect.length > 0 && (
            <div className="mb-3">
              <label>
                Объекты
                <Select
                  value={points}
                  isMulti
                  placeholder="Выберите объекты"
                  onChange={value => handleSelected(value)}
                  options={optionsToSelect}
                />
              </label>
            </div>
          )}
          {properties.fillColor && (
            <div className="modal__body-color">
              <label>Цвет заливки</label>
              {colors.map((item, key) => (
                <button
                  key={key}
                  type="button"
                  style={{
                    backgroundColor: item
                  }}
                  className={`color ${
                    item === properties.fillColor ? "active" : ""
                  }`}
                  onClick={() => handleFillColor(item)}
                />
              ))}
            </div>
          )}
          {properties.color && (
            <div className="modal__body-color">
              <label>Цвет границы</label>
              {colors.map((item, key) => (
                <button
                  key={key}
                  type="button"
                  style={{
                    backgroundColor: item
                  }}
                  className={`color ${
                    item === properties.color ? "active" : ""
                  }`}
                  onClick={() => handleColor(item)}
                />
              ))}
            </div>
          )}
          {properties.fillOpacity && (
            <div className="modal__body-text">
              <label>
                Прозрачность заливки
                <input
                  type="range"
                  min="0.1"
                  step="0.1"
                  max="1.0"
                  value={properties.fillOpacity}
                  onChange={handleFillOpacity}
                />
              </label>
            </div>
          )}
          {properties.icon && (
            <div className="modal__body-icon">
              {icons.map(name => renderOption(name))}
            </div>
          )}
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="modal__body-save"
                style={{
                  width: "100%"
                }}
                onClick={saveSettings}
              >
                Сохранить
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="modal__body-save"
                style={{
                  width: "100%"
                }}
                onClick={onClose}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ModalControl;
