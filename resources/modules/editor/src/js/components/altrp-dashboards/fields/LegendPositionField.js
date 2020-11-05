import React from "react";
import Form from "react-bootstrap/Form";

function LegendPositionField({ widget, setWidget }) {
  return (
    <Form.Group>
      <Form.Label>Положение легенды</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.options.legendPosition}
        onChange={(e) =>
          setWidget({
            ...widget,
            options: { ...widget.options, legendPosition: e.target.value, legend: e.target.value == 'left' || e.target.value == 'right' ? 'vertical' : 'horizontal' },
          })
        }
        required
      >
        <option value="bottom">Внизу</option>
        <option value="left">Слева</option>
        <option value="right">Справа</option>
        <option value="top">Сверху</option>
      </Form.Control>
    </Form.Group>
  );
}

export default LegendPositionField;
