import React, { useState, useEffect, useCallback } from "react";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import { customStyle } from "../widgetTypes";
import { Spinner } from "react-bootstrap";

const format = "%d.%m.%Y";

const PointChart = ({
  widget,
  dataSource = [],
  xScaleType = "point",
  colorScheme = "red_grey",
  nodeSize = 6,
  precision
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const size = 4;
  const fill = customStyle[0];
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
        setData(newData);
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

  return (
    <>
      <div
        style={{
          width: `100%`,
          height: `${450}px`
        }}
      >
        <ResponsiveScatterPlot
          data={data}
          colors={{ scheme: colorScheme }}
          margin={{ top: 50, right: 180, bottom: 50, left: 60 }}
          xFormat={xScaleType === "time" && "time:%d.%m.%Y"}
          nodeSize={nodeSize}
          xScale={
            xScaleType === "time"
              ? { type: xScaleType, format: format, precision: precision }
              : { type: xScaleType }
          }
          axisBottom={
            xScaleType === "time"
              ? {
                  format: format
                }
              : {}
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
export default PointChart;
