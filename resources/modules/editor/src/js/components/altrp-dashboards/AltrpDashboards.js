import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import GearFill from "react-bootstrap-icons/dist/icons/gear-fill";
import TrashFill from "react-bootstrap-icons/dist/icons/trash-fill";

import AddWidget from "./AddWidget";
import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";

const AltrpDashboards = ({ id, settings }) => {
  const [widgets, setWidgets] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const getWidgets = useCallback(
    async (id) => {
      try {
        const req = await axios(`/ajax/dashboards/${id}`);
        if (req.status === 200) {
          setWidgets(req.data);
        }
      } catch (error) {}
    },
    [id]
  );

  const handleAdd = (widget) => {
    setWidgets([widget, ...widgets]);
  };

  useEffect(() => {
    getWidgets(id);
  }, [id]);

  return (
    <div className="altrp-dashboard">
      <div className="altrp-dashboard__controls">
        <button onClick={() => setIsShow(true)}>Добавить виджет</button>
      </div>
      <div className="altrp-dashboard__widgets">
        {isShow && <AddWidget id={id} setIsShow={setIsShow} onAdd={handleAdd} />}
        {widgets.map((widget) => (
          <Card key={widget.id}>
            <Card.Header>
              <Card.Title>{widget.title}</Card.Title>
              <Card.Title>
                <button type="button" title="Настроить виджет">
                  <GearFill />
                </button>
                <button type="button" title="Удалить виджет">
                  <TrashFill />
                </button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <WidgetDiagram widget={widget} width={360} height={300} />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AltrpDashboards;
