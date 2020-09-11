import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { BAR, PIE, TABLE, DONUT } from "../../../../../admin/src/components/dashboard/widgetTypes";

import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";
import TypeField from "./fields/TypeField";
import LegendField from "./fields/LegendField";
import SourceField from "./fields/SourceField";
import ColorSchemeField from "./fields/colorSchemeField";

const EditWidget = ({ data, onEdited, setIsEdit }) => {
  const [widget, setWidget] = useState(data);

  const title = useRef(widget.title);

  const onSave = async () => {
    onEdited({
      ...widget,
      title: title.current.value,
    });
    setIsEdit(false);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Редактировать виджет</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Название виджета</Form.Label>
            <Form.Control type="text" ref={title} defaultValue={widget.title} required />
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

        <div className="widget-placeholder">
          {widget.source && <WidgetDiagram widget={widget} width={360} height={360} />}
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={() => setIsEdit(false)}>
          Закрыть
        </Button>
        <Button variant="warning" onClick={onSave} disabled={widget.source === ""}>
          Сохранить изменения
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default React.memo(EditWidget);
