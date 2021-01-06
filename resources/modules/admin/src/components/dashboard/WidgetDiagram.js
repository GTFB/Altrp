import React from "react";

import { BAR, PIE, LINE, TABLE, POINT } from "./widgetTypes";

import DynamicBarChart from "./widgets/DynamicBarChart";
import DynamicPieChart from "./widgets/DynamicPieChart";
import DynamicLineChart from "./widgets/DynamicLineChart";
import DynamicTableWidget from "./widgets/DynamicTableWidget";
import DynamicPointChart from "./widgets/DynamicPointChart";

const WidgetDiagram = ({ widget, width = 350, height = 450 }) => {
  switch (widget.type) {
    case BAR:
      return (
        <DynamicBarChart
          width={width}
          height={height}
          widget={widget}
          isDashboard={true}
        />
      );
    case PIE:
      return (
        <DynamicPieChart
          width={width}
          height={height}
          widget={widget}
          isDashboard={true}
        />
      );
    case LINE:
      return (
        <DynamicLineChart
          width={width}
          height={height}
          widget={widget}
          isDashboard={true}
        />
      );
    case TABLE:
      return (
        <DynamicTableWidget
          width={width}
          height={height}
          widget={widget}
          isDashboard={true}
        />
      );
    case POINT:
      return (
        <DynamicPointChart
          width={width}
          height={height}
          widget={widget}
          isDashboard={true}
        />
      );
    default:
      return <></>;
  }
};

export default WidgetDiagram;
