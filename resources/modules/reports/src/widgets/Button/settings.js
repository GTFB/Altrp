import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import useWidgetSettings from "../../hooks/useWidgetSettings";

export const defaultParams = {
  widgetName: "Image",
  props: {
    title: "Кнопка",
  },
};

const ButtonSettings = () => {
  const { settings, setSettings } = useWidgetSettings();

  const onChange = useCallback(
    (e) => {
      setSettings({ ...settings, [e.target.name]: e.target.value });
    },
    [setSettings, settings]
  );

  return (
    <Form>
      <Form.Group>
        <Form.Label>Надпись на кнопке</Form.Label>
        <Form.Control name="alt" type="text" value={settings.title} onChange={onChange} />
      </Form.Group>
    </Form>
  );
};

export default ButtonSettings;
