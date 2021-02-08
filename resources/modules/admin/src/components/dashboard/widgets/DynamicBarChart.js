import React, { useState, useEffect, useCallback } from "react";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;

import { ResponsiveBar } from "@nivo/bar";

import { getWidgetData } from "../services/getWidgetData";

const DynamicBarChart = ({
  widget,
  width = 300,
  height = 450,
  dataSource = [],
  groupMode = "stacked",
  layout = "vertical",
  colorScheme = "regagro",
  reverse = false,
  enableLabel = false,
  padding = 0.1,
  innerPadding = 0,
  borderRadius = 0,
  borderWidth = 0,
  sort = "",
  tickRotation = 0,
  bottomAxis = true,
  enableGridX = true,
  enableGridY = true,
  customColorSchemeChecker = false,
  customColors = []
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        let data = charts.data.data.map((item, index) => {
          return {
            [item.key]: Number(item.data),
            key: item.key,
            value: Number(item.data)
          };
        });
        setData(data || []);
        setIsLoading(false);
      }
    } else {
      if (
        sort !== null &&
        typeof sort !== "undefined" &&
        typeof dataSource !== "undefined"
      ) {
        switch (sort) {
          case "value":
            dataSource = _.sortBy(dataSource, ["value"]);
            break;
          case "key":
            dataSource = _.sortBy(dataSource, ["key"]);
            break;
          default:
            dataSource = dataSource;
            break;
        }
      }
      setData(dataSource || []);
      setIsLoading(false);
    }
  }, [widget]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;
  console.log("====================================");
  console.log(colorScheme);
  console.log("====================================");
  return (
    <>
      <div style={{ height: `${height}px` }}>
        <ResponsiveBar
          data={data}
          margin={{ top: 50, right: 180, bottom: 50, left: 60 }}
          indexBy="key"
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "regagro"
              ? regagroScheme
              : { scheme: colorScheme }
          }
          colorBy="index"
          layout={layout}
          axisBottom={
            bottomAxis && {
              tickRotation: tickRotation
            }
          }
          tooltip={datum => {
            const { indexValue, value, color } = datum;
            return (
              <>
                <span>{indexValue}</span>:<strong> {value}</strong>
              </>
            );
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          enableLabel={enableLabel}
          reverse={reverse}
          groupMode={groupMode}
          padding={padding}
          innerPadding={innerPadding}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "key",
            legendOffset: 32
          }}
        />
      </div>
    </>
  );
};

export default DynamicBarChart;
