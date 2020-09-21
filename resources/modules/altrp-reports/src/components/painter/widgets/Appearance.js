import React from "react";
import { Form } from "react-bootstrap";

import RangeControl from "../controls/RangeControl";
import ColorPicker from "../controls/ColorPicker";

import useWidgetSettings from "../../../hooks/useWidgetSettings";

const Appearance = () => {
  const [fontSize, setFontSize] = useWidgetSettings("styles.fontSize", 1);
  const [color, setColor] = useWidgetSettings("styles.color", "#000000");
  const [bgColor, setBgColor] = useWidgetSettings("styles.backgroundColor", "#ffffff");

  return (
    <Form>
      <RangeControl
        name="Размер текста"
        options={{ min: 0.2, max: 5, step: 0.1, appendix: "rem" }}
        value={fontSize}
        onChange={setFontSize}
      />
      <ColorPicker name="Цвет текста" value={color} onChange={setColor} />
      <ColorPicker name="Цвет фона" value={bgColor} onChange={setBgColor} />
    </Form>
  );
};

export default Appearance;
