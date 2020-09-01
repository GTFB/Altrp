import React, { useEffect, useCallback, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const Table = ({
  source,
  columns = [],
  rows = [],
  striped = false,
  variant = "light",
  bordered = false,
  size = "sm",
  hover = false,
  borderless = false,
}) => {
  //const [header, setHeader] = useState(columns);
  const [data, setData] = useState(rows);

  const getData = useCallback(async () => {
    if (source) {
      const req = await axios(source);
      console.log("req", req);
      setData(req.data);
    }
  }, [source]);

  useEffect(() => {
    getData();
  }, [getData]);

  return columns.length > 0 ? (
    <BootstrapTable
      bootstrap4
      size={size}
      variant={variant}
      striped={striped}
      bordered={bordered}
      hover={hover}
      borderless={borderless}
      keyField="id"
      data={data}
      columns={columns}
      pagination={paginationFactory()}
    />
  ) : (
    "Нет данных"
  );
};

export default Table;
