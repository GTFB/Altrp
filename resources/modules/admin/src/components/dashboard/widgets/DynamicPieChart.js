import React, { useState, useEffect } from "react";
import { PieChart, PieArcSeries } from "reaviz";
import axios from "axios";
import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";

const DynamicPieChart = ({
  dataUrl,
  width = 300,
  height = 300,
  colorScheme,
  options = {
    explode: false,
  },
}) => {
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
    <PieChart
      height={height}
      width={width}
      data={data || []}
      series={<PieArcSeries explode={options.explode} colorScheme={colorScheme} />}
    />
  );
};

export default DynamicPieChart;
