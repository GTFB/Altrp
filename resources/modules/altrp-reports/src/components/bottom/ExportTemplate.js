import React, { useEffect, useState, useCallback } from "react";
import { Spinner, SplitButton, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import CloudArrowUpFill from "react-bootstrap-icons/dist/icons/cloud-arrow-up-fill";

import useGlobalSettings from "../../hooks/useGlobalSettings";

import { header } from "./template/header";
import footer from "./template/footer";

const Export = () => {
  const sections = useSelector((state) => state.sections.present.sections);
  const { templateId, title } = useSelector((state) => state.app);
  const [showPrintPanel, setShowPrintPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  const [globalSettings] = useGlobalSettings();
  // Получаем html секции предпросмотра
  const dom = document.querySelector(".rrbe__preview")?.innerHTML || "";

  const saveTemplate = useCallback(async () => {
    setLoading(true);
    await axios.post(`/reports/${templateId}`, {
      json: JSON.stringify(sections),
      global: JSON.stringify(globalSettings),
      html,
    });
    setLoading(false);
    setShowPrintPanel(false);
  }, [templateId, sections, html, globalSettings]);

  useEffect(() => {
    let result = ``;
    // Добавляем к основному содержимому header
    result = header(globalSettings, title, showPrintPanel);
    // Добавляем основной html
    result += dom;
    // Добавляем footer
    result += footer;
    // Записываем готовый результат
    setHtml(result);
  }, [dom, globalSettings, showPrintPanel, title]);

  return (
    <SplitButton
      as={ButtonGroup}
      size="sm"
      variant="secondary"
      title={
        loading ? (
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        ) : (
          <CloudArrowUpFill title="Save" fill="#ffffff" />
        )
      }
      drop="up"
      alignRight
      onClick={saveTemplate}
    >
      <Dropdown.Item
        eventKey="1"
        onClick={() => {
          setShowPrintPanel(true);
          saveTemplate();
        }}
      >
        With Panel for Print
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">Download PDF</Dropdown.Item>
    </SplitButton>
  );
};

export default Export;
