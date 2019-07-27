var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./website/src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "website/src"),
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
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "axios": "axios"
  }
};
