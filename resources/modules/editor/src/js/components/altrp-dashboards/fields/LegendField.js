import React from "react";
import Form from "react-bootstrap/Form";

function LegendField({ widget, setWidget }) {
  return (
    <Form.Group>
      <Form.Label>Легенда</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.options.legend}
        onChange={(e) =>
          setWidget({
            ...widget,
            options: { ...widget.options, legend: e.target.value },
          })
        }
        required
      >
        <option value="">Не показывать</option>
        <option value="horizontal">Горизонтальная</option>
        <option value="vertical">Вертикальная</option>
      </Form.Control>
    </Form.Group>
  );
}

export default LegendField;
