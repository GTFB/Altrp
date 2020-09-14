import React, { useState, useCallback, useEffect } from "react";
import { schemes } from "reaviz";
import axios from "axios";

import GearFill from "react-bootstrap-icons/dist/icons/gear-fill";
import TrashFill from "react-bootstrap-icons/dist/icons/trash-fill";

import WidgetDiagram from "./dashboard/WidgetDiagram";
import EditWidget from "./dashboard/EditWidget";
import AddWidget from "./dashboard/AddWidget";

function Dashboard() {
  const [diagrams, setDiagrams] = useState([]);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState({});

  /*
   * Показываем окно настроек
   */
  const showSettingsModal = (widget) => {
    setSelectedWidget(widget);
    setShowEditForm(true);
  };

  /*
   * Удаляем диаграмму
   */
  const removeDiagram = ({ id }) => {
    // Ищем индекс
    const index = diagrams.findIndex((item) => item.id === id);
    // Удаляем локально
    setDiagrams(diagrams.filter((item, i) => (i !== index ? item : null)));
    // Удаляем с сервера
    axios.delete("/admin/ajax/diagrams/" + id);
  };

  /*
   * Добавляем диаграмму
   */
  const addDiagram = async (widget) => {
    // Добавляем на сервер
    const data = {
      title: widget.name,
      settings: JSON.stringify({ ...widget }),
    };
    const req = await axios.post("/admin/ajax/diagrams", data);
    if (req.status === 200 && typeof req.data !== "string") {
      // Добавляем в локальный стейт
      setDiagrams([...diagrams, { ...widget, id: req.data.id }]);
    }
  };

  /*
   * Обновляем диаграмму
   */
  const updateDiagram = (widget) => {
    // Находим индекс виджета по id
    const itemIndex = diagrams.findIndex((item) => item.id === widget.id);
    // Обновляем локальные настройки
    setDiagrams(diagrams.map((item, index) => (itemIndex === index ? widget : item)));
    // Формируем данные для БД
    const data = {
      title: widget.name,
      settings: JSON.stringify({ ...widget }),
    };
    // Отправляем новые настройки на сервер
    axios.put("/admin/ajax/diagrams/" + widget.id, data);
  };

  /*
   * Получаем список диаграмм
   */
  const getDiagrams = useCallback(async () => {
    const req = await axios("/admin/ajax/diagrams");
    if (req.status === 200 && typeof req.data !== "string") {
      // Приводим результат запроса к соотв. виду.
      const diagrams = req.data.map((item) => {
        const settings = JSON.parse(item.settings);
        return { id: item.id, ...settings };
      });
      // Добавляем в локальный стейт
      setDiagrams(diagrams);
    }
  }, [setDiagrams]);

  /*
   * Обновляем диаграммы при монтировании
   */
  useEffect(() => {
    getDiagrams();
  }, [getDiagrams]);

  return (
    <div className="admin-templates admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">
            Analytics
          </a>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn">
          Add Widget
        </button>
      </div>
      <div className="admin-content">
        <div className="charts">
          {diagrams.map((widget) => (
            <div key={widget.id} className="card" style={{ width: widget.width }}>
              <div className="card-header">
                <div className="card-header__name">{widget.name}</div>
                <div className="card-header__buttons d-print-none">
                  <button
                    className="d-none d-sm-inline-block"
                    type="button"
                    title="Настроить виджет"
                    onClick={() => showSettingsModal(widget)}
                  >
                    <GearFill color="#8E94AA" />
                  </button>
                  <button
                    className="d-none d-sm-inline-block"
                    type="button"
                    title="Удалить виджет"
                    onClick={() => removeDiagram(widget)}
                  >
                    <TrashFill color="#8E94AA" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <WidgetDiagram widget={widget} width={360} />
              </div>
            </div>
          ))}
        </div>
        {showEditForm && (
          <EditWidget
            show={showEditForm}
            setShow={setShowEditForm}
            diagram={selectedWidget}
            onSave={updateDiagram}
          />
        )}
        {showAddForm && (
          <AddWidget show={showAddForm} setShow={setShowAddForm} onSave={addDiagram} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
