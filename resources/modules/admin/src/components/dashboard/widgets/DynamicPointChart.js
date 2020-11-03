import React, { useState, useEffect, useCallback } from "react";

import {
  ScatterPlot,
  DiscreteLegendEntry,
  ScatterSeries,
  ScatterPoint,
  DiscreteLegend,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel
} from 'reaviz';

import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";
import { Spinner } from 'react-bootstrap';
import ru from "date-fns/locale/ru";
import format from "date-fns/format";


const PointChart = ({ widget, width = 300, height = 300, dataSource = [] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const size = 4;
  const fill = customStyle[0]
  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200 && typeof charts.data !== "string") {
        const newData = charts.data.data.map((item) => {
          const key = new Date(item.key);
          if (key) {
            return {
              key,
              data: item.data,
            };
          }
        });
        setData(newData);
        setIsLoading(false);
      }
    }
    else {
      const newData = dataSource.map((item) => {
        let key = new Date(item.key);
        if (key instanceof Date && !isNaN(key)) {
          return {
            key: key,
            data: Number(item.data),
          };
        }
      }).filter(item => typeof item != 'undefined');

      setData(newData || []);
      setIsLoading(false);
    }
  }, [widget]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  const formattingDate = (d) => {
    return format(d, "d MMM yy", { locale: ru });
  }

  return (
    <>
      <ScatterPlot
        height={height}
        // width={width}
        data={data}
        series={
          <ScatterSeries point={<ScatterPoint color={fill} size={size} />} />
        }
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={formattingDate} />
                }
              />
            }
          />
        }
      />
    </>
  );

};
export default PointChart;