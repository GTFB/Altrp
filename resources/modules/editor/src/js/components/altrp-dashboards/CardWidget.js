import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import domtoimage from "dom-to-image";
import ReactToPrint from "react-to-print";

import GearFill from "react-bootstrap-icons/dist/icons/gear-fill";
import TrashFill from "react-bootstrap-icons/dist/icons/trash-fill";
import PrinterFill from "react-bootstrap-icons/dist/icons/printer-fill";
import FileEarMark from "react-bootstrap-icons/dist/icons/file-earmark-arrow-down";

import EditWidget from "./EditWidget";
import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";

function CardWidget({ widget, onDeleted, onEdited, settings }) {
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
          <ReactToPrint
            trigger={() => {
              return (
                <button type="button" title="Распечатать виджет">
                  <PrinterFill />
                </button>
              );
            }}
            content={() => ref.current}
          />
          <button type="button" title="Скачать файл" onClick={saveWidget}>
            <FileEarMark />
          </button>
          <button type="button" title="Настроить виджет" onClick={() => setIsEdit(!isEdit)}>
            <GearFill />
          </button>
          <button type="button" title="Удалить виджет" onClick={() => onDeleted(widget)}>
            <TrashFill />
          </button>
        </Card.Title>
      </Card.Header>
      <Card.Body>
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
