var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["./flask/data/website/static/js/main.tsx"],
  output: {
    path: path.resolve(__dirname, "./flask/data/website/static/js"),
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
  }
};
