import React, { useState, useEffect, useCallback } from "react";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";
import { Spinner } from "react-bootstrap";
import Tooltip from "./d3/TooltipScatter";

import moment from "moment";
const format = "%d.%m.%Y";

const PointChart = ({
  widget,
  width = `300px`,
  height = `450px`,
  dataSource = [],
  xScaleType = "point",
  colorScheme = "red_grey",
  nodeSize = 6,
  sort = "",
  tickRotation = 0,
  bottomAxis = true,
  precision,
  enableGridX = true,
  enableGridY = true,
  keyIsDate = false,
  customColorSchemeChecker = false,
  customColors = [],
  constantsAxises = [],
  yScaleMax,
  widgetID,
  useCustomTooltips,
  margin,
  legend,
  title,
  subTitle
}) => {
  if (legend) {
    Object.keys(legend).forEach(key => legend[key] === undefined && delete legend[key])
  }

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200 && typeof charts.data !== "string") {
        const newData = charts.data.data.map(item => {
          const currentKey = item.key;
          const keyFormatted = !moment(currentKey).isValid()
            ? currentKey
            : moment(currentKey).format("DD.MM.YYYY");
          return {
            y: Number(item.data),
            x: keyIsDate ? keyFormatted : currentKey
          };
        });
        let data = [
          {
            id: "",
            data: newData
          }
        ];
        setData(data);
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
            dataSource.forEach((item, index) => {
              if (item.data.length > 0) {
                dataSource[index].data = _.sortBy(item.data, ["y"]);
              }
            });
            break;
          case "key":
            data.forEach((item, index) => {
              if (item.data.length > 0) {
                dataSource[index].data = _.sortBy(item.data, ["x"]);
              }
            });
            break;

          default:
            // data = data;
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

  let matches = [];
  let isNotEmpty = false;

  matches = _.uniq(
    data.map(item => {
      return item.data.length > 0;
    })
  );

  isNotEmpty = matches.includes(true);
  if (!isNotEmpty) return <EmptyWidget />;

  return (
    <>
      {title && <h3 className='diagram-title' style={{margin: 0}}>{title}</h3>}
      {subTitle && <h5 className='diagram-subtitle' style={{margin: 0}}>{subTitle}</h5>}
      <div
        style={{
          width: width,
          height: height
        }}
      >
        <ResponsiveScatterPlot
          data={data}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "regagro"
              ? regagroScheme
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          yScale={
            yScaleMax
              ? {
                  max: yScaleMax,
                  type: "linear"
                }
              : {
                  type: "linear"
                }
          }
          markers={constantsAxises}
          margin={{
            top: margin?.top || 30,
            right: margin?.right || 30,
            bottom: margin?.bottom || 30,
            left: margin?.left || 30
          }}
          xFormat={xScaleType === "time" && "time:%d.%m.%Y"}
          nodeSize={nodeSize}
          xScale={
            xScaleType === "time"
              ? { type: xScaleType, format: format, precision: precision }
              : { type: xScaleType }
          }
          tooltip={datum => (
            <Tooltip
              datum={datum}
              widgetID={widgetID}
            />
          )}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          axisBottom={
            bottomAxis &&
            (xScaleType === "time"
              ? {
                  format: format,
                  tickRotation: tickRotation
                }
              : {
                  tickRotation: tickRotation
                })
          }
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "regagro"
              ? regagroScheme
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          legends={legend && [
            {
              anchor: 'top-right',
              direction: 'column',
              translateX: 0,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 14,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: "circle",
              ...legend
            }
          ]}
        />
      </div>
    </>
  );
};
export default PointChart;
