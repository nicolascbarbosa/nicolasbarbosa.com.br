const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    index: [
      './src/js/index.js',
      './src/scss/index.scss'
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  devServer: {
    inline: true,
    hot: true, 
    contentBase: './public',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /.*\.(gif|jpe?g|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: './src/index.html',
        hash: true,
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true, 
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
        },
        chunks: ['index']
      }
    ),
    new ExtractTextPlugin('css/[name].css'),
    // new webpack.ProvidePlugin({
    //   VMasker: 'vanilla-masker'
    // })
  ]
};
