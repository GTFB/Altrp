import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";
import { Button } from "react-bootstrap";

import CaretLeftFill from "react-bootstrap-icons/dist/icons/caret-left-fill";
import CaretRightFill from "react-bootstrap-icons/dist/icons/caret-right-fill";

function UndoRedo() {
  const dispatch = useDispatch();
  const isUndoable = useSelector((state) => state.sections.past.length === 0);
  const isRedoble = useSelector((state) => state.sections.future.length === 0);

  const undo = () => {
    dispatch(ActionCreators.undo());
  };
  const redo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <>
      <Button variant="light" size="sm" className="mr-1" disabled={isUndoable} onClick={undo}>
        <CaretLeftFill title="Отменить" color="#ffffff" />
      </Button>
      <Button variant="light" size="sm" disabled={isRedoble} onClick={redo}>
        <CaretRightFill title="Вернуть" color="#ffffff" />
      </Button>
    </>
  );
}

export default UndoRedo;
