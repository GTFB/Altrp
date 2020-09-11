import React from "react";
import { Col, Form } from "react-bootstrap";

// Не готов к использованию
const BorderControl = ({ name, value, onChange, options = {} }) => {
  return (
    <Form.Row>
      <Form.Label className="w-100">{name}</Form.Label>
      <Form.Group as={Col}>
        <Form.Control
          type="number"
          size="sm"
          value={parseInt(value)}
          onChange={onChange}
        />
      </Form.Group>
    </Form.Row>
  );
};

export default BorderControl;
