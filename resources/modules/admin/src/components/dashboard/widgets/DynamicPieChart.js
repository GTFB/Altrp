import React, { useState, useEffect, useCallback } from "react";
import { PieChart, PieArcSeries, PieArcLabel, DiscreteLegend, DiscreteLegendEntry } from "reaviz";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";

const DynamicPieChart = ({ widget, width = 300, height = 300 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const charts = await getWidgetData(widget.source, widget.filter);
    if (charts.status === 200) {
      setData(charts.data.data || []);
      setIsLoading(false);
    }
  }, [widget]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (!data || data.length === 0) return <EmptyWidget />;

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
        width={width}
        data={data || []}
        series={
          <PieArcSeries
            animated={widget.options.animated}
            explode={widget.options.explode}
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

export default DynamicPieChart;
