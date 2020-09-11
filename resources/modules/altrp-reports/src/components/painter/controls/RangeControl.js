import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

const RangeControl = ({ name, value, onChange, options = {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value + (options.appendix || ""));
    },
    [onChange, options.appendix]
  );

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        size="sm"
        {...options}
        type="range"
        value={parseFloat(value)}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default RangeControl;
