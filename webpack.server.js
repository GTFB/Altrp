const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./server/index.js",

  mode: "production",

  target: "node",

  output: {
    path: path.resolve("server-dist"),
    filename: "index.js",
    globalObject: "this"
  },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         reuseExistingChunk: true,
  //       }
  //     }
  //   }
  // },

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
        test: /\.(png|jpg|gif|woff(2)?|ttf|eot)$/,
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
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /\.ttf|\.woff|\.otf|\.woff2|\.s[ac]ss$/,
    // }),
  ]
};
