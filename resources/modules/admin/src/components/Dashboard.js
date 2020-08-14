import React, { useState } from "react";
import { schemes } from "reaviz";

import GearFill from "react-bootstrap-icons/dist/icons/gear-fill";
import TrashFill from "react-bootstrap-icons/dist/icons/trash-fill";

import { PIE, BAR, DONUT } from "./dashboard/widgetTypes";
import WidgetDiagram from "./dashboard/WidgetDiagram";
import WidgetParams from "./dashboard/WidgetParams";

function Dashboard() {
  const [list, setList] = useState([
    { name: "Использование плагинов", type: PIE, source: "/admin/ajax/analytics", width: 400 },
    { name: "Шаблоны по типу контента", type: BAR, source: "/admin/ajax/analytics", width: 400 },
    { name: "Пустые данные", type: DONUT, source: "/admin/ajax/analytics/none", width: 400 },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const showSettingsModal = (index) => {
    setShowSettings(true);
    setSelectedItemIndex(index);
  };

  const deleteWidget = (index) => {
    setList(list.filter((item, i) => (i !== index ? item : null)));
  };

  return (
    <div className="admin-templates admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">
            Добро пожаловать!
          </a>
        </div>
      </div>
      <div className="admin-content">
        <div className="charts">
          {list.map((widget, i) => (
            <div key={i} className="card" style={{ width: widget.width }}>
              <div className="card-header">
                <div className="card-header__name">{widget.name}</div>
                <div className="card-header__buttons d-print-none">
                  <button
                    className="d-none d-sm-inline-block"
                    type="button"
                    title="Настроить виджет"
                    onClick={() => showSettingsModal(i)}
                  >
                    <GearFill color="#8E94AA" />
                  </button>
                  <button
                    className="d-none d-sm-inline-block"
                    type="button"
                    title="Удалить виджет"
                    onClick={() => deleteWidget(i)}
                  >
                    <TrashFill color="#8E94AA" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <WidgetDiagram
                  type={widget.type}
                  filter={widget.filter}
                  url={widget.source}
                  options={widget.options}
                  width={widget.width}
                  colorScheme={schemes[widget.colorScheme]}
                />
              </div>
            </div>
          ))}
        </div>
        {showSettings && (
          <WidgetParams
            list={list}
            setList={setList}
            itemIndex={selectedItemIndex}
            show={showSettings}
            setShow={setShowSettings}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
