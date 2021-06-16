const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', "./server/index.js"],

  target: "node",


  output: {
    path: path.resolve("server-dist"),
    filename: "index.js",
    globalObject: "this"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules/@babel'),
        loader: "babel-loader",
        options: {
          minified:false,
          presets: ["@babel/env", "@babel/preset-react"],
          plugins: ["@babel/plugin-syntax-jsx", "inline-react-svg"]
        },
      },
      // {
      //   test:  path.resolve(__dirname, 'node_modules/@babel'),
      //   loader: "file-loader",
      // },
      {
        test: /\.s[ac]ss$/i,

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
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: path.resolve(__dirname, 'node_modules/@babel'),
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: path.resolve(__dirname, 'node_modules/ignore-styles'),
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: path.resolve(__dirname, 'node_modules/express'),
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
      "process.env.BROWSER": JSON.stringify(true),
      __DEV__: false
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /\.ttf|\.woff|\.otf|\.woff2|\.s[ac]ss$/,
    }),
  ]
};
