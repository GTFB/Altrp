export const isMarker = (feature) => {
  return feature && feature.geometry.type === "Point" && feature.properties.icon;
};
