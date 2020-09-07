const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode:'production',
  entry:  './src/index.js',
  output: {
    filename: '[name].js',
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
  //1. source-map 源码映射，单独生成一个sourcemap文件 报错回标识 当前报错的列和行
  // 2. eval-source-map 不会产生单独文件，但是可以显示列和行
  // 3. cheap-module-source-map 不会产生列，但是是一个单独的映射文件，产生后可以保留起来
  // 4. 不会生成文件，集成在打包后的文件中，不会产生列
  devtool:'source-map',
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500, //防抖
    ignored: /node_modules/
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