import React from "react";

import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";
import DynamicPieChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPieChart";
import DynamicAreaChart from "../../../../../admin/src/components/dashboard/widgets/DynamicAreaChart";
import DynamicLineChart from "../../../../../admin/src/components/dashboard/widgets/DynamicLineChart";
import DynamicTableWidget from "../../../../../admin/src/components/dashboard/widgets/DynamicTableWidget";
import DynamicDonutChart from "../../../../../admin/src/components/dashboard/widgets/DynamicDonutChart";
import DynamicPointChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPointChart";

import {
  BAR,
  PIE,
  LINE,
  AREA,
  TABLE,
  DONUT,
  POINT
} from "../../../../../admin/src/components/dashboard/widgetTypes";
import { getDataByPath } from "../../../../../front-app/src/js/helpers";

const AltrpDiagram = ({ settings }) => {
  const sql = settings.query?.dataSource?.value;
  const isMultiple = settings.isMultiple;
  const isCustomColor = settings.isCustomColors;

  let data = [];
  if (isMultiple && (settings.type === LINE || settings.type === AREA)) {
    let repeater = _.cloneDeep(settings.rep, []);
    data = repeater.map(r => {
      let innerData = getDataByPath(r.path, []);
      // console.log('DATA IN ADAPTER =>', data);
      if (innerData.length > 0) {
        innerData = innerData.map(d => ({
          data: _.get(d, r.data),
          key: _.get(d, r.key)
        }));
        //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
        innerData = _.uniqBy(innerData, 'key');
      }
      return innerData;
    });
  }
  else if (settings.datasource_path != null) {
    data = getDataByPath(settings.datasource_path, [])?.map(d => {
      return {
        data: _.get(d, settings.data_name),
        key: _.get(d, settings.key_name),
      };
    });

    data = _.uniqBy(data, 'key');
  }

  if (isCustomColor) {
    let repeaterColor = _.cloneDeep(settings.repcolor, []);
    var colorArray = repeaterColor.map(r => r.color.colorPickedHex);
  }

  if (!sql && data.length === 0) {
    return <div className={`altrp-chart ${settings.legendPosition}`}>Идет загрузка данных...</div>;
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
          <DynamicBarChart isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case PIE:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicPieChart isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case DONUT:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicDonutChart isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case LINE:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicLineChart isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case TABLE:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicTableWidget isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case AREA:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicAreaChart isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    case POINT:
      return (
        <div className={`altrp-chart ${settings.legendPosition}`}>
          <DynamicPointChart isCustomColor={isCustomColor} colorArray={colorArray} isMultiple={isMultiple} dataSource={data} widget={widget} width={settings.width?.size} />
        </div>
      );
    default:
      return <></>;
  }
};

export default AltrpDiagram;
