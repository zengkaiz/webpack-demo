const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry:  './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use:{
          loader: 'babel-loader',
          options:{
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      DEV: "'prao'"
    })
  ]
}