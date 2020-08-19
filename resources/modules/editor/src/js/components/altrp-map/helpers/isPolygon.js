export const isPolygon = (feature) => {
  return feature && feature.geometry.type === "Polygon" && feature.properties.positions;
};
