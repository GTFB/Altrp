import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { customIcon } from "./DivIcon";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();

  let markersData = markers.map(item => {
    return {
      position: {
        lat: item.feature?.geometry?.coordinates[1],
        lng: item.feature?.geometry?.coordinates[0]
      },
      popup: item.feature?.properties?.popup,
      tooltip: item.feature?.properties?.tooltip,
      icon: item.feature?.properties?.icon
    };
  });
  useEffect(() => {
    mcg.clearLayers();
    markersData.forEach(({ position, tooltip, popup, icon }) => {
      L.marker(new L.LatLng(position.lat, position.lng), {
        icon: customIcon(icon, "#3388ff", [25, 41])
      })
        .addTo(mcg)
        .bindPopup(popup)
        .bindTooltip(tooltip);
    });
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
