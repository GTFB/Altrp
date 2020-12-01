import React, { useState, useEffect, useCallback, useMemo } from "react";

import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import { getWidgetData } from "../services/getWidgetData";

const sortData = (key, order = "desc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

const DynamicTableWidget = ({
  widget,
  width,
  dataSource = [],
  height = 450
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        let data = charts.data.data;
        switch (Number(widget.options.sort)) {
          case 0:
            data = charts.data.data;
            break;
          case 1:
            data = _.sortBy(data, "key");
            break;
          case 2:
            data = _.sortBy(data, "data");
            break;
          default:
            data = charts.data.data;
            break;
        }
        setData(data || []);
        setIsLoading(false);
      }
    } else {
      console.log("SOURCE ==>", dataSource);
      setData(dataSource.sort(sortData("data")));
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
