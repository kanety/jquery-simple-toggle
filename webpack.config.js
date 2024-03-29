const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    "jquery-simple-toggle": "./src/jquery-simple-toggle.js"
  },

  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    publicPath: "/dist"
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],

  externals: {
    jquery: "jQuery"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          /src/,
          /test/,
          /node_modules\/@kanety\/js-store/
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  watchOptions: {
    poll: 1000
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
    disableHostCheck: true
  }
};
