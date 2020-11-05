import React, { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  AreaSeries,
  MarkLine,
  Line,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  Area,
  Gradient,
  GradientStop,
  Tooltip,
  TooltipArea,
  TooltipTemplate,
  ChartTooltip,
  ChartZoomPan
} from 'reaviz';

import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";

import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";
import { customStyle } from "../widgetTypes";


import { getWidgetData } from "../services/getWidgetData";

const DynamicAreaChart = ({ widget, width = 300, height = 300, color = "#FFD51F", dataSource = [], isMultiple, isCustomColor, colorArray }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  if (!Array.isArray(data) || data.length === 0) return <EmptyWidget />;

  return (
    <>
      <AreaChart
        height={height}
        // width={width}
        data={data}
        zoomPan={<ChartZoomPan />}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={formattingDate} />
                } />
            }
          />
        }
        series={
          <AreaSeries
            animated={widget.options.animated}
            type={isMultiple ? 'grouped' : "standard"}
            markLine={<MarkLine strokeWidth={0} />}
            line={<Line strokeWidth={0} />}
            // area={!isCustomColor ?
            //   <Area
            //     gradient={<Gradient color={color} stops={[<GradientStop color={color} />]} />}
            //   /> : <></>
            // }
            colorScheme={
              isCustomColor ? (data, index) => {
                return colorArray[index];
              } :
                widget.options.colorScheme === "Custom" ? customStyle : widget.options.colorScheme
            }
          />
        }
      />
    </>
  );
};

export default DynamicAreaChart;
