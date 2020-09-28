import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

const ModelControl = ({ value, onChange }) => {
  const [models, setModels] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedModel, setSelectedModel] = useState(value.model);
  const [isLoading, setIsLoading] = useState(false);

  /*
    Получаем список моделей
  */
  const getModels = useCallback(async () => {
    const req = await axios("/admin/ajax/tables");
    if (req.status === 200) {
      setModels(req.data);
    }
  }, [setModels]);

  /* 
    Получаем список записей выбранной модели 
  */
  const getItems = useCallback(async (model) => {
    setSelectedModel(model);
    setIsLoading(true);
    setItems([]);
    const req = await axios(`/admin/ajax/tables/${model.value}/items`);
    if (req.status === 200) {
      setItems(req.data);
      setIsLoading(false);
    }
  }, []);

  const handleSelected = (item) => {
    onChange({ model: selectedModel, item });
  };

  const showTableData = (item) => {
    let label = ``;
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        label += item[key] + ", ";
      }
    }
    return label;
  };

  useEffect(() => {
    getModels();
  }, [getModels]);

  return (
    <>
      <Form.Group>
        <Form.Label>Выберите модель</Form.Label>
        <Select
          options={models.map((item) => {
            return {
              value: item.name,
              label: item.title,
            };
          })}
          defaultValue={selectedModel}
          onChange={getItems}
        />
      </Form.Group>

      {setSelectedModel && (
        <Form.Group>
          <Form.Label>Выберите запись</Form.Label>
          <Select
            isLoading={isLoading}
            defaultValue={value.item}
            options={items.map((item) => {
              return {
                value: item,
                label: showTableData(item),
              };
            })}
            onChange={handleSelected}
          />
        </Form.Group>
      )}
      {value.item?.value && <pre>{JSON.stringify(value, null, 2)}</pre>}
    </>
  );
};

export default ModelControl;
