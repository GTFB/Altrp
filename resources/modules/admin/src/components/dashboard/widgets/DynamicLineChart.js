import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  LineSeries,
  Line,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
} from "reaviz";
import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";

const DynamicLineChart = ({ widget, width = 300, height = 300, strokeWidth = 3, dataSource = [] }) => {
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
      const newData = dataSource.map((item) => {
        const key = new Date(item.key);
        if (key) {
          return {
            key,
            data: item.data,
          };
        }
      });
      setData(newData || []);
      setIsLoading(false);
    }
  }, [widget]);

  const formattingDate = (d) => {
    //  Первая дата
    const firstDate = data.slice().shift();
    // Последняя дата
    const lastDate = data.slice().pop();
    // Разница между датами в месяцах
    const diff = parseInt(
      formatDistanceStrict(firstDate.key, lastDate.key, {
        unit: "month",
      })
    );

    if (diff >= 0 && diff <= 12) {
      return format(d, "d MMM", { locale: ru });
    } else {
      return format(d, "d MMM yy", { locale: ru });
    }
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
        data={data}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    //fontSize={12}
                    //fill="#000000"
                    format={formattingDate}
                  />
                }
              />
            }
          />
        }
        series={
          <LineSeries
            animated={widget.options.animated}
            line={<Line strokeWidth={strokeWidth} />}
            colorScheme={
              widget.options.colorScheme === "Custom" ? customStyle : widget.options.colorScheme
            }
          />
        }
      />
    </>
  );
};

export default DynamicLineChart;
