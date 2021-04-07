const WriteChunksToFrontBlade = require("./WriteChunksToFrontBlade");
const merge = require('webpack-merge');
const common = require('./webpack.front.common.js');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
    path: path.resolve(__dirname, "public/modules/front-app/"),
    publicPath: "/modules/front-app/",
    filename: "front-app.js"
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
    // new ExtractTextPlugin('style.css'),
    new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash].front-app.css',

      filename: 'front-app.css'
    }),
    new WriteChunksToFrontBlade,
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ]
});

