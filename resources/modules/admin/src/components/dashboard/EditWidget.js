import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { schemes } from "reaviz";

import dataSources from "./dataSources";
import { TABLE, widgetTypes } from "./widgetTypes";
import WidgetDiagram from "./WidgetDiagram";

const EditWidget = ({ diagram, onSave, show, setShow }) => {
  const [widget, setWidget] = useState(diagram);

  const handleSave = () => {
    onSave(widget);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Widget #{widget.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Widget's Name</Form.Label>
                <Form.Control
                  type="text"
                  value={widget.name}
                  onChange={(e) => setWidget({ ...widget, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Widget's Type</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={widget.type}
                  onChange={(e) => setWidget({ ...widget, type: e.target.value })}
                >
                  {widgetTypes.map(({ name, value }, key) => (
                    <option key={key} value={value}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Color Scheme</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={widget.options.colorScheme}
                  onChange={(e) =>
                    setWidget({
                      ...widget,
                      options: { ...widget.options, colorScheme: e.target.value },
                    })
                  }
                >
                  {Object.keys(schemes).map((name, key) => (
                    <option key={key}>{name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Data Source</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={widget.source}
                  onChange={(e) => setWidget({ ...widget, source: e.target.value })}
                  required
                >
                  <option value="">Choose Source</option>
                  {dataSources.map(({ name, url }, key) => (
                    <option key={key} value={url}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {widget.type === TABLE && (
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
              )}
            </Form>
          </Col>
          <Col>
            <Row>
              <div className="widget-placeholder">
                {widget && <WidgetDiagram widget={widget} width={400} />}
              </div>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="warning" onClick={handleSave} disabled={widget.name === ""}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWidget;
