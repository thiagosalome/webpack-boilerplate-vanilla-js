const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

const tagBuildCss = require("./package.json")['tag-build-css'];
const tagBuildJS = require("./package.json")['tag-build-sprite'];

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new uglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
    ]
  },
  plugins: [
    new cleanWebpackPlugin(["dist"]),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/images/"),
        to: path.resolve(__dirname, 'dist/images'),
        ignore: ['svgs/*'],
        cache: true
      }
    ]),
  ],
  output: {
    filename : `src/scripts/[name].${tagBuildJS}.min.js`,
    path: path.resolve(__dirname, 'dist')
  }
});