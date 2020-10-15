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

const DynamicTableWidget = ({ widget, width, dataSource = [] }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        setData(charts.data.data.sort(sortData("data")));
        setIsLoading(false);
      }
    }
    else {
      console.log('SOURCE ==>', dataSource);
      setData(dataSource.sort(sortData("data")));
      setIsLoading(false);
    }
  }, [widget]);

  const summary = useMemo(() => data.reduce((acc, item) => acc + item.data, 0), [data]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  if (widget.options.isVertical) {
    return (
      <div className="widget-table">
        <table className="vertical-table">
          <tbody>
            {data.map((item, key) => (
              <tr key={key}>
                <td>{item.key}</td>
                <td>{item.data}</td>
              </tr>
            ))}
            <tr>
              <td>ИТОГО</td>
              <td>{summary}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="widget-table">
      <table>
        <thead>
          <tr>
            {data.map((item, key) => (
              <th key={key}>{item.key}</th>
            ))}
            <th>ИТОГО</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map((item, key) => (
              <td key={key}>{item.data}</td>
            ))}
            <td>{summary}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTableWidget;
