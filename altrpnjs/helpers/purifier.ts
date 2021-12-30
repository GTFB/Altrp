const purifier = (o) => {
  for (const k in o) {
    if (!o[k] || typeof o[k] !== "object") {
      continue
    }
    purifier(o[k]);
    if (Object.keys(o[k]).length === 0) {
      delete o[k];
    }
  }
  return o;
}

export default purifier
