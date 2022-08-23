import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet/src/layer/marker/DivIcon";
import MemoHomeIcon from "./Icons/HomeIcon";
import MemoMarkerIcon from "./Icons/MarkerIcon";
import MemoGoogleMarkerIcon from "./Icons/GoogleMarkerIcon";

export const iconTypes = {
  Marker: MemoMarkerIcon,
  GoogleMarker: MemoGoogleMarkerIcon,
  Home: MemoHomeIcon,
};

export const customIcon = (
  name = "GoogleMarker",
  color = "#3388ff",
  size = [36, 36]
) => {
  const Icon = iconTypes[name] ?? iconTypes.GoogleMarker;

  const html = renderToStaticMarkup(
    <Icon fill={color} width={size[0]} height={size[1]} />
  );

  return new divIcon({ html });
};
