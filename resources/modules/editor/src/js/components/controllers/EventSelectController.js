import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const EventSelectController = ({ controller, controlId }) => {
  const currentElement = useSelector((state) => state.currentElement.currentElement);
  const [settings, setSettings] = useState(currentElement.getSettings(controlId));

  //Изменяем настройки
  useEffect(() => {
    controller.changeValue(settings);
  }, [settings]);

  if (!controller.isShow()) {
    return "";
  }

  return (
    <div className="controller-container controller-container_query">
      <div className="controller-field-group flex-wrap">
        <div className="controller-container__label">Select event handler</div>
        <div className="control-container_select-wrapper w-100">
          <select
            name="evt"
            value={settings.evt}
            onChange={(e) => {
              e.persist();
              setSettings((prev) => {
                return { ...prev, evt: e.target.value };
              });
            }}
          >
            <option value="">-</option>
            <option value="goto">Перейти в URL</option>
            <option value="load">Загрузить новые данные</option>
          </select>
        </div>
      </div>
      <div class="controller-container controller-container_text">
        <div class="controller-container__label textcontroller-responsive">
          Hanlder parameters
          <div class="screens-container">
            <span class="screens-title "></span>
          </div>
        </div>
      </div>
      <div class="control-group">
        <input
          name="params"
          type="text"
          value={settings.params}
          onChange={(e) => {
            e.persist();
            setSettings((prev) => {
              return { ...prev, params: e.target.value };
            });
          }}
        />
      </div>
    </div>
  );
};

export default EventSelectController;
