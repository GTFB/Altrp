import React from "react";
import { Form } from "react-bootstrap";
import SelectControl from "../controls/SelectControl";
import useWidgetSettings from "../../../hooks/useWidgetSettings";

const Alignments = () => {
  const [textAlign, setTextAlign] = useWidgetSettings("styles.textAlign", "left");

  const [float, setFloat] = useWidgetSettings("styles.float", "inherit");

  return (
    <Form>
      <SelectControl
        list={[
          {
            name: "По-умолчанию",
            value: "none",
          },
          {
            name: "Слева",
            value: "left",
          },
          {
            name: "Справа",
            value: "right",
          },
        ]}
        name="Положение виджета (float)"
        value={float}
        onChange={setFloat}
      />
      <SelectControl
        list={[
          {
            name: "По левому краю",
            value: "left",
          },
          {
            name: "По центру",
            value: "center",
          },
          {
            name: "По правому краю",
            value: "right",
          },
          {
            name: "По ширине",
            value: "justify",
          },
        ]}
        name="Расположение текста (text-align)"
        value={textAlign}
        onChange={setTextAlign}
      />
    </Form>
  );
};

export default Alignments;
