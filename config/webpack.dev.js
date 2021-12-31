/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Choose a style of source mapping
  devServer: {
    static: path.resolve('src'),
    port: 3000,
  },
});
