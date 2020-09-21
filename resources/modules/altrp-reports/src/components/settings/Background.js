import React from "react";
import useGlobalSettings from "../../hooks/useGlobalSettings";
import ColorPicker from "../painter/controls/ColorPicker";

const Background = () => {
  const [bg, setBg] = useGlobalSettings("backgroundColor", "#ffffff");
  return <ColorPicker name="Цвет фона" value={bg} onChange={setBg} />;
};

export default Background;
