import React, { useState, useEffect, useCallback } from "react";

import { ResponsiveRadar } from "@nivo/radar";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";
import { Spinner } from "react-bootstrap";
import Tooltip from "./d3/TooltipScatter";

const RadarChart = ({
  width = `300px`,
  height = `450px`,
  data = [],
  colorScheme = "red_grey",
  nodeSize = 6,
  customColorSchemeChecker = false,
  customColors = [],
  margin,
  legends,
  keys,
  indexBy,
  curve,
  fillOpacity,
  borderWidth,
  blendMode,
  gridLevels,
  gridShape,
  enableDots,
  dotSize,
  classes
}) => {
  if (legends) {
    Object.keys(legends).forEach(key => legends[key] === undefined && delete legends[key])
  }

  if (!data) return <EmptyWidget />;

  const customProps = {gridLevels, fillOpacity, borderWidth, curve, blendMode, gridShape, enableDots, dotSize}

  if (legends) {
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
        ...legends
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
        <ResponsiveRadar
          className={classes}
          data={data}
          keys={keys}
          indexBy={indexBy}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          margin={{
            top: margin?.top || 30,
            right: margin?.right || 30,
            bottom: margin?.bottom || 30,
            left: margin?.left || 30
          }}
          nodeSize={nodeSize}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          {...customProps}
        />
      </div>
    </>
  );
};
export default RadarChart;
