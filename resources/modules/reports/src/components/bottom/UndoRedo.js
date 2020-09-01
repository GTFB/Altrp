import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";
import { Button } from "react-bootstrap";

import { ReactComponent as UndoIcon } from "../../icons/undo.svg";
import { ReactComponent as SendIcon } from "../../icons/send.svg";

const UndoRedo = (props) => {
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
      <Button variant="light" size="sm" className="mr-2" disabled={isUndoable} onClick={undo}>
        <UndoIcon title="Отменить" width="20" height="20" />
      </Button>
      <Button variant="light" size="sm" className="mr-2" disabled={isRedoble} onClick={redo}>
        <SendIcon title="Вернуть" width="20" height="20" />
      </Button>
    </>
  );
};

export default UndoRedo;
