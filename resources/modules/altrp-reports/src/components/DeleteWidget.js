import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeWidget, selectWidget } from "../store/sections/actions";

const DeleteWidget = () => {
  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    // Удаляем текущий выбранный виджет
    dispatch(removeWidget());
    // Сбрасываем значение выбранных виджетов
    dispatch(selectWidget(null, null, null, null));
  }, [dispatch]);

  return (
    <Button variant="danger" onClick={handleRemove}>
      Удалить виджет
    </Button>
  );
};

export default DeleteWidget;
