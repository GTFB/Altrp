import React, { useState, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { BAR, PIE, TABLE, DONUT } from "../../../../../admin/src/components/dashboard/widgetTypes";

import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";
import TypeField from "./fields/TypeField";
import LegendField from "./fields/LegendField";
import SourceField from "./fields/SourceField";
import ColorSchemeField from "./fields/colorSchemeField";
import VerticalTableField from "./fields/VerticalTableField";

const AddWidget = ({ id, onAdd, setIsShow, sources }) => {
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
      filter: JSON.stringify({}),
    };
    const req = await axios.post(`/ajax/dashboards/${id}`, data);
    if (req.status === 200) {
      onAdd(req.data);
      setIsShow(false);
    }
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

  const getTypesBySource = (s) => {
    const source = sources.find((item) => s === `/ajax/models/queries/${item.model}/${item.value}`);
    return source?.types?.map((type) => type.value) || [];
  };

  console.log("widget.type :>> ", widget.type);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Добавить виджет</Card.Title>
      </Card.Header>
      <Card.Body>
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

          <SourceField
            widget={widget}
            setWidget={setWidget}
            sources={sources.map((item) => {
              return { name: item.label, url: `/ajax/models/queries/${item.model}/${item.value}` };
            })}
          />

          <TypeField
            widget={widget}
            setWidget={setWidget}
            allowedTypes={[...getTypesBySource(widget.source), TABLE]}
          />

          {widget.source && widget.type === TABLE && (
            <VerticalTableField widget={widget} setWidget={setWidget} />
          )}

          <ColorSchemeField widget={widget} setWidget={setWidget} />

          <LegendField widget={widget} setWidget={setWidget} />
        </Form>

        <div className="widget-placeholder">
          {widget.source && <WidgetDiagram widget={widget} width={360} height={360} />}
        </div>
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
