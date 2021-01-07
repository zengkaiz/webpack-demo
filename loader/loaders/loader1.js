function loader(source){ // loader的参数就是源代码
  console.log('loader1')
  return source
}
loader.pitch = function(){
  console.log('loader1-patch')
}
module.exports = loader