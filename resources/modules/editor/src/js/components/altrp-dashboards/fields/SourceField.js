import React from "react";
import Form from "react-bootstrap/Form";

function SourceField({ widget, setWidget, sources }) {
  return (
    <Form.Group>
      <Form.Label>Источник данных</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.source}
        onChange={(e) =>
          setWidget({
            ...widget,
            source: e.target.value,
          })
        }
        required
      >
        <option value="">-</option>
        {sources.map(({ url, name }) => (
          <option key={url} value={url}>
            {name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default SourceField;
