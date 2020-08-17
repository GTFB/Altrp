import React, { useState, useEffect } from "react";
import { LineChart, LineSeries, Line } from "reaviz";
import axios from "axios";
import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";

const DynamicLineChart = ({ dataUrl, width = 300, height = 300, strokeWidth = 3, colorScheme }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async (dataUrl) => {
    setIsLoading(true);
    const req = await axios(dataUrl);
    if (req.status === 200 && typeof req.data !== "string") {
      const newData = req.data.map((item) => {
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
  };

  useEffect(() => {
    getData(dataUrl);
  }, [dataUrl]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  return (
    <LineChart
      height={height}
      width={width}
      data={data}
      series={<LineSeries line={<Line strokeWidth={strokeWidth} />} colorScheme={colorScheme} />}
    />
  );
};

export default DynamicLineChart;
