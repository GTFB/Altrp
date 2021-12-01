import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveFunnel } from "@nivo/funnel";
Tooltip;
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import { getWidgetData } from "../services/getWidgetData";
import moment from "moment";
import Tooltip from "./d3/Tooltip";

const format = "%d.%m.%Y";

const DynamicFunnelChart = ({
  widget,
  width = `300px`,
  height = `450px`,
  margin,
  dataSource = [],
  colorScheme = "red_grey",
  customColorSchemeChecker = false,
  customColors = [],
  widgetID,
  title,
  subTitle,
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
  currentPartSizeExtension
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
      if (charts.status === 200) {
        setData(charts.data.data || []);
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

  if (!data) return <EmptyWidget />

  const customProps = {fillOpacity, borderWidth, borderOpacity, interpolation, shapeBlending, spacing, direction, currentBorderWidth, currentPartSizeExtension}

  if (labelColor) {
    customProps.labelColor = labelColor
  }

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
        <ResponsiveFunnel
          data={data}
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
          motionConfig="wobbly"
          isInteractive={isInteractive}
          // tooltip={datum => {
          //   return (
          //     <Tooltip
          //       keyIsDate={keyIsDate}
          //       datum={datum}
          //       widgetID={widgetID}
          //     />
          //   );
          // }}
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
          {...customProps}
        />
      </div>
    </>
  );
};

export default DynamicFunnelChart;
