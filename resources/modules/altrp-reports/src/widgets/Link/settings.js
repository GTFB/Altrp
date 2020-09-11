import React from "react";
import { Form } from "react-bootstrap";
import useWidgetSettings from "../../hooks/useWidgetSettings";
import InputControl from "../../components/painter/controls/InputControl";
import SelectControl from "../../components/painter/controls/SelectControl";
import ToggleControl from "../../components/painter/controls/ToggleControl";

const LinkSettings = () => {
  const [url, setUrl] = useWidgetSettings("url", "#");
  const [target, setTarget] = useWidgetSettings("target", "_self");
  const [text, setText] = useWidgetSettings("text", "Ссылка");
  const [isButton, setIsButton] = useWidgetSettings("isButton", false);

  return (
    <Form>
      <InputControl name="Текст ссылки" value={text} onChange={setText} />
      <InputControl name="URL" value={url} onChange={setUrl} />
      <SelectControl
        list={["_self", "_blank"]}
        name="Назначение"
        value={target}
        onChange={setTarget}
      />
      <ToggleControl name="Кнопка" value={isButton} onChange={setIsButton} />
    </Form>
  );
};

export default LinkSettings;
