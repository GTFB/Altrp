import React, { useState, useEffect, useCallback } from "react";
import { PieChart, PieArcSeries, PieArcLabel, DiscreteLegend, DiscreteLegendEntry } from "reaviz";
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";

const DynamicDonutChart = ({ widget, width = 300, height = 300, dataSource = [] }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        let data = charts.data.data;
        switch (Number(widget.options.sort)) {
          case 0:
            data = charts.data.data;
            break;
          case 1:
            data = _.sortBy(data,'key');
            break;
          case 2:
            data = _.sortBy(data,'data');
            break;
          default:
            data = charts.data.data;
            break;
        }
        setData(data || []);
        setIsLoading(false);
      }
    }
    else {
      setData(dataSource || []);
      setIsLoading(false);
    }
  }, [widget]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  // Формируем легенду
  const entries = data.map((item, i) => {
    return (
      <DiscreteLegendEntry
        key={i}
        className="discrete__legend-item"
        label={`${item.key} (${item.data})`}
        color={customStyle[i] || "#606060"}
      />
    );
  });

  return (
    <>
      <PieChart
        height={height}
        // width={width}
        data={data}
        series={
          <PieArcSeries
            animated={widget.options.animated}
            doughnut={true}
            colorScheme={
              widget.options.colorScheme === "Custom" ? customStyle : widget.options.colorScheme
            }
            label={<PieArcLabel fontSize={12} fontFill="#000000" />}
          />
        }
      />
      {widget.options?.legend && (
        <DiscreteLegend
          className="discrete__legend"
          orientation={widget.options.legend}
          entries={entries}
        />
      )}
    </>
  );
};

export default DynamicDonutChart;
