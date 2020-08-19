import React, { useEffect, useState } from "react";
import axios from "axios";

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

//import Query from "../../classes/Query";

const AltrpDiagram = ({ settings }) => {
  const model = settings.query?.dataSource?.value;
  const sql = settings.query?.sql;

  if (!model || !sql) {
    return <div className="altrp-chart">Choose data for chart</div>;
  }

  switch (settings.type) {
    case BAR:
      return (
        <div className="altrp-chart">
          <DynamicBarChart
            dataUrl={`/ajax/models/queries/${model}/${sql}`}
            colorScheme={settings.colorScheme}
          />
        </div>
      );
    case PIE:
      return (
        <div className="altrp-chart">
          <DynamicPieChart
            dataUrl={`/ajax/models/queries/${model}/${sql}`}
            colorScheme={settings.colorScheme}
          />
        </div>
      );
    case DONUT:
      return (
        <div className="altrp-chart">
          <DynamicDonutChart
            dataUrl={`/ajax/models/queries/${model}/${sql}`}
            colorScheme={settings.colorScheme}
          />
        </div>
      );
    case LINE:
      return (
        <div className="altrp-chart">
          <DynamicLineChart
            dataUrl={`/ajax/models/queries/${model}/${sql}`}
            colorScheme={settings.colorScheme}
          />
        </div>
      );
    case TABLE:
      return (
        <div className="altrp-chart">
          <DynamicTableWidget dataUrl={`/ajax/models/queries/${model}/${sql}`} />
        </div>
      );
    case AREA:
      return (
        <div className="altrp-chart">
          <DynamicAreaChart
            dataUrl={`/ajax/models/queries/${model}/${sql}`}
            colorScheme={settings.colorScheme}
          />
        </div>
      );
    default:
      return <></>;
  }
};

export default AltrpDiagram;
