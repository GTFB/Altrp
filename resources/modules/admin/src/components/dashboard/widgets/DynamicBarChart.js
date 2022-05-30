
import React, { useState, useEffect, useCallback } from "react";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import { ResponsiveBar } from "@nivo/bar";

import { getWidgetData } from "../services/getWidgetData";
import TooltipBar from "./d3/TooltipBar";
import addCurrencyToLabel from "../services/addCurrencyToLabel";

const DynamicBarChart = ({
  height,
  width,
  data = [],
  groupMode = "stacked",
  layout = "vertical",
  colorScheme,
  reverse = false,
  enableLabel = false,
  padding = 0.1,
  innerPadding = 0,
  borderRadius = 0,
  borderWidth = 0,
  enableGridX = true,
  enableGridY = true,
  customColorSchemeChecker = false,
  customColors = [],
  useCustomTooltips,
  margin,
  legend,
  markers,
  keys,
  indexBy,
  valueFormat,
  axisBottom,
  maxValue,
  minValue,
  currency,
  borderColor,
  classes
}) => {
  if (legend) {
    Object.keys(legend).forEach(key => legend[key] === undefined && delete legend[key])
  }

  if (data.length === 0) return <EmptyWidget />;

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

  if (borderColor) {
    customProps.borderColor = borderColor
  }

  if (valueFormat && currency) {
    customProps.arcLabel = addCurrencyToLabel(currency)
    customProps.tooltipFormat = addCurrencyToLabel(currency)
  }

  return (
    <>
      <div style={{ height, width }} className={classes}>
        <ResponsiveBar
          className={classes}
          data={data}
          margin={{
            top: margin?.top || 30,
            right: margin?.right || 30,
            bottom: margin?.bottom || 30,
            left: margin?.left || 30
          }}
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
          // colorBy="index"
          layout={layout}
          // tooltip={useCustomTooltips && (datum => (
          //   <TooltipBar
          //     enable={useCustomTooltips}
          //     datum={datum}
          //   />
          // ))}
          valueFormat={valueFormat}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          enableLabel={enableLabel}
          reverse={reverse}
          groupMode={groupMode}
          padding={padding}
          innerPadding={innerPadding}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          axisBottom={axisBottom}
          markers={markers}
          maxValue={maxValue}
          minValue={minValue}
          {...customProps}
        />
      </div>
    </>
  );
};

export default DynamicBarChart;
