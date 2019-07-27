var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./flask/data/website/static/js/main.tsx"],
  output: {
    path: path.resolve(__dirname, "flask/data/website/static/js"),
    filename: "main.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "json"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      }
    ]
  }
};
