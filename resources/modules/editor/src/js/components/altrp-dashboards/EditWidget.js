import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { TABLE } from "../../../../../admin/src/components/dashboard/widgetTypes";

import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";
import TypeField from "./fields/TypeField";
import LegendField from "./fields/LegendField";
import FilterField from "./fields/FilterField";
import SourceField from "./fields/SourceField";
import ColorSchemeField from "./fields/colorSchemeField";
import VerticalTableField from "./fields/VerticalTableField";

const EditWidget = ({ data, onEdited, setIsEdit, settings }) => {
  const [widget, setWidget] = useState(data);

  const title = useRef(widget.title);

  const onSave = async () => {
    onEdited({
      ...widget,
      title: title.current.value,
    });
    setIsEdit(false);
  };

  const getTypesBySource = (s) => {
    const source = settings.sql.find(
      (item) => s === `/ajax/models/queries/${item.model}/${item.value}`
    );
    return source?.types?.map((type) => type.value) || [];
  };

  const composeSources = (sources = []) => {
    if (sources.length === 0) return [];

    return sources.map((source) => {
      return {
        name: source.label,
        url: `/ajax/models/queries/${source.model}/${source.value}`,
      };
    });
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

          <SourceField
            widget={widget}
            setWidget={setWidget}
            sources={composeSources(settings.sql)}
          />

          {widget.source &&
            settings.filter.length > 0 &&
            settings.filter?.map((param) => (
              <FilterField key={param.value} widget={widget} setWidget={setWidget} param={param} />
            ))}

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
