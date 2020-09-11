import React from "react";
import Fonts from "./Fonts";
import Background from "./Background";
import FontSize from "./FontSize";
import Favicon from "./Favicon";

const GlobalSettings = () => {
  return (
    <>
      <Favicon />
      <Fonts />
      <FontSize />
      <Background />
    </>
  );
};

export default GlobalSettings;
