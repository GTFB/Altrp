const register = require("@babel/register");

register({
  presets: ["@babel/env", "@babel/react"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/transform-arrow-functions",
    "@babel/proposal-object-rest-spread",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-private-property-in-object",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-private-methods",
      {
        "loose": true
      }
    ]
  ]
});

require("ignore-styles");
// require("ignore-styles");

require("./express");

