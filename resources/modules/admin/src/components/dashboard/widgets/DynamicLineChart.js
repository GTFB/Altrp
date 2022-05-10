import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Defs, linearGradientDef } from '@nivo/core'
Tooltip;
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import { getWidgetData } from "../services/getWidgetData";
import moment from "moment";
import Tooltip from "./d3/Tooltip";

const format = "%d.%m.%Y";

const DynamicLineChart = ({
  width,
  height,
  margin,
  data = [],
  lineWidth = 2,
  pointSize = 10,
  xScaleType = "point",
  precision = "month",
  colorScheme = "red_grey",
  curve = "linear",
  enableArea = false,
  enablePoints = true,
  pointColor,
  pointBorderWidth,
  pointBorderColor,
  enableGridX = true,
  enableGridY = true,
  customColorSchemeChecker = false,
  customColors = [],
  constantsAxises = [],
  yScaleMax,
  legend,
  enableGradient,
  yFormat,
  xFormat,
  areaBaselineValue,
  areaOpacity,
  areaBlendMode,
  enableSlices,
  axisBottom,
  axisTop,
  axisRight,
  axisLeft,
  classes
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

  const customProps = {}

  if (!isNotEmpty) return <EmptyWidget />;

  if (enableGradient) {
    customProps.defs = [
      linearGradientDef('gradientA', [
          { offset: 0, color: 'inherit' },
          { offset: 100, color: 'inherit', opacity: 0 },
      ]),
    ]

    customProps.fill= [{ match: '*', id: 'gradientA' }]
  }

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
        className={classes}
      >
        <ResponsiveLine
          className={classes}
          data={data}
          margin={{
            top: margin?.top || 30,
            right: margin?.right || 30,
            bottom: margin?.bottom || 30,
            left: margin?.left || 30
          }}
          xFormat={xScaleType === "time" && "time:%d.%m.%Y"}
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
          xScale={
            xScaleType === "time"
              ? { type: xScaleType, format: format, precision }
              : { type: xScaleType }
          }
          areaBaselineValue={areaBaselineValue}
          lineWidth={lineWidth}
          areaBlendMode={areaBlendMode}
          areaOpacity={areaOpacity}
          markers={constantsAxises}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          pointBorderWidth={pointBorderWidth}
          enableSlices={enableSlices}
          axisBottom={
            axisBottom &&
            (xScaleType === "time"
              ? {
                  format: format,
                  ...axisBottom
                }
              : axisBottom
            )
          }
          axisTop={axisTop}
          axisLeft={axisLeft}
          axisRight={axisRight}
          yFormat={yFormat}
          xFormat={xFormat}
          useMesh={true}
          enableArea={enableArea}
          enablePoints={enablePoints}
          // tooltip={datum => {
          //   console.log("====================================");
          //   console.log(datum);
          //   console.log("====================================");
          //   return (
          //     <Tooltip
          //       keyIsDate={keyIsDate}
          //       datum={datum}
          //     />
          //   );
          // }}
          pointSize={pointSize}
          curve={curve}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          pointColor={pointColor}

          pointBorderColor={pointBorderColor}

          {...customProps}
        />
      </div>
    </>
  );
};

export default DynamicLineChart;
