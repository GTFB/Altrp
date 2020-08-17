import React, { useState, useEffect } from "react";
import { BarChart, BarSeries } from "reaviz";
import axios from "axios";
import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";

const DynamicBarChart = ({ dataUrl, width = 300, height = 300, colorScheme }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async (dataUrl) => {
    setIsLoading(true);
    const req = await axios(dataUrl);
    if (req.status === 200 && typeof req.data !== "string") {
      setData(req.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(dataUrl);
  }, [dataUrl]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  return (
    <BarChart
      height={height}
      width={width}
      data={data}
      series={<BarSeries colorScheme={colorScheme} />}
    />
  );
};

export default DynamicBarChart;
