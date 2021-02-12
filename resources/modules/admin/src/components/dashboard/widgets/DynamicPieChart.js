import React, { useState, useEffect, useCallback } from "react";
import { ResponsivePie } from "@nivo/pie";
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;

import { getWidgetData } from "../services/getWidgetData";
import moment from "moment";

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
  enableRadialLabels = true,
  sort = "",
  tickRotation = 0,
  bottomAxis = true,
  keyIsDate = false,
  isDashboard = false,
  customColorSchemeChecker = false,
  customColors = [],
  yScaleMax
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        const newData = charts.data.data.map(item => {
          const currentKey = item.key;
          const keyFormatted = !moment(currentKey).isValid()
            ? currentKey
            : moment(currentKey).format("DD.MM.YYYY");

          return {
            value: Number(item.data),
            id: keyIsDate ? keyFormatted : currentKey
          };
        });
        let data = newData;
        setData(data || []);
        setIsLoading(false);
      }
    } else {
      if (
        sort !== null &&
        sort !== "undefined" &&
        typeof dataSource !== "undefined"
      ) {
        switch (sort) {
          case "value":
            dataSource = _.sortBy(dataSource, ["value"]);
            break;
          case "key":
            dataSource = _.sortBy(dataSource, ["id"]);
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

  if (!data || data.length === 0) return <EmptyWidget />;
  return (
    <>
      <div style={{ height: `${height}px` }}>
        <ResponsivePie
          data={data}
          colors={{ scheme: colorScheme }}
          margin={{
            top: 80,
            right: !isDashboard ? 250 : 60,
            bottom: 80,
            left: !isDashboard ? 140 : 60
          }}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "regagro"
              ? regagroScheme
              : { scheme: colorScheme }
          }
          innerRadius={innerRadius}
          enableSliceLabels={enableSliceLabels}
          padAngle={padAngle}
          cornerRadius={cornerRadius}
          sortByValue={sortByValue}
          axisBottom={
            bottomAxis && {
              tickRotation: tickRotation
            }
          }
          colors={
            colorScheme === "regagro" ? regagroScheme : { scheme: colorScheme }
          }
          enableRadialLabels={enableRadialLabels}
          legends={
            !isDashboard
              ? [
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
                ]
              : []
          }
        />
      </div>
    </>
  );
};

export default DynamicPieChart;
