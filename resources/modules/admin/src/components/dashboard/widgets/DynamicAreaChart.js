import React, { useState, useEffect } from "react";
import { AreaChart } from "reaviz";
import axios from "axios";
import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";

const DynamicAreaChart = ({ dataUrl, width = 300, height = 300, colorScheme, options = {} }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return <AreaChart height={height} width={width} data={data} colorScheme={colorScheme} />;
};

export default DynamicAreaChart;
