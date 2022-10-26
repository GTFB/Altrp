import {controllerMapStateToProps} from "../../decorators/controller";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { widgetTypes } from "../../../../../admin/src/components/dashboard/widgetTypes";

const SqlSelectController = ({ controller, controlId, label, multi, onlySQL }) => {
  const isMultiBool = multi || true;
  const currentElement = useSelector((state) => state.currentElement.currentElement);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(currentElement.getSettings(controlId));

  const getOptions = useCallback(async () => {
    setIsLoading(true);
    try {
      const req = await axios("/admin/ajax/sql_editors/list");
      if (req.status === 200) {
        setOptions(
          req.data.map((item) => {
            //console.log(item);
            return {
              value: item.name,
              label: item.description,
              model: item.model,
            };
          })
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  const handleSelected = (opts) => {
    setSettings(opts);
  };

  //Изменяем настройки
  useEffect(() => {
    controller.changeValue(settings);
  }, [settings]);

  const handleTypes = (opts, source) => {

    setSettings(
      settings.map((item) => {
        if (item.value === source.value) {
          return {
            ...item,
            types: opts,
          };
        } else {
          return item;
        }
      })
    );
  };

  // Подгружаем sql запросы
  useEffect(() => {
    options.length === 0 && getOptions();
  }, [options.length]);

  if (!controller.isShow()) {
    return "";
  }

  return (
    <div className="controller-container controller-container_query">
      <div className="controller-field-group flex-wrap">
        <div className="controller-container__label">{label || 'Select SQL queries'}</div>
        <div className="control-container_select-wrapper w-100">
          <Select
            isMulti={isMultiBool}
            isClearable
            isSearchable
            defaultValue={settings}
            isLoading={isLoading}
            onChange={handleSelected}
            options={options}
          />
        </div>
      </div>
      { !onlySQL &&
      (<div className="controller-field-group flex-wrap">
        <div className="controller-container__label">Assign types to queries</div>
        <div className="control-container_select-wrapper assigning-types">
          {settings &&
            settings.map((source, key) => (
              <div className="assigning-types__item" key={key}>
                {source.label}
                <Select
                  isMulti
                  isClearable
                  isSearchable
                  defaultValue={source.types}
                  onChange={(opts) => handleTypes(opts, source)}
                  options={widgetTypes.map((item) => {
                    return { label: item.name, value: item.value };
                  })}
                />
              </div>
            ))}
        </div>
      </div>)
      }
    </div>
  );
};

export default SqlSelectController;
