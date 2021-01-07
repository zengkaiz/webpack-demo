function loader(source){ // loader的参数就是源代码
  console.log('loader3')
  return source
}
loader.pitch = function(){
  console.log('loader3-patch')
}

module.exports = loader