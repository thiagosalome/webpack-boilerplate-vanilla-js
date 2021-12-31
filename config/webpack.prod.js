/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      {
        from: path.resolve('src/images/'),
        to: path.resolve('build/images'),
        ignore: ['svgs/*'],
        cache: true,
      },
    ]),
  ],
  output: {
    filename: 'src/scripts/app.min.js',
    path: path.resolve('build'),
  },
});
