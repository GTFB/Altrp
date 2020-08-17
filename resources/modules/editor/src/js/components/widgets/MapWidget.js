import React, { useState } from "react";
import MapDesigner from "../rrbe-map/src/MapDesigner.js";

function MapWidget({ element }) {
  const [settings, setSettings] = useState(element.getSettings());
  const { content_editable, content_zoom, content_lat, content_lng } = settings;
  console.log("settings :>> ", settings);
  return (
    <MapDesigner
      className="altrp-map"
      isEditable={content_editable}
      center={[content_lat, content_lng]}
      zoom={content_zoom}
      data={[]}
      saveData={(data) => console.log("data :>> ", data)}
    />
  );
}

export default MapWidget;
