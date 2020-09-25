import React from "react";
import { Form, Col } from "react-bootstrap";

const IndentControl = ({ list, title }) => {
  const handleChange = (e, onChange) => {
    const val = parseInt(e.target.value);
    onChange(val);
  };

  return (
    <Form.Row>
      <Form.Label className="w-100">{title}</Form.Label>
      {list.map((item, index) => (
        <Form.Group key={index} as={Col}>
          <Form.Text muted>{item.name}</Form.Text>
          <Form.Control
            type="number"
            size="sm"
            value={parseInt(item.value)}
            onChange={(e) => handleChange(e, item.onChange)}
          />
        </Form.Group>
      ))}
    </Form.Row>
  );
};

export default IndentControl;
