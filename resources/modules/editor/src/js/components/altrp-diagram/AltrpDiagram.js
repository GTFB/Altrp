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
import { getDataByPath } from "../../../../../front-app/src/js/helpers";

const AltrpDiagram = ({ settings }) => {
  const sql = settings.query?.dataSource?.value;

  const data = getDataByPath(settings.datasource_path)?.map(d => {
    return {
      data: _.get(d, settings.data_name),
      key: _.get(d, settings.key_name),
    };
  }) || [];

  if (!sql && data.length === 0) {
    return <div className={`altrp-chart ${settings.legendPosition}`}>Choose data for chart</div>;
  }

  const parseQueryParams = (qs = "") => {
    if (!qs) return "";
    const keyValues = qs.split("\n");
    const result = keyValues.map((item) => item.replace("|", "=")).join("&");
    return `?${result}`;
  };

  const queryString = parseQueryParams(settings.query?.defaultParams);

  const widget = {
    source: sql + queryString,
    options: {
      colorScheme: settings.colorScheme,
      legend: settings.legend,
      animated: settings.animated,
      isVertical: settings.isVertical,
    },
    filter: {},
  };

  switch (settings.type) {
    case BAR:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicBarChart dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case PIE:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicPieChart dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case DONUT:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicDonutChart dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case LINE:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicLineChart dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case TABLE:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicTableWidget dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case AREA:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicAreaChart dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    default:
      return <></>;
  }
};

export default AltrpDiagram;
