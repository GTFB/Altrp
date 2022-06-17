import React from "react";
import SelectControl from "components/painter/controls/SelectControl";
import ToggleControl from "components/painter/controls/ToggleControl";

import useWidgetSettings from "hooks/useWidgetSettings";

const StyleController = () => {
  const [striped, setStriped] = useWidgetSettings("striped", false);
  const [bordered, setBordered] = useWidgetSettings("bordered", false);
  const [borderless, setBorderless] = useWidgetSettings("borderless", false);
  const [hover, setHover] = useWidgetSettings("hover", false);
  const [variant, setVariant] = useWidgetSettings("variant", "");
  const [size, setSize] = useWidgetSettings("size", "");

  return (
    <>
      <SelectControl
        name="Тема таблицы"
        value={variant}
        onChange={setVariant}
        list={[
          { name: "Светлая", value: "" },
          { name: "Темная", value: "dark" },
        ]}
      />
      <SelectControl
        name="Размер таблицы"
        value={size}
        onChange={setSize}
        list={[
          { name: "Обычный", value: "" },
          { name: "Уменьшенный", value: "sm" },
        ]}
      />
      <ToggleControl name="Select all odd lines" value={striped} onChange={setStriped} />
      <ToggleControl name="Select all even lines" value={hover} onChange={setHover} />
      <ToggleControl name="Add vertical borders" value={bordered} onChange={setBordered} />
      <ToggleControl name="Remove all borders" value={borderless} onChange={setBorderless} />
    </>
  );
};

export default StyleController;
