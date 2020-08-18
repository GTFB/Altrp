import React, { useEffect, useState } from "react";

import { BAR, PIE, LINE, AREA, TABLE, DONUT } from "./widgetTypes";

import DynamicBarChart from "./widgets/DynamicBarChart";
import DynamicPieChart from "./widgets/DynamicPieChart";
import DynamicAreaChart from "./widgets/DynamicAreaChart";
import DynamicLineChart from "./widgets/DynamicLineChart";
import DynamicTableWidget from "./widgets/DynamicTableWidget";
import DynamicDonutChart from "./widgets/DynamicDonutChart";

const WidgetDiagram = ({ type, url, filter = {}, options = {}, width = 300, colorScheme }) => {
  switch (type) {
    case BAR:
      return (
        <DynamicBarChart width={width} dataUrl={url} options={options} colorScheme={colorScheme} />
      );
    case PIE:
      return (
        <DynamicPieChart width={width} dataUrl={url} options={options} colorScheme={colorScheme} />
      );
    case DONUT:
      return (
        <DynamicDonutChart
          width={width}
          dataUrl={url}
          options={options}
          colorScheme={colorScheme}
        />
      );
    case LINE:
      return (
        <DynamicLineChart width={width} dataUrl={url} options={options} colorScheme={colorScheme} />
      );
    case TABLE:
      return <DynamicTableWidget width={width} dataUrl={url} options={options} />;
    case AREA:
      return (
        <DynamicAreaChart width={width} dataUrl={url} options={options} colorScheme={colorScheme} />
      );
    default:
      return <></>;
  }
};

export default WidgetDiagram;
