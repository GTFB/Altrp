import React from "react";
import useGlobalSettings from "../../hooks/useGlobalSettings";
import RangeControl from "../painter/controls/RangeControl";

const FontSize = () => {
  const [fontSize, setFontSize] = useGlobalSettings("fontSize", 1);
  return (
    <RangeControl
      name={`Размер текста ${fontSize}`}
      value={fontSize}
      onChange={setFontSize}
      options={{ min: 0.1, max: 5.0, step: 0.1, appendix: "rem" }}
    />
  );
};

export default FontSize;
