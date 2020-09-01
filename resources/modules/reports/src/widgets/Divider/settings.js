import React from "react";
import { Form } from "react-bootstrap";
import useWidgetSettings from "../../hooks/useWidgetSettings";
import RangeControl from "../../components/painter/controls/RangeControl";
import ColorPicker from "../../components/painter/controls/ColorPicker";
import SelectControl from "../../components/painter/controls/SelectControl";

const DividerSettings = () => {
  const [size, setSize] = useWidgetSettings("size", 2);
  const [color, setColor] = useWidgetSettings("color", "#000000");
  const [breakAfter, setBreakAfter] = useWidgetSettings("breakAfter", "auto");

  return (
    <Form>
      <RangeControl
        name="Толщина разделителя"
        value={size}
        onChange={setSize}
        options={{ min: 1, max: 10, step: 1, appendix: "px" }}
      />
      <ColorPicker name="Цвет разделителя" value={color} onChange={setColor} />
      <SelectControl
        name="Разрыв страницы при печати"
        value={breakAfter}
        onChange={setBreakAfter}
        list={[
          { name: "Автоматически", value: "auto" },
          { name: "Разорвать страницу", value: "page" },
          { name: "Не разрывать страницу", value: "avoid" },
        ]}
      />
    </Form>
  );
};

export default DividerSettings;
