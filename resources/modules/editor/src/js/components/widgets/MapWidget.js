import React, { useState, useEffect } from "react";
import MapDesigner from "../altrp-map/MapDesigner";

function MapWidget({ element }) {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setSettings(element.getSettings());
  }, [setSettings]);

  console.log("settings :>> ", settings);
  return (
    <MapDesigner
      className="altrp-map"
      data={[]}
      zoom={settings.zoom}
      center={[settings.lat, settings.lng]}
    />
  );
}

export default MapWidget;
