const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    renderResult: {
      import: "./server/renderResult.js",
      filename: "renderResult.js",
    },
  },
  devtool: 'source-map',
  mode: "production",
  target: "node",
  output: {
    path: path.resolve("altrpnjs/helpers/server-render"),
    filename: "index.js",
    globalObject: "this",

    chunkFormat: 'commonjs',
    library:{
      type: 'commonjs'
    },
  },

  optimization: {
    splitChunks: false,
    concatenateModules:true,
    moduleIds:'named',
    minimize:false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            exclude: /node_modules/,
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
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,

        use: ["css-loader", "sass-loader"]

        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader'],
        // }),
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      },
      {
        test: /\.(png|jpg|gif|woff(2)?|ttf|eot|node)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
      "process.env.BROWSER": JSON.stringify(true),
      __DEV__: false
    }),
  ]
};
