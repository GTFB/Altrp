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
} from "reaviz";

import format from "date-fns/format";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ru from "date-fns/locale/ru";

import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";

const DynamicAreaChart = ({ widget, width = 300, height = 300, color = "#FFD51F" }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
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
      return format(d, "d LLL", { locale: ru });
    } else {
      return format(d, "d MMM yy", { locale: ru });
    }
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
        width={width}
        data={data}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries label={<LinearXAxisTickLabel format={formattingDate} />} />
            }
          />
        }
        series={
          <AreaSeries
            animated={widget.options.animated}
            type={widget.options.type || "standard"}
            markLine={<MarkLine strokeWidth={0} />}
            line={<Line strokeWidth={0} />}
            area={
              <Area
                gradient={<Gradient color={color} stops={[<GradientStop color={color} />]} />}
              />
            }
          />
        }
      />
    </>
  );
};

export default DynamicAreaChart;
