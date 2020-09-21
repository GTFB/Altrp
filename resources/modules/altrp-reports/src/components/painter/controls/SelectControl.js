import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

const SelectControl = ({ name, value, list, onChange, options = {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const showList = () => {
    switch (typeof list[0]) {
      case "object":
        return Object.entries(list).map(([key, value]) => (
          <option value={value.value} key={key}>
            {value.name}
          </option>
        ));
      case "string":
        return list.map((value, key) => <option key={key}>{value}</option>);
      default:
        break;
    }
  };

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control {...options} as="select" size="sm" value={value} onChange={handleChange}>
        {showList()}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectControl;
