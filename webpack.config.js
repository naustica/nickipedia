var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./website/src/app.tsx"],
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false
      }
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
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
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "axios": "axios"
  }
};
