import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import GearFill from "react-bootstrap-icons/dist/icons/gear-fill";
import TrashFill from "react-bootstrap-icons/dist/icons/trash-fill";

import EditWidget from "./EditWidget";
import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";

function CardWidget({ widget, onDeleted, onEdited }) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card key={widget.id}>
      <Card.Header>
        <Card.Title>{widget.title}</Card.Title>
        <Card.Title>
          <button type="button" title="Настроить виджет" onClick={() => setIsEdit(!isEdit)}>
            <GearFill />
          </button>
          <button type="button" title="Удалить виджет" onClick={() => onDeleted(widget)}>
            <TrashFill />
          </button>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {isEdit ? (
          <EditWidget data={widget} onEdited={onEdited} setIsEdit={setIsEdit} />
        ) : (
          <WidgetDiagram widget={widget} width={360} height={300} />
        )}
      </Card.Body>
    </Card>
  );
}

export default CardWidget;
