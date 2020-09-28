import React from "react";
import useWidgetSettings from "../../hooks/useWidgetSettings";
import WisywigControl from "../../components/painter/controls/WysiwygControl";
import ModelControl from "../../components/painter/controls/ModelControl";

const DTextSettings = () => {
  const [text, setText] = useWidgetSettings("text", "");
  const [model, setModel] = useWidgetSettings("model", {});
  return (
    <>
      <WisywigControl value={text} onChange={setText} />
      <ModelControl value={model} onChange={setModel} />
    </>
  );
};

export default DTextSettings;
