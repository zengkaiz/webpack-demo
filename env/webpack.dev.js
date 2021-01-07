const {smart} = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = smart(base,{
  mode: 'development',
  plugins:[
    new webpack.DefinePlugin({
      DEV: "'dev'"
    })
  ],
  devServer: {
    port: 3000
  }
})