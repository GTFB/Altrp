import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveLine } from "@nivo/line";
Tooltip;
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const regagroScheme = _.find(Schemes, { value: "regagro" }).colors;

import { getWidgetData } from "../services/getWidgetData";
import moment from "moment";
import Tooltip from "./d3/Tooltip";

const format = "%d.%m.%Y";

const DynamicLineChart = ({
  widget,
  keyIsDate,
  dataSource = [],
  lineWidth = 2,
  pointSize = 10,
  xScaleType = "point",
  precision = "month",
  colorScheme = "red_grey",
  curve = "linear",
  enableArea = false,
  enablePoints = true,
  pointColor,
  yMarker = false,
  yMarkerValue = 0,
  yMarkerOrientation = "vertical",
  yMarkerColor,
  yMarkerLabel = "",
  yMarkerWidth = 2,
  xMarker = false,
  xMarkerValue = 0,
  xMarkerOrientation = "vertical",
  xMarkerColor,
  xMarkerLabel = "",
  xMarkerWidth = 2,
  yMarkerLabelColor,
  xMarkerLabelColor,
  sort = "",
  tickRotation = 0,
  bottomAxis = true,
  enableGridX = true,
  enableGridY = true,
  customColorSchemeChecker = false,
  customColors = [],
  constantsAxises = [],
  yScaleMax,
  widgetID,
  useCustomTooltips
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const markers = () => {
    let markerY = {};
    let markerX = {};
    if (yMarker) {
      markerY = {
        axis: "y",
        value: yMarkerValue,
        lineStyle: {
          stroke:
            yMarkerColor != null ? yMarkerColor.colorPickedHex : "#000000",
          strokeWidth: yMarkerWidth
        },
        textStyle: {
          fill:
            yMarkerLabelColor != null
              ? yMarkerLabelColor.colorPickedHex
              : "#000000"
        },
        legend: yMarkerLabel,
        legendOrientation: yMarkerOrientation
      };
    }
    if (xMarker) {
      markerX = {
        axis: "x",
        value: xMarkerValue,
        lineStyle: {
          stroke:
            xMarkerColor != null ? xMarkerColor.colorPickedHex : "#000000",
          strokeWidth: xMarkerWidth
        },
        textStyle: {
          fill:
            xMarkerLabelColor != null
              ? xMarkerLabelColor.colorPickedHex
              : "#000000"
        },
        legend: xMarkerLabel,
        legendOrientation: xMarkerOrientation
      };
    }
    if (!yMarker && !xMarker) return [];
    if (yMarker && !xMarker) return [markerY];
    if (!yMarker && xMarker) return [markerX];

    return [markerY, markerX];
  };

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
      <div
        style={{
          width: `100%`,
          height: `${450}px`
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 180, bottom: 50, left: 60 }}
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
              ? { type: xScaleType, format: format, precision: precision }
              : { type: xScaleType }
          }
          lineWidth={lineWidth}
          markers={constantsAxises}
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
          useMesh={true}
          enableArea={enableArea}
          enablePoints={enablePoints}
          tooltip={datum => {
            console.log("====================================");
            console.log(datum);
            console.log("====================================");
            return (
              <Tooltip
                keyIsDate={keyIsDate}
                datum={datum}
                enable={useCustomTooltips}
                widgetID={widgetID}
              />
            );
          }}
          // tooltip={datum => {
          //   const tooltip = datum.point.data?.tooltip;
          //   console.log("=============TOOLTIP==============");
          //   console.log(tooltip);
          //   console.log("====================================");
          //   return tooltip.map(item => (
          //     <div>{`${item?.label}:${item?.value}`}</div>
          //   ));
          // }}
          pointSize={pointSize}
          curve={curve}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "regagro"
              ? regagroScheme
              : { scheme: colorScheme }
          }
          pointColor={
            typeof pointColor !== "undefined" && pointColor !== null
              ? pointColor.colorPickedHex
              : { from: "color", modifiers: [] }
          }
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 130,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 120,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </>
  );
};

export default DynamicLineChart;
