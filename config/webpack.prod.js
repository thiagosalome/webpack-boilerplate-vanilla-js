const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new cleanWebpackPlugin(["build"]),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/images/"),
        to: path.resolve(__dirname, 'build/images'),
        ignore: ['svgs/*'],
        cache: true
      }
    ]),
  ],
  output: {
    filename : `src/scripts/app.min.js`,
    path: path.resolve(__dirname, 'build')
  }
});