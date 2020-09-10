import React from "react";
import Form from "react-bootstrap/Form";

import { getTypeName } from "../../../../../../admin/src/components/dashboard/widgetTypes";

function TypeField({ widget, setWidget, allowedTypes }) {
  return (
    <Form.Group>
      <Form.Label>Тип виджета</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.type}
        onChange={(e) => setWidget({ ...widget, type: e.target.value })}
      >
        {allowedTypes.map((value, key) => (
          <option key={key} value={value}>
            {getTypeName(value)}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default TypeField;
