import React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { ItemTypes } from "../helpers/itemTypes";
import { switchSettingsTab } from "../store/app/actions";

import GlobalSettings from "./settings/GlobalSettings";
import SectionSettings from "./SectionSettings";
import WidgetSettings from "./WidgetSettings";

import "../scss/settings.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const settingsTab = useSelector((state) => state.app.settingsTab);

  const renderSettings = () => {
    switch (settingsTab) {
      case ItemTypes.SECTIONS:
        return <SectionSettings />;
      case ItemTypes.ELEMENTS:
        return <WidgetSettings />;
      case ItemTypes.GLOBAL:
        return <GlobalSettings />;
      default:
        break;
    }
  };

  return (
    <div className="settings">
      <ToggleButtonGroup
        name="settings"
        value={settingsTab}
        onChange={(value) => dispatch(switchSettingsTab(value))}
      >
        <ToggleButton value={ItemTypes.SECTIONS}>Секция</ToggleButton>
        <ToggleButton value={ItemTypes.ELEMENTS}>Виджет</ToggleButton>
        <ToggleButton value={ItemTypes.GLOBAL}>Глобальные</ToggleButton>
      </ToggleButtonGroup>
      <div className="settings__container">{renderSettings()}</div>
    </div>
  );
};

export default Settings;
