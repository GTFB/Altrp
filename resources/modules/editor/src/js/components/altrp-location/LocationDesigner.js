import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import clsx from "clsx";
import Loader from "./Loader";
import TileLayer from "./TileLayer";
import { customIcon } from "./DivIcon";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function LocationDesigner({
  className,
  center,
  zoom,
  isLoading = false,
  interactionOptions = {},
  style = {},
  classes
}) {
  return (
    <div className={clsx(classes, "altrp-location")} style={style}>
      {isLoading && <Loader />}

      <MapContainer
        center={center}
        zoom={zoom}
        className={clsx("altrp-location__container", className, classes)}
        scrollWheelZoom
        touchZoom
        doubleClickZoom
        keyboard={interactionOptions.keyboard}
      >
        <ChangeView center={center} zoom={zoom} />

        <TileLayer type="street" />

        <Marker position={center} icon={customIcon()}>
          <Tooltip>Current Location</Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationDesigner;
