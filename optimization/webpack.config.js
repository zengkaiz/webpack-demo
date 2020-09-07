const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    noParse: /jquery/,
    rules:[
      {
        test:'/\.js$/',
        use:{
          loader:'babel-loader',
          // exclude: /node_modules/,
          // include: path.resolve('src'),
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          }
        }
      }
    ]
  },
  plugins:[
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  devServer:{
    port:3000,
    open:true,
    contentBase: './dist'
  }
}