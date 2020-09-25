import React from "react";
import Form from "react-bootstrap/Form";

import { disposalReasons } from "../../helpers/disposalReasons";

function ReasonField({ widget, setWidget }) {
  return (
    <Form.Group>
      <Form.Label>Причины выбытия</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.filter.reason}
        onChange={(e) =>
          setWidget({ ...widget, filter: { ...widget.filter, reason: e.target.value } })
        }
        required
      >
        <option value="">Все причины</option>
        {disposalReasons.map((reason) => (
          <option key={reason.value} value={reason.value}>
            {reason.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default ReasonField;
