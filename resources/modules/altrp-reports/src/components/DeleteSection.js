import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeSection, selectSection, selectWidget } from "../store/sections/actions";

const DeleteSection = () => {
  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    // Удаляем текущую выбранную секцию
    dispatch(removeSection());
    // Сбрасываем значение выбранной секции
    dispatch(selectSection(null));
    // Сбрасываем значение выбранного виджета
    dispatch(selectWidget(null, null, null, null));
  }, [dispatch]);

  return (
    <Button variant="danger" onClick={handleRemove}>
      Удалить секцию
    </Button>
  );
};

export default DeleteSection;
