import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  LineSeries,
  Line,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  ChartZoomPan,
  TooltipArea,
  PointSeries
} from 'reaviz';
import format from "date-fns/format";
import ru from "date-fns/locale/ru";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";

const DynamicLineChart = ({ widget, width = 300, height = 300, strokeWidth = 3, dataSource = [], isMultiple, isCustomColor, colorArray }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
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
      if (isMultiple) {
        let multipleData = dataSource.map((collection, index) => {
          return {
            key: index,
            data: collection.map(item => {
              let key = new Date(item.key);
              if (key instanceof Date && !isNaN(key)) {
                return {
                  key: key,
                  data: Number(item.data),
                };
              };
            }).filter(item => typeof item != 'undefined')
          }
        });

        setData(multipleData || []);
        setIsLoading(false);
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
    }
  }, [widget]);

  const formattingDate = (d) => {
    return format(d, "d MMM yy", { locale: ru });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  return (
    <>
      <LineChart
        height={height}
        // width={width}
        zoomPan={<ChartZoomPan />}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    rotation={false}
                    format={formattingDate}
                  />
                }
              />
            }
          />
        }
        series={
          <LineSeries
            type={isMultiple ? "grouped" : 'standard'}
            animated={widget.options.animated}
            line={<Line strokeWidth={strokeWidth} />}
            colorScheme={
              isCustomColor ? (data, index) => {
                return colorArray[index];
              } :
                widget.options.colorScheme === "Custom" ? customStyle : widget.options.colorScheme
            }
          />
        }
        data={data}
      />
    </>
  );
};

export default DynamicLineChart;
