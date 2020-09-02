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
  const source = settings.query?.dataSource?.value;

  if (!source) {
    return <div className="altrp-chart">Choose data for chart</div>;
  }

  switch (settings.type) {
    case BAR:
      return (
        <div className="altrp-chart">
          <DynamicBarChart source={source} colorScheme={settings.colorScheme} />
        </div>
      );
    case PIE:
      return (
        <div className="altrp-chart">
          <DynamicPieChart source={source} colorScheme={settings.colorScheme} />
        </div>
      );
    case DONUT:
      return (
        <div className="altrp-chart">
          <DynamicDonutChart source={source} colorScheme={settings.colorScheme} />
        </div>
      );
    case LINE:
      return (
        <div className="altrp-chart">
          <DynamicLineChart source={source} colorScheme={settings.colorScheme} />
        </div>
      );
    case TABLE:
      return (
        <div className="altrp-chart">
          <DynamicTableWidget source={source} />
        </div>
      );
    case AREA:
      return (
        <div className="altrp-chart">
          <DynamicAreaChart source={source} colorScheme={settings.colorScheme} />
        </div>
      );
    default:
      return <></>;
  }
};

export default AltrpDiagram;
