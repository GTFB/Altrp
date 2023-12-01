const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


// module.exports = merge(common, {
module.exports ={
  mode: 'production',
  entry: {
    'h-altrp': "./resources/modules/front-app/src/h-altrp",
    //'lib-altrp': "./resources/modules/front-app/src/js/libs/altrp",
  },
  // devtool: 'source-map',
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
          plugins: ["@babel/plugin-syntax-jsx", "inline-react-svg"]
        }
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
      // {
      //   test: /\.(js|jsx)$/,
      //   use: 'react-hot-loader/webpack',
      //   include: /node_modules/
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]

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
        test: /(\.(woff|woff2|eot|ttf|otf)|slick.svg|spritesheet.svg)$/,
        use: ["file-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/modules/front-app/"),
    // publicPath: "https://up.altrp.com/modules/front-app/",
    publicPath: "/modules/front-app/",
    chunkFilename: "[name].[contenthash].js",
    filename: "[name].js"
  },

  // optimization:{
  //   chunkIds: 'named',
  //   concatenateModules: true,
  //   minimize: false,
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  // },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    // new ExtractTextPlugin('style.css'),
    new MiniCssExtractPlugin({
      chunkFilename: "[chunkhash].front-app.css",
      filename: 'front-app.css'
    }),
    new webpack.DefinePlugin({
      "process.env": "{}",
      global: {}
    })
    // new WriteChunksToFrontBlade,
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ]
}

