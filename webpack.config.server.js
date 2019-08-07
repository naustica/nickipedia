var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["./website/src/app.tsx"],
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
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
    path: path.resolve(__dirname, "./website"),
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
    new HtmlWebpackPlugin({
      template: './website/index.html'
    })
  ]
};
