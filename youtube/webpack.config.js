const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

let isProd = process.env.NODE_ENV === 'production';//true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ["css-loader","sass-loader"],
  publicPath: "/dist"
})
let cssConfig = isProd ? cssProd: cssDev;

module.exports = {
  entry: {
    app: './src/app.js',
    // contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // {
      //   test: /\.pug$/,
      //   use: 'pug-loader'
      // }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: 'errors-only',
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Youtube',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Contact Page',
    //   hash: true,
    //   chunks: ['contact'],
    //   filename: 'contact.html',
    //   template: './src/contact.html',
    // }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
