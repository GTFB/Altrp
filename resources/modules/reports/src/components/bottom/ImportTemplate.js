import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Modal, Button, FormControl, Spinner } from "react-bootstrap";
import { importStructure, selectSection } from "../../store/sections/actions";

import { ReactComponent as ImportIcon } from "../../icons/import.svg";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";

const ImportTemplate = () => {
  const dispatch = useDispatch();
  const templateId = useSelector((state) => state.app.templateId);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = useCallback((e) => setName(e.target.value), []);

  const loadTemplate = useCallback(async () => {
    // Включаем спиннер
    setLoading(true);
    // Загружаем данные
    const req = await axios.get(`/reports/${templateId}`);
    // Выключаем спиннер
    setLoading(false);
    if (req.data[0]) {
      // Записываем данные в стор
      dispatch(importStructure(req.data[0].store));
      // Делаем первую секцию активной
      dispatch(selectSection(0));
      // Скрываем модальное окно
      setShow(false);
    }
  }, [dispatch, templateId]);

  return (
    <>
      <Button variant="primary" className="mr-2" size="sm" onClick={() => setShow(true)}>
        <ImportIcon title="Импорт" width="20" height="20" fill="#ffffff" />
      </Button>
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <FormControl value={name} onChange={handleChange} placeholder="Название шаблона" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Закрыть
          </Button>
          <Button variant="primary" disabled={!name} onClick={loadTemplate}>
            {loading ? (
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Импорт"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportTemplate;
