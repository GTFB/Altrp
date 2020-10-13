import React from "react";
import Form from "react-bootstrap/Form";
import { queryString } from "../helpers/queryString";

function SourceField({ widget, setWidget, sources, changeTitle }) {
  return (
    <Form.Group>
      <Form.Label>{sources.length > 1 || sources.length == 0 ? "Источник данных" : `Источник данных: ${sources[0].name}`}</Form.Label>
      <Form.Control
        as="select"
        custom
        className={{
          'd-none': sources.length === 1
        }}
        value={widget.source}
        onChange={(e) => {
          setWidget({
            ...widget,
            source: e.target.value + queryString(widget.filter),
          });

          let sourceName = sources.find(source => source.url == e.target.value).label || '';
          changeTitle(` / ${sourceName}`);
        }
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
