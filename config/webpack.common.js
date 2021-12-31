const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require('dotenv-flow').config()

module.exports = {
  entry: {
    app: [
      path.resolve('./src/scripts/app.js'),
      path.resolve("./src/styles/app.scss")
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : path.resolve("./src/views/index.pug"),
      title : "Site Title",
      chunks : ["app"]
    }),
    new MiniCssExtractPlugin({
      filename : `./src/styles/app.min.css`
    })
  ],
  module: {
    rules : [
      {
        test : /\.pug$/,
        use : [{
          loader : 'pug-loader',
          options : {
            pretty : true
          }
        }]
      },
      {
        test : /\.(sa|sc|c)ss$/,
        use : [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader'},
          {loader: 'postcss-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader',
          options : {
            presets : ["@babel/preset-env"]
          }
        }
      },
      {
        test : /\.(png|jpg|gif|svg)$/,
        use : {
          loader : "file-loader",
          options : {
            name : path.resolve(__dirname, 'src/images/[name].[ext]')
          }
        }
      }
    ]
  }
}