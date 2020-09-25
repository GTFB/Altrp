import React from "react";

import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";
import DynamicPieChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPieChart";
import DynamicAreaChart from "../../../../../admin/src/components/dashboard/widgets/DynamicAreaChart";
import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";
import DynamicTableWidget from "../../../../../admin/src/components/dashboard/widgets/DynamicTableWidget";
import DynamicDonutChart from "../../../../../admin/src/components/dashboard/widgets/DynamicDonutChart";

import {
  BAR,
  PIE,
  LINE,
  AREA,
  TABLE,
  DONUT,
} from "../../../../../admin/src/components/dashboard/widgetTypes";

const AltrpDiagram = ({ settings }) => {
  const sql = settings.query?.dataSource?.value;
  console.log("settings.query :>> ", settings.query);

  if (!sql) {
    return <div className="altrp-chart">Choose data for chart</div>;
  }

  const widget = {
    source: sql,
    options: {
      colorScheme: settings.colorScheme,
      legend: "",
    },
    filter: {},
  };

  switch (settings.type) {
    case BAR:
      return (
        <div className="altrp-chart">
          <DynamicBarChart widget={widget} />
        </div>
      );
    case PIE:
      return (
        <div className="altrp-chart">
          <DynamicPieChart widget={widget} />
        </div>
      );
    case DONUT:
      return (
        <div className="altrp-chart">
          <DynamicDonutChart widget={widget} />
        </div>
      );
    case LINE:
      return (
        <div className="altrp-chart">
          <DynamicLineChart widget={widget} />
        </div>
      );
    case TABLE:
      return (
        <div className="altrp-chart">
          <DynamicTableWidget widget={widget} />
        </div>
      );
    case AREA:
      return (
        <div className="altrp-chart">
          <DynamicAreaChart widget={widget} />
        </div>
      );
    default:
      return <></>;
  }
};

export default AltrpDiagram;
