const path = require("path");
const register = require("@babel/register");

register({
  presets: ["@babel/env", "@babel/react"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/transform-arrow-functions",
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-class-properties"
  ]
});

require("ignore-styles");

require("./express");
