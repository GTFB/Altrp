import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import domtoimage from "dom-to-image";
import ReactToPrint from "react-to-print";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";

import GearFill from "react-bootstrap-icons/dist/icons/sliders";
import TrashFill from "react-bootstrap-icons/dist/icons/trash";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer";
import FileEarMark from "react-bootstrap-icons/dist/icons/cloud-download";

import EditWidget from "./EditWidget";
import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";

import { exportComponentAsJPEG } from 'react-component-export-image';

function CardWidget({ widget, onDeleted, onEdited, settings, isMobile }) {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef(null);

  const saveWidget = async () => {
    const itemDom = ref.current.querySelector(".card-body");
    const png = await domtoimage.toPng(itemDom);
    const link = document.createElement("a");
    link.download = `widget_${new Date().getTime()}.png`;
    link.href = png;
    link.click();
  };

  return (
    <Card key={widget.id} ref={ref}>
      <Card.Header>
        <Card.Title>{widget.title}</Card.Title>
        <Card.Title>
          <div className="dropdownTogglerContainer">
            <Dropdown drop="left">
              <Dropdown.Toggle variant="light" >
                <ThreeDotsVertical color="#7a7a7b" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenuToggle" style={{ 
                zIndex:999999,
                background: 'rgba(255,255,255,1)' 
              }}>
                <Dropdown.Item>
                  <ReactToPrint
                    trigger={() => {
                      return (
                        <button type="button" title="Распечатать виджет">
                          <PrinterFill />
                        </button>
                      );
                    }}
                    content={() => ref.current}
                  /></Dropdown.Item>
                <Dropdown.Item>
                  <button type="button" title="Скачать файл" onClick={saveWidget}>
                    <FileEarMark />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button type="button" title="Настроить виджет" onClick={() => setIsEdit(!isEdit)}>
                    <GearFill />
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button type="button" title="Удалить виджет" onClick={() => onDeleted(widget)}>
                    <TrashFill />
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body className={`altrp-chart ${widget.options?.legendPosition}`}>
        {isEdit ? (
          <EditWidget settings={settings} data={widget} onEdited={onEdited} setIsEdit={setIsEdit} />
        ) : (
            <WidgetDiagram widget={widget} width={360} height={300} />
          )}
      </Card.Body>
    </Card>
  );
}

export default CardWidget;
