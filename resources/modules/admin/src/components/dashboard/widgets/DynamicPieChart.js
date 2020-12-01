import React, { useState, useEffect, useCallback } from "react";
import { ResponsivePie } from "@nivo/pie";
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";

const DynamicPieChart = ({
  widget,
  width = 300,
  height = 450,
  dataSource = [],
  colorScheme = "red_grey",
  enableSliceLabels = false,
  innerRadius = 0,
  padAngle = 0,
  cornerRadius = 0,
  sortByValue = 0,
  enableRadialLabels = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        let data = charts.data.data;
        switch (Number(widget.options.sort)) {
          case 0:
            data = charts.data.data;
            break;
          case 1:
            data = _.sortBy(data, "key");
            break;
          case 2:
            data = _.sortBy(data, "data");
            break;
          default:
            data = charts.data.data;
            break;
        }
        setData(data || []);
        setIsLoading(false);
      }
    } else {
      setData(dataSource || []);
      setIsLoading(false);
    }
  }, [widget]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (!data || data.length === 0) return <EmptyWidget />;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <>
      <div style={{ height: `${height}px` }}>
        <ResponsivePie
          data={data}
          colors={{ scheme: colorScheme }}
          margin={{ top: 80, right: 250, bottom: 80, left: 140 }}
          innerRadius={innerRadius}
          enableSliceLabels={enableSliceLabels}
          padAngle={padAngle}
          cornerRadius={cornerRadius}
          sortByValue={sortByValue}
          enableRadialLabels={enableRadialLabels}
          legends={[
            {
              anchor: "right",
              direction: "column",
              translateX: 80,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 14,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: "circle"
            }
          ]}
        />
      </div>
    </>
  );
};

export default DynamicPieChart;
