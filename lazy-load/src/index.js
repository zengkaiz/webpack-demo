import str from './source'

console.log(str,'111')

if(module.hot){
  module.hot.accept('./source.js', ()=>{
    console.log('更新了')
    let s = require('./source')
    console.log(s)
  })
}