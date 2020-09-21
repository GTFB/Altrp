import React, { useCallback, useLayoutEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import useColumnsSettings from "../hooks/useColumnsSettings";
import RangeControl from "./painter/controls/RangeControl";

const ColumnWidthSettings = ({ columns }) => {
  const [widthColumns, setWidthColumns] = useColumnsSettings("widthColumns", [0]);
  const diff = columns - widthColumns.length;

  useLayoutEffect(() => {
    if (diff < 0) {
      // Если текущее количество колонок больше желаемого - убираем
      setWidthColumns([...widthColumns.slice(0, diff)]);
    } else if (diff > 0) {
      // Если текущее количество колонок меньше желаемого - добавляем
      setWidthColumns([...widthColumns, ...Array(diff).fill(0)]);
    }
  }, [diff, setWidthColumns, widthColumns]);

  const handleWidthColumn = useCallback(
    (index, value) => {
      widthColumns[index] = +value;
      setWidthColumns(widthColumns);
    },
    [setWidthColumns, widthColumns]
  );

  return (
    <Accordion className="my-3">
      {widthColumns.map((n, i) => (
        <Card key={i}>
          <Accordion.Toggle as={Card.Header} eventKey={n + i + 1}>
            {`Настроить колонку ${i + 1}`}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={n + i + 1}>
            <Card.Body>
              <RangeControl
                name={`Ширина колонки ${i + 1} = ${widthColumns[i]}`}
                value={widthColumns[i]}
                onChange={(value) => handleWidthColumn(i, value)}
                options={{ min: 0, max: 12 }}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default ColumnWidthSettings;
