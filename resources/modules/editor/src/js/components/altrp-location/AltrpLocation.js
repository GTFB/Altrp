import React, { useEffect, useState } from "react";
import LocationDesigner from "./LocationDesigner";

function AltrpLocation({ element, settings, classes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
  const {
    canvas,
    style_height = {},
    style_margin = {}
  } = settings;

  useEffect(() => {
    if (window) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        setCurrentPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        setIsLoading(false);
      })
    }
  }, [window]);

  return (
    <LocationDesigner
      classes={classes}
      element={element}
      isTransformLatLng={true}
      style={{
        pointerEvents: window.altrpHelpers.isEditor() ? "none" : "auto",
        height: (style_height.size + style_height.unit) || "200px",
        marginTop: (style_margin.top + style_margin.unit) || "10px",
        marginBottom: (style_margin.bottom + style_margin.unit) || "10px",
        marginLeft: (style_margin.left + style_margin.unit) || "10px",
        marginRight: (style_margin.right + style_margin.unit) || "10px"
      }}
      isLoading={isLoading}
      settings={settings}
      preferCanvas={canvas}
      zoom={+element.getLockedSettings("zoom")}
      center={[currentPosition.latitude, currentPosition.longitude]}
    />
  );
}

export default AltrpLocation;
