import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

const InputControl = ({ name, value, onChange, options = {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control size="sm" {...options} value={value} onChange={handleChange} />
    </Form.Group>
  );
};

export default InputControl;
