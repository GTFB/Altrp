import React from "react";
import Form from "react-bootstrap/Form";

function VerticalTableField({ widget, setWidget }) {
  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        checked={widget.options.isVertical}
        label="Вертикальная таблица"
        onChange={(e) =>
          setWidget({
            ...widget,
            options: { ...widget.options, isVertical: e.target.checked },
          })
        }
      />
    </Form.Group>
  );
}

export default VerticalTableField;
