import { TileLayer as NativeTileLayer } from "react-leaflet";

export const MapTypes = [
  {
    key: "street",
    label: "Street",
  },
  {
    key: "terrain",
    label: "Terrain",
  },
  {
    key: "satellite",
    label: "Satellite",
  },
  {
    key: "dark",
    label: "Dark",
  },
  {
    key: "monolight",
    label: "Mono Light",
  },
];

function TileLayer({ type }) {
  switch(type) {
    case "street": {
      return (
        <NativeTileLayer
          attribution={
            `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`
          }
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
      );
    }

    case "terrain": {
      return (
        <NativeTileLayer
          url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={["mt0","mt1","mt2","mt3"]}
        />
      );
    }

    case "satellite": {
      return (
        <NativeTileLayer
          url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          maxZoom={19}
          subdomains={["mt0","mt1","mt2","mt3"]}
        />
      );
    }

    case "dark": {
      return (
        <NativeTileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png"
          attribution={`
            &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
            &copy; <a href="http://cartodb.com/attributions">CartoDB</a>
          `}
          subdomains="abcd"
          maxZoom={19}
        />
      );
    }

    case "monolight": {
      return (
        <NativeTileLayer
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png"
          maxZoom={19}
          id="mapbox.light"
          accessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
        />
      );
    }
  }

  return (
    <NativeTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      maxNativeZoom={19}
      maxZoom={19}
    />
  );
}

export default TileLayer;
