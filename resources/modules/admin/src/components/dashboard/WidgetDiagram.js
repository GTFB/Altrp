import React from "react";

import { BAR, PIE, LINE, AREA, TABLE, DONUT } from "./widgetTypes";

import DynamicBarChart from "./widgets/DynamicBarChart";
import DynamicPieChart from "./widgets/DynamicPieChart";
import DynamicAreaChart from "./widgets/DynamicAreaChart";
import DynamicLineChart from "./widgets/DynamicLineChart";
import DynamicTableWidget from "./widgets/DynamicTableWidget";
import DynamicDonutChart from "./widgets/DynamicDonutChart";

const WidgetDiagram = ({ widget, width = 360, height = 300 }) => {
  console.log(widget);
  switch (widget.type) {
    case BAR:
      return <DynamicBarChart width={width} height={height} widget={widget} />;
    case PIE:
      return <DynamicPieChart width={width} height={height} widget={widget} />;
    case DONUT:
      return <DynamicDonutChart width={width} height={height} widget={widget} />;
    case LINE:
      return <DynamicLineChart width={width} height={height} widget={widget} />;
    case TABLE:
      return <DynamicTableWidget width={width} height={height} widget={widget} />;
    case AREA:
      return <DynamicAreaChart width={width} height={height} widget={widget} />;
    default:
      return <></>;
  }
};

export default WidgetDiagram;
