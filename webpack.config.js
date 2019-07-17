var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['./flask/data/static/js/main.ts'],
  output: {
    path: path.resolve(__dirname, "flask/data/static/js"),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
