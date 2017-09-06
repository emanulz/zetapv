var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var Dotenv = require('dotenv-webpack');


module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : '',
  entry: {
    landing:"./frontend/landing/app.js",
    landingStyles:"./frontend/landing/main.sass",
    pos:"./frontend/pos/app.js",
    posStyles:"./frontend/pos/styles/main.sass",
    admin:"./frontend/admin/app.js",
    adminStyles:"./frontend/admin/styles/styles.sass"
  },

  module:{
    rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
          },
          {
              test:/\.(sass|css)$/,
              loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          }
        ],
    },

  output: {
    path: __dirname+ "/public",
    filename: "./js/[name].js"
  },

  plugins: debug ?
                [new ExtractTextPlugin({filename: './css/[name].css', allChunks: true}),
                new LiveReloadPlugin(), new Dotenv({
                  path: './.env', // Path to .env file (this is the default)
                  safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
                })]
                :
                [
                new webpack.DefinePlugin({
                  'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                  }
                }), new Dotenv({
                  path: './.env', // Path to .env file (this is the default)
                  safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
                }),
                new ExtractTextPlugin({filename:"./css/[name].css", allChunks: true}),
                new webpack.optimize.UglifyJsPlugin()
              ],

};
