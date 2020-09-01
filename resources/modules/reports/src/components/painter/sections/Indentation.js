import React from "react";

import useSectionSettings from "../../../hooks/useSectionSettings";
import IndentControl from "../controls/IndentControl";

const Indentation = () => {
  // Margins
  const [marginLeft, setMarginLeft] = useSectionSettings("styles.marginLeft", 0);
  const [marginRight, setMarginRight] = useSectionSettings("styles.marginRight", 0);
  const [marginTop, setMarginTop] = useSectionSettings("styles.marginTop", 0);
  const [marginBottom, setMarginBottom] = useSectionSettings("styles.marginBottom", 0);

  // Paddings
  const [paddingLeft, setPaddingLeft] = useSectionSettings("styles.paddingLeft", 0);
  const [paddingRight, setPaddingRight] = useSectionSettings("styles.paddingRight", 0);
  const [paddingTop, setPaddingTop] = useSectionSettings("styles.paddingTop", 0);
  const [paddingBottom, setPaddingBottom] = useSectionSettings("styles.paddingBottom", 0);

  return (
    <>
      <IndentControl
        title="Внешние отступы"
        list={[
          { name: "Вверху", value: marginTop, onChange: setMarginTop },
          { name: "Справа", value: marginRight, onChange: setMarginRight },
          { name: "Внизу", value: marginBottom, onChange: setMarginBottom },
          { name: "Слева", value: marginLeft, onChange: setMarginLeft },
        ]}
      />
      <IndentControl
        title="Внутренние отступы"
        list={[
          { name: "Вверху", value: paddingTop, onChange: setPaddingTop },
          { name: "Справа", value: paddingRight, onChange: setPaddingRight },
          { name: "Внизу", value: paddingBottom, onChange: setPaddingBottom },
          { name: "Слева", value: paddingLeft, onChange: setPaddingLeft },
        ]}
      />
    </>
  );
};

export default Indentation;
