import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import axios from "axios";
import SortAlphaDown from "react-bootstrap-icons/dist/icons/sort-alpha-down";

import useWidgetSettings from "hooks/useWidgetSettings";

import SelectControl from "components/painter/controls/SelectControl";
import ToggleControl from "components/painter/controls/ToggleControl";
import InputControl from "components/painter/controls/InputControl";

const defaultColumnState = {
  text: "",
  dataField: "",
  sort: false,
};

function ColumnController() {
  const [columns, setColumns] = useWidgetSettings("columns", []);
  const [source] = useWidgetSettings("source");
  const [keys, setKeys] = useState([]);
  const [column, setColumn] = useState(defaultColumnState);

  const getKeys = useCallback(async (source) => {
    try {
      const req = await axios(source);
      if (req.status === 200 && req.data.length > 0) {
        setKeys(["", ...Object.keys(req.data[0])]);
      }
    } catch (error) {}
  }, []);

  // Отслеживаем изменение источника данных
  useEffect(() => {
    source && getKeys(source);
  }, [getKeys, source]);

  const handleSave = () => {
    console.log("column :>> ", columns, column);
    // Проверяем добавлена ли уже колонка
    const isExist = columns.find((с) => с.dataField === column.dataField);
    // Если уже есть такое поле, отменяем функцию
    if (isExist) return;
    // Если таких полей нет, то добавляем
    setColumns([...columns, column]);
    setColumn(defaultColumnState);
  };

  // Удаляем колонку
  const handleRemove = (column) => {
    setColumns(columns.filter((c) => c.dataField !== column.dataField));
  };

  const handleChange = (column, param, value) => {
    console.log("column, value", column, value);
    setColumns(
      columns.map((c) => {
        return c.dataField === column.dataField ? { ...column, [param]: value } : c;
      })
    );
  };

  return (
    <>
      <Row>
        <Col>
          <SelectControl
            name="Ключ"
            list={keys}
            value={column.dataField}
            onChange={(value) => setColumn({ ...column, dataField: value })}
          />
        </Col>
        <Col>
          <InputControl
            name="Имя колонки"
            value={column.text}
            onChange={(value) => setColumn({ ...column, text: value })}
          />
        </Col>
      </Row>
      <ToggleControl
        name="Включить сортировку"
        value={column.sort}
        onChange={(value) => setColumn({ ...column, sort: value })}
      />
      <Button variant="primary" size="sm" onClick={handleSave}>
        Add Column
      </Button>
      <ListGroup>
        {columns.map((column, key) => (
          <ListGroup.Item key={key}>
            <Form.Control
              type="text"
              size="sm"
              value={column.text}
              onChange={(e) => handleChange(column, "text", e.target.value)}
            />
            <Button
              size="sm"
              variant={column.sort ? "success" : "secondary"}
              onClick={() => handleChange(column, "sort", !column.sort)}
            >
              <SortAlphaDown />
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleRemove(column)}>
              X
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ColumnController;
