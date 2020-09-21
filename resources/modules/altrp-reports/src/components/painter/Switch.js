import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import useWidgetSettings from "../../hooks/useWidgetSettings";

const Switch = () => {
  const [applyStyles, setApplyStyles] = useWidgetSettings("applyStylesToWidget", true);

  return (
    <BootstrapSwitchButton
      checked={applyStyles}
      onlabel="Применить все стили"
      onstyle="success"
      offlabel="Скрыть все стили"
      offstyle="danger"
      onChange={(checked) => {
        setApplyStyles(checked);
      }}
    />
  );
};

export default Switch;
