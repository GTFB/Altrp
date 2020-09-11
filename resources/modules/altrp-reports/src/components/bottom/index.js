import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import EyeFill from "react-bootstrap-icons/dist/icons/eye-fill";

import ExportTemplate from "./ExportTemplate";
import UndoRedo from "./UndoRedo";

const Bottom = () => {
  const templateId = useSelector((state) => state.app.templateId);
  const handleOpenNewWindow = () => {
    window.open("/reports/html/" + templateId);
  };
  return (
    <div className="bottom d-print-none">
      <div className="bottom__left">
        <UndoRedo />
      </div>
      <div className="bottom__right">
        <Button className="mr-1" variant="secondary" onClick={handleOpenNewWindow}>
          <EyeFill color="#ffffff" />
        </Button>
        <ExportTemplate />
      </div>
    </div>
  );
};

export default Bottom;
