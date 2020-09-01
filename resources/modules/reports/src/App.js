import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { importStructure, selectSection, changeSettings } from "store/sections/actions";
import { toggleWidgets } from "./store/app/actions";

import Preview from "./components/Preview";
import Widgets from "./components/Widgets";
import Settings from "./components/Settings";
import Bottom from "./components/bottom";
import Resizer from "./components/Resizer";

import { ReactComponent as WidgetsIcon } from "./icons/menu.svg";
import { ReactComponent as MenuIcon } from "./icons/open-menu.svg";

import "./app.scss";
import "./scss/print.scss";

function App() {
  const dispatch = useDispatch();
  const showWidgets = useSelector((state) => state.app.showWidgets);
  const templateId = useSelector((state) => state.app.templateId);
  const globalSettings = useSelector((state) => state.sections.present.settings);
  const [width, setWidth] = useState(400);

  const loadTemplate = useCallback(async () => {
    // Загружаем данные
    const req = await axios.get(`/reports/${templateId}`);
    if (req.data) {
      // Записываем заголовок
      document.title = req.data.name;
      // Проверяем наличие глобальных настроек
      if (req.data.global) {
        const global = JSON.parse(req.data.global);
        // Проверяем указан ли кастомный favicon
        if (global.favicon) {
          const favicon = document.querySelector("link[rel*='icon']");
          favicon.href = global.favicon;
        }
        // Записываем глобальные настройки в глобальное хранилище
        dispatch(changeSettings(global));
      }
      // Записываем данные в стор
      dispatch(importStructure(JSON.parse(req.data.json) || []));
      // Делаем первую секцию активной
      dispatch(selectSection(0));
    }
  }, [dispatch, templateId]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rrbe">
        <div className="rrbe__left d-print-none" style={{ maxWidth: width }}>
          <div className="rrbe__left-top left-top">
            <div className="left-top__burger">
              <Button variant="link">
                <MenuIcon width="20" height="20" fill="#ffffff" />
              </Button>
            </div>
            <div className="left-top__title">
              {globalSettings?.favicon && <img src={globalSettings.favicon} alt="RRBE Editor" />}
            </div>
            <div className="left-top__widgets">
              <Button variant="link" onClick={() => dispatch(toggleWidgets(!showWidgets))}>
                <WidgetsIcon width="20" height="20" fill="#ffffff" />
              </Button>
            </div>
          </div>
          <aside className="rrbe__left-container">{showWidgets ? <Widgets /> : <Settings />}</aside>
          <div className="rrbe__left-bottom">
            <Bottom />
          </div>
        </div>
        <Resizer setWidth={setWidth} />
        <div className="rrbe__right">
          <Preview />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
