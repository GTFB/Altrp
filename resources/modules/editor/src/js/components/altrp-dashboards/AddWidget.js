import React, { useEffect, useCallback, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { BAR, PIE, TABLE, DONUT } from "../../../../../admin/src/components/dashboard/widgetTypes";

import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";
import TypeField from "./fields/TypeField";
import LegendField from "./fields/LegendField";
import SourceField from "./fields/SourceField";
import ColorSchemeField from "./fields/colorSchemeField";

const AddWidget = ({ onAdd, setIsShow }) => {
  const [widget, setWidget] = useState({
    type: TABLE,
    source: "",
    options: {
      isVertical: false,
      legend: "",
    },
  });

  const title = useRef("");

  const onSave = async () => {
    const data = {
      ...widget,
      title: title.current.value,
      options: JSON.stringify(widget.options),
    };
    onAdd(data);
    setIsShow(false);
  };

  const handleFocus = (e) => {
    const { value } = e.target;
    if (value === "Новый виджет") {
      title.current.value = "";
    }
  };

  const handleBlur = (e) => {
    const { value } = e.target;
    if (value === "") {
      title.current.value = "Новый виджет";
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Добавить виджет</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={12} sm={6}>
            <Form>
              <Form.Group>
                <Form.Label>Название виджета</Form.Label>
                <Form.Control
                  type="text"
                  ref={title}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  defaultValue="Новый виджет"
                  required
                />
              </Form.Group>

              <TypeField
                widget={widget}
                setWidget={setWidget}
                allowedTypes={[BAR, PIE, DONUT, TABLE]}
              />

              <ColorSchemeField widget={widget} setWidget={setWidget} />

              <SourceField
                widget={widget}
                setWidget={setWidget}
                sources={[
                  { name: "Информация о шаблонах", url: "/admin/ajax/analytics" },
                  { name: "Пустые данные", url: "/admin/ajax/analytics/none" },
                ]}
              />

              <LegendField widget={widget} setWidget={setWidget} />
            </Form>
          </Col>
          <Col xs={12} sm={6}>
            <Row>
              <div className="widget-placeholder">
                {widget.source && <WidgetDiagram widget={widget} width={360} height={360} />}
              </div>
            </Row>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={() => setIsShow(false)}>
          Закрыть
        </Button>
        <Button variant="warning" onClick={onSave} disabled={widget.source === ""}>
          Сохранить изменения
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default React.memo(AddWidget);
