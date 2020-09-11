export default (widgetName = null, isSettings = false) => {
  return new Promise((resolve) => {
    import(`../widgets/${widgetName}/${isSettings ? "settings" : "index"}`)
      .then((module) => {
        resolve(module.default);
      })
      .catch((e) => {});
  });
};
