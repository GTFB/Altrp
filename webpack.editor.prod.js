const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

// module.exports = merge(common, {
module.exports = {
  entry: "./resources/modules/editor/src/index.js",
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
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
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/preset-react"],
          plugins: ["@babel/plugin-syntax-jsx", ]
        }
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   use: 'react-hot-loader/webpack',
      //   include: /node_modules/
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
            // options: {
            //   insert: element => {
            //     document.getElementById('editorContent')
            //       ?.contentWindow
            //       .document
            //       .querySelector('head')?.appendChild(element)
            //     document.querySelector('head').appendChild(element)
            //   }
            // }
          },
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],

        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader'],
        // }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },

      {
        test: /\.svg$/,
        exclude: /slick.svg$|spritesheet.svg$|jsoneditor-icons.svg$/,
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
        test: /(\.(woff|woff2|eot|ttf|otf)|slick.svg|spritesheet.svg|jsoneditor-icons.svg)$/,
        use: ["file-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/modules/editor/"),
    chunkFilename: "[name].[contenthash].bundle.js",
    publicPath: "/modules/editor/",
    filename: "editor.js",
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    // new ExtractTextPlugin('style.css'),
    // new MiniCssExtractPlugin({
    //   chunkFilename: '[chunkhash].editor.css',
    //
    //   filename: 'editor.css',
    // }),
    new webpack.DefinePlugin({
      "process.env": "{}",
      global: {}
    }),
    new CopyWebpackPlugin({
      patterns: [

        {
          from: 'resources/modules/editor/src/skins',
          to: 'skins'
        },

      ]
    })
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ]
}
