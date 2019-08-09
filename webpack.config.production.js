var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./website/src/app.tsx"],
  performance: {
    maxEntrypointSize: 700000,
    maxAssetSize: 700000
  },
  devServer: {
    port: 3000,
    compress: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8000",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    path: path.resolve(__dirname, "./website/dist"),
    filename: "bundle.js"
  },
  watch: true,
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
    new CleanWebpackPlugin({
      dry: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: './website/dist/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
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
  ]
};
