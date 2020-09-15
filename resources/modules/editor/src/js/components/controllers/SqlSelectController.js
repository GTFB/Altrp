import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";

const SqlSelectController = ({ controller, controlId, label }) => {
  const currentElement = useSelector((state) => state.currentElement.currentElement);
  const value = currentElement.getSettings(controlId) || [];
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOptions = useCallback(async () => {
    setIsLoading(true);
    try {
      const req = await axios("/admin/ajax/sql_editors/list");
      if (req.status === 200) {
        setOptions(
          req.data.map((item) => {
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

  // Подгружаем sql запросы
  useEffect(() => {
    options.length === 0 && getOptions();
  }, [options.length]);

  if (!controller.isShow()) {
    return "";
  }
  return (
    <>
      <label>{label}</label>
      <Select
        isMulti
        isClearable
        isSearchable
        defaultValue={value}
        isLoading={isLoading}
        onChange={(opts) => controller.changeValue(opts)}
        options={options}
      />
    </>
  );
};

export default SqlSelectController;
