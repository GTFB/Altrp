import React from "react";
import Form from "react-bootstrap/Form";

function SortDataField({ widget, setWidget}) {

    const sort = [
        {
            label: 'Без сортировки',
            value: 0
        },
        {
            label: 'По ключу',
            value: 1
        },
        {
            label: 'По значению',
            value: 2
        }
    ]

    return (<Form.Group>
    <Form.Label>Сортировка данных</Form.Label>
    <Form.Control
      as="select"
      custom
      value={widget.options.sort || 0}
      onChange={(e) => setWidget({ ...widget, options: { ...widget.options, sort: e.target.value }})}
      required
    >
      {sort.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Form.Control>
  </Form.Group>);
}

export default SortDataField;