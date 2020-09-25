import React from "react";
import Form from "react-bootstrap/Form";

function AnimalTypeField({ widget, setWidget, animalsType }) {
  return (
    <Form.Group>
      <Form.Label>Вид животного</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.filter.kindId}
        onChange={(e) =>
          setWidget({ ...widget, filter: { ...widget.filter, kindId: e.target.value } })
        }
        required
      >
        <option value="">Все</option>
        {animalsType.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default AnimalTypeField;
