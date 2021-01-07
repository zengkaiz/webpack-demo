const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 多入口
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  // 多出口
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },
  // 优化项
  optimization: {
    // 分割代码块 多页的时候抽离公共代码
    splitChunks: {
      cacheGroups:{
        // 公共代码抽离
        common:{
          chunks:'initial',
          minSize: 0,
          minChunks:2,
        },
        // 第三方代码抽离
        vender: {
          priority:1, // 权重
          test: /node_modules/,
          chunks:'initial',
          minSize: 0,
          minChunks:2,
        }
      }
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other']
    }),
  ]
}