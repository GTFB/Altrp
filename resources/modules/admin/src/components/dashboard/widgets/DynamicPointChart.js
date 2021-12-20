import React, { useState, useEffect, useCallback } from "react";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import EmptyWidget from "./EmptyWidget";
import Tooltip from "./d3/TooltipScatter";

import moment from "moment";
const format = "%d.%m.%Y";

const PointChart = ({
  width = `300px`,
  height = `450px`,
  data = [],
  xScaleType,
  colorScheme = "red_grey",
  nodeSize = 6,
  tickRotation = 0,
  bottomAxis = true,
  precision,
  enableGridX = true,
  enableGridY = true,
  customColorSchemeChecker = false,
  customColors = [],
  constantsAxises = [],
  yScaleMax,
  useCustomTooltips,
  margin,
  legend,
}) => {
  if (legend) {
    Object.keys(legend).forEach(key => legend[key] === undefined && delete legend[key])
  }

  let matches = [];
  let isNotEmpty = false;

  matches = _.uniq(
    data.map(item => {
      return item.data.length > 0;
    })
  );

  isNotEmpty = matches.includes(true);
  if (!isNotEmpty) return <EmptyWidget />;

  const customProps = {}

  if (legend) {
    customProps.legends = [
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
    ]
  }

  return (
    <>
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
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          // yScale={
          //   yScaleMax
          //     ? {
          //         max: yScaleMax,
          //         type: "linear"
          //       }
          //     : {
          //         type: "linear"
          //       }
          // }
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
              ? { type: xScaleType || 'linear', format: format, precision: precision }
              : { type: xScaleType || 'linear' }
          }
          // tooltip={datum => (
          //   <Tooltip
          //     datum={datum}
          //   />
          // )}
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
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
        />
      </div>
    </>
  );
};
export default PointChart;
