import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import AddWidget from "./AddWidget";
import CardWidget from "./CardWidget";

const AltrpDashboards = ({ id, settings }) => {
  const [widgets, setWidgets] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const getWidgets = useCallback(
    async (id) => {
      try {
        const req = await axios(`/ajax/dashboards/${id}`);
        if (req.status === 200) {
          setWidgets(
            req.data.map((w) => {
              return {
                ...w,
                options: { ...JSON.parse(w.options), animated: settings.animated },
                filter: JSON.parse(w.filter),
              };
            })
          );
        }
      } catch (error) {}
    },
    [id, settings.animated]
  );

  const handleAdd = (widget) => {
    setWidgets([widget, ...widgets]);
  };

  const handleRemove = (widget) => {
    setWidgets(widgets.filter((w) => w.id !== widget.id));
    axios.delete(`/ajax/dashboards/${widget.id}`);
  };

  const handleEdit = (widget) => {
    setWidgets(widgets.map((w) => (w.id === widget.id ? widget : w)));
    axios.put(`/ajax/dashboards/${widget.id}`, {
      ...widget,
      options: JSON.stringify(widget.options),
      filter: JSON.stringify(widget.filter),
    });
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
        {isShow && (
          <AddWidget sources={settings.sql} id={id} setIsShow={setIsShow} onAdd={handleAdd} />
        )}
        {widgets.map((widget) => (
          <CardWidget
            sources={settings.sql}
            key={widget.id}
            widget={widget}
            onDeleted={handleRemove}
            onEdited={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AltrpDashboards;
