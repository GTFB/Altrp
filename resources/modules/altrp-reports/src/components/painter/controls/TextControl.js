import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

const TextControl = ({ name, value, onChange, options = {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        {...options}
        as="textarea"
        value={value}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default TextControl;
