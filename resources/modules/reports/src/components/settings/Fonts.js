import React from "react";
import SelectControl from "../painter/controls/SelectControl";
import useGlobalSettings from "../../hooks/useGlobalSettings";
import fonts from "../../helpers/fonts";

const Fonts = () => {
  const [font, setFont] = useGlobalSettings("fontFamily", fonts[0]);
  return <SelectControl name="Шрифт" value={font} onChange={setFont} list={fonts} />;
};

export default Fonts;
