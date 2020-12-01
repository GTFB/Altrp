import React, { useState, useEffect, useCallback } from "react";
import { ResponsiveLine } from "@nivo/line";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { axisBottom } from "d3";

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
  xMarkerLabelColor
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
            y: Number(_.get(item, dataKey)),
            x: keyIsDate ? keyFormatted : currentKey
          };
        });
        let data = newData;
        switch (Number(widget.options.sort)) {
          case 0:
            data = charts.data.data;
            break;
          case 1:
            data = _.sortBy(data, "y");
            break;
          case 2:
            data = _.sortBy(data, "x");
            break;
          default:
            data = charts.data.data;
            break;
        }
        setData(data || []);
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

  let matches = [];
  let isNotEmpty = false;

  matches = _.uniq(
    data.map(item => {
      return item.data.length > 0;
    })
  );

  isNotEmpty = matches.includes(true);
  if (!isNotEmpty) return <EmptyWidget />;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
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
          xScale={
            xScaleType === "time"
              ? { type: xScaleType, format: format, precision: precision }
              : { type: xScaleType }
          }
          lineWidth={lineWidth}
          markers={markers()}
          axisBottom={
            xScaleType === "time"
              ? {
                  format: format
                }
              : {}
          }
          enableArea={enableArea}
          enablePoints={enablePoints}
          pointSize={pointSize}
          curve={curve}
          colors={{ scheme: colorScheme }}
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
