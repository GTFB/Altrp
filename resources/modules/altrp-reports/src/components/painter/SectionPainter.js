import React from "react";
import loadable from "@loadable/component";
import { Card, Accordion } from "react-bootstrap";

const SectionPainter = () => {
  const categories = [
    {
      name: "Оформление",
      cmp: loadable(() => import(`./sections/Appearance`)),
    },
    {
      name: "Позиционирование",
      cmp: loadable(() => import(`./sections/Alignments`)),
    },
    {
      name: "Отступы",
      cmp: loadable(() => import(`./sections/Indentation`)),
    },
  ];
  return (
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
  );
};

export default React.memo(SectionPainter);
