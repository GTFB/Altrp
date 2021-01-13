import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { customIcon } from "./DivIcon";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();
  console.log("markers");
  console.log(markers);

  let markersData = markers.map(item => {
    return {
      position: {
        lat: item.geometry.coordinates[1],
        lng: item.geometry.coordinates[0]
      },
      popup: item.properties.popup,
      popup: item.properties.tooltip,
      icon: item.properties.icon
    };
  });
  useEffect(() => {
    mcg.clearLayers();
    markersData.forEach(({ position, tooltip, popup, icon }) => {
      console.log(icon);
      L.marker(new L.LatLng(position.lat, position.lng), {
        icon: customIcon(icon, "#3388ff", [25, 41])
      })
        .addTo(mcg)
        .bindPopup(popup);
    });

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.objectOf(PropTypes.number).isRequired
      //   text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default MarkerCluster;
