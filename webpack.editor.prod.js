const merge = require('webpack-merge');
const common = require('./webpack.editor.common.js');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   use: 'react-hot-loader/webpack',
      //   include: /node_modules/
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],

        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader'],
        // }),
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/modules/editor/"),
    publicPath: "/modules/editor/",
    filename: "editor.js",
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
    // new ExtractTextPlugin('style.css'),
    new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash].editor.css',

      filename: 'editor.css',
    }),
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

    ]})
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ]
});
