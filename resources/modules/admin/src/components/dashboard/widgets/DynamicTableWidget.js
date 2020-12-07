import React, { useState, useEffect, useCallback, useMemo } from "react";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";
import moment from "moment";

const DynamicTableWidget = ({
  widget,
  width,
  keyIsDate,
  dataSource = [],
  height = 450,
  sort = "",
  tickRotation = 0
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setData(data);
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

  const summary = useMemo(
    () =>
      data
        .map(item => item.data.reduce((acc, object) => acc + object.y, 0))
        .reduce((acc, item) => acc + item, 0),
    [data]
  );

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
    <div className="widget-table" style={{ maxHeight: `${height}px` }}>
      <table className="vertical-table">
        <tbody>
          {data.map((item, key) => {
            const dataset = item.data.map((object, index) => {
              return (
                <tr key={`${key}${index}`}>
                  <td>{object.x}</td>
                  <td>{object.y}</td>
                </tr>
              );
            });
            return (
              <React.Fragment key={key}>
                <tr key={key} style={{ textAlign: "center" }}>
                  <td colSpan={2}>{item.id}</td>
                </tr>
                {dataset}
              </React.Fragment>
            );
          })}
          <tr>
            <td>ИТОГО</td>
            <td>{summary}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTableWidget;
