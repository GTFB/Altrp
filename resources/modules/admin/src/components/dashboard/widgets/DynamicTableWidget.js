import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import EmptyWidget from "./EmptyWidget";

const DynamicTableWidget = ({ dataUrl, options = {} }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (dataUrl) => {
    setIsLoading(true);
    const req = await axios(dataUrl);
    if (req.status === 200 && typeof req.data !== "string") {
      setData(req.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(dataUrl);
  }, [dataUrl]);

  if (isLoading) return <Spinner />;

  if (data.length === 0) return <EmptyWidget />;

  if (options.isVertical) {
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
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map((item, key) => (
              <td key={key}>{item.data}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTableWidget;
