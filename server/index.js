require("./express");
// ignore `.scss` imports

// transpile imports on the fly
require("@babel/register")({
  configFile: path.resolve(__dirname, "../.babelrc")
});
