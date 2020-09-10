import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AddWidget from "./AddWidget";

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
    console.log("widget :>> ", widget);
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
        {isShow && <AddWidget isShow={isShow} setIsShow={setIsShow} onAdd={handleAdd} />}
        {widgets.map((widget) => (
          <div key={widget.id}>{widget.title}</div>
        ))}
      </div>
    </div>
  );
};

export default AltrpDashboards;
