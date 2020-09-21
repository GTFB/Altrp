import React from "react";

import RangeControl from "./painter/controls/RangeControl";
import ColumnWidthSettings from "./ColumnWidthSettings";
import useColumnsSettings from "../hooks/useColumnsSettings";

const ColumnSettings = () => {
  const [columns, setColumns] = useColumnsSettings("columns", 1);

  return (
    <>
      <RangeControl
        name={`Количество колонок - ${columns}`}
        value={columns}
        onChange={setColumns}
        options={{ min: 1, max: 12 }}
      />
      <ColumnWidthSettings columns={columns} />
    </>
  );
};

export default React.memo(ColumnSettings);
