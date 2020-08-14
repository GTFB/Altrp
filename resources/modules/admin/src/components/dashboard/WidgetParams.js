import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { schemes } from "reaviz";

import { TABLE, widgetTypes } from "./widgetTypes";
import WidgetDiagram from "./WidgetDiagram";

const WidgetParams = ({ itemIndex, show, setShow, list, setList }) => {
  const [widget, setWidget] = useState(list[itemIndex]);

  const dataSources = [
    { name: "Информация о шаблонах", url: "/admin/ajax/analytics" },
    { name: "Пустые данные", url: "/admin/ajax/analytics/none" },
  ];

  const onSave = () => {
    setList(list.map((item, index) => (itemIndex === index ? widget : item)));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать виджет</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Название виджета</Form.Label>
                <Form.Control
                  type="text"
                  value={widget.name}
                  onChange={(e) => setWidget({ ...widget, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Тип виджета</Form.Label>
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
                <Form.Label>Цветовая схема</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={widget.colorScheme}
                  onChange={(e) => setWidget({ ...widget, colorScheme: e.target.value })}
                >
                  {Object.keys(schemes).map((name, key) => (
                    <option key={key}>{name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Источник данных</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={widget.source}
                  onChange={(e) => setWidget({ ...widget, source: e.target.value })}
                  required
                >
                  <option value="">Выберите источник</option>
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
                {widget && (
                  <WidgetDiagram
                    type={widget.type}
                    url={widget.source}
                    filter={widget.filter}
                    options={widget.options}
                    colorScheme={schemes[widget.colorScheme]}
                    width={400}
                  />
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Закрыть
        </Button>
        <Button variant="warning" onClick={onSave} disabled={widget.name === ""}>
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WidgetParams;
