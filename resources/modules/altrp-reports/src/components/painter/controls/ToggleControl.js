import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

const ToggleControl = ({ name, value, onChange, options = {} }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(!value);
    },
    [onChange, value]
  );

  return (
    <Form.Group>
      <Form.Check {...options}>
        <Form.Check.Label>
          <Form.Check.Input type="checkbox" value={value} onChange={handleChange} /> {name}
        </Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
};

export default ToggleControl;
