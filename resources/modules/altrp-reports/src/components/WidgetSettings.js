import React from "react";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";

import loadWidget from "../helpers/loadWidget";
import WidgetPainter from "./painter/WidgetPainter";

const WidgetSettings = () => {
  const { widgetName } = useSelector((state) => state.sections.present.selectedWidget);

  // Загрузаем страницу настроек виджета
  const WidgetSettings = loadable(() =>
    widgetName ? loadWidget(widgetName, true) : new Promise(() => null)
  );

  return widgetName ? (
    <>
      <WidgetSettings />
      <WidgetPainter />
    </>
  ) : (
    <p>Выберите виджет</p>
  );
};

export default WidgetSettings;
