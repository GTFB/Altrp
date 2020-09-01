import React from "react";

import ExportTemplate from "./ExportTemplate";
import UndoRedo from "./UndoRedo";

const Bottom = () => {
  return (
    <div className="bottom d-print-none">
      <div className="bottom__left">
        <UndoRedo />
      </div>
      <div className="bottom__right">
        <ExportTemplate />
      </div>
    </div>
  );
};

export default Bottom;
