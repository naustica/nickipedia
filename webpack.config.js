var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./flask/data/static/js/main.tsx"],
  output: {
    path: path.resolve(__dirname, "flask/data/static/js"),
    filename: "main.js"
  },
  resolve: {
    extensions: [".tsx", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
