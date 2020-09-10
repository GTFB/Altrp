import React from "react";
import Form from "react-bootstrap/Form";

function DiseaseField({ widget, setWidget, diseases }) {
  return (
    <Form.Group>
      <Form.Label>Заболевание</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.filter.diseaseId}
        onChange={(e) =>
          setWidget({
            ...widget,
            filter: { ...widget.filter, diseaseId: e.target.value },
          })
        }
        required
      >
        <option value="">Все заболевания</option>
        {diseases.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default DiseaseField;
