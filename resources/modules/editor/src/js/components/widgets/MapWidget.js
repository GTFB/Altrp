import React, { useState } from "react";

function MapWidget({ element }) {
  const [settings, setSettings] = useState(element.getSettings());
  console.log("settings :>> ", settings);
  return <div>Карта</div>;
}

export default MapWidget;
