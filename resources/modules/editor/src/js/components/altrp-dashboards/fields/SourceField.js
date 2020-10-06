import React from "react";
import Form from "react-bootstrap/Form";
import { queryString } from "../helpers/queryString";

function SourceField({ widget, setWidget, sources }) {
  if (widget.source === '' && sources.length === 1) {
    setWidget({
      ...widget,
      source: sources[0].url + queryString(widget.filter),
    })
  }
  console.log('CHECK ME ', widget.source);
  return (
    <Form.Group>
      <Form.Label>{sources.length > 1 ? "Источник данных" : `Источник данных: ${sources[0].name}`}</Form.Label>
      <Form.Control
        as="select"
        custom
        className={{
          'd-none': sources.length === 1
        }}
        value={sources[0].url}
        onChange={(e) =>
          sources.length > 1 ?
            setWidget({
              ...widget,
              source: e.target.value + queryString(widget.filter),
            })
            : setWidget({
              ...widget,
              source: sources[0].url + queryString(widget.filter)
            })
        }
        required
      >
        {sources.length > 1 && (<option value="">-</option>)}
        {
          sources.length > 1 ?
            sources?.map(({ url, name }) => (
              <option key={url} value={url}>
                {name}
              </option>
            )) :
            sources?.map(({ url, name }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))
        }
      </Form.Control>
    </Form.Group>
  );
}

export default SourceField;
