import React from "react";
import { Card, Accordion } from "react-bootstrap";
import loadable from "@loadable/component";

import SourceControl from "components/painter/controls/SourceControl";
import useWidgetSettings from "hooks/useWidgetSettings";

import "./table.scss";

const TableSettings = () => {
  const [source, setSource] = useWidgetSettings("source", "");

  const categories = [
    {
      name: "Колонки",
      cmp: loadable(() => import(`./ColumnController`)),
    },
    {
      name: "Настройки",
      cmp: loadable(() => import(`./StyleController`)),
    },
  ];

  return (
    <>
      <SourceControl name="Источник данных" value={source} onChange={setSource} />
      <Accordion>
        {categories.map((category, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={category.name}>
              {category.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={category.name}>
              <Card.Body>{category.cmp.render()}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
};

export default TableSettings;
