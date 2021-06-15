const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // entry: [
  //     "./resources/modules/front-app/src/index.js",
  //     "./resources/modules/front-app/src/js/sw/sw.js",
  // ],
  entry: {
    'front-app':"./resources/modules/front-app/src/index.js",
    // 'sw': "./resources/modules/front-app/src/js/sw/sw.js",
  },


  // ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(@react-leaflet)\/|bower_components).*/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/preset-react"],
          plugins: ["@babel/plugin-syntax-jsx", "inline-react-svg"]
        }
      },
      {
        test: /\.css$/,
        // loader: "css-loader",
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader"
        ]
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   use: 'react-hot-loader/webpack',
      //   include: /node_modules/
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]

        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader'],
        // }),
      },
      {
        test: /\.svg$/,
        exclude: /slick.svg$|spritesheet.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },

      {
        test: /(\.(woff|woff2|eot|ttf|otf)|slick.svg|spritesheet.svg)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "editor/"),
    publicPath: "http://localhost:3001/src/",
    chunkFilename: "[contenthash].[name].bundle.js",
    filename: "bundle.[name].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "resources/modules/front-app/public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
    // new ExtractTextPlugin('style.css'),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ]
};
