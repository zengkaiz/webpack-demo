function loader(source){ // loader的参数就是源代码
  console.log('loader2')
  return source
}
loader.pitch = function(){
  console.log('loader2-patch')
  return 'xxx'
}

module.exports = loader