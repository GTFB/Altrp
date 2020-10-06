import React from "react";
import Form from "react-bootstrap/Form";
import { queryString } from "../helpers/queryString";

function SourceField({ widget, setWidget, sources }) {
  return (
    <Form.Group>
      <Form.Label>{sources.length > 1 ? "Источник данных" : `Источник данных: ${sources[0].name}`}</Form.Label>
      <Form.Control
        as="select"
        custom
        className={{
          'd-none': sources.length === 1
        }}
        value={widget.source}
        onChange={(e) =>
          setWidget({
            ...widget,
            source: e.target.value + queryString(widget.filter),
          })
        }
        required
      >
        <option value="">-</option>
        {sources.map(({ url, name }) => (
          <option key={url} value={url}>
            {name}
          </option>))}
      </Form.Control>
    </Form.Group>
  );
}

export default SourceField;
