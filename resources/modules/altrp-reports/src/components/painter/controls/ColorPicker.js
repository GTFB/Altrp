import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { SketchPicker } from "react-color";

const ColorPicker = ({ name, value, onChange, options = {} }) => {
  const [show, setShow] = useState(false);

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control size="sm" value={value} onClick={() => setShow(!show)} readOnly />
      {show && (
        <SketchPicker
          {...options}
          color={value}
          onChange={({ hex }) => onChange(hex)}
          disableAlpha={true}
        />
      )}
    </Form.Group>
  );
};

export default ColorPicker;
