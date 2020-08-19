export const isCircle = (feature) => {
  return feature && feature.geometry.type === "Point" && feature.properties.radius;
};
