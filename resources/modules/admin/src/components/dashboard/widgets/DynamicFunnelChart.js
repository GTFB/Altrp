import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveFunnel, Funnel } from "@nivo/funnel";
Tooltip;
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";
import { BoxLegendSvg } from '@nivo/legends'
import { ResponsiveWrapper } from '@nivo/core'

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import Tooltip from "./d3/Tooltip";

const format = "%d.%m.%Y";

const getSizes = (width, height, partialMargin) => {
  const defaultMargin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }

  const margin = {
    ...defaultMargin,
    ...partialMargin,
  }

  return {
    margin,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
    outerWidth: width,
    outerHeight: height,
  }
}

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
  classes
}) => {
  if (legend) {
    Object.keys(legend).forEach(key => legend[key] === undefined && delete legend[key])
  }

  if (!data) return <EmptyWidget />

  const scheme = customColorSchemeChecker && customColors.length > 0
    ? customColors
    : colorScheme === "milk"
    ? milkScheme
    : colorScheme === "milk2"
    ? milkScheme2
    : { scheme: colorScheme }

  const customProps = {fillOpacity, borderWidth, borderOpacity, interpolation, shapeBlending, spacing, direction, currentBorderWidth, currentPartSizeExtension, labelColor}

  const legends = legend && [
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
      data: data.map((el, i) => {
        const _scheme = Schemes.find(el => el.label === scheme?.scheme)

        return ({
          ...el,
          fill: _scheme.colors[i]
        })
      }),
      ...legend
    }
  ]

  const layers = [
    'separators',
    'parts',
    'labels',
    'annotations',
  ]

  const pieMargin = {
    top: margin?.top || 30,
    right: margin?.right || 30,
    bottom: margin?.bottom || 30,
    left: margin?.left || 30
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
        <ResponsiveWrapper
          className={classes}>
          {sizes => {
            const dimensions = getSizes(
              sizes.width,
              sizes.height,
              pieMargin
            )

            if (legends?.length) {
              layers.push(() => legends?.map((_legend, i) => (
                <BoxLegendSvg
                  key={i}
                  containerHeight={dimensions.innerHeight}
                  containerWidth={dimensions.innerWidth}
                  {..._legend}
                  data={_legend.data}
                />
              )))
            }

            return <Funnel
              className={classes}
              data={data}
              width={sizes.width}
              height={sizes.height}
              valueFormat={valueFormat}
              margin={pieMargin}
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
              colors={scheme}
              legends={legends}
              motionConfig="wobbly"
              layers={layers}
              {...customProps}
            />
          }}
        </ResponsiveWrapper>
      </div>
    </>
  );
};

export default DynamicFunnelChart;
