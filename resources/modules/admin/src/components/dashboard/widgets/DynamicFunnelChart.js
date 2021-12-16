import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveFunnel } from "@nivo/funnel";
Tooltip;
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import Tooltip from "./d3/Tooltip";

const format = "%d.%m.%Y";

const DynamicFunnelChart = ({
  width = `300px`,
  height = `450px`,
  margin,
  data = [],
  colorScheme = "red_grey",
  customColorSchemeChecker = false,
  customColors = [],
  legend,
  fillOpacity,
  borderWidth,
  borderOpacity,
  labelColor,
  interpolation,
  spacing,
  shapeBlending,
  direction,
  isInteractive,
  currentBorderWidth,
  valueFormat,
  currentPartSizeExtension,
  borderColor,
}) => {
  if (legend) {
    Object.keys(legend).forEach(key => legend[key] === undefined && delete legend[key])
  }

  if (!data) return <EmptyWidget />

  const customProps = {fillOpacity, borderWidth, borderOpacity, interpolation, shapeBlending, spacing, direction, currentBorderWidth, currentPartSizeExtension, labelColor}

  console.log({labelColor});

  return (
    <>
      <div
        style={{
          width: width,
          height: height
        }}
      >
        <ResponsiveFunnel
          data={data}
          valueFormat={valueFormat}
          margin={{
            top: margin?.top || 30,
            right: margin?.right || 30,
            bottom: margin?.bottom || 30,
            left: margin?.left || 30
          }}
          beforeSeparatorLength={100}
          beforeSeparatorOffset={20}
          afterSeparatorLength={100}
          afterSeparatorOffset={20}
          isInteractive={isInteractive}
          borderColor={borderColor}
          // tooltip={datum => {
          //   return (
          //     <Tooltip
          //       keyIsDate={keyIsDate}
          //       datum={datum}
          //     />
          //   );
          // }}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
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
          motionConfig="wobbly"
          {...customProps}
        />
      </div>
    </>
  );
};

export default DynamicFunnelChart;
