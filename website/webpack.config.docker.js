var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var {GenerateSW} = require('workbox-webpack-plugin');


module.exports = {
  mode: "production",
  devtool: "none",
  entry: ["./src/app.tsx"],
  performance: {
    maxEntrypointSize: 700000,
    maxAssetSize: 700000
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  watch: false,
  resolve: {
    extensions: [".tsx", ".ts", ".js", "json"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg)$/,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
      inject: false,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        removeComments: false
      }
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),
    new GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: 'CacheFirst'
        }
      ]
    })
  ]
};
